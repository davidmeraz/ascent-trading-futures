export const COURSE_CONTENT = {
    "module-1": {
        title: "Module 1: Market Mechanics",
        lessons: [
            {
                id: "futures-origin",
                title: "The Origin Story",
                content: `
# The Origin Story: Why Futures Exist

Before we talk about charts or money, you need to understand one thing: **The futures market wasn't built for day traders.** It was built for survival.

## The Farmer and The Baker

![Corn Field and Agriculture](https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80)

Imagine it's 1850. You are a **corn farmer**. You spend all year planting and watering.
*   **The Problem:** If everyone has a great harvest, the price of corn crashes to zero, and you go bankrupt.
*   **The Risk:** You don't know what the price will be when you harvest.

Now imagine a **bread factory owner**.
*   **The Problem:** If a drought happens, the price of corn skyrockets, and you can't afford to bake bread.
*   **The Risk:** You don't know what your costs will be next month.

## The Solution: A Handshake to the Future

![Business Handshake Deal](https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&w=1600&q=80)

The farmer and the factory owner meet in a room (The Exchange). they make a deal:
> *"I promise to sell you 5000 bushels of corn on December 1st for $4.00, no matter what the market price is that day."*

This is a **Futures Contract**.
*   The Farmer is happy: He guaranteed his profit.
*   The Baker is happy: He guaranteed his costs.

## Where Do YOU Fit In?

Today, airlines buy oil futures to lock in fuel prices. Starbucks buys coffee futures to stabilize latte prices.

But sometimes, there isn't a Baker for every Farmer properly aligned. **That's where WE come in.**

We are **Speculators**.

![Trading Screens](https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1600&q=80)
We take the risk that the big companies don't want. We provide **Liquidity**. When an airline needs to sell risk *right now*, we take the other side of the trade.

> [!TIP]
> **Mindset Shift:** You are not "betting" on a chart. You are getting paid to assume risk in a global supply chain. If you manage that risk well, you profit. If you don't, you get crushed.
`,
                quiz: [
                    {
                        question: "Why were futures contracts originally invented?",
                        options: [
                            "To help day traders get rich quick",
                            "To allow farmers and businesses to stabilize prices and manage risk",
                            "To increase the volatility of food prices",
                            "To create a digital casino"
                        ],
                        correctAnswer: 1
                    },
                    {
                        question: "In the Farmer/Baker example, what problem does the Baker face?",
                        options: [
                            "He doesn't know how to bake bread",
                            "He has too much corn",
                            "If a drought happens, corn prices skyrocket and he can't afford to bake",
                            "He wants to speculate on the price of wheat"
                        ],
                        correctAnswer: 2
                    },
                    {
                        question: "What is the primary role of a Speculator (You)?",
                        options: [
                            "To manipulate the market",
                            "To provide Liquidity and take the risk that commercial hedgers want to offload",
                            "To buy low and sell high only",
                            "To predict the weather"
                        ],
                        correctAnswer: 1
                    }
                ]
            },
            {
                id: "futures-contracts-types",
                title: "Digital vs Real Contracts",
                content: `
# Will a Truck Deliver Oil to My House?

This is the #1 fear of new traders. "If I buy a Gold contract, do I need a safe to store the bars?"

The answer is **NO**, provided you understand the two types of contracts.

## 1. The Real Contract (Physical Delivery)

![Physical Commodity Warehouse](https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80)

These contracts are for the **Commercial Hedgers** (The Baker, The Appliance Factory, The Airline).

*   **Who uses them?** Companies that actually need the raw material.
*   **What happens at expiration?** The buyer MUST take delivery of the asset at a specific warehouse or pipeline.
*   **Example:** A refinery buys Crude Oil futures. At expiration, they get 1,000 barrels of oil delivered to Cushing, Oklahoma.

## 2. The Digital Contract (Cash Settled / Offsetting)

![Digital Trading Execution](https://images.unsplash.com/photo-1642388691919-6169002eaf49?auto=format&fit=crop&w=1600&q=80)

This is what **WE** trade. We are trading the *price opportunity*, not the physical item.

To avoid delivery, we do something called **Offsetting**.
*   **Definition:** To close a position, you simply do the opposite trade.
*   **The Math:** If you Bought 1 contract (+1), you simply Sell 1 contract (-1). Your net position is 0.

### Cash Settlement

![Financial Index Data](https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&w=1600&q=80)

Some markets, like the **S&P 500 E-mini (ES)**, are *Cash Settled*.
*   You can't deliver 500 stocks to someone's house.
*   At expiration, if you are still holding, the exchange just debits/credits your account based on the final price. No trucks involved.

> [!WARNING]
> **Warning:** Most brokers will force-liquidate (close) your position 1-2 days before "First Notice Day" (delivery day) to protect you from accidentally buying 5,000 bushels of corn.
`,
                quiz: [
                    {
                        question: "As a speculator, what are you primarily trading?",
                        options: [
                            "The physical inventory of a warehouse",
                            "The price opportunity (Digital Contract)",
                            "Legal ownership of a farm",
                            "Coupons for grocery stores"
                        ],
                        correctAnswer: 1
                    },
                    {
                        question: "What does 'Offsetting' mean?",
                        options: [
                            "Running away from your broker",
                            "Closing a position by doing the opposite trade (Net Zero)",
                            "Taking physical delivery of the asset",
                            "Paying a fine to the exchange"
                        ],
                        correctAnswer: 1
                    },
                    {
                        question: "What happens with 'Cash Settled' futures like the S&P 500?",
                        options: [
                            "You receive stock certificates in the mail",
                            "Nothing happens, you hold them forever",
                            "The difference in value is paid/deducted from your account (No delivery)",
                            "The internet shuts down"
                        ],
                        correctAnswer: 2
                    }
                ]
            }
        ]
    }
};
