import type { ReactNode } from 'react';

interface MarketchRowProps {
  children?: ReactNode;
  props?: Record<string, string>;
}

export function MarketchRow({ children, props }: MarketchRowProps) {
  const justify = props?.justify || 'start';
  const align = props?.align || 'start';
  const gap = props?.gap || '4';
  
  const justifyClasses = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
  }[justify] || 'justify-start';
  
  const alignClasses = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    stretch: 'items-stretch',
  }[align] || 'items-start';
  
  return (
    <div className={`flex flex-row ${justifyClasses} ${alignClasses} gap-${gap}`}>
      {children}
    </div>
  );
}
