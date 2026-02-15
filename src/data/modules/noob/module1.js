export const module1 = {
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
        },
        {
            id: "what-is-exchange",
            title: "What is an Exchange?",
            content: `
# What is an Exchange?

You can't just call a farmer and make a deal. You need a **neutral meeting place** with rules, referees, and guarantees. That place is the **Exchange**.

## The Marketplace

![Chicago Board of Trade](https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80)

An exchange is like an organized marketplace where buyers and sellers meet. The most famous futures exchanges are:

- **CME Group** (Chicago Mercantile Exchange) — The largest in the world
- **ICE** (Intercontinental Exchange) — Energy, agriculture, financials
- **Eurex** — European derivatives
- **CBOE** — Options and volatility products

## What Does the Exchange Do?

The exchange isn't just a building. It provides critical services:

1. **Standardization** — Every contract has the same specs (size, expiration, tick value)
2. **Price Discovery** — Millions of traders competing create the "fair price"
3. **Regulation** — Rules that prevent manipulation and fraud
4. **Clearing** — Guarantees that both sides honor the trade

## Why This Matters to You

When you place a trade on the ES (S&P 500 futures), you're not trading with "some guy." Your trade goes through the CME's matching engine, which processes **millions of orders per second**.

> [!TIP]
> **Key Insight:** The exchange is your protector. It ensures your counterparty pays up, even if they go bankrupt. This is why futures are considered safer than OTC (over-the-counter) trading.
`,
            quiz: [
                {
                    question: "What is the largest futures exchange in the world?",
                    options: [
                        "New York Stock Exchange",
                        "CME Group (Chicago Mercantile Exchange)",
                        "London Metal Exchange",
                        "Tokyo Stock Exchange"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What does 'Price Discovery' mean?",
                    options: [
                        "Finding hidden prices on the internet",
                        "The process of millions of buyers/sellers competing to find the fair market price",
                        "The exchange sets an arbitrary price",
                        "Searching for cheap stocks"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Why is exchange-traded futures considered safer than OTC trading?",
                    options: [
                        "Because the exchange guarantees both sides honor the trade",
                        "Because it's slower",
                        "Because fewer people trade there",
                        "Because the government sets all prices"
                    ],
                    correctAnswer: 0
                }
            ]
        },
        {
            id: "contract-specifications",
            title: "The Contract Specifications",
            content: `
# Reading the Blueprint of a Contract

Every futures contract has a **specification sheet** — a blueprint that tells you exactly what you're trading. If you don't read this, you're driving blindfolded.

## The Key Specs

![Blueprint Document](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80)

Let's use the **E-mini S&P 500 (ES)** as an example:

| Specification | Value |
|---|---|
| **Symbol** | ES |
| **Exchange** | CME |
| **Contract Size** | $50 × S&P 500 Index |
| **Tick Size** | 0.25 points |
| **Tick Value** | $12.50 per tick |
| **Trading Hours** | Sun-Fri, 5:00pm - 4:00pm CT |
| **Settlement** | Cash Settled |
| **Expiration** | Quarterly (Mar, Jun, Sep, Dec) |

## What This Means in Real Money

If the S&P 500 is at **5,000 points**, one ES contract controls:
> 5,000 × $50 = **$250,000** worth of stocks

That's a quarter million dollars with one contract! This is the power (and danger) of **leverage**.

## Micro Contracts: The Beginner's Friend

If $250K per contract sounds scary, meet the **Micro E-mini (MES)**:
- **Contract Size:** $5 × S&P 500 (10x smaller)
- **Tick Value:** $1.25 per tick
- **One contract at 5,000 points** = $25,000

> [!TIP]
> **Start with Micros.** They let you trade real markets with 1/10th the risk. There is zero shame in trading MES instead of ES. Many professionals use Micros for testing strategies.
`,
            quiz: [
                {
                    question: "What is the tick value of one E-mini S&P 500 (ES) contract?",
                    options: [
                        "$1.00",
                        "$5.00",
                        "$12.50",
                        "$50.00"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "If the S&P 500 is at 5,000 points, how much does one ES contract control?",
                    options: [
                        "$5,000",
                        "$50,000",
                        "$250,000",
                        "$1,000,000"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "Why are Micro E-mini contracts recommended for beginners?",
                    options: [
                        "They are free to trade",
                        "They have 1/10th the risk of regular contracts",
                        "They don't require a broker",
                        "They always make money"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "expiration-rolling",
            title: "Expiration and Rolling",
            content: `
# The Clock is Ticking: Contract Expiration

Unlike stocks, which live forever, futures contracts have an **expiration date**. When that date arrives, the contract ceases to exist.

## The Quarterly Cycle

![Calendar Planning](https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1600&q=80)

Most index futures (ES, NQ, YM) expire **quarterly**:
- **March** (H)
- **June** (M)
- **September** (U)
- **December** (Z)

The letter codes (H, M, U, Z) are used in the contract symbol. For example:
- **ESH26** = E-mini S&P 500, March 2026
- **NQM26** = E-mini Nasdaq, June 2026

## What is Rolling?

About **1-2 weeks before expiration**, traders migrate to the next contract. This is called **Rolling Over**.

**Example:**
1. You're trading ESH26 (March)
2. Around March 10th, volume starts shifting to ESM26 (June)
3. You close your March position and open June

## Why Does This Matter?

- **Volume shifts** — The old contract becomes illiquid (harder to trade)
- **Price gap** — The new contract may trade at a slightly different price
- **Rollover date** — Your broker will tell you the exact date volume shifts

> [!WARNING]
> **Never hold through expiration** as a retail trader. Your broker may force-close your position with unfavorable fills. Always roll to the next contract before expiration week.
`,
            quiz: [
                {
                    question: "How often do most index futures (ES, NQ) expire?",
                    options: [
                        "Monthly",
                        "Weekly",
                        "Quarterly (every 3 months)",
                        "Annually"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "What does 'Rolling Over' a contract mean?",
                    options: [
                        "Flipping a coin to decide your trade",
                        "Closing your position in the expiring contract and opening one in the next contract",
                        "Deleting your trading account",
                        "Doubling your position size"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is the letter code for a December contract?",
                    options: ["H", "M", "U", "Z"],
                    correctAnswer: 3
                }
            ]
        },
        {
            id: "margin-deposit",
            title: "Margin: Your Security Deposit",
            content: `
# Margin: The Key That Unlocks Leverage

When you buy a house, you don't pay the full price upfront — you put down a **deposit**. Futures margin works the same way.

## What is Margin?

![Bank Vault Security](https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80)

Margin is a **good faith deposit** that you must keep in your account to hold a position. It's NOT the cost of the contract — it's collateral.

### Two Types of Margin:

| Type | Definition | Example (ES) |
|---|---|---|
| **Initial Margin** | Amount needed to OPEN a trade | ~$15,800 |
| **Maintenance Margin** | Minimum to KEEP the trade open | ~$14,400 |

## The Margin Call

If your account drops below the **maintenance margin**, you get a **margin call**:
1. Your broker demands you deposit more money
2. If you don't, they **liquidate your position** immediately
3. You could owe MORE than your account balance

## Day Trading Margin

Many brokers offer **reduced intraday margin** (sometimes as low as $500 per ES contract) if you close before market close.

> [!WARNING]
> **Leverage is a double-edged sword.** With $500 controlling $250,000, a tiny move against you can wipe your account. This is why risk management is the #1 skill in futures trading.

## The Math of Leverage

With one ES contract at $15,800 margin controlling $250,000:
- **Leverage ratio:** ~16:1
- **A 1% move** in the S&P = $2,500 profit or loss
- **That's 16% of your margin** from a 1% market move!
`,
            quiz: [
                {
                    question: "What is 'margin' in futures trading?",
                    options: [
                        "The profit you make on a trade",
                        "A good faith deposit (collateral) to hold a position",
                        "The fee your broker charges",
                        "The price of the contract"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What happens if your account drops below the maintenance margin?",
                    options: [
                        "Nothing, you can keep trading",
                        "You receive a bonus",
                        "You get a margin call and must add funds or your position is liquidated",
                        "Your broker buys more contracts for you"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "Why is high leverage dangerous?",
                    options: [
                        "It's not dangerous at all",
                        "Because small market moves create large percentage gains/losses relative to your deposit",
                        "Because the exchange charges more fees",
                        "Because it makes charts harder to read"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "mark-to-market",
            title: "Mark-to-Market: Daily Settlement",
            content: `
# Your Account Changes Every Day

In the stock market, your profit or loss is only "real" when you sell. In futures, it's different — **your account is settled every single day**.

## What is Mark-to-Market?

![Accounting Ledger](https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1600&q=80)

At the end of each trading day, the exchange calculates the **settlement price** and adjusts every account:

- **If price went UP and you're Long:** Money is ADDED to your account
- **If price went DOWN and you're Long:** Money is REMOVED from your account
- The opposite applies for Short positions

## Example

You bought 1 ES contract at **5,000**:

| Day | Settlement Price | Daily P&L | Account Change |
|---|---|---|---|
| Monday | 5,010 | +10 pts × $50 | **+$500** |
| Tuesday | 4,995 | -15 pts × $50 | **-$750** |
| Wednesday | 5,020 | +25 pts × $50 | **+$1,250** |

Notice: The P&L is calculated from the PREVIOUS day's settlement, not your entry price.

## Why Does This Matter?

1. **Cash flow impact** — Money moves in/out of your account daily
2. **Margin checks** — If losses drop you below maintenance margin, you get a margin call
3. **No hiding** — You can't ignore a losing position. The exchange forces accountability

> [!TIP]
> **Think of it like a scorecard.** Every day, the exchange grades your position. This daily discipline is what makes futures markets transparent and trustworthy.
`,
            quiz: [
                {
                    question: "What does 'Mark-to-Market' mean?",
                    options: [
                        "Marketing your trading strategy to others",
                        "Daily settlement where profits/losses are credited/debited from your account",
                        "Writing your trades on a whiteboard",
                        "Marking prices on a chart"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "If you're Long 1 ES and price drops 10 points, what happens to your account?",
                    options: [
                        "Nothing until you sell",
                        "$500 is debited from your account (10 × $50)",
                        "$500 is added to your account",
                        "Your position is automatically closed"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Daily P&L is calculated from which reference point?",
                    options: [
                        "Your original entry price",
                        "The highest price of the day",
                        "The previous day's settlement price",
                        "A random price the exchange picks"
                    ],
                    correctAnswer: 2
                }
            ]
        },
        {
            id: "the-clearinghouse",
            title: "The Clearinghouse",
            content: `
# The Invisible Bodyguard

Who guarantees that the person on the other side of your trade actually pays up? Meet the **Clearinghouse** — the most important institution you've never heard of.

## What is a Clearinghouse?

![Security Shield](https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&w=1600&q=80)

The clearinghouse sits between **every buyer and every seller**. Once a trade is matched:

- The clearinghouse becomes the **buyer to every seller**
- And the **seller to every buyer**

This means you never have "counterparty risk" — the risk that the other person defaults.

## How It Works

1. **Trader A** buys 1 ES contract
2. **Trader B** sells 1 ES contract
3. The **Clearinghouse** steps in the middle
4. Trader A's contract is now with the clearinghouse (not Trader B)
5. If Trader B goes bankrupt, the clearinghouse still pays Trader A

## The Guarantee Fund

Clearinghouses maintain a massive **guarantee fund** built from:
- Member fees and deposits
- A portion of margin collected
- Insurance arrangements

The CME Clearing has never failed to honor a trade in its 100+ year history.

> [!TIP]
> **This is why futures are safe.** Unlike crypto exchanges or forex brokers that can disappear overnight, regulated futures are backed by the clearinghouse guarantee. Your money is protected by institutional-grade infrastructure.
`,
            quiz: [
                {
                    question: "What role does the clearinghouse play in a futures trade?",
                    options: [
                        "It decides which trades are profitable",
                        "It becomes the buyer to every seller and seller to every buyer",
                        "It only processes trades over $1 million",
                        "It sets the price of all contracts"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is 'counterparty risk'?",
                    options: [
                        "The risk of your internet going down",
                        "The risk that the other person in your trade defaults and can't pay",
                        "The risk of making too much profit",
                        "The risk of the exchange closing"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "How long has the CME Clearing honored trades without failure?",
                    options: [
                        "10 years",
                        "25 years",
                        "50 years",
                        "100+ years"
                    ],
                    correctAnswer: 3
                }
            ]
        },
        {
            id: "trading-hours",
            title: "Trading Hours and Sessions",
            content: `
# When Can You Trade?

Unlike the stock market (9:30 AM - 4:00 PM), futures trade **nearly 24 hours a day**, 5 days a week. Understanding the sessions is crucial.

## The Trading Day

![World Time Zones](https://images.unsplash.com/photo-1524678714210-9917a6c619c2?auto=format&fit=crop&w=1600&q=80)

For the E-mini S&P 500 (ES), trading hours are:
- **Sunday 5:00 PM CT** → **Friday 4:00 PM CT**
- Daily maintenance break: 3:15 PM - 3:30 PM CT
- Daily close/reopen: 4:00 PM - 5:00 PM CT

## The Three Key Sessions

| Session | Hours (CT) | Character |
|---|---|---|
| **Asia/Overnight** | 5:00 PM - 2:00 AM | Low volume, smaller moves |
| **London/Europe** | 2:00 AM - 8:30 AM | Volume picks up, trends start |
| **US/Regular** | 8:30 AM - 3:00 PM | Highest volume, biggest moves |

## Why Sessions Matter

- **The US session** is when 70%+ of volume happens. This is where most retail traders should focus.
- **The overnight session** can set the tone for the next day. Big news events (earnings, economic data) can cause gaps.
- **The London open** often creates the day's first big move.

## The Opening Bell Effect

At **8:30 AM CT**, major economic data releases (jobs reports, CPI, GDP) can cause explosive moves. Many traders wait for this data before entering.

> [!TIP]
> **As a beginner, trade the US session only** (8:30 AM - 12:00 PM CT). This is when liquidity is highest and spreads are tightest. Avoid overnight trading until you're experienced.
`,
            quiz: [
                {
                    question: "When does the ES futures market open for the week?",
                    options: [
                        "Monday 9:30 AM",
                        "Sunday 5:00 PM CT",
                        "Monday 8:00 AM",
                        "Saturday 12:00 PM"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Which session has the highest volume for US futures?",
                    options: [
                        "Asia/Overnight session",
                        "London/Europe session",
                        "US/Regular session",
                        "All sessions are equal"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "Why should beginners focus on the US session?",
                    options: [
                        "Because it's the only time you can trade",
                        "Because the charts look nicer",
                        "Because liquidity is highest and spreads are tightest",
                        "Because the exchange gives discounts"
                    ],
                    correctAnswer: 2
                }
            ]
        },
        {
            id: "popular-markets",
            title: "The Most Popular Futures Markets",
            content: `
# Choosing Your Battlefield

There are hundreds of futures contracts available. As a beginner, you should focus on the most liquid, well-known markets. Here are the ones that matter.

## Index Futures (The Big Leagues)

![Stock Market Display](https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1600&q=80)

| Contract | Symbol | What It Tracks | Tick Value |
|---|---|---|---|
| E-mini S&P 500 | ES | 500 largest US companies | $12.50 |
| Micro E-mini S&P | MES | Same, 1/10th size | $1.25 |
| E-mini Nasdaq 100 | NQ | Tech-heavy index | $5.00 |
| Micro E-mini Nasdaq | MNQ | Same, 1/10th size | $0.50 |
| E-mini Dow | YM | 30 blue-chip stocks | $5.00 |

## Energy Futures

| Contract | Symbol | What It Tracks | Tick Value |
|---|---|---|---|
| Crude Oil | CL | WTI Crude Oil | $10.00 |
| Micro Crude Oil | MCL | Same, 1/10th size | $1.00 |
| Natural Gas | NG | Henry Hub Natural Gas | $10.00 |

## Metal Futures

| Contract | Symbol | What It Tracks | Tick Value |
|---|---|---|---|
| Gold | GC | Gold (100 oz) | $10.00 |
| Micro Gold | MGC | Gold (10 oz) | $1.00 |
| Silver | SI | Silver (5000 oz) | $25.00 |

## Where Should YOU Start?

For beginners, the **MES (Micro E-mini S&P 500)** is the gold standard:
- ✅ High liquidity (tight spreads)
- ✅ Small tick value ($1.25)
- ✅ Trades nearly 24 hours
- ✅ Tons of educational content available
- ✅ Low margin requirements

> [!TIP]
> **Master ONE market first.** Don't try to trade ES, NQ, CL, and GC simultaneously. Pick MES, learn its personality (how it moves, when it's volatile), and become an expert. Expand later.
`,
            quiz: [
                {
                    question: "What does the E-mini S&P 500 (ES) track?",
                    options: [
                        "The price of gold",
                        "The 500 largest US companies",
                        "European stock markets",
                        "Cryptocurrency prices"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is the tick value of a Micro E-mini S&P 500 (MES)?",
                    options: ["$0.50", "$1.25", "$5.00", "$12.50"],
                    correctAnswer: 1
                },
                {
                    question: "Why is the MES recommended for beginners?",
                    options: [
                        "Because it's the most expensive contract",
                        "Because it only trades during US hours",
                        "Because it has high liquidity, small tick value, and low margin",
                        "Because it guarantees profits"
                    ],
                    correctAnswer: 2
                }
            ]
        }
    ]
};
