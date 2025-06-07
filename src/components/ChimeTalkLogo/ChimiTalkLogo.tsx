import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Camera, Sparkles, Zap } from "lucide-react";
import "../../styles/components/ChimeTalkLogo.css";


interface ChimeTalkLogoProps {
  variant?: "full" | "icon" | "text" | "compact"
  size?: "sm" | "md" | "lg" | "xl"
  animated?: boolean
  theme?: "light" | "dark"
  className?: string
  interactive?: boolean
}

const sizeMap = {
  sm: { width: 120, height: 40, iconSize: 32 },
  md: { width: 180, height: 60, iconSize: 48 },
  lg: { width: 240, height: 80, iconSize: 64 },
  xl: { width: 320, height: 100, iconSize: 80 },
}

export function ChimeTalkLogo({
  variant = "full",
  size = "md",
  animated = true,
  theme = "dark",
  className = "",
  interactive = true,
}: ChimeTalkLogoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [randomConnections, setRandomConnections] = useState<
    Array<{ id: number; x1: number; y1: number; x2: number; y2: number; delay: number; duration: number }>
  >([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dimensions = sizeMap[size]
  const iconSize = dimensions.iconSize
  const canvasSize = iconSize * 1.5

  const colors = {
    primary: "#1b84fc",
    secondary: "#df007e",
    text: theme === "dark" ? "#f0f2f5" : "#191833",
    accent: theme === "dark" ? "#dae9f0" : "#51516a",
    gradient1: "rgba(27, 132, 252, 0.8)",
    gradient2: "rgba(223, 0, 126, 0.8)",
  }

  // Generate random connections for the animation
  useEffect(() => {
    if (animated) {
      const connections = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x1: Math.random() * canvasSize,
        y1: Math.random() * canvasSize,
        x2: Math.random() * canvasSize,
        y2: Math.random() * canvasSize,
        delay: Math.random() * 2,
        duration: 1 + Math.random() * 2,
      }))
      setRandomConnections(connections)
    }
  }, [animated, canvasSize])

  // Canvas animation for the advanced logo
  useEffect(() => {
    if (!animated || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      decay: number
    }> = []

    const createParticles = () => {
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: canvasSize / 2 + (Math.random() - 0.5) * 20,
          y: canvasSize / 2 + (Math.random() - 0.5) * 20,
          size: 1 + Math.random() * 3,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: Math.random() > 0.5 ? colors.primary : colors.secondary,
          alpha: 1,
          decay: 0.01 + Math.random() * 0.02,
        })
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvasSize, canvasSize)

      // Draw the circular gradient background
      const gradient = ctx.createRadialGradient(
        canvasSize / 2,
        canvasSize / 2,
        0,
        canvasSize / 2,
        canvasSize / 2,
        canvasSize / 2,
      )
      gradient.addColorStop(0, "rgba(25, 24, 51, 0)")
      gradient.addColorStop(1, "rgba(25, 24, 51, 0.2)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvasSize, canvasSize)

      // Draw random connection lines
      randomConnections.forEach((connection, index) => {
        const time = (Date.now() / 1000 + connection.delay) % connection.duration
        const progress = time / connection.duration

        // Calculate dynamic positions
        const x1 = connection.x1 + Math.sin(time * 2) * 10
        const y1 = connection.y1 + Math.cos(time * 2) * 10
        const x2 = connection.x2 + Math.sin(time * 2 + Math.PI) * 10
        const y2 = connection.y2 + Math.cos(time * 2 + Math.PI) * 10

        // Draw the connection line with gradient
        const lineGradient = ctx.createLinearGradient(x1, y1, x2, y2)
        lineGradient.addColorStop(0, colors.gradient1)
        lineGradient.addColorStop(1, colors.gradient2)

        ctx.beginPath()
        ctx.moveTo(x1, y1)

        // Create a curved line
        const midX = (x1 + x2) / 2 + Math.sin(time * 3) * 20
        const midY = (y1 + y2) / 2 + Math.cos(time * 3) * 20
        ctx.quadraticCurveTo(midX, midY, x2, y2)

        ctx.strokeStyle = lineGradient
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Draw pulsing dots at the endpoints
        const dotSize = 3 + Math.sin(time * 4) * 1

        ctx.beginPath()
        ctx.arc(x1, y1, dotSize, 0, Math.PI * 2)
        ctx.fillStyle = index % 2 === 0 ? colors.primary : colors.secondary
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x2, y2, dotSize, 0, Math.PI * 2)
        ctx.fillStyle = index % 2 === 0 ? colors.secondary : colors.primary
        ctx.fill()
      })

      // Draw and update particles
      particles.forEach((particle, index) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()

        // Update particle position
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.alpha -= particle.decay

        // Remove faded particles
        if (particle.alpha <= 0) {
          particles.splice(index, 1)
        }
      })

      // Add new particles occasionally
      if (Math.random() < 0.1 && isAnimating) {
        createParticles()
      }

      // Draw central camera icon
      const cameraSize = iconSize * 0.4
      ctx.beginPath()
      ctx.arc(canvasSize / 2, canvasSize / 2, cameraSize, 0, Math.PI * 2)
      const cameraGradient = ctx.createRadialGradient(
        canvasSize / 2,
        canvasSize / 2,
        0,
        canvasSize / 2,
        canvasSize / 2,
        cameraSize,
      )
      cameraGradient.addColorStop(0, colors.gradient2)
      cameraGradient.addColorStop(1, colors.gradient1)
      ctx.fillStyle = cameraGradient
      ctx.fill()

      // Draw camera lens
      ctx.beginPath()
      ctx.arc(canvasSize / 2, canvasSize / 2, cameraSize * 0.6, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)"
      ctx.fill()

      // Draw camera highlight
      ctx.beginPath()
      ctx.arc(canvasSize / 2 - cameraSize * 0.2, canvasSize / 2 - cameraSize * 0.2, cameraSize * 0.15, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)"
      ctx.fill()

      // Draw outer ring
      ctx.beginPath()
      ctx.arc(canvasSize / 2, canvasSize / 2, iconSize / 2, 0, Math.PI * 2)
      ctx.strokeStyle = `${colors.primary}${Math.floor((0.5 + Math.sin(Date.now() / 1000) * 0.3) * 255)
        .toString(16)
        .padStart(2, "0")}`
      ctx.lineWidth = 2
      ctx.stroke()

      animationFrameId = requestAnimationFrame(render)
    }

    setIsAnimating(true)
    createParticles()
    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      setIsAnimating(false)
    }
  }, [animated, canvasSize, isAnimating, randomConnections])

  // Text component with advanced styling
  const LogoText = ({ compact = false }: { compact?: boolean }) => {
    return (
      <div className={`chime-logo-text-container ${animated ? "chime-logo-text-animated" : ""}`}>
        <div className="chime-logo-text" style={{ color: colors.text }}>
          <span className="chime-logo-chime">
            <span className="chime-logo-c">C</span>
            <span className="chime-logo-h">h</span>
            <span className="chime-logo-i">i</span>
            <span className="chime-logo-m">m</span>
            <span className="chime-logo-e">e</span>
          </span>
          {!compact && <span className="chime-logo-separator">-</span>}
          <span className="chime-logo-talk" style={{ color: colors.secondary }}>
            {compact ? "T" : "Talk"}
          </span>
        </div>
        {/* <div className="chime-logo-tagline">Random Video Calls</div> */}
      </div>
    )
  }

  return (
    <div
      className={`chime-logo ${className} chime-logo-${variant} chime-logo-${size} ${animated ? "chime-logo-animated" : ""}`}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      style={{ width: variant === "icon" ? iconSize : dimensions.width }}
    >
      {(variant === "full" || variant === "icon" || variant === "compact") && (
        <div
          className={`chime-logo-icon-container ${isHovered ? "chime-logo-icon-hovered" : ""}`}
          style={{ width: iconSize, height: iconSize }}
        >
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            className="chime-logo-canvas"
            style={{ width: iconSize, height: iconSize }}
          />
          <div className="chime-logo-icon-overlay">
            <div className="chime-logo-icon-pulse"></div>
            <div className="chime-logo-icon-pulse chime-logo-icon-pulse-2"></div>
            <div className="chime-logo-icon-center">
              <Camera size={iconSize * 0.3} className="chime-logo-camera-icon" />
            </div>
          </div>
          <div className="chime-logo-connection-dots">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="chime-logo-connection-dot"
                style={{
                  left: `${50 + 35 * Math.cos((i * Math.PI * 2) / 6)}%`,
                  top: `${50 + 35 * Math.sin((i * Math.PI * 2) / 6)}%`,
                  animationDelay: `${i * 0.2}s`,
                  background: i % 2 === 0 ? colors.primary : colors.secondary,
                }}
              />
            ))}
          </div>
          <div className="chime-logo-random-flash"></div>
        </div>
      )}

      {(variant === "full" || variant === "text" || variant === "compact") && (
        <LogoText compact={variant === "compact"} />
      )}

      {/* Animated connection lines */}
      {animated && (variant === "full" || variant === "compact") && (
        <div className="chime-logo-connection-lines">
          <div className="chime-logo-connection-line chime-logo-connection-line-1"></div>
          <div className="chime-logo-connection-line chime-logo-connection-line-2"></div>
        </div>
      )}

      {/* Random connection effect */}
      {isHovered && interactive && (
        <div className="chime-logo-random-effect">
          <Zap className="chime-logo-random-icon" />
          <Sparkles className="chime-logo-sparkle-icon" />
        </div>
      )}
    </div>
  )
}

