import type { ReactNode } from 'react';

interface MarketchCardProps {
  children?: ReactNode;
  props?: Record<string, string>;
}

export function MarketchCard({ children, props }: MarketchCardProps) {
  const padding = props?.padding || 'medium';
  
  const paddingClasses = {
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6',
    none: 'p-0',
  }[padding] || 'p-4';
  
  return (
    <div className={`border-2 border-black shadow-hard bg-white ${paddingClasses}`}>
      {children}
    </div>
  );
}
