import { motion } from "framer-motion";

interface Props {
    title : string
    description? : string
    icon? : React.ElementType
    children : React.ReactNode
}

export default function FormSection({ title, description, icon: Icon, children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        {Icon && <Icon className="w-5 h-5 text-primary" />}
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div className="space-y-4 pt-2">{children}</div>
    </motion.div>
  );
}