export interface OrganizationSettings {
  id: string;
  name: string;
  slug: string;
  status: string;
  timezone: string;
  preferences: Record<string, unknown>;
  notificationSettings: NotificationSettings;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  lowStockAlerts: boolean;
  orderNotifications: boolean;
  weeklyDigest: boolean;
}

export interface UpdateOrganizationInput {
  id: string;
  name?: string;
  slug?: string;
  timezone?: string;
  preferences?: Record<string, unknown>;
}

export interface UpdateNotificationSettingsInput {
  organizationId: string;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  lowStockAlerts?: boolean;
  orderNotifications?: boolean;
  weeklyDigest?: boolean;
}
