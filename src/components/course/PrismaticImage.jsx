import { useRef, useCallback, useEffect, useMemo } from 'react';

/**
 * PrismaticImage — creates a luxury "Low Poly" diamond-shine effect.
 *
 * It generates a randomized vertex mesh (Jittered Grid) over the image
 * to simulate an irregular diamond cut.
 * On hover, a localized "spotlight" moves with the cursor.
 * 
 * Auto-Shine Feature:
 * Every 3 seconds, a "beam of light" sweeps diagonally for constant visual engagement.
 */

// Grid configuration for the diamond mesh - Increased density for finer facets
const COLS = 8;
const ROWS = 5; // 5x5 grid = 25 facets
const JITTER = -1;// Max percentage deviation for internal points

export default function PrismaticImage({ src, alt }) {
    const wrapperRef = useRef(null);
    const overlayRef = useRef(null);
    const glareRef = useRef(null);
    const animRef = useRef(null);

    // Track hovering state 
    const isHovering = useRef(false);

    // Animation state for smooth 3D tilt
    const cur = useRef({ rx: 0, ry: 0, s: 1 });
    const tgt = useRef({ rx: 0, ry: 0, s: 1 });

    // Generate the mesh ONCE (stable seed geometric generation)
    const facets = useMemo(() => {
        // 1. Generate Grid Points
        const points = [];
        const cellW = 100 / COLS;
        const cellH = 100 / ROWS;

        for (let r = 0; r <= ROWS; r++) {
            const rowPoints = [];
            for (let c = 0; c <= COLS; c++) {
                let x = c * cellW;
                let y = r * cellH;

                // Jitter internal points to break the square grid look
                // Keep edges straight (r=0, r=ROWS, c=0, c=COLS) so we cover the full image
                if (r > 0 && r < ROWS && c > 0 && c < COLS) {
                    x += (Math.random() - 0.5) * JITTER;
                    y += (Math.random() - 0.5) * JITTER;
                }

                // Clamp to 0-100 just in case
                x = Math.max(0, Math.min(100, x));
                y = Math.max(0, Math.min(100, y));

                rowPoints.push({ x, y });
            }
            points.push(rowPoints);
        }

        // 2. Generate Triangles from Points
        const shapeData = [];
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const p1 = points[r][c];         // Top-Left
                const p2 = points[r][c + 1];     // Top-Right
                const p3 = points[r + 1][c + 1]; // Bottom-Right
                const p4 = points[r + 1][c];     // Bottom-Left

                // Randomly choose diagonal cut direction for more variety
                // (Either TopL-BotR OR BotL-TopR)
                if (Math.random() > 0.5) {
                    // Cut: P1 -> P3
                    // Triangle A (P1-P2-P3)
                    shapeData.push({
                        points: `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`,
                        opacity: 0.1 + Math.random() * 0.45,
                        key: `t-${r}-${c}-a`
                    });
                    // Triangle B (P1-P3-P4)
                    shapeData.push({
                        points: `${p1.x},${p1.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`,
                        opacity: 0.1 + Math.random() * 0.45,
                        key: `t-${r}-${c}-b`
                    });
                } else {
                    // Cut: P2 -> P4
                    // Triangle C (P1-P2-P4)
                    shapeData.push({
                        points: `${p1.x},${p1.y} ${p2.x},${p2.y} ${p4.x},${p4.y}`,
                        opacity: 0.1 + Math.random() * 0.45,
                        key: `t-${r}-${c}-c`
                    });
                    // Triangle D (P2-P3-P4)
                    shapeData.push({
                        points: `${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`,
                        opacity: 0.1 + Math.random() * 0.45,
                        key: `t-${r}-${c}-d`
                    });
                }
            }
        }
        return shapeData;
    }, []);

    /* ---- Animation Loop for Tilt ---- */
    const tick = useCallback(() => {
        const c = cur.current;
        const t = tgt.current;

        c.rx += (t.rx - c.rx) * 0.08;
        c.ry += (t.ry - c.ry) * 0.08;
        c.s += (t.s - c.s) * 0.08;

        if (wrapperRef.current) {
            wrapperRef.current.style.transform =
                `perspective(1000px) rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg) scale3d(${c.s},${c.s},1)`;
        }

        const delta = Math.abs(c.rx - t.rx) + Math.abs(c.ry - t.ry) + Math.abs(c.s - t.s);
        if (delta > 0.001) {
            animRef.current = requestAnimationFrame(tick);
        }
    }, []);

    /* ---- Auto-Shine / Glare Logic ---- */
    useEffect(() => {
        let timeoutId;
        let shineAnimId;

        const cleanupShine = () => {
            if (overlayRef.current) overlayRef.current.style.opacity = '';
            if (glareRef.current) glareRef.current.style.opacity = '';
        };

        const triggerShine = () => {
            if (isHovering.current) {
                scheduleNext();
                return;
            }

            const startT = performance.now();
            const duration = 3500; // 3.5s sweep duration

            if (overlayRef.current) overlayRef.current.style.opacity = '1';
            if (glareRef.current) glareRef.current.style.opacity = '1';

            const animateShine = (now) => {
                if (isHovering.current) {
                    cleanupShine();
                    return;
                }

                const elapsed = now - startT;
                const progress = Math.min(elapsed / duration, 1);

                // Ease Quartic Out for a sharp, premium flash
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
            // Fixed interval: 4 seconds (Requested)
            const delay = 4000;
            timeoutId = setTimeout(triggerShine, delay);
        };

        scheduleNext();

        return () => {
            clearTimeout(timeoutId);
            cancelAnimationFrame(shineAnimId);
        };
    }, []);

    /* ---- Mouse Handlers ---- */
    const onMove = useCallback((e) => {
        const rect = wrapperRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const nx = (x / rect.width) * 2 - 1;
        const ny = (y / rect.height) * 2 - 1;

        tgt.current = {
            rx: -ny * 8,  // Increased tilt for more drama with the diamond cut
            ry: nx * 8,
            s: 1.02
        };

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

        if (!animRef.current) {
            animRef.current = requestAnimationFrame(tick);
        }
    }, [tick]);

    const onEnter = useCallback(() => {
        isHovering.current = true;
        if (overlayRef.current) overlayRef.current.style.opacity = '';
        if (glareRef.current) glareRef.current.style.opacity = '';
        if (!animRef.current) animRef.current = requestAnimationFrame(tick);
    }, [tick]);

    const onLeave = useCallback(() => {
        isHovering.current = false;
        tgt.current = { rx: 0, ry: 0, s: 1 };
        if (!animRef.current) animRef.current = requestAnimationFrame(tick);
    }, [tick]);

    useEffect(() => () => cancelAnimationFrame(animRef.current), []);

    return (
        <div className="my-16 perspective-container relative z-10">
            <div
                ref={wrapperRef}
                className="relative cursor-pointer rounded-2xl transition-all duration-300 group/prism"
                onMouseMove={onMove}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* 1. Base Image */}
                <img
                    src={src}
                    alt={alt}
                    className="w-full object-cover max-h-[500px] rounded-2xl shadow-xl shadow-black/50 border border-white/5"
                    loading="lazy"
                />

                {/* 2. Prismatic Overlay Layer */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover/prism:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                        mixBlendMode: 'overlay', // or 'screen' depending on preference, overlay is subtler
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
                                strokeWidth="0.1" // Thinner stroke for sharper diamond look
                                strokeOpacity="0.2"
                            />
                        ))}
                    </svg>
                </div>

                {/* 3. Extra "Sharp" Glare */}
                <div
                    ref={glareRef}
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover/prism:opacity-100 transition-opacity duration-300"
                    style={{
                        background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.2) 0%, transparent 50%)',
                        mixBlendMode: 'soft-light'
                    }}
                />

                {/* 4. Border Highlight */}
                {/* 4. Advanced "Neon" Border */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500
                    border border-white/10
                    group-hover/prism:border-emerald-400/60
                    group-hover/prism:shadow-[0_0_40px_-5px_rgba(52,211,153,0.5)]
                    group-hover/prism:ring-1 group-hover/prism:ring-emerald-500/40"
                />
            </div>

            {alt && (
                <p className="text-center text-slate-500 text-sm mt-4 italic group-hover/prism:text-emerald-400 transition-colors">
                    {alt}
                </p>
            )}
        </div>
    );
}
