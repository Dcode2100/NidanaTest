'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

type SearchInputProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
};

export function SearchInput({ onSearch, placeholder = "Search songs..." }: SearchInputProps) {
  const [query, setQuery] = useState('');
  
  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      // Call onSearch even when query is empty to show all songs
      onSearch(query);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query, onSearch]);
  
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-4 h-4 text-muted-foreground" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 pl-10 text-sm rounded-md bg-secondary/50 border-0 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        placeholder={placeholder}
      />
      {query && (
        <button
          onClick={() => {
            setQuery('');
            onSearch(''); // This will trigger showing all songs
          }}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          ×
        </button>
      )}
    </div>
  );
}