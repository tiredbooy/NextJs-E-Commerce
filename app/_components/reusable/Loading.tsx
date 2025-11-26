"use client"
import { motion } from 'framer-motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

/**
 * Reusable Loading Component
 * 
 * @param {Object} props
 * @param {'spinner' | 'dots' | 'pulse' | 'bars'} props.variant - Loading style (default: 'spinner')
 * @param {'sm' | 'md' | 'lg'} props.size - Size (default: 'md')
 * @param {string} props.text - Optional loading text
 * @param {boolean} props.fullScreen - Show as full screen overlay (default: false)
 * @param {string} props.color - Custom color class or hex (default: primary blue)
 */
export default function Loading({ 
  variant = 'spinner', 
  size = 'md', 
  text = '', 
  fullScreen = false,
  color = '#3b82f6'
}: {
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
  color?: string;
}) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50'
    : 'flex flex-col items-center justify-center gap-3';

  // Spinner variant
  const SpinnerVariant = () => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={sizeClasses[size]}
    >
      <AiOutlineLoading3Quarters className="w-full h-full" style={{ color }} />
    </motion.div>
  );

  // Dots variant
  const DotsVariant = () => {
    const dotSize = size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4';
    
    return (
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`${dotSize} rounded-full`}
            style={{ backgroundColor: color }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    );
  };

  // Pulse variant
  const PulseVariant = () => (
    <motion.div
      className={`${sizeClasses[size]} rounded-full`}
      style={{ backgroundColor: color }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );

  // Bars variant
  const BarsVariant = () => {
    const barWidth = size === 'sm' ? 'w-1' : size === 'md' ? 'w-1.5' : 'w-2';
    const barHeight = size === 'sm' ? 'h-6' : size === 'md' ? 'h-10' : 'h-16';
    
    return (
      <div className="flex gap-1.5 items-end">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={`${barWidth} ${barHeight} rounded-full`}
            style={{ backgroundColor: color }}
            animate={{
              scaleY: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15
            }}
          />
        ))}
      </div>
    );
  };

  const variants = {
    spinner: <SpinnerVariant />,
    dots: <DotsVariant />,
    pulse: <PulseVariant />,
    bars: <BarsVariant />
  };

  return (
    <div className={containerClasses}>
      {variants[variant]}
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`${textSizes[size]} font-medium text-gray-700`}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}