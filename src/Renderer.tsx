import type { MarketchNode } from './parser';
import { MarketchButton } from './components/MarketchButton';
import { MarketchInput } from './components/MarketchInput';
import { MarketchText } from './components/MarketchText';
import { MarketchImage } from './components/MarketchImage';
import { MarketchIcon } from './components/MarketchIcon';
import { MarketchRow } from './components/MarketchRow';
import { MarketchCol } from './components/MarketchCol';
import { MarketchCard } from './components/MarketchCard';

interface RendererProps {
  nodes: MarketchNode[];
}

function renderNode(node: MarketchNode, index: number) {
  // Title
  if (node.type === 'title') {
    return (
      <h1 key={index} className="text-2xl font-bold font-mono mb-4">
        {node.content}
      </h1>
    );
  }

  // Container
  if (node.type === 'container') {
    const children = node.children?.map((child, i) => renderNode(child, i));
    
    switch (node.containerType) {
      case 'Row':
        return <MarketchRow key={index} props={node.props}>{children}</MarketchRow>;
      case 'Col':
        return <MarketchCol key={index} props={node.props}>{children}</MarketchCol>;
      case 'Card':
        return <MarketchCard key={index} props={node.props}>{children}</MarketchCard>;
      default:
        return <MarketchCol key={index} props={node.props}>{children}</MarketchCol>;
    }
  }

  // Component
  if (node.type === 'component') {
    switch (node.componentType) {
      case 'Button':
        return <MarketchButton key={index} content={node.content} props={node.props} />;
      case 'Input':
        return <MarketchInput key={index} content={node.content} props={node.props} />;
      case 'Text':
        return <MarketchText key={index} content={node.content} props={node.props} />;
      case 'Image':
        return <MarketchImage key={index} content={node.content} props={node.props} />;
      case 'Icon':
        return <MarketchIcon key={index} content={node.content} props={node.props} />;
      default:
        return null;
    }
  }

  return null;
}

export function Renderer({ nodes }: RendererProps) {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="text-gray-500 text-center mt-8">
        Enter Marketch code to see the preview...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {nodes.map((node, index) => renderNode(node, index))}
    </div>
  );
}
