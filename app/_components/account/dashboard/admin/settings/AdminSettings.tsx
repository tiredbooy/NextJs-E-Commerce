"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { startTransition, useState } from "react";
import { MdSettings } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { SettingsData } from "@/app/_lib/types";
import { updateSetting } from "@/app/_lib/actions/settingAction";


interface Props {
  initialSetting: SettingsData
}

export default function AdminSettings({initialSetting}: Props) {
  const [settings, setSettings] = useState<SettingsData>({
    site_name: initialSetting.site_name ||  "Support Dashboard",
    site_email: initialSetting.site_email || "admin@example.com",
    currency: initialSetting.currency || "USD",
    maintenance_mode: initialSetting.maintenance_mode || false,
  });

  const [loadingField, setLoadingField] = useState<string | null>(null);

  const saveSetting = async (field: keyof SettingsData, value: string | boolean) => {
    setLoadingField(field);
    await new Promise((resolve) => setTimeout(resolve, 800));

    startTransition(async() => {
      const data = {[field]: value}
      const result = await updateSetting(data)
      console.log('result:', result);
    })

    setLoadingField(null);
  };

  const handleChangeAndSave = (
    field: keyof SettingsData,
    value: any,
    saveInstant = false
  ) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    if (saveInstant) saveSetting(field, value);
  };

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "IRR", name: "Iranian Rial", symbol: "﷼" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MdSettings className="text-3xl" />
        <h1 className="text-3xl font-bold">Admin Settings</h1>
      </div>

      {/* GENERAL SETTINGS */}
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure basic site information</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* SITE NAME */}
          <div className="space-y-2">
            <Label htmlFor="site_name">Site Name</Label>
            <div className="relative">
              <Input
                id="site_name"
                value={settings.site_name}
                disabled={loadingField === "site_name"}
                className={`${
                  loadingField === "site_name"
                    ? "opacity-40 cursor-progress"
                    : ""
                }`}
                onChange={(e) =>
                  handleChangeAndSave("site_name", e.target.value)
                }
                onBlur={(e) => saveSetting("site_name", e.target.value)}
              />

              {loadingField === "site_name" && (
                <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-primary" />
              )}
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <Label htmlFor="site_email">Admin Email</Label>
            <div className="relative">
              <Input
                id="site_email"
                type="email"
                disabled={loadingField === "site_email"}
                className={`${
                  loadingField === "site_email"
                    ? "opacity-40 cursor-progress"
                    : ""
                }`}
                value={settings.site_email}
                onChange={(e) =>
                  handleChangeAndSave("site_email", e.target.value)
                }
                onBlur={(e) => saveSetting("site_email", e.target.value)}
              />

              {loadingField === "site_email" && (
                <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-primary" />
              )}
            </div>
          </div>

          {/* CURRENCY */}
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>

            <div className="relative">
              <Select
                disabled={loadingField === "currency"}
                value={settings.currency}
                onValueChange={(value) => {
                  handleChangeAndSave("currency", value, true);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>

                <SelectContent
                  className={`${
                    loadingField === "currency"
                      ? "opacity-40 cursor-progress"
                      : ""
                  }`}
                >
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium w-4">
                          {currency.symbol}
                        </span>
                        <span className="font-medium">{currency.code}</span>
                        <span className="text-muted-foreground ml-2">
                          {currency.name}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {loadingField === "currency" && (
                <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-primary" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SYSTEM SETTINGS */}
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

            <div className="relative">
              <Switch
                disabled={loadingField === "maintenance_mode"}
                id="maintenance"
                checked={settings.maintenance_mode}
                onCheckedChange={(checked) => {
                  handleChangeAndSave("maintenance_mode", checked, true);
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
