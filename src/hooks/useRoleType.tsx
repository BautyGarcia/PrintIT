import { useState, useEffect, useCallback } from 'react';

// The custom hook function
function useRoleType(defaultValue: 'Cliente' | 'Vendedor'): ['Cliente' | 'Vendedor', (value: 'Cliente' | 'Vendedor') => void] {
  // Initialize the state with a function to read from localStorage or use a default value
  const [roleType, setRoleType] = useState<'Cliente' | 'Vendedor'>(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('roleType');
      return (storedValue as 'Cliente' | 'Vendedor') || defaultValue;
    }
    return defaultValue;
  });

  // A memoized version of the function to set the state and localStorage
  const setValue = useCallback((value: 'Cliente' | 'Vendedor') => {
    setRoleType(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('roleType', value);
    }
  }, []);

  // This effect updates localStorage when roleType changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('roleType', roleType);
    }
  }, [roleType]);

  return [roleType, setValue];
}

export default useRoleType;
