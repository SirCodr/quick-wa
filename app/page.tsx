import Navbar from "@/components/navbar"
import WhatsappForm from "@/components/whatsapp-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-6">Inicia un chat rápido</h2>
          <WhatsappForm />
        </div>
      </div>
    </main>
  )
}
