
import { FiImage } from 'react-icons/fi';

interface ImageFallbackProps {
  className?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  text?: string;
  textClassName?: string;
  variant?: 'default' | 'bordered' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bgColor?: string;
  children?: React.ReactNode;
}

export default function ImageFallback({
  className = '',
  icon,
  iconClassName = '',
  text,
  textClassName = '',
  variant = 'default',
  size = 'md',
  bgColor,
  children,
}: ImageFallbackProps) {
  // Size presets
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  // Variant styles
  const variantClasses = {
    default: 'bg-muted',
    bordered: 'bg-muted-foreground border-2 border-dashed border-muted',
    minimal: 'bg-transparent',
  };

  const defaultIconClass = `${iconSizes[size]} text-muted-foreground/60`;
  const defaultTextClass = `mt-2 ${textSizes[size]} text-muted-foreground/70`;

  return (
    <div
      className={`flex flex-col items-center justify-center ${variantClasses[variant]} ${className}`}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      {children ? (
        children
      ) : (
        <>
          <div className={iconClassName || defaultIconClass}>
            {icon || <FiImage className="w-full h-full" />}
          </div>
          {text && (
            <span className={textClassName || defaultTextClass}>
              {text}
            </span>
          )}
        </>
      )}
    </div>
  );
}
