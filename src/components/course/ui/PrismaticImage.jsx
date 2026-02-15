import { useRef, useCallback, useEffect, useMemo } from 'react';

/**
 * PrismaticImage — creates a luxury "Low Poly" diamond-shine effect.
 *
 * Features:
 * - SVG triangle mesh overlay with cursor-tracking spotlight
 * - Auto-Shine every 4s with synchronized zoom + border glow
 * - Pure CSS zoom on hover (1s ease-out)
 * - Neon border on hover
 */

// Grid configuration

const COLS = 8;
const ROWS = 5;
const JITTER = -1;

export default function PrismaticImage({ src, alt }) {
    const wrapperRef = useRef(null);
    const overlayRef = useRef(null);
    const glareRef = useRef(null);
    const imgRef = useRef(null);
    const borderRef = useRef(null);

    const isHovering = useRef(false);

    // Generate the triangle mesh once
    const facets = useMemo(() => {
        const points = [];
        const cellW = 100 / COLS;
        const cellH = 100 / ROWS;

        for (let r = 0; r <= ROWS; r++) {
            const rowPoints = [];
            for (let c = 0; c <= COLS; c++) {
                let x = c * cellW;
                let y = r * cellH;
                if (r > 0 && r < ROWS && c > 0 && c < COLS) {
                    x += (Math.random() - 0.5) * JITTER;
                    y += (Math.random() - 0.5) * JITTER;
                }
                x = Math.max(0, Math.min(100, x));
                y = Math.max(0, Math.min(100, y));
                rowPoints.push({ x, y });
            }
            points.push(rowPoints);
        }
        const shapeData = [];
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const p1 = points[r][c];
                const p2 = points[r][c + 1];
                const p3 = points[r + 1][c + 1];
                const p4 = points[r + 1][c];

                if (Math.random() > 0.5) {
                    shapeData.push({ points: `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`, opacity: 0.1 + Math.random() * 0.45, key: `t-${r}-${c}-a` });
                    shapeData.push({ points: `${p1.x},${p1.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`, opacity: 0.1 + Math.random() * 0.45, key: `t-${r}-${c}-b` });
                } else {
                    shapeData.push({ points: `${p1.x},${p1.y} ${p2.x},${p2.y} ${p4.x},${p4.y}`, opacity: 0.1 + Math.random() * 0.45, key: `t-${r}-${c}-c` });
                    shapeData.push({ points: `${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`, opacity: 0.1 + Math.random() * 0.45, key: `t-${r}-${c}-d` });
                }
            }
        }
        return shapeData;
    }, []);

    /* ---- Auto-Shine with synchronized zoom + border ---- */
    useEffect(() => {
        let timeoutId;
        let shineAnimId;

        const cleanupShine = () => {
            if (overlayRef.current) overlayRef.current.style.opacity = '';
            if (glareRef.current) glareRef.current.style.opacity = '';

            // Return to permanent zoom
            if (imgRef.current) {
                imgRef.current.style.transform = 'scale(1.03)';
            }
            // Return to permanent border glow
            if (borderRef.current) {
                borderRef.current.style.borderColor = 'rgba(52, 211, 153, 0.3)';
                borderRef.current.style.boxShadow = '0 0 20px -5px rgba(52, 211, 153, 0.2)';
            }
        };

        const triggerShine = () => {
            const startT = performance.now();
            const duration = 5000; // Double duration (5s)

            // Randomize direction
            const paths = [
                { sX: -50, sY: -50, eX: 150, eY: 150 }, // TL to BR
                { sX: 150, sY: -50, eX: -50, eY: 150 }, // TR to BL
                { sX: 50, sY: -50, eX: 50, eY: 150 },   // T to B
                { sX: -50, sY: 50, eX: 150, eY: 50 },   // L to R
                { sX: 150, sY: 150, eX: -50, eY: -50 }  // BR to TL
            ];
            const path = paths[Math.floor(Math.random() * paths.length)];

            // Activate layers
            if (overlayRef.current) overlayRef.current.style.opacity = '1';
            if (glareRef.current) glareRef.current.style.opacity = '1';

            // Zoom IN
            if (imgRef.current) {
                imgRef.current.style.transform = 'scale(1.06)';
            }

            // Border glow ON
            if (borderRef.current) {
                borderRef.current.style.borderColor = 'rgba(52, 211, 153, 0.4)';
                borderRef.current.style.boxShadow = '0 0 30px -5px rgba(52, 211, 153, 0.3)';
            }

            const animateShine = (now) => {
                const elapsed = now - startT;
                const progress = Math.min(elapsed / duration, 1);

                // Ease Quartic Out
                const ease = 1 - Math.pow(1 - progress, 4);

                const curX = path.sX + (path.eX - path.sX) * ease;
                const curY = path.sY + (path.eY - path.sY) * ease;

                if (overlayRef.current) {
                    const gradient = `radial-gradient(circle 400px at ${curX}% ${curY}%, black, transparent)`;
                    overlayRef.current.style.maskImage = gradient;
                    overlayRef.current.style.webkitMaskImage = gradient;
                }

                if (wrapperRef.current) {
                    wrapperRef.current.style.setProperty('--mx', `${curX}%`);
                    wrapperRef.current.style.setProperty('--my', `${curY}%`);
                }

                // Fade border glow back to base state
                if (borderRef.current) {
                    const borderIntensity = progress < 0.4
                        ? (progress / 0.4)
                        : 1 - ((progress - 0.4) / 0.6);
                    const glow = 0.3 + (borderIntensity * 0.4); // Start from 0.3 base
                    borderRef.current.style.borderColor = `rgba(52, 211, 153, ${glow.toFixed(3)})`;
                    borderRef.current.style.boxShadow = `0 0 ${(15 + borderIntensity * 30).toFixed(0)}px -5px rgba(52, 211, 153, ${(glow * 0.8).toFixed(3)})`;
                }

                if (progress < 1) {
                    shineAnimId = requestAnimationFrame(animateShine);
                } else {
                    cleanupShine();
                    scheduleNext();
                }
            };

            shineAnimId = requestAnimationFrame(animateShine);
        };

        const scheduleNext = () => {
            const delay = 2000;
            timeoutId = setTimeout(triggerShine, delay);
        };

        scheduleNext();

        return () => {
            clearTimeout(timeoutId);
            cancelAnimationFrame(shineAnimId);
        };
    }, []);

    return (
        <div className="my-16 relative z-10">
            <div
                ref={wrapperRef}
                className="relative cursor-default rounded-2xl overflow-hidden"
            >
                {/* 1. Base Image — Permanent zoom (1.03x) */}
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    className="w-full object-cover max-h-[500px] rounded-2xl shadow-xl shadow-black/50 border border-white/5"
                    style={{
                        transition: 'transform 2s ease-in-out',
                        transform: 'scale(1.03)',
                    }}
                    loading="lazy"
                />

                {/* 2. Prismatic Overlay — Only visible during auto-shine */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 pointer-events-none"
                    style={{
                        mixBlendMode: 'overlay',
                        maskImage: 'radial-gradient(circle at 50% 50%, black, transparent)',
                        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black, transparent)'
                    }}
                >
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="w-full h-full"
                    >
                        {facets.map((f) => (
                            <polygon
                                key={f.key}
                                points={f.points}
                                fill="white"
                                fillOpacity={f.opacity}
                                stroke="white"
                                strokeWidth="0.1"
                                strokeOpacity="0.2"
                            />
                        ))}
                    </svg>
                </div>

                {/* 3. Auto Glare */}
                <div
                    ref={glareRef}
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-700"
                    style={{
                        background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.2) 0%, transparent 50%)',
                        mixBlendMode: 'soft-light'
                    }}
                />

                {/* 4. Neon Border — PERMANENT GLOW (No Hover) */}
                <div
                    ref={borderRef}
                    className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-700
                        border border-emerald-400/30 shadow-[0_0_20px_-5px_rgba(52,211,153,0.2)]"
                />
            </div>

            {alt && (
                <p className="text-center text-slate-500 text-sm mt-4 italic transition-colors duration-300">
                    {alt}
                </p>
            )}
        </div>
    );
}
