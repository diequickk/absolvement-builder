import { useEffect, useRef } from "react";

export default function OilBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    const resize = () => {
      // Reduce resolution by 4x for better performance
      const scale = 0.5;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };
    resize();
    window.addEventListener("resize", resize);

    // Compute a noise-like value using layered sines — simulates silk fold height
    function foldHeight(x, y, time) {
      const nx = x / canvas.width;
      const ny = y / canvas.height;
      let v = 0;
      // Large slow folds
      v += Math.sin(nx * 3.1 + time * 0.28 + Math.cos(ny * 2.0 + time * 0.18) * 1.2) * 0.45;
      v += Math.sin(ny * 2.7 + time * 0.22 + Math.cos(nx * 3.5 + time * 0.15) * 1.0) * 0.35;
      // Medium folds
      v += Math.sin(nx * 6.2 + ny * 4.1 + time * 0.35) * 0.12;
      v += Math.cos(nx * 4.8 - ny * 5.3 + time * 0.31) * 0.10;
      // Fine surface ripples
      v += Math.sin(nx * 11.0 + time * 0.55 + ny * 7.0) * 0.04;
      return v; // range roughly -1 to 1
    }

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      if (!W || !H) { animId = requestAnimationFrame(draw); return; }
      t += 0.012;

      const imageData = ctx.createImageData(W, H);
      const data = imageData.data;

      // Sample at reduced resolution for performance, then we'll upscale
      // Actually do full res but optimise math
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const v = foldHeight(x, y, t);

          // v roughly in [-1, 1]. Map to a silk highlight:
          // Dark base with bright specular highlights where v is high (fold ridge)
          // and deep shadow where v is low (fold valley)

          // Normalise 0..1
          const n = (v + 1) * 0.5;

          // Base darkness (very dark charcoal)
          let base = 10 + n * 30; // 10-40

          // Specular highlight: sharp bright band near n ~ 0.72
          const spec = Math.max(0, 1 - Math.abs(n - 0.72) / 0.09);
          const specVal = spec * spec * 110;

          // Secondary softer highlight
          const spec2 = Math.max(0, 1 - Math.abs(n - 0.58) / 0.14);
          const spec2Val = spec2 * spec2 * 40;

          let lum = base + specVal + spec2Val;
          lum = Math.min(255, lum);

          const idx = (y * W + x) * 4;
          // Very slight cool tint (blueish-grey) like the reference image
          data[idx]     = lum * 0.85;  // R
          data[idx + 1] = lum * 0.88;  // G
          data[idx + 2] = lum * 0.98;  // B
          data[idx + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}