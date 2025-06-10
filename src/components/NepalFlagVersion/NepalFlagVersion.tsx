"use client"

interface ColorfulNepalFlagProps {
  version?: string
  size?: "sm" | "md" | "lg"
  className?: string
  showSideVersion?: boolean
}

export default function NepalFlagVersion({
  version = "v1.0.0",
  size = "md",
  className = "",
  showSideVersion = true,
}: ColorfulNepalFlagProps) {
  // Size classes mapping
  const sizeClasses = {
    sm: "h-12 w-10",
    md: "h-16 w-14",
    lg: "h-20 w-18",
  }

  const textSizes = {
    sm: "text-[8px]",
    md: "text-[10px]",
    lg: "text-xs",
  }

  const sideVersionSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className={`relative flex items-center gap-4 ${className}`}>
      {/* Flag Container with colorful shadow */}
      <div className={`relative ${sizeClasses[size]} drop-shadow-2xl`}>
        <div className="relative h-full w-full">
          {/* Upper Triangle with gradient */}
          <div className="relative w-full h-1/2">
            <div
              className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-700 shadow-lg shadow-red-500/50"
              style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            >
              {/* Colorful Blue Border with glow */}
              <div
                className="absolute inset-0 border-2 border-blue-600 shadow-lg shadow-blue-500/30"
                style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
              />

              {/* Glowing Moon Symbol */}
              <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-gradient-to-br from-white to-gray-100 rounded-full shadow-lg shadow-white/50">
                <div className="absolute top-0.5 left-1 w-3 h-3 bg-gradient-to-br from-red-500 to-red-700 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Lower Triangle with gradient */}
          <div className="relative w-full h-1/2">
            <div
              className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-700 shadow-lg shadow-red-500/50"
              style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            >
              {/* Colorful Blue Border with glow */}
              <div
                className="absolute inset-0 border-2 border-blue-600 shadow-lg shadow-blue-500/30"
                style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
              />

              {/* Glowing Sun Symbol with Version */}
              <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-gradient-to-br from-yellow-200 via-white to-yellow-100 rounded-full flex items-center justify-center shadow-lg shadow-yellow-300/50">
                {/* Colorful sun rays */}
                <div className="absolute inset-0">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
                    <div
                      key={angle}
                      className={`absolute w-0.5 h-2 top-0 left-1/2 origin-bottom ${index % 2 === 0
                        ? "bg-gradient-to-t from-yellow-400 to-yellow-200"
                        : "bg-gradient-to-t from-orange-400 to-yellow-300"
                        }`}
                      style={{
                        transform: `translateX(-50%) rotate(${angle}deg)`,
                        transformOrigin: "50% 100%",
                      }}
                    />
                  ))}
                </div>

                {/* Center circle with colorful version */}
                <div className="relative z-10 w-4 h-4 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full flex items-center justify-center shadow-inner">
                  <span className={`${textSizes[size]} font-bold text-white leading-none drop-shadow-sm`}>
                    {version}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Colorful flag pole with gradient */}
        <div className="absolute top-0 -left-1 w-0.5 h-full bg-gradient-to-b from-gray-400 via-gray-600 to-gray-800 shadow-sm"></div>
      </div>

      {/* Colorful Side Version Display with Rainbow Blinking */}
      {showSideVersion && (
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-start space-y-1">
            {/* Colorful version text with rainbow animation */}
            <div className="relative">
              <span
                className={`${sideVersionSizes[size]} font-mono font-bold`}
              >
                {version}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-black-900 opacity-20 blur-sm animate-pulse"></div>
            </div>

            {/* Colorful status indicators */}
            <div className="flex items-center gap-2">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping shadow-lg shadow-green-400/50"></div>
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping animation-delay-75 shadow-lg shadow-blue-400/50"></div>
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping animation-delay-150 shadow-lg shadow-purple-400/50"></div>
              </div>
              <span className="text-xs font-medium bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Live
              </span>
            </div>

            {/* Colorful build status */}
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-sm shadow-green-400/50"></div>
              <span className="text-xs text-emerald-600 font-medium">Stable</span>
            </div>
          </div>

          {/* Colorful decorative elements */}
          <div className="flex flex-col space-y-1">
            <div className="w-1 h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse animation-delay-75"></div>
            <div className="w-1 h-1 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full animate-pulse animation-delay-150"></div>
          </div>
        </div>
      )}
    </div>
  )
}



