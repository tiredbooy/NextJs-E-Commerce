"use client";
import { Label } from "@/components/ui/label";

export default function SettingItem({ icon: Icon, title, description, children }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="flex gap-4 flex-1">
        {Icon && (
          <div className="mt-1">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
        <div className="flex-1">
          <Label className="text-base font-medium text-foreground cursor-pointer">
            {title}
          </Label>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center">{children}</div>
    </div>
  );
}