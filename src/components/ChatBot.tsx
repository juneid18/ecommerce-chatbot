'use client'

import { useState, useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import { ChatMessage as ChatMessageType, Product } from '@/lib/types'

interface ChatBotProps {
  onSearch: (products: Product[]) => void
}

export default function ChatBot({ onSearch }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

// Helper function to check if input is a greeting
const isGreeting = (text : any) => {
    const greetings = ['hi', 'hii', 'hey', 'hello']
    return greetings.includes(text.toLowerCase().trim())
  }
  
  const handleSend = async () => {
    if (!input.trim() || isLoading) return
  
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)
  
    try {
      // Check if input is a greeting
      if (isGreeting(input)) {
        setMessages([
          ...newMessages,
          { 
            role: 'assistant', 
            content: 'Hello! How may I help you today? You can ask me about our products!' 
          }
        ])
        setIsLoading(false)
        return
      }
  
      // If not a greeting, proceed with product search
      const response = await fetch('https://fakestoreapi.com/products')
      const allProducts: Product[] = await response.json()
      
      const searchTerms = input.toLowerCase().split(' ')
      const filteredProducts = allProducts.filter(product => 
        searchTerms.some(term => 
          product.title.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
        )
      )
  
      // Generate bot response
      let botResponse = ''
      if (filteredProducts.length > 0) {
        botResponse = `I found ${filteredProducts.length} products that match your search. Take a look!`
        onSearch(filteredProducts)
      } else {
        botResponse = "I couldn't find any products matching your search. Try different keywords!"
        onSearch([])
      }
  
      setMessages([...newMessages, { role: 'assistant', content: botResponse }])
    } catch (error) {
      console.error('Error:', error)
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ])
      onSearch([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[600px] border rounded-lg bg-white shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 text-black">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="text-black flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask about products..."
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
