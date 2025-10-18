"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { useState } from "react";
import {
    FiBell,
    FiGlobe,
    FiLogOut,
    FiSettings,
    FiShield,
    FiTrash2
} from "react-icons/fi";
import { IoMoon, IoSunny } from "react-icons/io5";
import SettingSection from "./SettingSection";
import SettingItem from "./SettingItem";



export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    twoFactor: false,
    theme: "system",
    language: "en",
  });

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      console.log("Account deletion requested");
      // Implement account deletion logic
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Implement logout logic
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <FiSettings className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Settings
          </h1>
        </div>
        <p className="text-muted-foreground">
          Manage your account preferences and settings
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Notifications Settings */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiBell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>
              Choose what notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SettingSection title="">
              <SettingItem
                title="Email Notifications"
                description="Receive notifications via email"
              >
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    updateSetting("emailNotifications", checked)
                  }
                />
              </SettingItem>
              <Separator />
              <SettingItem
                title="Order Updates"
                description="Get notified about order status changes"
              >
                <Switch
                  checked={settings.orderUpdates}
                  onCheckedChange={(checked) =>
                    updateSetting("orderUpdates", checked)
                  }
                />
              </SettingItem>
              <Separator />
              <SettingItem
                title="Promotions & Offers"
                description="Receive special offers and discounts"
              >
                <Switch
                  checked={settings.promotions}
                  onCheckedChange={(checked) =>
                    updateSetting("promotions", checked)
                  }
                />
              </SettingItem>
              <Separator />
              <SettingItem
                title="Newsletter"
                description="Stay updated with our latest news"
              >
                <Switch
                  checked={settings.newsletter}
                  onCheckedChange={(checked) =>
                    updateSetting("newsletter", checked)
                  }
                />
              </SettingItem>
            </SettingSection>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FiShield className="w-5 h-5 text-primary" />
              Security
            </CardTitle>
            <CardDescription>Keep your account secure</CardDescription>
          </CardHeader>
          <CardContent>
            <SettingSection title="">
              <SettingItem
                title="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
              >
                <Switch
                  checked={settings.twoFactor}
                  onCheckedChange={(checked) =>
                    updateSetting("twoFactor", checked)
                  }
                />
              </SettingItem>
              <Separator />
              <SettingItem
                title="Change Password"
                description="Update your password regularly"
              >
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </SettingItem>
            </SettingSection>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive bg-card">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions for your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <div>
                <h4 className="font-medium text-foreground">Log Out</h4>
                <p className="text-sm text-muted-foreground">
                  Sign out from your account
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <FiLogOut className="w-4 h-4" />
                Log Out
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <div>
                <h4 className="font-medium text-destructive">Delete Account</h4>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                className="gap-2"
              >
                <FiTrash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
