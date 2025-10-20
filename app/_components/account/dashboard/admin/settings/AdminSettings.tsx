"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { MdSettings, MdSave } from "react-icons/md";

interface SettingsData {
  siteName: string;
  siteDescription: string;
  adminEmail: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  maxTicketsPerUser: number;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<SettingsData>({
    siteName: "Support Dashboard",
    siteDescription: "Customer support and ticket management system",
    adminEmail: "admin@example.com",
    maintenanceMode: false,
    allowRegistration: true,
    maxTicketsPerUser: 10,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Settings saved:", settings);
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MdSettings className="text-3xl" />
        <h1 className="text-3xl font-bold">Admin Settings</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure basic site information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={settings.siteName}
              onChange={(e) =>
                setSettings({ ...settings, siteName: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) =>
                setSettings({ ...settings, siteDescription: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminEmail">Admin Email</Label>
            <Input
              id="adminEmail"
              type="email"
              value={settings.adminEmail}
              onChange={(e) =>
                setSettings({ ...settings, adminEmail: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Control system behavior and access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="maintenance">Maintenance Mode</Label>
              <p className="text-sm text-gray-500">
                Disable site access for all users
              </p>
            </div>
            <Switch
              id="maintenance"
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, maintenanceMode: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="registration">Allow Registration</Label>
              <p className="text-sm text-gray-500">
                Let new users create accounts
              </p>
            </div>
            <Switch
              id="registration"
              checked={settings.allowRegistration}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, allowRegistration: checked })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxTickets">Max Tickets Per User</Label>
            <Input
              id="maxTickets"
              type="number"
              min="1"
              max="100"
              value={settings.maxTicketsPerUser}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  maxTicketsPerUser: parseInt(e.target.value),
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          <MdSave />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
