export const USER_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  DOCTOR: 'DOCTOR',
  NURSE: 'NURSE',
  RECEPTIONIST: 'RECEPTIONIST'
}

export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}

export const PERMISSIONS = {
  // Admin permissions
  ADMIN: [
    'patients:read', 'patients:write',
    'doctors:read', 'doctors:write',
    'appointments:read', 'appointments:write',
    'reports:read', 'reports:write',
    'settings:read', 'settings:write'
  ],
  // Doctor permissions
  DOCTOR: [
    'patients:read', 'patients:write',
    'appointments:read', 'appointments:write',
    'prescriptions:write',
    'lab_results:read'
  ],
  // Nurse permissions
  NURSE: [
    'patients:read',
    'medications:read', 'medications:write',
    'vitals:read', 'vitals:write'
  ],
  // Receptionist permissions
  RECEPTIONIST: [
    'patients:read', 'patients:write',
    'appointments:read', 'appointments:write',
    'billing:read'
  ]
}

export const DEMO_USERS = [
  {
    email: "admin@dcm.demo",
    password: "admin123",
    role: "ADMIN",
    name: "Admin User",
    permissions: PERMISSIONS.ADMIN
  },
  {
    email: "doctor@dcm.demo",
    password: "doc123",
    role: "DOCTOR",
    name: "Dr. Aparna Sharma",
    permissions: PERMISSIONS.DOCTOR
  },
  {
    email: "nurse@dcm.demo",
    password: "nurse123",
    role: "NURSE",
    name: "Nurse Kavya Patel",
    permissions: PERMISSIONS.NURSE
  },
  {
    email: "reception@dcm.demo",
    password: "reception123",
    role: "RECEPTIONIST",
    name: "Receptionist Arjun",
    permissions: PERMISSIONS.RECEPTIONIST
  },
  {
    email: "super@dcm.demo",
    password: "super123",
    role: "SUPER_ADMIN",
    name: "Super Admin",
    permissions: [...PERMISSIONS.ADMIN, 'system:admin']
  }
]