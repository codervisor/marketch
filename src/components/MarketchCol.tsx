import type { ReactNode } from 'react';

interface MarketchColProps {
  children?: ReactNode;
  props?: Record<string, string>;
}

export function MarketchCol({ children, props }: MarketchColProps) {
  const justify = props?.justify || 'start';
  const align = props?.align || 'stretch';
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
  }[align] || 'items-stretch';
  
  return (
    <div className={`flex flex-col ${justifyClasses} ${alignClasses} gap-${gap}`}>
      {children}
    </div>
  );
}
