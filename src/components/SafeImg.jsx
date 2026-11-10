import { useState } from 'react'

// Image with a leather-toned shimmer placeholder and graceful fallback.
export default function SafeImg({ src, alt = '', className = '', ...rest }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  return (
    <div className="relative h-full w-full overflow-hidden bg-sand">
      {!loaded && !failed && (
        <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,#efe4d3,45%,#faf5ee,55%,#efe4d3)] bg-[length:200%_100%]" />
      )}
      {failed ? (
        <div className="leather-grain absolute inset-0 flex items-center justify-center bg-leather text-xs uppercase tracking-widest text-tan">
          Poshfera
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          {...rest}
        />
      )}
    </div>
  )
}
