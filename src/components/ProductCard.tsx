// src/components/ProductCard.tsx
import { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-48 mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
      <h3 className="font-bold truncate" title={product.title}>{product.title}</h3>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-500 mt-2 line-clamp-2" title={product.description}>
        {product.description}
      </p>
      <div className="flex items-center mt-2 text-sm text-gray-500">
        <span>⭐ {product.rating.rate}</span>
        <span className="ml-2">({product.rating.count} reviews)</span>
      </div>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
        Add to Cart
      </button>
    </div>
  )
}