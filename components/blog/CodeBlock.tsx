import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { cn } from '@/utils/utils';


interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  isActive?: boolean;
  onCopy?: () => void;
}

export default function CodeBlock({ code, language = 'python', filename, onCopy }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative rounded-xl overflow-hidden border border-primary/20 shadow-card bg-card">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-primary/5 border-b border-primary/10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-destructive/60" />
            <span className="w-3 h-3 rounded-full bg-accent/60" />
            <span className="w-3 h-3 rounded-full bg-primary/60" />
          </div>
          {filename && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Terminal className="h-3.5 w-3.5" />
              <span className="font-mono">{filename}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className={cn(
              "p-2 rounded-lg transition-all",
              copied 
                ? "bg-primary/20 text-primary" 
                : "bg-primary/10 text-muted-foreground hover:bg-primary/20 hover:text-primary"
            )}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code className={cn("font-mono", `language-${language}`)}>
            {code}
          </code>
        </pre>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      </div>
    </div>
  );
}