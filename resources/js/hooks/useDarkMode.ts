import { useEffect, useState } from 'react';

const useDarkMode = () => {
    const [dark, setDark] = useState<boolean>(() => localStorage.getItem('dark') === 'dark');

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('dark', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.removeItem('dark');
        }
    }, [dark]);

    const toggleTheme = () => {
        setDark((prev) => !prev);
    };

    return { dark, toggleTheme };
};

export default useDarkMode;
