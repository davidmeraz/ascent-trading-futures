export const proModule1 = {
    title: "Module 1: Advanced Order Flow",
    level: "pro",
    lessons: [
        {
            id: "pro-order-flow-intro",
            title: "Reading the Tape: Order Flow Fundamentals",
            content: `
# Reading the Tape: Order Flow Fundamentals

Welcome to **The Pro** level. You've mastered the basics — now it's time to see what's happening *behind the candles*.

## What is Order Flow?

Every candle on your chart is a **summary**. It tells you the Open, High, Low, Close — but it hides the war that happened inside.

**Order Flow** is the study of individual orders hitting the market in real-time. It answers the question:

> *"Who is buying? Who is selling? And who is in control?"*

## The Order Book (Level 2)

Think of the market as an **auction house**:

| Price | Bids (Buyers) | Asks (Sellers) |
|---|---|---|
| 5,003.00 | | 150 contracts |
| 5,002.75 | | 89 contracts |
| 5,002.50 | | 45 contracts |
| **5,002.25** | **LAST TRADE** | |
| 5,002.00 | 67 contracts | |
| 5,001.75 | 120 contracts | |
| 5,001.50 | 200 contracts | |

- **Bids** = orders waiting to BUY (support)
- **Asks** = orders waiting to SELL (resistance)
- **The spread** = gap between best bid and best ask

## Market Orders vs Limit Orders

This is the most critical distinction in order flow:

### Limit Orders (Passive)
- Placed on the order book **waiting** to be filled
- They **provide** liquidity
- Example: "I want to buy at 5,000.00" → your order sits and waits

### Market Orders (Aggressive)
- Execute **immediately** at the best available price
- They **take** liquidity
- Example: "Buy NOW at whatever price" → you hit the ask

> [!TIP]
> **The Key Insight:** Price moves when aggressive orders overpower passive orders. If aggressive buyers keep hitting the ask faster than sellers can replenish it, price goes UP. This is the engine of every price move.

## The Footprint Chart

A **Footprint Chart** (also called a Cluster Chart) shows you the volume traded at each price level within a candle:

\`\`\`
    Price    |  Bids × Asks
  ─────────────────────────
   5,003.00  |   12 × 89  ← sellers dominating
   5,002.75  |   34 × 45
   5,002.50  |   67 × 23  ← buyers dominating  
   5,002.25  |   45 × 31
   5,002.00  |   120 × 15 ← heavy buying (imbalance!)
\`\`\`

When one side has **3x or more** volume than the other at a price, that's called an **imbalance** — a sign of institutional aggression.

## Delta: The Score

**Delta** = Total Aggressive Buying - Total Aggressive Selling

- **Positive Delta** → More aggressive buyers → Bullish pressure
- **Negative Delta** → More aggressive sellers → Bearish pressure

### Example:
- 500 contracts hit the ask (buying)
- 350 contracts hit the bid (selling)
- **Delta = +150** → Buyers are in control

## Why This Matters

As a Noob, you traded based on **what happened** (patterns, indicators). As a Pro, you trade based on **why it happened** (order flow).

This is the difference between:
- 🟢 "The candle closed green" → surface level
- 🔵 "2,000 aggressive buy contracts absorbed 500 sell limits at support, delta flipped positive" → Pro level

> [!WARNING]
> **Order flow is NOT a magic indicator.** It shows you probabilities, not certainties. Even with perfect order flow reads, you still need risk management. The difference is that your edge becomes sharper.

## Your First Exercise

Next time you watch a chart:
1. Open the **DOM (Depth of Market)** on your platform
2. Watch how orders appear and disappear at price levels
3. Notice what happens to price when a large bid gets "eaten" by sellers
4. Start thinking: *"Who is aggressive here?"*

This is the foundation of everything in the Pro level.
`,
            quiz: [
                {
                    question: "What is the key difference between Market Orders and Limit Orders?",
                    options: [
                        "Market orders are free, limit orders cost money",
                        "Market orders execute immediately (aggressive), limit orders wait on the book (passive)",
                        "There is no difference",
                        "Limit orders are faster than market orders"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What does a positive Delta indicate?",
                    options: [
                        "More sellers than buyers",
                        "The market is closed",
                        "More aggressive buying than selling (bullish pressure)",
                        "The price is falling"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "What is an 'imbalance' on a Footprint Chart?",
                    options: [
                        "When the chart is upside down",
                        "When one side has 3x or more volume than the other at a price level",
                        "When the market is perfectly balanced",
                        "When your internet connection is slow"
                    ],
                    correctAnswer: 1
                }
            ]
        }
    ]
};
