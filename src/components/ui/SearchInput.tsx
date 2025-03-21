
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchInput: React.FC = () => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);
    // Implement search functionality here
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search concerts..."
        className="w-full py-2 pl-10 pr-4 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 rounded-full focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/70" />
    </form>
  );
};

export default SearchInput;
