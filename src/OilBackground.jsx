import { useEffect, useRef } from 'react'

// ---------------------------------------------------------------------------
// OilBackground — animated canvas shader simulating silk fabric light.
// Pure canvas, zero dependencies. Drop it anywhere and it tiles to fill
// the viewport via position:fixed. No props required.
// ---------------------------------------------------------------------------
export default function OilBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let animId
    let t = 0

    // Render at 50% res and CSS-scale up — halves pixel count for big perf win.
    const SCALE = 0.5
    const resize = () => {
      canvas.width        = window.innerWidth  * SCALE
      canvas.height       = window.innerHeight * SCALE
      canvas.style.width  = window.innerWidth  + 'px'
      canvas.style.height = window.innerHeight + 'px'
    }
    resize()
    window.addEventListener('resize', resize)

    // Layered sine "noise" — simulates a silk fold height field.
    function foldHeight(x, y, time) {
      const nx = x / canvas.width
      const ny = y / canvas.height
      let v = 0
      // Large slow folds
      v += Math.sin(nx * 3.1 + time * 0.28 + Math.cos(ny * 2.0 + time * 0.18) * 1.2) * 0.45
      v += Math.sin(ny * 2.7 + time * 0.22 + Math.cos(nx * 3.5 + time * 0.15) * 1.0) * 0.35
      // Medium folds
      v += Math.sin(nx * 6.2 + ny * 4.1 + time * 0.35) * 0.12
      v += Math.cos(nx * 4.8 - ny * 5.3 + time * 0.31) * 0.10
      // Fine surface ripples
      v += Math.sin(nx * 11.0 + time * 0.55 + ny * 7.0) * 0.04
      return v  // range ≈ [-1, 1]
    }

    function draw() {
      const W = canvas.width
      const H = canvas.height
      if (!W || !H) { animId = requestAnimationFrame(draw); return }
      t += 0.012

      const imageData = ctx.createImageData(W, H)
      const data      = imageData.data

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const v = foldHeight(x, y, t)
          const n = (v + 1) * 0.5  // normalise to [0, 1]

          // Dark charcoal base
          const base  = 10 + n * 30

          // Sharp specular highlight at fold ridge
          const spec  = Math.max(0, 1 - Math.abs(n - 0.72) / 0.09)
          const specV = spec * spec * 110

          // Softer secondary highlight
          const spec2  = Math.max(0, 1 - Math.abs(n - 0.58) / 0.14)
          const spec2V = spec2 * spec2 * 40

          const lum = Math.min(255, base + specV + spec2V)
          const idx = (y * W + x) * 4

          // Slight cool (blue-grey) tint to match the reference palette
          data[idx]     = lum * 0.85   // R
          data[idx + 1] = lum * 0.88   // G
          data[idx + 2] = lum * 0.98   // B
          data[idx + 3] = 255
        }
      }

      ctx.putImageData(imageData, 0, 0)
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  )
}
