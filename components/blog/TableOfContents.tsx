import { cn } from '@/utils/utils';
import { Layers, BookOpen } from 'lucide-react';


interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  activeId: string | null;
  onToggleReadingMode?: () => void;
  readingMode?: boolean;
}

export default function TableOfContents({
  items,
  activeId,
  onToggleReadingMode,
  readingMode,
}: TableOfContentsProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold flex items-center gap-2 text-primary">
          <Layers className="h-5 w-5" />
          Table of Contents
        </h4>
        {onToggleReadingMode && (
          <button
            onClick={onToggleReadingMode}
            className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            title={readingMode ? "Exit reading mode" : "Enter reading mode"}
          >
            <BookOpen className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <nav className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg text-sm transition-all",
              item.level === 3 && "pl-6",
              item.level === 4 && "pl-9",
              activeId === item.id
                ? "bg-primary/20 text-primary font-medium"
                : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
            )}
          >
            <span className="line-clamp-2">{item.title}</span>
          </button>
        ))}
      </nav>
      
      {/* Progress indicator */}
      <div className="mt-4 pt-4 border-t border-primary/20">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>{items.findIndex(i => i.id === activeId) + 1} / {items.length}</span>
        </div>
        <div className="mt-2 h-1 bg-primary/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ 
              width: `${((items.findIndex(i => i.id === activeId) + 1) / items.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
}