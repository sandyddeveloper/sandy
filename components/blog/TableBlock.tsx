import { useState, useMemo } from 'react';
import { ArrowUpDown, Search } from 'lucide-react';
import { cn } from '@/utils/utils';


interface TableBlockProps {
  title?: string;
  headers: string[];
  rows: string[][];
  striped?: boolean;
  sortable?: boolean;
  searchable?: boolean;
  highlightImportant?: number[];
}

export default function TableBlock({
  title,
  headers,
  rows,
  striped = true,
  sortable = false,
  searchable = false,
  highlightImportant = [],
}: TableBlockProps) {
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const processedRows = useMemo(() => {
    let result = [...rows];

    // Filter by search
    if (searchQuery) {
      result = result.filter(row =>
        row.some(cell => cell.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort
    if (sortColumn !== null) {
      result.sort((a, b) => {
        const comparison = a[sortColumn].localeCompare(b[sortColumn]);
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [rows, sortColumn, sortDirection, searchQuery]);

  const handleSort = (columnIndex: number) => {
    if (!sortable) return;
    
    if (sortColumn === columnIndex) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnIndex);
      setSortDirection('asc');
    }
  };

  return (
    <div className="rounded-xl border border-primary/20 overflow-hidden bg-card">
      {(title || searchable) && (
        <div className="flex items-center justify-between px-4 py-3 bg-primary/5 border-b border-primary/10">
          {title && (
            <h4 className="font-semibold text-primary">{title}</h4>
          )}
          {searchable && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-sm rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          )}
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-primary/5">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={cn(
                    "px-4 py-3 text-left text-sm font-semibold text-primary",
                    sortable && "cursor-pointer hover:bg-primary/10 transition-colors"
                  )}
                  onClick={() => handleSort(index)}
                >
                  <div className="flex items-center gap-2">
                    {header}
                    {sortable && (
                      <ArrowUpDown className={cn(
                        "h-3.5 w-3.5",
                        sortColumn === index ? "text-primary" : "text-muted-foreground"
                      )} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processedRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  "border-t border-primary/10 transition-colors hover:bg-primary/5",
                  striped && rowIndex % 2 === 1 && "bg-muted/30"
                )}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn(
                      "px-4 py-3 text-sm",
                      highlightImportant.includes(cellIndex) && "font-medium text-primary"
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}