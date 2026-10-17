'use client';

import React from 'react';
import { useRole } from './role-context';
import { UserRole } from '@/lib/types';
import { Badge } from './badge';

export function RoleSwitcher() {
  const { currentUser, switchRole, availableUsers } = useRole();

  const roleLabels: Record<UserRole, { label: string; icon: string; badgeVariant: 'cyan' | 'purple' | 'success' | 'warning' | 'info' | 'default' }> = {
    student: { label: 'Student (Normal)', icon: '🎓', badgeVariant: 'cyan' },
    executive_member: { label: 'Executive Member', icon: '📋', badgeVariant: 'default' },
    joint_secretary: { label: 'Joint Secretary', icon: '🔍', badgeVariant: 'purple' },
    secretary: { label: 'Secretary (High Access)', icon: '🏛️', badgeVariant: 'warning' },
    treasurer: { label: 'Treasurer (Finance)', icon: '💰', badgeVariant: 'success' },
    faculty_mentor: { label: 'Faculty Mentor (High Access)', icon: '👨‍🏫', badgeVariant: 'info' }
  };

  const currentConfig = roleLabels[currentUser.role];

  return (
    <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 py-1 px-2.5 rounded-xl text-xs">
      <span className="text-slate-400 font-mono hidden lg:inline">Active Role:</span>
      <span className="text-base leading-none">{currentConfig.icon}</span>
      
      <select
        value={currentUser.role}
        onChange={(e) => switchRole(e.target.value as UserRole)}
        className="bg-transparent text-slate-200 text-xs font-semibold focus:outline-none cursor-pointer pr-1"
        aria-label="Switch active test role"
      >
        {availableUsers.map((user) => (
          <option key={user.id} value={user.role} className="bg-slate-900 text-slate-100">
            {roleLabels[user.role].icon} {user.name} ({roleLabels[user.role].label})
          </option>
        ))}
      </select>

      <Badge variant={currentConfig.badgeVariant} className="text-[10px] uppercase font-bold tracking-wider py-0 px-1.5 hidden sm:inline-flex">
        {currentUser.role.replace('_', ' ')}
      </Badge>
    </div>
  );
}
