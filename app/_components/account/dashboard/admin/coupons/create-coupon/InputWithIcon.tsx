import { Input } from "@/components/ui/input";

interface InputWithIconProps extends React.ComponentProps<typeof Input> {
  icon: React.ReactNode;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({ icon, ...props }) => (
  <div className="relative">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
      {icon}
    </div>
    <Input {...props} className="pl-10 bg-background border-border" />
  </div>
);

export default InputWithIcon;