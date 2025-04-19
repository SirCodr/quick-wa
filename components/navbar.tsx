import { ThemeToggle } from "./theme-toggle"

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-800 dark:text-white">QuickWA</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
