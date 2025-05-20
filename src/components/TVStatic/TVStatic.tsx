

import { useEffect, useRef } from "react"

export function TVStatic() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Animation variables
    let animationId: number

    // Draw TV static with color tint
    const drawStatic = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create static effect
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      // Add some larger "chunks" of static for more visual interest
      const chunkSize = 4 // Size of static chunks
      const chunkProbability = 0.02 // Probability of a chunk appearing

      for (let y = 0; y < canvas.height; y += chunkSize) {
        for (let x = 0; x < canvas.width; x += chunkSize) {
          // Determine if this should be a chunk
          const isChunk = Math.random() < chunkProbability

          // Calculate base index for this pixel
          const baseIdx = (y * canvas.width + x) * 4

          // Create a random value for this chunk or pixel
          const value = Math.floor(Math.random() * 100) + 155 // Brighter static

          // Apply color tint to some pixels (purple/pink hue from the theme)
          const r = value
          const g = Math.max(0, value - 80) // Reduce green for purple tint
          const b = Math.min(255, value + 20) // Increase blue for purple tint

          // If it's a chunk, fill a square
          if (isChunk) {
            for (let cy = 0; cy < chunkSize && y + cy < canvas.height; cy++) {
              for (let cx = 0; cx < chunkSize && x + cx < canvas.width; cx++) {
                const idx = ((y + cy) * canvas.width + (x + cx)) * 4
                data[idx] = r
                data[idx + 1] = g
                data[idx + 2] = b
                data[idx + 3] = 180 // Semi-transparent
              }
            }
          } else {
            // Just set this pixel
            data[baseIdx] = r
            data[baseIdx + 1] = g
            data[baseIdx + 2] = b
            data[baseIdx + 3] = 120 // More transparent for regular static
          }
        }
      }

      ctx.putImageData(imageData, 0, 0)

      // Add scan lines
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 1)
      }

      // Add a subtle vignette effect
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 1.5,
      )
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.7)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationId = requestAnimationFrame(drawStatic)
    }

    // Start animation
    drawStatic()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ filter: "contrast(1.2) brightness(1.1) saturate(1.2)" }}
    />
  )
}
