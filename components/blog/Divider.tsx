
interface DividerProps {
  label?: string;
}

export default function Divider({ label }: DividerProps) {
  return (
    <div className="relative flex items-center py-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      {label && (
        <span className="mx-4 text-sm font-medium text-primary/70 whitespace-nowrap">
          {label}
        </span>
      )}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  );
}