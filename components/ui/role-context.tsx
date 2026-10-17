'use client';

import React, { createContext, useContext, useState } from 'react';
import { UserProfile, UserRole } from '@/lib/types';
import { MOCK_USERS, getPermissionsForRole } from '@/lib/data';
import { parsePsgEmail } from '@/lib/auth/email-parser';

interface RoleContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  permissions: ReturnType<typeof getPermissionsForRole>;
  login: (email: string) => { success: boolean; role?: UserRole; redirectUrl?: string; error?: string };
  logout: () => void;
  switchRole: (role: UserRole) => void;
  availableUsers: UserProfile[];
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedSession = localStorage.getItem('ita_nexus_session');
        if (savedSession) {
          return JSON.parse(savedSession);
        }
      } catch {
        // Fallback for SSR or parse error
      }
    }
    // Default to student test account if first visit, or null if strictly logged out
    return MOCK_USERS[0];
  });

  const login = (email: string) => {
    const parsed = parsePsgEmail(email);
    if (!parsed.valid || !parsed.email) {
      return { success: false, error: parsed.error || 'Invalid email format' };
    }

    // Check if the email belongs to a designated committee member or student
    const existing = MOCK_USERS.find(u => u.email.toLowerCase() === parsed.email);

    let loggedInUser: UserProfile;

    if (existing) {
      loggedInUser = existing;
    } else {
      // Any other valid @psgtech.ac.in IT student joins as normal student
      loggedInUser = {
        id: `usr-${parsed.rollNumber?.toLowerCase() || Date.now()}`,
        email: parsed.email,
        name: `Student (${parsed.rollNumber})`,
        roll_number: parsed.rollNumber,
        department: 'IT',
        year_of_study: parsed.yearOfStudy || 2,
        role: 'student',
        skills: ['IT Core', 'Programming'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }

    setCurrentUser(loggedInUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ita_nexus_session', JSON.stringify(loggedInUser));
    }

    // Role-based destination:
    // Normal students -> /dashboard
    // ITA Committee members -> /committee
    const isCommittee = loggedInUser.role !== 'student';
    const redirectUrl = isCommittee ? '/committee' : '/dashboard';

    return { success: true, role: loggedInUser.role, redirectUrl };
  };

  const logout = () => {
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ita_nexus_session');
    }
  };

  const switchRole = (role: UserRole) => {
    const userForRole = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[0];
    setCurrentUser(userForRole);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ita_nexus_session', JSON.stringify(userForRole));
    }
  };

  const permissions = getPermissionsForRole(currentUser ? currentUser.role : 'student');

  return (
    <RoleContext.Provider
      value={{
        currentUser,
        isAuthenticated: currentUser !== null,
        permissions,
        login,
        logout,
        switchRole,
        availableUsers: MOCK_USERS
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    const fallbackUser = MOCK_USERS[0];
    return {
      currentUser: fallbackUser,
      isAuthenticated: true,
      permissions: getPermissionsForRole(fallbackUser.role),
      login: () => ({ success: true, role: 'student' as UserRole, redirectUrl: '/dashboard', error: undefined }),
      logout: () => {},
      switchRole: () => {},
      availableUsers: MOCK_USERS
    };
  }
  return context;
}
