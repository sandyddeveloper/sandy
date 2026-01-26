import { ReactNode } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/utils/utils';


interface CalloutProps {
  variant?: 'info' | 'warning' | 'success' | 'error';
  children: ReactNode;
}

const variantConfig = {
  info: {
    icon: Info,
    bgClass: 'bg-primary/10 border-primary/30',
    iconClass: 'text-primary',
    textClass: 'text-primary/90',
  },
  warning: {
    icon: AlertTriangle,
    bgClass: 'bg-accent/10 border-accent/30',
    iconClass: 'text-accent',
    textClass: 'text-accent/90',
  },
  success: {
    icon: CheckCircle,
    bgClass: 'bg-primary/10 border-primary/30',
    iconClass: 'text-primary',
    textClass: 'text-primary/90',
  },
  error: {
    icon: AlertCircle,
    bgClass: 'bg-destructive/10 border-destructive/30',
    iconClass: 'text-destructive',
    textClass: 'text-destructive/90',
  },
};

export default function Callout({ variant = 'info', children }: CalloutProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className={cn(
      'flex gap-4 p-5 rounded-xl border',
      config.bgClass
    )}>
      <div className={cn('shrink-0 mt-0.5', config.iconClass)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className={cn('text-sm leading-relaxed', config.textClass)}>
        {children}
      </div>
    </div>
  );
}