import { create } from "zustand"

/**
 * THEME STORE
 * - persisted
 * - used by App + loaders
 */
export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("streamtube-theme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("streamtube-theme", theme)
    set({ theme })
  },
}))
