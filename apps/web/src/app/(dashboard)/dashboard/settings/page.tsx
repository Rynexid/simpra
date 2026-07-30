"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  UserIcon,
  BuildingIcon,
  SettingsIcon,
  CreditCardIcon,
  BellIcon,
  UsersIcon,
  ShieldCheckIcon,
  SaveIcon,
} from "lucide-react";

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function FormField({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      {children}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account, organization, and application preferences.
        </p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">
            <UserIcon className="size-3.5" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="organization">
            <BuildingIcon className="size-3.5" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <SettingsIcon className="size-3.5" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCardIcon className="size-3.5" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardContent className="space-y-6 pt-(--card-spacing)">
              <SettingsSection icon={UserIcon} title="Personal Information" description="Update your name and email address.">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="First Name">
                    <Input defaultValue="Andi" />
                  </FormField>
                  <FormField label="Last Name">
                    <Input defaultValue="Rahman" />
                  </FormField>
                </div>
                <FormField label="Email Address" description="Used for notifications and login.">
                  <Input type="email" defaultValue="andi@simpra.io" />
                </FormField>
                <FormField label="Phone Number">
                  <Input type="tel" defaultValue="+62 812 3456 7890" />
                </FormField>
              </SettingsSection>

              <hr className="border-border" />

              <SettingsSection icon={ShieldCheckIcon} title="Security" description="Manage your password and authentication methods.">
                <FormField label="Current Password">
                  <Input type="password" placeholder="Enter current password" />
                </FormField>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="New Password">
                    <Input type="password" placeholder="Enter new password" />
                  </FormField>
                  <FormField label="Confirm Password">
                    <Input type="password" placeholder="Confirm new password" />
                  </FormField>
                </div>
              </SettingsSection>

              <div className="flex justify-end">
                <button className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80">
                  <SaveIcon className="size-4" />
                  Save Changes
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organization" className="mt-4">
          <Card>
            <CardContent className="space-y-6 pt-(--card-spacing)">
              <SettingsSection icon={BuildingIcon} title="Organization Details" description="Information about your company.">
                <FormField label="Organization Name">
                  <Input defaultValue="Rynex Studio" />
                </FormField>
                <FormField label="Industry">
                  <Input defaultValue="Technology - Inventory Management" />
                </FormField>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Timezone">
                    <Input defaultValue="Asia/Jakarta (WIB)" />
                  </FormField>
                  <FormField label="Currency">
                    <Input defaultValue="IDR (Rp)" />
                  </FormField>
                </div>
              </SettingsSection>

              <hr className="border-border" />

              <SettingsSection icon={UsersIcon} title="Team Members" description="Manage who has access to your organization.">
                <div className="rounded-lg border border-border">
                  {[
                    { name: "Andi Rahman", email: "andi@simpra.io", role: "Admin" },
                    { name: "Siti Nuraini", email: "siti@simpra.io", role: "Manager" },
                    { name: "Budi Pratama", email: "budi@simpra.io", role: "Operator" },
                    { name: "Rina Wijaya", email: "rina@simpra.io", role: "Viewer" },
                  ].map((member) => (
                    <div key={member.email} className="flex items-center justify-between border-b border-border last:border-0 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                      <Badge variant="outline">{member.role}</Badge>
                    </div>
                  ))}
                </div>
              </SettingsSection>

              <div className="flex justify-end">
                <button className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80">
                  <SaveIcon className="size-4" />
                  Save Changes
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-4">
          <Card>
            <CardContent className="space-y-6 pt-(--card-spacing)">
              <SettingsSection icon={BellIcon} title="Notifications" description="Choose what notifications you receive.">
                {[
                  { label: "Low Stock Alerts", description: "Get notified when items fall below threshold", enabled: true },
                  { label: "Purchase Order Updates", description: "Receive updates on PO status changes", enabled: true },
                  { label: "Weekly Report", description: "Weekly inventory summary sent to your email", enabled: false },
                  { label: "System Announcements", description: "Product updates and maintenance notices", enabled: true },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium">{pref.label}</p>
                      <p className="text-xs text-muted-foreground">{pref.description}</p>
                    </div>
                    <label className="relative inline-flex h-5 w-9 cursor-pointer items-center">
                      <input type="checkbox" defaultChecked={pref.enabled} className="peer sr-only" />
                      <span className="absolute inset-0 rounded-full bg-muted transition-colors peer-checked:bg-primary" />
                      <span className="absolute left-0.5 top-0.5 size-4 rounded-full bg-background transition-transform peer-checked:translate-x-4" />
                    </label>
                  </div>
                ))}
              </SettingsSection>

              <hr className="border-border" />

              <SettingsSection icon={SettingsIcon} title="Display" description="Customize your application experience.">
                <FormField label="Language">
                  <Input defaultValue="English" />
                </FormField>
                <FormField label="Date Format">
                  <Input defaultValue="DD/MM/YYYY" />
                </FormField>
                <FormField label="Items Per Page">
                  <Input defaultValue="25" />
                </FormField>
              </SettingsSection>

              <div className="flex justify-end">
                <button className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80">
                  <SaveIcon className="size-4" />
                  Save Changes
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-4">
          <Card>
            <CardContent className="space-y-6 pt-(--card-spacing)">
              <SettingsSection icon={CreditCardIcon} title="Current Plan" description="You are currently on the Business plan.">
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Business Plan</p>
                      <p className="text-sm text-muted-foreground">$49/user/month - 5 users</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Next billing date: April 15, 2025
                  </div>
                </div>
              </SettingsSection>

              <hr className="border-border" />

              <SettingsSection icon={CreditCardIcon} title="Payment Method" description="Manage your payment methods.">
                <div className="rounded-lg border border-border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                      <CreditCardIcon className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Visa ending in 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 12/2027</p>
                    </div>
                    <Badge variant="outline" className="ml-auto">Default</Badge>
                  </div>
                </div>
              </SettingsSection>

              <div className="flex justify-end">
                <button className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80">
                  <SaveIcon className="size-4" />
                  Save Changes
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
