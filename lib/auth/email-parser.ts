/**
 * PSG College of Technology IT Department Email & Roll Number Parser
 * 
 * Format: [Year: 2 digits][Dept: 'i'][Roll: 3 digits]@psgtech.ac.in
 * Example: 24i318@psgtech.ac.in
 * - 24: Year of Admission (2024)
 * - i: Information Technology Department
 * - 318: Student Roll Number
 */

export interface ParsedPsgEmail {
  valid: boolean;
  error?: string;
  isFaculty?: boolean;
  email?: string;
  rollNumber?: string;
  admissionYear?: number;
  department?: string;
  yearOfStudy?: 1 | 2 | 3 | 4;
}

export function parsePsgEmail(email: string): ParsedPsgEmail {
  const normalized = email.trim().toLowerCase();

  if (!normalized.endsWith('@psgtech.ac.in')) {
    return {
      valid: false,
      error: 'Access restricted: Please enter your official @psgtech.ac.in college email.'
    };
  }

  const prefix = normalized.replace('@psgtech.ac.in', '');

  // 1. Faculty / Staff Mentor Detection (e.g., hod.it@psgtech.ac.in, faculty.name@psgtech.ac.in)
  if (prefix.includes('.') || prefix.startsWith('fac') || prefix === 'hod.it') {
    return {
      valid: true,
      isFaculty: true,
      email: normalized,
      rollNumber: 'FACULTY-IT',
      department: 'Information Technology',
      yearOfStudy: 4
    };
  }

  // 2. Student Roll Number Parsing: [2 digits year][letter department][digits roll number]
  // e.g. 24i318
  const studentRegex = /^(\d{2})([a-z]+)(\d+)$/;
  const match = prefix.match(studentRegex);

  if (!match) {
    return {
      valid: false,
      error: 'Invalid roll number format. Example: 24i318@psgtech.ac.in (24=2024, i=IT, 318=Roll No)'
    };
  }

  const [, yearPrefix, deptCode, rollDigits] = match;
  const admissionYear = 2000 + parseInt(yearPrefix, 10);

  // Department check: Must be 'i' for Information Technology
  if (deptCode !== 'i') {
    return {
      valid: false,
      error: `This platform is exclusive to the Information Technology Department ('i'). Found department code: '${deptCode.toUpperCase()}'.`
    };
  }

  // Calculate Year of Study based on current academic year (2026)
  // 2024 admission -> Year 2
  // 2025 admission -> Year 1
  // 2023 admission -> Year 3
  // 2022 admission -> Year 4
  const currentAcademicYear = 2026;
  let yearOfStudy = (currentAcademicYear - admissionYear) as 1 | 2 | 3 | 4;
  if (yearOfStudy < 1) yearOfStudy = 1;
  if (yearOfStudy > 4) yearOfStudy = 4;

  const rollNumber = `${yearPrefix}${deptCode}${rollDigits}`.toUpperCase();

  return {
    valid: true,
    isFaculty: false,
    email: normalized,
    admissionYear,
    department: 'Information Technology',
    rollNumber,
    yearOfStudy
  };
}
