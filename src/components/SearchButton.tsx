
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import SearchModal from './SearchModal';

const SearchButton = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <button 
        className="p-2 hover:bg-gray-100 rounded-full"
        onClick={() => setIsSearchOpen(true)}
        aria-label="Search"
      >
        <Search size={20} className="text-leaf-800" />
      </button>
      
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default SearchButton;
