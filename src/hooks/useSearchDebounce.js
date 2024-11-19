import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export const useSearchDebounce = (callback, delay = 500) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const debouncedCallback = useDebounce(callback, delay);

  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
    debouncedCallback(value);
  }, [debouncedCallback]);

  return { searchTerm, handleSearch };
};