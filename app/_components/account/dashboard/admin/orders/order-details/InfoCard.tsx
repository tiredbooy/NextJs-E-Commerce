// components/InfoCard.tsx
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}

/**
 * Compound Component Pattern: Flexible card container
 * Used for consistent information display across the order page
 */
export function InfoCard({ title, icon, children, className = "", headerAction }: InfoCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          {icon}
          {title}
        </CardTitle>
        {headerAction}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

/**
 * Sub-component for consistent key-value pairs
 */
interface InfoRowProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export function InfoRow({ label, value, className = "" }: InfoRowProps) {
  return (
    <div className={`flex justify-between items-start py-2 border-b last:border-b-0 ${className}`}>
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
      <span className="text-sm font-medium text-right max-w-[60%]">{value}</span>
    </div>
  );
}