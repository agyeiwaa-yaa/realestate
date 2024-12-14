import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-orange-500">
            Actual Real Estate
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/properties" className="text-gray-600 hover:text-orange-500">Properties</Link>
            <Link href="/agents" className="text-gray-600 hover:text-orange-500">Agents</Link>
            <Link href="/about" className="text-gray-600 hover:text-orange-500">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-orange-500">Contact</Link>
          </nav>
          <div className="flex space-x-2">
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

