'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useInView } from '@/lib/useInView'

const FOOD_CARDS = [
  {
    name: 'Charcoal Grill',
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
  },
  {
    name: 'Biryani',
    url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80',
  },
  {
    name: 'Chicken Karahi',
    url: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80',
  },
  {
    name: 'Rooftop View',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
  },
  {
    name: 'Naan & Dips',
    url: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&q=80',
  },
  {
    name: 'Dessert',
    url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80',
  },
]

const CARD_DELAYS = [
  'animate-delay-100',
  'animate-delay-200',
  'animate-delay-300',
  'animate-delay-400',
  'animate-delay-500',
  'animate-delay-500',
]

export default function FoodShowcaseSection() {
  const { ref, inView } = useInView()

  return (
    <section className="py-20 lg:py-28" style={{ background: '#F9F4ED' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={ref} className="text-center mb-14">
          <p
            className={`text-lg mb-2 transition-opacity ${inView ? 'animate-fadeInUp' : 'opacity-0'}`}
            style={{ fontFamily: 'var(--font-dancing)', color: '#D97706' }}
          >
            From Our Kitchen
          </p>
          <h2
            className={`font-bold text-3xl sm:text-4xl lg:text-5xl ${inView ? 'animate-fadeInUp animate-delay-100' : 'opacity-0'}`}
            style={{ fontFamily: 'var(--font-playfair)', color: '#1C1710' }}
          >
            A Taste of Aangan
          </h2>
          <div
            className={`mt-4 mx-auto w-16 h-0.5 rounded-full ${inView ? 'animate-fadeIn animate-delay-200' : 'opacity-0'}`}
            style={{ background: '#D97706' }}
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FOOD_CARDS.map((card, idx) => (
            <div
              key={card.name}
              className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer ${
                inView ? `animate-scaleIn ${CARD_DELAYS[idx]}` : 'opacity-0'
              }`}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={card.url}
                  alt={card.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                {/* Golden shimmer on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Dish label */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
                  <p className="text-white font-semibold text-base tracking-wide">
                    {card.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA below cards */}
        <div className="text-center mt-12">
          <Link
            href="/menu"
            className="inline-block font-semibold px-8 py-3 rounded-full border-2 text-sm sm:text-base transition-all duration-300 hover:scale-105"
            style={{
              borderColor: '#D97706',
              color: '#D97706',
              background: 'transparent',
            }}
          >
            See Full Menu
          </Link>
        </div>
      </div>
    </section>
  )
}
