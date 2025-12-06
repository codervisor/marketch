import * as LucideIcons from 'lucide-react';

interface MarketchIconProps {
  content?: string;
  props?: Record<string, string>;
}

export function MarketchIcon({ content, props }: MarketchIconProps) {
  const size = parseInt(props?.size || '24', 10);
  const iconName = content || 'Circle';
  
  // Get the icon component from lucide-react
  const iconsMap = LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>>;
  const IconComponent = iconsMap[iconName] || LucideIcons.Circle;
  
  return (
    <div className="inline-flex items-center justify-center">
      <IconComponent size={size} strokeWidth={2} />
    </div>
  );
}
