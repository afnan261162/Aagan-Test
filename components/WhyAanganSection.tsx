'use client'

import { useInView } from '@/lib/useInView'

const WHY_CARDS = [
  {
    icon: '🌆',
    title: 'Rooftop Views',
    desc: 'Dine with a panoramic view of Sargodha city',
  },
  {
    icon: '🍽️',
    title: 'Authentic Flavors',
    desc: 'Traditional Pakistani cuisine crafted with love',
  },
  {
    icon: '✨',
    title: 'Premium Ambiance',
    desc: 'A luxurious setting for every occasion',
  },
]

const CARD_DELAYS = ['animate-delay-100', 'animate-delay-200', 'animate-delay-300']

export default function WhyAanganSection() {
  const { ref, inView } = useInView()

  return (
    <section className="py-20 lg:py-28" style={{ background: '#1a1a1a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={ref} className="text-center mb-14">
          <p
            className={`text-lg mb-2 ${inView ? 'animate-fadeInUp' : 'opacity-0'}`}
            style={{ fontFamily: 'var(--font-dancing)', color: '#D97706' }}
          >
            The Experience
          </p>
          <h2
            className={`text-white font-bold text-3xl sm:text-4xl ${inView ? 'animate-fadeInUp animate-delay-100' : 'opacity-0'}`}
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Why Aangan?
          </h2>
          <div
            className={`mt-4 mx-auto w-16 h-0.5 rounded-full ${inView ? 'animate-fadeIn animate-delay-200' : 'opacity-0'}`}
            style={{ background: '#D97706' }}
          />
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {WHY_CARDS.map((card, idx) => (
            <div
              key={card.title}
              className={`group rounded-2xl p-8 text-center border border-transparent hover:border-amber-500 transition-all duration-300 hover:scale-[1.02] ${
                inView ? `animate-fadeInUp ${CARD_DELAYS[idx]}` : 'opacity-0'
              }`}
              style={{
                background: '#252525',
                borderColor: inView ? undefined : 'rgba(255,255,255,0.06)',
              }}
            >
              <div className="text-5xl mb-5 transition-transform duration-300 group-hover:scale-110 inline-block">
                {card.icon}
              </div>
              <h3
                className="text-white font-bold text-xl mb-3"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