// Animated 3D version for special use cases
export function ChimeTalkLogo3D({ size = "lg" }: { size?: "md" | "lg" | "xl" }) {
  const dimensions = sizeMap[size]
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRotation({ x: y * 20, y: x * 20 })
  }

  return (
    <div
      ref={containerRef}
      className="chime-logo-3d-container"
      style={{ width: dimensions.width, height: dimensions.width }}
      onMouseMove={handleMouseMove}
    >
      <div
        className="chime-logo-3d"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <div className="chime-logo-3d-front">
          <ChimeTalkLogo variant="full" size={size} animated interactive={false} />
        </div>
        <div className="chime-logo-3d-back"></div>
        <div className="chime-logo-3d-top"></div>
        <div className="chime-logo-3d-bottom"></div>
        <div className="chime-logo-3d-left"></div>
        <div className="chime-logo-3d-right"></div>
      </div>
    </div>
  )
}

// Animated logo for loading screens
export function ChimeTalkLogoLoader({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dimensions = sizeMap[size]
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="chime-logo-loader-container" style={{ width: dimensions.width }}>
      <ChimeTalkLogo variant="icon" size={size} animated />
      <div className="chime-logo-loader-bar">
        <div className="chime-logo-loader-progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="chime-logo-loader-text">Connecting to random calls...</div>
    </div>
  )
}
