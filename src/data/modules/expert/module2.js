export const expertModule2 = {
    id: "expert-module-2",
    title: "Advanced Order Flow",
    description: "Reading the tape and understanding DOM dynamics.",
    lessons: [
        {
            id: "expert-lesson-2-1",
            title: "Delta and CVD",
            type: "text",
            duration: "25 min",
            content: `
# Cumulative Volume Delta (CVD)

CVD shows the aggressive buying vs. agressive selling at each price level.

## Divergences

- **Price Making New Highs + CVD Failing to Make New Highs**: Absorption. Sellers are absorbing the buy orders. Reversal likely.
- **Price Making New Lows + CVD Failing to Make New Lows**: Absorption. Buyers are absorbing the sell orders.

This is often the first sign of a major turn before it appears on the price chart.
            `
        }
    ]
};
