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
            // Zoom out (CSS transition handles the smoothness)
            if (imgRef.current && !isHovering.current) {
                imgRef.current.style.transform = 'scale(1)';
            }
            // Border glow off
            if (borderRef.current && !isHovering.current) {
                borderRef.current.style.borderColor = '';
                borderRef.current.style.boxShadow = '';
            }
        };

        const triggerShine = () => {
            if (isHovering.current) {
                scheduleNext();
                return;
            }

            const startT = performance.now();
            const duration = 3500;

            // Activate layers
            if (overlayRef.current) overlayRef.current.style.opacity = '1';
            if (glareRef.current) glareRef.current.style.opacity = '1';

            // Zoom IN (CSS transition handles the smoothness — 1s ease-out)
            if (imgRef.current) {
                imgRef.current.style.transform = 'scale(1.03)';
            }

            // Border glow ON
            if (borderRef.current) {
                borderRef.current.style.borderColor = 'rgba(52, 211, 153, 0.5)';
                borderRef.current.style.boxShadow = '0 0 40px -5px rgba(52, 211, 153, 0.4)';
            }

            const animateShine = (now) => {
                if (isHovering.current) {
                    cleanupShine();
                    return;
                }

                const elapsed = now - startT;
                const progress = Math.min(elapsed / duration, 1);

                // Ease Quartic Out
                const ease = 1 - Math.pow(1 - progress, 4);
                const pos = -50 + (ease * 200);

                if (overlayRef.current) {
                    const gradient = `radial-gradient(circle 400px at ${pos}% ${pos}%, black, transparent)`;
                    overlayRef.current.style.maskImage = gradient;
                    overlayRef.current.style.webkitMaskImage = gradient;
                }

                if (wrapperRef.current) {
                    wrapperRef.current.style.setProperty('--mx', `${pos}%`);
                    wrapperRef.current.style.setProperty('--my', `${pos}%`);
                }

                // Fade border glow with progress (peaks at ~40% then fades)
                if (borderRef.current) {
                    const borderIntensity = progress < 0.4
                        ? (progress / 0.4)           // ramp up
                        : 1 - ((progress - 0.4) / 0.6); // ramp down
                    const glow = borderIntensity * 0.5;
                    borderRef.current.style.borderColor = `rgba(52, 211, 153, ${glow.toFixed(3)})`;
                    borderRef.current.style.boxShadow = `0 0 ${(borderIntensity * 40).toFixed(0)}px -5px rgba(52, 211, 153, ${(glow * 0.8).toFixed(3)})`;
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
            const delay = 4000;
            timeoutId = setTimeout(triggerShine, delay);
        };

        scheduleNext();

        return () => {
            clearTimeout(timeoutId);
            cancelAnimationFrame(shineAnimId);
        };
    }, []);

    /* ---- Mouse Handlers (prismatic light tracking + hover zoom) ---- */
    const onMove = useCallback((e) => {
        const rect = wrapperRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (overlayRef.current) {
            const pctX = (x / rect.width) * 100;
            const pctY = (y / rect.height) * 100;
            const gradient = `radial-gradient(circle 300px at ${pctX}% ${pctY}%, black, transparent)`;
            overlayRef.current.style.maskImage = gradient;
            overlayRef.current.style.webkitMaskImage = gradient;
        }

        if (wrapperRef.current) {
            wrapperRef.current.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
            wrapperRef.current.style.setProperty('--my', `${(y / rect.height) * 100}%`);
        }
    }, []);

    const onEnter = useCallback(() => {
        isHovering.current = true;
        if (overlayRef.current) overlayRef.current.style.opacity = '';
        if (glareRef.current) glareRef.current.style.opacity = '';
        // Zoom in
        if (imgRef.current) imgRef.current.style.transform = 'scale(1.03)';
        // Border glow handled by CSS group-hover
        if (borderRef.current) {
            borderRef.current.style.borderColor = '';
            borderRef.current.style.boxShadow = '';
        }
    }, []);

    const onLeave = useCallback(() => {
        isHovering.current = false;
        // Zoom out
        if (imgRef.current) imgRef.current.style.transform = 'scale(1)';
        // Reset border inline styles so CSS takes over
        if (borderRef.current) {
            borderRef.current.style.borderColor = '';
            borderRef.current.style.boxShadow = '';
        }
    }, []);

    return (
        <div className="my-16 relative z-10">
            <div
                ref={wrapperRef}
                className="relative cursor-pointer rounded-2xl group/prism overflow-hidden"
                onMouseMove={onMove}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
            >
                {/* 1. Base Image — CSS zoom (1s ease-out) */}
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    className="w-full object-cover max-h-[500px] rounded-2xl shadow-xl shadow-black/50 border border-white/5"
                    style={{
                        transition: 'transform 1s ease-out',
                        transform: 'scale(1)',
                    }}
                    loading="lazy"
                />

                {/* 2. Prismatic Overlay */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover/prism:opacity-100 transition-opacity duration-300 pointer-events-none"
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

                {/* 3. Cursor Glare */}
                <div
                    ref={glareRef}
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover/prism:opacity-100 transition-opacity duration-300"
                    style={{
                        background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.2) 0%, transparent 50%)',
                        mixBlendMode: 'soft-light'
                    }}
                />

                {/* 4. Neon Border (CSS hover + JS auto-shine sync) */}
                <div
                    ref={borderRef}
                    className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500
                        border border-white/10
                        group-hover/prism:border-emerald-400/60
                        group-hover/prism:shadow-[0_0_40px_-5px_rgba(52,211,153,0.5)]
                        group-hover/prism:ring-1 group-hover/prism:ring-emerald-500/40"
                />
            </div>

            {alt && (
                <p className="text-center text-slate-500 text-sm mt-4 italic transition-colors duration-300 group-hover/prism:text-emerald-400">
                    {alt}
                </p>
            )}
        </div>
    );
}
