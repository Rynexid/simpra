export interface AuthSession {
  userId: string;
  organizationId: string;
  role: string;
}

export interface AuthProvider {
  getSession: (request: Request) => Promise<AuthSession | null>;
  validatePermission: (session: AuthSession, permission: string, organizationId: string) => Promise<boolean>;
}
