'use client'

import { useState } from 'react'
import ChatBot from '@/components/ChatBot'
import ProductGrid from '@/components/ProductGrid'
import { Product } from '@/lib/types'

export default function Home() {
  const [searchResults, setSearchResults] = useState<Product[]>([])

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex mb-8">
        <h1 className="text-4xl font-bold">E-commerce Assistant</h1>
      </div>

      <div className="flex w-full flex-col lg:flex-row gap-4 max-w-7xl">
        <div className="w-full lg:w-2/3">
          <ProductGrid products={searchResults} />
        </div>
        <div className="w-full lg:w-1/3">
          <ChatBot onSearch={setSearchResults} />
        </div>
      </div>
    </main>
  )
}