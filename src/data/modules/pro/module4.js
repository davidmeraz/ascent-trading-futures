export const proModule4 = {
    title: "Module 4: DOM & Footprint Charts",
    level: "pro",
    lessons: [
        {
            id: "pro-dom-footprint",
            title: "Advanced DOM & Footprint",
            content: `
# Reading the DOM & Footprint Charts

The **DOM (Depth of Market)** and **Footprint Charts** (or Numerical Bars) show you the microstructure of every tick.

## The DOM: Passive Information

- **Liquidity Absorption:** When a stack of limit bids (Support) is hit by aggressive sellers but price doesn't drop. This is hidden buying.
- **Iceberg Orders:** Large orders hidden behind small visible size in the DOM.

## The Footprint: Aggressive Information

The Footprint shows you the **IMBULANCE** inside each candle.
- **Buying Imbalance:** At a certain price, buyers aggressively hit the offer 3x (or more) than sellers hit the bid.
- **Selling Imbalance:** The reverse.

## Using Them Together

1. **See Liquidity:** On the DOM, notice a big wall at 5050.
2. **See Execution:** On the Footprint, watch aggressive buyers hitting that wall.
3. **Spot Exhaustion:** If buyers hit 500 contracts into the wall but price doesn't break... buyers are exhausted. **Reversal likely.**
`,
            quiz: [
                {
                    question: "What is an Iceberg Order?",
                    options: [
                        "A large order hidden behind a small visible size on the DOM",
                        "A frozen limit order",
                        "An order placed in winter",
                        "A type of market order"
                    ],
                    correctAnswer: 0
                },
                {
                    question: "What does Absorption look like?",
                    options: [
                        "Aggressive selling hits support, but price doesn't drop",
                        "Price drops immediately",
                        "No one is trading",
                        "The DOM is empty"
                    ],
                    correctAnswer: 0
                }
            ]
        }
    ]
};
