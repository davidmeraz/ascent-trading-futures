export const proModule3 = {
    title: "Module 3: Volume & VWAP",
    level: "pro",
    lessons: [
        {
            id: "pro-volume-vwap",
            title: "Volume Weighted Average Price (VWAP)",
            content: `
# Volume & VWAP: The Institution's Baseline

Institutions cannot buy 10,000 contracts at once. They use algorithms to execute over time.
The **VWAP (Volume Weighted Average Price)** is their benchmark.

> **"If I buy below VWAP, I did a good job. If I buy above, I overpaid."**

## How to Trade with VWAP

1. **Trend Days:** Price stays consistently above or below VWAP.
2. **Reversion Days:** Price oscillates around VWAP.

## Standard Deviations (Bands)

VWAP is often plotted with standard deviation bands (±1, ±2).
- **The Mean (VWAP):** Value.
- **±1 SD:** Normal fluctuation.
- **±2 SD:** Extremes. Reversion often happens here.

## Volume Profiles

Unlike time-based volume (bars at the bottom), **Volume Profile** shows volume at price (bars on the right).
- High Volume Nodes (HVN): Magnetic zones. Support/Resistance.
- Low Volume Nodes (LVN): Fast zones. Price moves quickly through these areas.
`,
            quiz: [
                {
                    question: "What is VWAP often used for by institutions?",
                    options: [
                        "As a benchmark for execution quality (Value)",
                        "To predict the exact high of the day",
                        "To measure time",
                        "None of the above"
                    ],
                    correctAnswer: 0
                },
                {
                    question: "What usually happens at Low Volume Nodes (LVN)?",
                    options: [
                        "Price often moves quickly through them (fast zones)",
                        "Price stops and consolidates",
                        "Nothing happens",
                        "The market closes"
                    ],
                    correctAnswer: 0
                }
            ]
        }
    ]
};
