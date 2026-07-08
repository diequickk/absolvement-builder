import { useEffect, useRef } from "react";

export default function OilBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    let animId;
    let t = 0;
    let isHidden = false;
    let lastFrameTime = 0;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    const targetFps = prefersReducedMotion ? 1 : 24;
    const frameInterval = 1000 / targetFps;

    let xNorm = [];
    let yNorm = [];

    const resize = () => {
      // Keep the visual effect but render on a smaller internal canvas for speed.
      const scale = window.innerWidth < 768 ? 0.26 : 0.32;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.floor(window.innerWidth * scale * ratio));
      const h = Math.max(1, Math.floor(window.innerHeight * scale * ratio));

      canvas.width = w;
      canvas.height = h;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';

      xNorm = Array.from({ length: canvas.width }, (_, x) => x / canvas.width);
      yNorm = Array.from({ length: canvas.height }, (_, y) => y / canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onVisibilityChange = () => {
      isHidden = document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Compute a noise-like value using layered sines — simulates silk fold height
    function foldHeight(nx, ny, time) {
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

    function drawFrame() {
      const W = canvas.width;
      const H = canvas.height;
      if (!W || !H) return;
      t += 0.01;

      const imageData = ctx.createImageData(W, H);
      const data = imageData.data;

      for (let y = 0; y < H; y++) {
        const ny = yNorm[y] ?? 0;
        for (let x = 0; x < W; x++) {
          const nx = xNorm[x] ?? 0;
          const v = foldHeight(nx, ny, t);
          const n = (v + 1) * 0.5;

          const base = 10 + n * 30;
          const spec = Math.max(0, 1 - Math.abs(n - 0.72) / 0.09);
          const specVal = spec * spec * 110;
          const spec2 = Math.max(0, 1 - Math.abs(n - 0.58) / 0.14);
          const spec2Val = spec2 * spec2 * 40;

          let lum = base + specVal + spec2Val;
          lum = Math.min(255, lum);

          const idx = (y * W + x) * 4;
          data[idx]     = lum * 0.85;  // R
          data[idx + 1] = lum * 0.88;  // G
          data[idx + 2] = lum * 0.98;  // B
          data[idx + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    }

    function animate(now) {
      if (!isHidden && now - lastFrameTime >= frameInterval) {
        lastFrameTime = now;
        drawFrame();
      }

      animId = requestAnimationFrame(animate);
    }

    drawFrame();
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
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