import { Palette } from "lucide-react"
import { THEMES } from "../constants"
import { useThemeStore } from "../store/useThemeStore"

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore()

  return (
    <div className="dropdown dropdown-end">
      <button className="btn btn-ghost btn-circle">
        <Palette />
      </button>

      <div className="dropdown-content absolute mt-2 bg-base-200 border rounded-xl w-56 max-h-72 overflow-y-auto p-2">
        {THEMES.map(t => (
          <button
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={`w-full text-left px-3 py-2 rounded-lg ${
              theme === t.name ? "bg-primary/10" : "hover:bg-base-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ThemeSelector
