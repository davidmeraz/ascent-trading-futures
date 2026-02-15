export const module3 = {
    title: "Module 3: Reading the Board",
    lessons: [
        {
            id: "ticks-and-points",
            title: "Understanding Ticks and Points",
            content: `
# The Language of Price: Ticks and Points

Before you can read a price chart, you need to understand the **smallest units of measurement** in futures.

## What is a Tick?

A **tick** is the smallest possible price movement in a futures contract. Think of it as a "pixel" of price.

| Contract | Tick Size | Tick Value |
|---|---|---|
| ES (S&P 500) | 0.25 points | $12.50 |
| NQ (Nasdaq) | 0.25 points | $5.00 |
| CL (Crude Oil) | $0.01 | $10.00 |
| GC (Gold) | $0.10 | $10.00 |

## What is a Point?

A **point** is a full integer move. One point = multiple ticks.

For ES: **1 point = 4 ticks** (because ticks are 0.25)
- 1 point of ES = 4 × $12.50 = **$50.00**

## Real-World Examples

If ES moves from **5,000.00 to 5,003.50**:
- That's **3.50 points** = **14 ticks**
- Dollar value: 14 × $12.50 = **$175.00 per contract**

If you had 2 contracts: 14 × $12.50 × 2 = **$350.00**

## Why This Matters

When someone says "I made 10 points today on ES," that means:
- 10 × $50 = **$500 per contract**
- With 5 contracts: **$2,500**

> [!TIP]
> **Think in ticks, not dollars.** Professionals measure performance in ticks because it's consistent regardless of contract size. "I risked 8 ticks to make 16 ticks" is clearer than dollar amounts.
`,
            quiz: [
                {
                    question: "What is a 'tick' in futures trading?",
                    options: [
                        "A type of insect found on trading floors",
                        "The smallest possible price movement of a contract",
                        "A 1% move in the market",
                        "A timer that counts trading hours"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "How many ticks make up 1 point on the ES contract?",
                    options: ["1 tick", "2 ticks", "4 ticks", "10 ticks"],
                    correctAnswer: 2
                },
                {
                    question: "If ES moves 5 points, what is the dollar value per contract?",
                    options: ["$50", "$125", "$250", "$500"],
                    correctAnswer: 2
                }
            ]
        },
        {
            id: "contract-size-value",
            title: "Contract Size and Value",
            content: `
# How Much Am I Actually Trading?

Understanding the **notional value** of your contracts is critical. Many beginners don't realize how much money they're actually controlling.

## Notional Value Formula

**Notional Value = Contract Multiplier × Current Price**

![Calculator and Charts](https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80)

## Common Contract Values

| Contract | Multiplier | Price (approx.) | Notional Value |
|---|---|---|---|
| ES | $50 | 5,000 | **$250,000** |
| MES | $5 | 5,000 | **$25,000** |
| NQ | $20 | 18,000 | **$360,000** |
| MNQ | $2 | 18,000 | **$36,000** |
| CL | $1,000 | $75 | **$75,000** |
| GC | $100 | $2,000 | **$200,000** |

## The Leverage Reality

If you have a $10,000 account and trade 1 ES contract:
- You control $250,000 with $10,000
- Leverage: **25:1**
- A 0.4% move against you = **$1,000 loss (10% of account)**

With MES instead:
- You control $25,000 with $10,000
- Leverage: **2.5:1**
- A 0.4% move against you = **$100 loss (1% of account)**

## Choosing the Right Size

Your account size determines which contracts are appropriate:

| Account Size | Recommended | Why |
|---|---|---|
| $1,000 - $5,000 | MES, MNQ | Low risk per tick |
| $5,000 - $25,000 | MES (multiple) | Can trade 2-5 micros |
| $25,000 - $50,000 | MES or 1 ES | Can handle full-size margin |
| $50,000+ | ES, NQ | Professional contract sizes |

> [!TIP]
> **Rule of thumb:** Your total notional exposure should never exceed 10x your account size. If you have $10,000, don't control more than $100,000 in contracts.
`,
            quiz: [
                {
                    question: "What is the notional value of 1 NQ contract at 18,000?",
                    options: ["$18,000", "$36,000", "$180,000", "$360,000"],
                    correctAnswer: 3
                },
                {
                    question: "With a $10,000 account trading 1 ES contract, what is your leverage ratio?",
                    options: ["2:1", "5:1", "10:1", "25:1"],
                    correctAnswer: 3
                },
                {
                    question: "Which contract is most appropriate for a $3,000 account?",
                    options: ["ES", "NQ", "CL", "MES"],
                    correctAnswer: 3
                }
            ]
        },
        {
            id: "bid-and-ask",
            title: "The Bid and Ask",
            content: `
# The Two Prices: Bid and Ask

When you look at a futures price, you don't see ONE price — you see TWO. Understanding this is fundamental.

## The Bid Price

The **bid** is what buyers are willing to pay. If you want to **sell right now**, you sell at the bid.

## The Ask Price

The **ask** (also called the "offer") is what sellers want. If you want to **buy right now**, you buy at the ask.

## The Spread

The difference between bid and ask is the **spread**:

| Scenario | Bid | Ask | Spread |
|---|---|---|---|
| ES (normal) | 5,000.00 | 5,000.25 | 0.25 (1 tick) |
| ES (volatile news) | 4,998.00 | 5,002.00 | 4.00 (16 ticks!) |
| MES (normal) | 5,000.00 | 5,000.25 | 0.25 (1 tick) |
| CL (normal) | 75.50 | 75.51 | 0.01 (1 tick) |

## Why Spread Matters

The spread is an **immediate cost** every time you trade:
- You buy at 5,000.25 (ask)
- You're immediately underwater by 0.25 points ($12.50 on ES)
- You need the market to move at least 1 tick in your favor just to break even

With 10 trades per day × $12.50 spread cost = **$125/day** just in spread costs!

## Tight vs Wide Spreads

- **Tight (1 tick):** High liquidity, many buyers/sellers → Good for trading
- **Wide (5+ ticks):** Low liquidity, news events → Dangerous to trade

> [!TIP]
> **The spread is a hidden tax on every trade.** The more you trade, the more you pay. This is why overtrading kills accounts — even if your win rate is good, spread costs eat your profits.
`,
            quiz: [
                {
                    question: "If you want to BUY a contract immediately, which price do you pay?",
                    options: ["The bid price", "The ask price", "The average of bid and ask", "The previous close"],
                    correctAnswer: 1
                },
                {
                    question: "What does a widening spread indicate?",
                    options: [
                        "More buyers entering the market",
                        "Decreasing liquidity, potentially due to news or low volume",
                        "The market is about to go up",
                        "Your broker lowering fees"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "If you trade 20 round trips on ES per day, what is your approximate daily spread cost?",
                    options: ["$12.50", "$125", "$250", "$500"],
                    correctAnswer: 2
                }
            ]
        },
        {
            id: "the-spread-explained",
            title: "The Spread Deep Dive",
            content: `
# Spread Mastery: Your First Edge

Understanding spreads at a deep level gives you a subtle but real edge. Most beginners ignore this — and it costs them thousands.

## Crossing the Spread vs Joining It

![Chess Strategy](https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&w=1600&q=80)

There are two ways to enter a trade:

### 1. Crossing the Spread (Market Order)
- **You pay the ask** to buy, or **hit the bid** to sell
- Entry is instant but costs 1 tick
- Used when you NEED to get in NOW

### 2. Joining the Spread (Limit Order)
- **You post on the bid** to buy, or **post on the ask** to sell
- Entry may take time (or may not fill at all)
- But you save 1 tick per trade ($12.50 on ES)

## The Math of Joining

If you trade 10 times per day and join the spread instead of crossing:
- Daily savings: 10 × $12.50 = **$125/day**
- Monthly savings: $125 × 20 days = **$2,500/month**
- Annual savings: **$30,000/year**

That could be the difference between a profitable and unprofitable trading year!

## When to Cross vs Join

| Situation | Action | Why |
|---|---|---|
| Strong breakout | **Cross** | Speed matters more than 1 tick |
| Fading a move | **Join** | You expect price to come to you |
| Exiting a loser | **Cross** | Get out NOW, don't let it get worse |
| Scaling into a position | **Join** | Patient entries improve average price |

> [!TIP]
> **Join the spread when you can, cross when you must.** Developing the discipline to use limit orders consistently is one of the quickest ways to improve your bottom line.
`,
            quiz: [
                {
                    question: "What does 'crossing the spread' mean?",
                    options: [
                        "Drawing a line on a chart",
                        "Paying the ask to buy or hitting the bid to sell for instant execution",
                        "Canceling a limit order",
                        "Trading two different markets simultaneously"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "If you join the spread 10 times/day on ES instead of crossing, how much do you save monthly?",
                    options: ["$125", "$250", "$1,250", "$2,500"],
                    correctAnswer: 3
                },
                {
                    question: "When should you definitely 'cross the spread' (use a market order)?",
                    options: [
                        "When entering a slow, choppy market",
                        "When exiting a losing position quickly",
                        "When testing a new strategy",
                        "Always — market orders are always better"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "volume-fuel",
            title: "Volume: The Fuel of Movement",
            content: `
# Volume: The Market's Heartbeat

Price tells you WHERE the market went. **Volume tells you if it MEANT it.**

## What is Volume?

![Stock Market Volume](https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1600&q=80)

Volume = the number of contracts traded in a given period. Every trade counts as 1 unit of volume (1 buyer + 1 seller = 1 volume).

## Reading Volume

### High Volume + Direction = Conviction
- Price goes UP on HIGH volume → **Buyers are in control** (strong move)
- Price goes DOWN on HIGH volume → **Sellers are in control** (strong move)

### Low Volume + Direction = Suspicion
- Price goes UP on LOW volume → **Weak rally** (may reverse)
- Price goes DOWN on LOW volume → **Weak selloff** (may bounce)

## Volume Spikes

Sudden volume spikes often occur at:
- **Market open** (9:30 AM ET)
- **News releases** (economic data, FOMC)
- **Key price levels** (support/resistance breaks)
- **Market close** (3:00-4:00 PM ET)

## Volume Profile

Advanced traders use **Volume Profile** — showing volume at each PRICE level instead of each time period:
- **High Volume Nodes (HVN):** Prices where many contracts traded → Fair value, price tends to gravitate here
- **Low Volume Nodes (LVN):** Prices where few contracts traded → Price moves quickly through these areas

> [!TIP]
> **Never trust a breakout without volume.** If price breaks through a key level on low volume, it's likely a false breakout. Wait for volume to confirm before committing capital.
`,
            quiz: [
                {
                    question: "What does high volume during a price move indicate?",
                    options: [
                        "The move will immediately reverse",
                        "Conviction — many participants agree on the direction",
                        "The exchange is broken",
                        "Volume doesn't matter"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is a High Volume Node in a Volume Profile?",
                    options: [
                        "A signal to buy immediately",
                        "A price level where many contracts were traded, often acting as fair value",
                        "A type of computer server",
                        "The highest volume day of the year"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "When should you be suspicious of a price breakout?",
                    options: [
                        "When it happens on very high volume",
                        "When it happens on very low volume",
                        "When it happens at market open",
                        "Breakouts are always reliable"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "order-book-dom",
            title: "The Order Book (DOM)",
            content: `
# The Depth of Market: Seeing the Queue

The **DOM** (Depth of Market) shows you the orders waiting to be filled at each price level. It's like seeing the line at a store — who's waiting to buy, and who's waiting to sell.

## What You See in the DOM

![Data Grid Analysis](https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1600&q=80)

A typical DOM shows:

| Bid Size | Price | Ask Size |
|---|---|---|
| | 5,002.00 | 450 |
| | 5,001.75 | 800 |
| | 5,001.50 | 320 |
| | 5,001.25 | 150 |
| | 5,001.00 | **2,500** |
| 120 | 5,000.75 | |
| 350 | 5,000.50 | |
| **3,000** | 5,000.00 | |
| 500 | 4,999.75 | |

## Reading the DOM

- **Large orders at a price** = Potential support/resistance
- **Stacked bids** = Buyers defending a level
- **Stacked asks** = Sellers defending a level
- **Thin areas** = Price will move quickly through

## Important Concepts

### Iceberg Orders
Large traders hide their full size. They show 50 contracts but have 5,000 waiting behind. The DOM only shows the visible portion.

### Order Pulling
Traders place large visible orders to scare others, then pull (cancel) them before they fill. This is called **spoofing** and is illegal.

### The DOM is Dynamic
The DOM changes every millisecond. Those numbers are constantly updating as orders are placed, filled, and canceled.

> [!WARNING]
> **Don't rely solely on the DOM for trading decisions.** Large visible orders can be pulled in milliseconds. Use the DOM as one tool among many, not as your only signal. It's better for confirming a trade idea than generating one.
`,
            quiz: [
                {
                    question: "What does the DOM (Depth of Market) show?",
                    options: [
                        "Yesterday's trading history",
                        "Pending buy and sell orders at each price level",
                        "News headlines affecting the market",
                        "Your account balance"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is an 'iceberg order'?",
                    options: [
                        "An order to buy frozen commodities",
                        "A large order that only shows a small portion, hiding the true size",
                        "An order placed from a cold country",
                        "An order that melts (cancels) over time"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Why is the DOM considered unreliable as a sole trading signal?",
                    options: [
                        "Because it only updates once per hour",
                        "Because visible orders can be pulled (canceled) in milliseconds",
                        "Because only institutional traders can see it",
                        "Because the numbers are random"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "time-and-sales",
            title: "Time and Sales (The Tape)",
            content: `
# The Tape: Every Trade That Happens

While the DOM shows orders WAITING, **Time & Sales** shows trades that ACTUALLY HAPPENED. This is the raw truth of the market.

## What Time & Sales Shows

Each entry includes:
- **Time** — Exact timestamp (to the millisecond)
- **Price** — What price the trade executed at
- **Size** — How many contracts traded
- **Side** — Did it trade at the BID or ASK?

## Color Coding (Typical)

| Color | Meaning |
|---|---|
| 🟢 Green | Trade at the **ASK** (aggressive buyer) |
| 🔴 Red | Trade at the **BID** (aggressive seller) |
| ⚪ White | Trade between bid/ask |

## Reading Buy/Sell Pressure

The tape reveals **who is aggressive**:
- Lots of **green (ask) prints** = Buyers lifting offers → Bullish pressure
- Lots of **red (bid) prints** = Sellers hitting bids → Bearish pressure
- **Large prints** (100+ contracts on ES) = Institutional activity

## Spotting Absorption

**Absorption** is when large orders "eat" aggressive selling without price dropping:
1. Sellers keep hitting the bid at 5,000.00
2. Huge volume prints at 5,000.00 (thousands of contracts)
3. But price doesn't go below 5,000.00
4. Someone is **absorbing** all the selling → Likely a large buyer

This is a powerful signal that the level will hold.

> [!TIP]
> **The tape doesn't lie.** Unlike the DOM (where orders can be faked), Time & Sales shows real, executed trades. Learning to read the tape is an advanced skill, but it's one of the most honest windows into market activity.
`,
            quiz: [
                {
                    question: "What does Time & Sales (The Tape) show?",
                    options: [
                        "Pending orders waiting to be filled",
                        "Every trade that has actually been executed, with time, price, and size",
                        "News articles about the market",
                        "Your open positions"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "If the tape shows many green prints (trades at the ASK), what does it indicate?",
                    options: [
                        "Sellers are in control",
                        "Aggressive buying pressure",
                        "The market is closed",
                        "Volume is low"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is 'absorption' in tape reading?",
                    options: [
                        "When the market absorbs news events",
                        "When large orders consume aggressive selling/buying without price moving, indicating a strong holder at that level",
                        "When your broker absorbs your commissions",
                        "When volume decreases to zero"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "pre-market-after-hours",
            title: "Pre-Market and After-Hours",
            content: `
# The Overnight Session: What Happens While You Sleep

Futures trade nearly 24 hours. What happens **before** the US open can set the entire tone for your trading day.

## The Overnight Session

![Night City Trading](https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80)

From 5:00 PM to 8:30 AM CT, the **Globex session** is active:

### Key Events Overnight:
- **Asian markets** open/close (Tokyo, Shanghai, Hong Kong)
- **European markets** open (London, Frankfurt)
- **Economic data** from Asia/Europe released
- **Central bank** decisions (ECB, BOJ, PBoC)

## The Overnight Range

The **overnight high and low** are critical reference points:
- Many day traders use the overnight range as key levels for the US session
- A break of the overnight high/low during US hours often leads to continuation

## The Pre-Market Gap

If the market closed at 5,000 and opens the next day at 5,020, there's a **20-point gap**.

### Gap Statistics:
- Gaps tend to fill ~70% of the time (price returns to previous close)
- Gaps on high volume are more likely to continue (not fill)
- Gaps caused by economic data are the most volatile

## Setting Up for the Day

A good pre-market routine:
1. Check **overnight range** (high, low, current price)
2. Note any **economic calendar** events for the day
3. Check **overseas markets** (especially if they moved big)
4. Identify **key levels** from the previous day

> [!TIP]
> **The first 30 minutes after the 8:30 AM CT open are the most volatile.** Many experienced traders observe this period without trading, then enter once the initial chaos settles. Consider a "no trade zone" for your first 15-30 minutes.
`,
            quiz: [
                {
                    question: "What is the 'overnight range'?",
                    options: [
                        "The range of your bedroom while sleeping",
                        "The high and low price established during the overnight Globex session",
                        "The maximum number of trades allowed overnight",
                        "The time between market close and reopen"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What percentage of overnight gaps tend to fill?",
                    options: ["30%", "50%", "~70%", "100%"],
                    correctAnswer: 2
                },
                {
                    question: "Why should beginners consider a 'no trade zone' in the first 15-30 minutes?",
                    options: [
                        "Because the exchange is still loading",
                        "Because the opening period is the most volatile and chaotic",
                        "Because commissions are higher",
                        "Because only institutions can trade during that time"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "price-gaps",
            title: "Understanding Price Gaps",
            content: `
# Mind the Gap: What Price Gaps Tell You

A **gap** occurs when the price opens significantly higher or lower than the previous close, with no trades occurring in between. Gaps tell a story.

## Types of Gaps

![Mountain Gap Landscape](https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80)

### 1. Common Gap
- Occurs during normal trading, often overnight
- Usually fills within the same session
- Not a strong signal

### 2. Breakaway Gap
- Occurs at the start of a new trend
- High volume confirms it
- Often does NOT fill — price keeps going

### 3. Runaway (Continuation) Gap
- Occurs in the MIDDLE of a strong trend
- Shows that momentum is accelerating
- Confirms the trend is alive

### 4. Exhaustion Gap
- Occurs at the END of a trend
- Usually fills quickly as the trend reverses
- Watch for volume divergence

## Gap Fill Strategy

Since ~70% of gaps fill, a popular beginner strategy is:
1. Wait for a gap at open
2. If no strong catalyst, fade the gap (trade toward the fill)
3. Target: Previous day's close
4. Stop: Beyond the gap high/low

## When NOT to Fade Gaps

❌ NFP (jobs) report days — gaps may continue
❌ FOMC (Fed) decision days — high volatility
❌ Gaps over 1% — likely news-driven and may not fill
❌ Gaps with massive volume — trend continuation, not reversal

> [!TIP]
> **Not all gaps are equal.** A 5-point gap on a quiet Monday is very different from a 50-point gap on a Fed decision day. Always consider the CONTEXT behind the gap before trading it.
`,
            quiz: [
                {
                    question: "Which type of gap usually does NOT fill and signals the start of a new trend?",
                    options: ["Common Gap", "Breakaway Gap", "Exhaustion Gap", "All gaps fill"],
                    correctAnswer: 1
                },
                {
                    question: "What does an Exhaustion Gap typically signal?",
                    options: [
                        "The beginning of a massive rally",
                        "The end of a trend, likely to reverse and fill",
                        "That volume is increasing",
                        "That the market is closed"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "When should you NOT try to fade (trade against) a gap?",
                    options: [
                        "On quiet, low-volume days",
                        "When the gap is only 2-3 points",
                        "On major news days (NFP, FOMC) with high volume",
                        "During the afternoon session"
                    ],
                    correctAnswer: 2
                }
            ]
        },
        {
            id: "building-watchlist",
            title: "Building Your Watchlist",
            content: `
# Focus: Building Your Watchlist

With hundreds of futures contracts available, you need to narrow your focus. A **watchlist** is your curated list of markets you monitor daily.

## The Beginner's Core Watchlist

![Monitoring Dashboard](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80)

Start with these markets:

### Primary (Trade These)
| Contract | Why |
|---|---|
| **MES** (Micro S&P) | Most liquid, great for learning |
| **MNQ** (Micro Nasdaq) | Tech-heavy, more volatile |

### Secondary (Watch These)
| Contract | Why |
|---|---|
| **ES** (S&P 500) | See what the "big boys" are doing |
| **NQ** (Nasdaq 100) | Tech sector leadership |
| **CL** (Crude Oil) | Energy sentiment gauge |
| **GC** (Gold) | Fear/safe haven indicator |

### Context (Check These)
| Indicator | Why |
|---|---|
| **DXY** (Dollar Index) | Currency strength affects commodities |
| **VIX** (Volatility Index) | Fear gauge — high VIX = high volatility |
| **US 10Y Yield** | Interest rate expectations |

## Correlation Awareness

Markets don't move in isolation:
- **ES and NQ** usually move together (90%+ correlation)
- **Gold and Dollar** typically move opposite
- **Oil and airlines** are inversely related
- **VIX and stocks** are inversely related

## The "One Market" Rule

Despite tracking multiple markets, you should **trade only ONE** until you're consistently profitable:
1. Pick MES or MNQ
2. Study it for 3-6 months
3. Learn its personality (when it moves, how fast, typical ranges)
4. Only add a second market after proving consistent results

> [!TIP]
> **Master one, watch many.** Track 5-10 markets for context, but only execute trades in 1-2 markets you truly understand. A sniper doesn't shoot at everything — they wait for their shot.
`,
            quiz: [
                {
                    question: "Which contract is recommended as the primary trading instrument for beginners?",
                    options: ["ES", "CL", "MES (Micro E-mini S&P)", "GC"],
                    correctAnswer: 2
                },
                {
                    question: "What does a high VIX reading typically indicate?",
                    options: [
                        "Low volatility and calm markets",
                        "High fear and expected volatility in the stock market",
                        "Rising gold prices",
                        "A bull market"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Why should you only trade one market initially?",
                    options: [
                        "Because exchanges only allow one",
                        "To learn its personality and develop consistency before expanding",
                        "Because other markets don't have enough volume",
                        "Because your broker limits you"
                    ],
                    correctAnswer: 1
                }
            ]
        }
    ]
};
