'use client';

import React, { createContext, useContext, useState } from 'react';
import { UserProfile, UserRole } from '@/lib/types';
import { MOCK_USERS, getPermissionsForRole } from '@/lib/data';

interface RoleContextType {
  currentUser: UserProfile;
  permissions: ReturnType<typeof getPermissionsForRole>;
  switchRole: (role: UserRole) => void;
  availableUsers: UserProfile[];
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedId = localStorage.getItem('ita_nexus_active_user');
        if (savedId) {
          const found = MOCK_USERS.find(u => u.id === savedId);
          if (found) return found;
        }
      } catch {
        // Fallback for SSR
      }
    }
    return MOCK_USERS[0];
  });

  const switchRole = (role: UserRole) => {
    const userForRole = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[0];
    setCurrentUser(userForRole);
    localStorage.setItem('ita_nexus_active_user', userForRole.id);
  };

  const permissions = getPermissionsForRole(currentUser.role);

  return (
    <RoleContext.Provider
      value={{
        currentUser,
        permissions,
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
    // Fallback if rendered outside provider
    const fallbackUser = MOCK_USERS[0];
    return {
      currentUser: fallbackUser,
      permissions: getPermissionsForRole(fallbackUser.role),
      switchRole: () => {},
      availableUsers: MOCK_USERS
    };
  }
  return context;
}
