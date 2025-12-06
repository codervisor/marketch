interface MarketchInputProps {
  content?: string;
  props?: Record<string, string>;
}

export function MarketchInput({ content }: MarketchInputProps) {
  return (
    <input
      type="text"
      placeholder={content || 'Input'}
      className="px-4 py-2 border-2 border-black font-mono text-sm shadow-hard w-full focus:outline-none"
      readOnly
    />
  );
}
