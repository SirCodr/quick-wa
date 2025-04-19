"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import CountrySelector from "./country-selector"
import { countries } from "@/lib/countries"

export default function WhatsappForm() {
  const defaultCountry = countries.find((country) => country.name === "Colombia")
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const MAX_MESSAGE_LENGTH = 255

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!phoneNumber.trim()) {
      setError("Por favor ingresa un número de teléfono")
      return
    }

    // Eliminar cualquier caracter que no sea número
    const cleanNumber = phoneNumber.replace(/\D/g, "")

    // Construir la URL de WhatsApp
    const dialCode = selectedCountry.dialCode.replace("+", "")
    const whatsappUrl = `https://wa.me/${dialCode}${cleanNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`

    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappUrl, "_blank")
  }

  // Manejar entrada de teléfono - solo permitir números
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Filtrar caracteres no numéricos
    const value = e.target.value.replace(/\D/g, "")
    setPhoneNumber(value)

    if (error) setError("")
  }

  // Prevenir entrada de caracteres no numéricos
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permitir teclas de navegación, borrado y números
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"]

    // Si no es un número y no es una tecla permitida, prevenir la acción
    if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault()
    }
  }

  // Manejar entrada de mensaje - limitar a MAX_MESSAGE_LENGTH caracteres
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setMessage(value)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Número de teléfono
        </label>
        <div className="flex space-x-2">
          <div className="w-24">
            <CountrySelector selectedCountry={selectedCountry} onSelect={setSelectedCountry} />
          </div>
          <input
            type="tel"
            id="phone"
            className="flex-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-3 dark:bg-gray-700 dark:text-white"
            placeholder="123456789"
            value={phoneNumber}
            onChange={handlePhoneChange}
            onKeyDown={handlePhoneKeyDown}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Mensaje (opcional)
          </label>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {message.length}/{MAX_MESSAGE_LENGTH}
          </span>
        </div>
        <textarea
          id="message"
          rows={3}
          maxLength={MAX_MESSAGE_LENGTH}
          className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-3 dark:bg-gray-700 dark:text-white max-h-40 resize-none"
          placeholder="Escribe tu mensaje aquí..."
          value={message}
          onChange={handleMessageChange}
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <Send className="w-4 h-4 mr-2" />
        Abrir chat
      </button>
    </form>
  )
}
