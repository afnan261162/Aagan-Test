export default function MenuLoading() {
  return (
    <div className="min-h-screen bg-[#1C1710] pt-24">
      {/* Hero skeleton */}
      <div className="text-center py-16 px-4">
        <div className="h-5 w-32 bg-[#C8860A]/20 rounded-full mx-auto mb-4 animate-pulse" />
        <div className="h-12 w-64 bg-[#F5E6C8]/10 rounded-xl mx-auto mb-3 animate-pulse" />
        <div className="h-5 w-80 bg-[#F5E6C8]/5 rounded-full mx-auto animate-pulse" />
      </div>

      {/* Category nav skeleton */}
      <div className="sticky top-16 z-30 bg-[#1C1710]/95 border-b border-[#C8860A]/12 py-4">
        <div className="max-w-6xl mx-auto px-4 flex gap-3 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-9 w-28 bg-[#2C2210] rounded-full animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Items skeleton */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {Array.from({ length: 3 }).map((_, si) => (
          <div key={si}>
            <div className="h-7 w-48 bg-[#F5E6C8]/10 rounded-lg mb-6 animate-pulse" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#2C2210] rounded-xl p-5 h-44 animate-pulse"
                  style={{ animationDelay: `${(si * 6 + i) * 40}ms` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
