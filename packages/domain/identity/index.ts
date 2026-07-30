export interface Organization {
  id: string;
  name: string;
  slug: string;
  status: "active" | "suspended" | "deactivated";
  defaultTimezone: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserOrgMembership {
  id: string;
  userId: string;
  organizationId: string;
  roleId: string;
  status: "active" | "invited" | "removed";
  createdAt: string;
}

export interface Role {
  id: string;
  organizationId: string | null;
  name: string;
  permissions: string[];
  isSystemDefault: boolean;
}
