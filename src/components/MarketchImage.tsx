interface MarketchImageProps {
  content?: string;
  props?: Record<string, string>;
}

export function MarketchImage({ content, props }: MarketchImageProps) {
  const width = props?.width || '200px';
  const height = props?.height || '150px';
  
  return (
    <div 
      className="border-2 border-black shadow-hard bg-gray-100 flex items-center justify-center font-mono text-sm"
      style={{ width, height }}
    >
      <span className="text-gray-500">[{content || 'Image'}]</span>
    </div>
  );
}
