import {useState, useEffect} from "react";

export default function hookLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const storedValue= localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });
    // Cada vez que cambia `value`, lo guardamos en localStorage
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
  
    return [value, setValue];
}