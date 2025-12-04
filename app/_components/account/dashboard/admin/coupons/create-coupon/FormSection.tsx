interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ 
  title, 
  description, 
  children 
}) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      {children}
    </div>
  </div>
);
export default FormSection;