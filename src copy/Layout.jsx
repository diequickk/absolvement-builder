import React from "react";
import OilBackground from "./components/OilBackground";

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen relative" style={{ background: '#000', fontFamily: "'Georgia', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cinzel+Decorative:wght@400;700;900&display=swap');

        :root {
          --silver: #c8c8d0;
          --silver-light: #e8e8f0;
          --silver-dark: #888898;
          --gold: #b8a060;
        }

        body {
          background: #000;
        }

        /* Animated silk/smoke background */
        .abs-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .abs-bg::before {
          content: '';
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          background:
            radial-gradient(ellipse 80% 60% at 20% 30%, rgba(60,60,70,0.55) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 70%, rgba(40,40,50,0.5) 0%, transparent 60%),
            radial-gradient(ellipse 100% 100% at 50% 50%, rgba(30,30,38,0.8) 0%, #000 70%);
          animation: silkDrift 18s ease-in-out infinite alternate;
        }

        .abs-bg::after {
          content: '';
          position: absolute;
          inset: -30%;
          width: 160%;
          height: 160%;
          background:
            radial-gradient(ellipse 70% 50% at 70% 20%, rgba(80,80,90,0.3) 0%, transparent 55%),
            radial-gradient(ellipse 50% 70% at 30% 80%, rgba(50,50,60,0.35) 0%, transparent 55%);
          animation: silkDrift2 22s ease-in-out infinite alternate;
        }

        @keyframes silkDrift {
          0%   { transform: translate(0%, 0%) rotate(0deg) scale(1); }
          33%  { transform: translate(-3%, 2%) rotate(1deg) scale(1.03); }
          66%  { transform: translate(2%, -3%) rotate(-1deg) scale(0.98); }
          100% { transform: translate(-1%, 1%) rotate(0.5deg) scale(1.02); }
        }
        @keyframes silkDrift2 {
          0%   { transform: translate(0%, 0%) rotate(0deg); }
          50%  { transform: translate(4%, -4%) rotate(-2deg); }
          100% { transform: translate(-2%, 3%) rotate(1deg); }
        }

        /* Title font */
        .abs-title {
          font-family: 'Cinzel Decorative', 'Cinzel', serif;
          letter-spacing: 0.18em;
          color: #fff;
          text-shadow:
            0 0 20px rgba(255,255,255,0.6),
            0 0 60px rgba(255,255,255,0.2),
            2px 2px 4px rgba(0,0,0,0.9);
          font-weight: 700;
        }

        /* Silver ornamental frame */
        .abs-frame {
          position: relative;
          display: inline-block;
          padding: 0 2rem;
        }
        .abs-frame::before,
        .abs-frame::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--silver-light), #fff, var(--silver-light), transparent);
        }
        .abs-frame::before { top: 0; }
        .abs-frame::after  { bottom: 0; }

        /* Diamond ornament */
        .abs-diamond {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: var(--silver-light);
          transform: rotate(45deg);
          box-shadow: 0 0 6px rgba(255,255,255,0.8);
        }

        /* Ornamental horizontal rule */
        .abs-rule {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          max-width: 420px;
          margin: 0 auto;
        }
        .abs-rule-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--silver), transparent);
        }

        /* Nav tabs override */
        [role="tablist"] {
          background: rgba(0,0,0,0.6) !important;
          border: 1px solid rgba(200,200,208,0.15) !important;
          border-radius: 4px !important;
        }
        [role="tab"] {
          font-family: 'Cinzel', serif !important;
          letter-spacing: 0.08em !important;
          font-size: 0.7rem !important;
          color: #666 !important;
          transition: all 0.2s !important;
        }
        [role="tab"][data-state="active"] {
          background: rgba(200,200,208,0.12) !important;
          color: #e8e8f0 !important;
          border: 1px solid rgba(200,200,208,0.25) !important;
          text-shadow: 0 0 10px rgba(255,255,255,0.3) !important;
        }

        /* Card overrides */
        .rounded-xl, .rounded-lg {
          border-radius: 3px !important;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }

        /* Button overrides */
        button.bg-white, button.bg-white:hover {
          background: rgba(220,220,228,0.9) !important;
          color: #000 !important;
          font-family: 'Cinzel', serif !important;
          letter-spacing: 0.1em !important;
          font-size: 0.75rem !important;
          border-radius: 2px !important;
        }

        /* Input override */
        input {
          font-family: 'Cinzel', serif !important;
          letter-spacing: 0.05em !important;
          font-size: 0.8rem !important;
          border-radius: 2px !important;
        }
      `}</style>

      {/* Animated oil/fluid background */}
      <OilBackground />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}