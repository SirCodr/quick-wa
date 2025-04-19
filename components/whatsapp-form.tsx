"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import CountrySelector from "./country-selector"
import { countries } from "@/lib/countries"

export default function WhatsappForm() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Número de teléfono
        </label>
        <div className="flex">
          <CountrySelector selectedCountry={selectedCountry} onSelect={setSelectedCountry} />
          <input
            type="tel"
            id="phone"
            className={`flex-1 block w-full rounded-r-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm ${
              error ? "border-red-300" : ""
            }`}
            placeholder="123456789"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value)
              if (error) setError("")
            }}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Mensaje (opcional)
        </label>
        <textarea
          id="message"
          rows={3}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          placeholder="Escribe tu mensaje aquí..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
