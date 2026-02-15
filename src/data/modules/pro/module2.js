export const proModule2 = {
    title: "Module 2: Market Profile & Auction Theory",
    level: "pro",
    lessons: [
        {
            id: "pro-market-profile",
            title: "Understanding Market Balance",
            content: `
# Market Profile & Auction Theory

The market is an **auction process**. Price moves up to find sellers and down to find buyers. Understanding this constant search for fair value is key to trading like a professional.

## The Bell Curve of Price

Most volume happens in a specific price range where buyers and sellers agree on value. This creates a "Fair Value Area" (VA).

- **Value Area High (VAH):** The top of the agreed value zone.
- **Value Area Low (VAL):** The bottom of the agreed value zone.
- **Point of Control (POC):** The single price with the most volume.

## Acceptance vs Rejection

When price leaves the Value Area, two things can happen:
1. **Acceptance:** Price stays outside and builds new volume. This is a breakout or trend.
2. **Rejection:** Price quickly snaps back inside the Value Area. This is a false breakout.

## Trading Strategies

- **Fade the Extremes:** When price hits VAH or VAL in a balanced market, look for rejection back to POC.
- **Follow the Breakout:** If price breaks VAH/VAL with strong volume and holds, follow the trend.

Remember: Context is everything. Is the market balanced (consolidating) or imbalanced (trending)?
`,
            quiz: [
                {
                    question: "What does the Value Area represent?",
                    options: [
                        "The area where 70% of the trading volume occurred",
                        "The area where the market is closed",
                        "The highest price of the day",
                        "The lowest price of the day"
                    ],
                    correctAnswer: 0
                },
                {
                    question: "What is the Point of Control (POC)?",
                    options: [
                        "The price level with the most volume traded",
                        "The opening price",
                        "The closing price",
                        "The average price"
                    ],
                    correctAnswer: 0
                }
            ]
        }
    ]
};
