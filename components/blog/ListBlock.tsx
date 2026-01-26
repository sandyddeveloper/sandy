import { CheckCircle } from 'lucide-react';

interface ListBlockProps {
  title?: string;
  items: string[];
}

export default function ListBlock({ title, items }: ListBlockProps) {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
      {title && (
        <h4 className="font-semibold text-primary mb-4">{title}</h4>
      )}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span className="text-foreground/80">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}