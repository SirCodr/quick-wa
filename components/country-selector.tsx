"use client"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronDown, Search } from "lucide-react"
import { countries } from "@/lib/countries"

interface CountrySelectorProps {
  selectedCountry: {
    code: string
    name: string
    dialCode: string
  }
  onSelect: (country: { code: string; name: string; dialCode: string }) => void
}

export default function CountrySelector({ selectedCountry, onSelect }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const filteredCountries = countries.filter(
    (country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()) || country.dialCode.includes(searchTerm),
  )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 dark:text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          <span className="mr-2">{selectedCountry.code}</span>
          <span>{selectedCountry.dialCode}</span>
        </span>
        <ChevronDown className="w-4 h-4 ml-2 text-gray-500 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-64 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="sticky top-0 bg-white dark:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                className="w-full pl-8 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Buscar país..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <ul className="py-1" role="listbox">
            {filteredCountries.map((country) => (
              <li
                key={country.code}
                className={`flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  selectedCountry.code === country.code ? "bg-gray-50 dark:bg-gray-700" : ""
                } dark:text-white`}
                role="option"
                aria-selected={selectedCountry.code === country.code}
                onClick={() => {
                  onSelect(country)
                  setIsOpen(false)
                  setSearchTerm("")
                }}
              >
                <span className="mr-2">{country.code}</span>
                <span className="flex-1">{country.name}</span>
                <span className="text-gray-500 dark:text-gray-400">{country.dialCode}</span>
                {selectedCountry.code === country.code && <Check className="w-4 h-4 ml-2 text-green-500" />}
              </li>
            ))}
            {filteredCountries.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">No se encontraron resultados</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
