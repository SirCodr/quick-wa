"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evitar hidratación incorrecta
  useEffect(() => {
    setMounted(true)
  }, [])

  // Escuchar cambios en el tema del sistema
  useEffect(() => {
    // Solo configurar el listener si el tema está configurado como "system"
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

      // Función para manejar cambios en la preferencia del sistema
      const handleChange = (e: MediaQueryListEvent) => {
        setTheme(e.matches ? "dark" : "light")
      }

      // Añadir listener para cambios en la preferencia del sistema
      mediaQuery.addEventListener("change", handleChange)

      // Limpiar listener al desmontar
      return () => {
        mediaQuery.removeEventListener("change", handleChange)
      }
    }
  }, [theme, setTheme])

  if (!mounted) {
    return <div className="w-9 h-9"></div>
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={resolvedTheme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700" />
      )}
    </button>
  )
}
