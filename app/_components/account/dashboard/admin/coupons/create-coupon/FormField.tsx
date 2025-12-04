import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  error, 
  required, 
  icon, 
  children 
}) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium text-foreground flex items-center gap-2">
      {icon}
      {label}
      {required && <span className="text-destructive">*</span>}
    </Label>
    {children}
    {error && (
      <p className="text-sm text-destructive">{error}</p>
    )}
  </div>
);

export default FormField;