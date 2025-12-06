interface MarketchTextProps {
  content?: string;
  props?: Record<string, string>;
}

export function MarketchText({ content, props }: MarketchTextProps) {
  const size = props?.size || 'md';
  const align = props?.align || 'left';
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  }[size] || 'text-base';
  
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align] || 'text-left';
  
  return (
    <p className={`font-mono ${sizeClasses} ${alignClasses}`}>
      {content || 'Text'}
    </p>
  );
}
