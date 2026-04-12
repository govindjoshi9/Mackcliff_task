import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => {
        const nextMode = !state.isDarkMode;
        // Apply class to document element directly for reactive UI updates
        if (nextMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { isDarkMode: nextMode };
      }),
      setDarkMode: (isDark) => set(() => {
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { isDarkMode: isDark };
      }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export default useThemeStore;
