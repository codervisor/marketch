interface MarketchButtonProps {
  content?: string;
  props?: Record<string, string>;
}

export function MarketchButton({ content, props }: MarketchButtonProps) {
  const style = props?.style || 'default';
  
  const baseClasses = "px-4 py-2 border-2 border-black font-mono text-sm shadow-hard";
  const styleClasses = style === 'primary' 
    ? "bg-black text-white" 
    : "bg-white text-black hover:bg-gray-100";
  
  return (
    <button className={`${baseClasses} ${styleClasses}`}>
      {content || 'Button'}
    </button>
  );
}
