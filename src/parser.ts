/**
 * Marketch Parser - Converts Marketch DSL to AST
 * 
 * MVP Limitations:
 * - Props parsing doesn't handle nested parentheses or commas within values
 * - This is acceptable for the MVP scope as defined in the specification
 */

export interface MarketchNode {
  type: 'container' | 'component' | 'title';
  containerType?: 'Row' | 'Col' | 'Card';
  componentType?: 'Button' | 'Input' | 'Text' | 'Image' | 'Icon';
  content?: string;
  props?: Record<string, string>;
  children?: MarketchNode[];
}

interface ParsedLine {
  indent: number;
  type: 'container' | 'component' | 'title' | 'empty';
  containerType?: string;
  componentType?: string;
  content?: string;
  props?: Record<string, string>;
}

/**
 * Parse a single line of Marketch code
 */
function parseLine(line: string): ParsedLine {
  // Count leading spaces for indentation
  const match = line.match(/^(\s*)/);
  const indent = match ? match[1].length : 0;
  const trimmed = line.trim();

  // Empty line
  if (!trimmed) {
    return { indent, type: 'empty' };
  }

  // Title (starts with #)
  if (trimmed.startsWith('#')) {
    const content = trimmed.substring(1).trim();
    return { indent, type: 'title', content };
  }

  // Container (starts with >)
  if (trimmed.startsWith('>')) {
    const rest = trimmed.substring(1).trim();
    const { content, props } = parseContentAndProps(rest);
    return {
      indent,
      type: 'container',
      containerType: content || 'Col', // Default to Col
      props,
    };
  }

  // Component (starts with *)
  if (trimmed.startsWith('*')) {
    const rest = trimmed.substring(1).trim();
    
    // Extract component type from [Type]
    const typeMatch = rest.match(/^\[(\w+)\]\s*(.*)/);
    if (typeMatch) {
      const componentType = typeMatch[1];
      const remaining = typeMatch[2];
      const { content, props } = parseContentAndProps(remaining);
      
      return {
        indent,
        type: 'component',
        componentType,
        content: content ? content.replace(/^["']|["']$/g, '') : '', // Remove quotes
        props,
      };
    }
  }

  // Unknown format - treat as empty
  return { indent, type: 'empty' };
}

/**
 * Parse content and props from a string like: "Content" (prop1: value1, prop2: value2)
 */
function parseContentAndProps(text: string): { content: string; props?: Record<string, string> } {
  const propsMatch = text.match(/\(([^)]+)\)\s*$/);
  
  let content = text;
  let props: Record<string, string> | undefined;
  
  if (propsMatch) {
    // Extract props
    const propsStr = propsMatch[1];
    props = {};
    
    // Split by comma and parse key:value pairs
    const pairs = propsStr.split(',').map(p => p.trim());
    for (const pair of pairs) {
      const [key, ...valueParts] = pair.split(':');
      if (key && valueParts.length > 0) {
        props[key.trim()] = valueParts.join(':').trim();
      }
    }
    
    // Remove props from content
    content = text.substring(0, propsMatch.index ?? text.length).trim();
  }
  
  return { content, props };
}

/**
 * Build a tree from parsed lines using indentation
 */
function buildTree(lines: ParsedLine[]): MarketchNode[] {
  const root: MarketchNode[] = [];
  const stack: { node: MarketchNode; indent: number }[] = [];

  for (const line of lines) {
    if (line.type === 'empty') continue;

    const node: MarketchNode = {
      type: line.type as 'container' | 'component' | 'title',
    };

    if (line.type === 'container') {
      node.containerType = line.containerType as 'Row' | 'Col' | 'Card';
      node.props = line.props;
      node.children = [];
    } else if (line.type === 'component') {
      node.componentType = line.componentType as 'Button' | 'Input' | 'Text' | 'Image' | 'Icon';
      node.content = line.content;
      node.props = line.props;
    } else if (line.type === 'title') {
      node.content = line.content;
    }

    // Pop stack until we find the right parent
    while (stack.length > 0 && stack[stack.length - 1].indent >= line.indent) {
      stack.pop();
    }

    // Add to parent or root
    if (stack.length === 0) {
      root.push(node);
    } else {
      const parent = stack[stack.length - 1].node;
      if (parent.children) {
        parent.children.push(node);
      }
    }

    // Add to stack if it's a container (can have children)
    if (line.type === 'container') {
      stack.push({ node, indent: line.indent });
    }
  }

  return root;
}

/**
 * Main parser function - converts Marketch text to AST
 */
export function parseMarketch(text: string): MarketchNode[] {
  const lines = text.split('\n');
  const parsed = lines.map(parseLine);
  const tree = buildTree(parsed);
  return tree;
}
