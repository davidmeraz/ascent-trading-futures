export const module4 = {
    title: "Module 4: Your First Platform",
    lessons: [
        {
            id: "choosing-broker",
            title: "Choosing a Broker",
            content: `
# Your Broker: The Most Important Business Decision

Choosing the wrong broker can cost you thousands in fees, bad fills, and frustration. Let's break down what matters.

## What to Compare

![Business Decision](https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80)

| Factor | What to Look For |
|---|---|
| **Regulation** | NFA registered, CFTC regulated |
| **Commissions** | $0.50-$2.00 per side ideal |
| **Platform** | Free or included with account |
| **Margins** | Competitive day trading margins |
| **Data fees** | CME data ~$10-15/month |
| **Support** | Phone/chat during market hours |
| **Reputation** | Years in business, reviews |

## Top Brokers for Beginners

| Broker | Strengths | Commission |
|---|---|---|
| **NinjaTrader** | Great platform, low margins | ~$0.53/side |
| **AMP Futures** | Lowest commissions, many platforms | ~$0.25/side |
| **TradeStation** | All-in-one, stocks + futures | ~$1.50/side |
| **Interactive Brokers** | Global access, advanced tools | ~$0.85/side |

## Prop Firms: An Alternative Path

If you don't have much capital, **proprietary trading firms** let you trade their money:
- **Topstep** — Pass an evaluation, get a funded account
- **Apex Trader Funding** — Popular evaluation programs
- **Take Profit Trader** — Growing community

### Pros: No personal capital at risk, larger buying power
### Cons: Monthly evaluation fees, strict rules, profit splits

> [!TIP]
> **Start with a demo account at your chosen broker.** Most offer free 14-day demos with real market data. Test the platform, place practice trades, and get comfortable BEFORE depositing real money.
`,
            quiz: [
                {
                    question: "What is the most important regulatory check when choosing a futures broker?",
                    options: [
                        "That they have a nice website",
                        "That they're NFA registered and CFTC regulated",
                        "That they offer the lowest commissions",
                        "That they advertise on social media"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is a prop trading firm?",
                    options: [
                        "A broker that sells props",
                        "A firm that lets you trade their capital after passing an evaluation",
                        "A government agency",
                        "A type of exchange"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What should you do before depositing real money with any broker?",
                    options: [
                        "Immediately fund the maximum amount",
                        "Test with a demo account first to learn the platform",
                        "Ask friends for their password",
                        "Read social media reviews only"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "demo-vs-live",
            title: "Demo vs Live Accounts",
            content: `
# Paper Trading: The Training Simulator

A **demo account** (paper trading) lets you trade with virtual money in real market conditions. It's your flight simulator before flying the real plane.

## Demo Account Benefits

![Flight Simulator](https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1600&q=80)

✅ **Zero financial risk** — Lose $10,000? Reset the account
✅ **Real market data** — See live prices and execute orders
✅ **Platform mastery** — Learn buttons, hotkeys, and order types
✅ **Strategy testing** — Try ideas without consequences
✅ **Confidence building** — Build a track record before going live

## The Demo Trap

⚠️ Demo trading has a critical flaw: **No emotional pressure.**

When real money is on the line:
- Your heart rate increases
- You hesitate on entries
- You move stop losses to avoid pain
- You take profits too early from fear

### Demo vs Live Performance:

| Metric | Demo | Live (Typical) |
|---|---|---|
| Win Rate | 65% | 45% |
| Average Win | $200 | $120 |
| Average Loss | $100 | $180 |
| Discipline | Perfect | Inconsistent |

## The Bridge: Micro-Live

The best transition is **micro contracts with real money**:
1. Trade MES with 1 contract
2. Risk is real ($1.25/tick) but small
3. You feel the emotional pressure
4. You learn to manage it

## When to Go Live

You're ready for live trading when:
- ✅ 3+ months of consistent demo profitability
- ✅ You've developed a written trading plan
- ✅ You can follow rules even when losing
- ✅ You've saved money you can afford to lose

> [!WARNING]
> **Never skip the demo phase.** Would you fly a plane without simulator training? Trading real money without demo experience is the fastest way to blow an account.
`,
            quiz: [
                {
                    question: "What is the main limitation of demo trading?",
                    options: [
                        "The prices aren't real",
                        "No emotional pressure — it doesn't simulate the psychology of real money",
                        "You can only trade for 1 hour",
                        "Demo accounts don't show charts"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is the recommended bridge between demo and full-size live trading?",
                    options: [
                        "Jumping straight to ES contracts",
                        "Trading micro contracts (MES) with real money",
                        "Doubling your demo account size",
                        "Borrowing money to trade bigger"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "How long should you practice on demo before considering live trading?",
                    options: [
                        "1 day",
                        "1 week",
                        "3+ months of consistent profitability",
                        "Demo isn't necessary"
                    ],
                    correctAnswer: 2
                }
            ]
        },
        {
            id: "platform-overview",
            title: "Platform Overview",
            content: `
# Your Cockpit: Understanding the Trading Platform

A trading platform is your interface with the market. Let's understand the key windows and tools you'll use daily.

## Essential Platform Components

![Control Dashboard](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80)

### 1. Chart Window
- Displays price action as candlesticks, bars, or lines
- Configurable timeframes (1min, 5min, 15min, daily)
- Add indicators and drawing tools

### 2. DOM (Depth of Market)
- Shows the order book — bids and asks at each level
- One-click order placement
- Visual representation of supply/demand

### 3. Order Entry
- Quick buttons for Market, Limit, Stop orders
- Set quantity, price, and order type
- Bracket order templates

### 4. Positions Window
- Shows your open trades
- Real-time P&L calculation
- Quick flatten (close all) button

### 5. Account Window
- Cash balance, margin used, available margin
- Daily P&L summary
- Commission totals

## Popular Platforms

| Platform | Best For | Price |
|---|---|---|
| **NinjaTrader** | Day traders, DOM trading | Free (basic) |
| **TradingView** | Charting and analysis | Free-$60/mo |
| **Sierra Chart** | Advanced, customizable | $26/mo |
| **Bookmap** | Order flow visualization | $39/mo |

> [!TIP]
> **Don't get overwhelmed.** Start with just a chart and basic order entry. As you grow, add the DOM, then Time & Sales. Master each tool before adding complexity.
`,
            quiz: [
                {
                    question: "What is the DOM in a trading platform?",
                    options: [
                        "A web browser component",
                        "Depth of Market — showing the order book with bids/asks",
                        "A type of chart pattern",
                        "The daily options monitor"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What does the Positions Window show?",
                    options: [
                        "News headlines",
                        "Other traders' positions",
                        "Your open trades with real-time P&L",
                        "Historical chart data"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "Which platform is free at the basic level and popular with day traders?",
                    options: ["Bloomberg Terminal", "NinjaTrader", "MetaTrader 5", "Bookmap"],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "workspace-setup",
            title: "Setting Up Your Workspace",
            content: `
# Building Your Digital Trading Desk

A well-organized workspace is the difference between calm, focused trading and chaotic scrambling. Let's build yours.

## Screen Layout for Beginners

![Multi Monitor Setup](https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1600&q=80)

### One Monitor Setup (Laptop):
Split into quadrants:
- **Top Left:** Main chart (5-minute candles)
- **Top Right:** Higher timeframe chart (15-min or 1-hour)
- **Bottom Left:** DOM + Order entry
- **Bottom Right:** Account info + Positions

### Two Monitor Setup:
- **Monitor 1:** Charts (main + higher timeframe)
- **Monitor 2:** DOM, order entry, positions, Time & Sales

## Chart Configuration

For your main chart, set up:
1. **Timeframe:** 5-minute candles (best for learning)
2. **Background:** Dark theme (less eye strain)
3. **Colors:** Green candles up, red candles down
4. **Indicators:** Start with Volume only (no indicators clutter)
5. **Grid lines:** Subtle or off

## Keyboard Shortcuts

Learn these immediately:
| Action | Typical Shortcut |
|---|---|
| Buy Market | F1 or B |
| Sell Market | F2 or S |
| Flatten All | F5 or Panic button |
| Cancel All Orders | Esc |

## Physical Workspace

Your physical environment matters too:
- ✅ Comfortable chair (you'll sit for hours)
- ✅ Good lighting (reduce eye strain)
- ✅ Water bottle nearby (stay hydrated)
- ❌ No distractions (close social media, mute phone)

> [!TIP]
> **Create a "trading mode" ritual.** Close all non-trading apps, silence your phone, and sit down with intention. When you sit at your desk, your brain should know: "It's time to focus."
`,
            quiz: [
                {
                    question: "What is the recommended starting timeframe for a beginner's main chart?",
                    options: ["1-second", "1-minute", "5-minute candles", "Daily candles"],
                    correctAnswer: 2
                },
                {
                    question: "What keyboard shortcut should you know in case of emergency?",
                    options: [
                        "The screenshot button",
                        "Flatten All / Panic button (closes all positions)",
                        "The zoom in shortcut",
                        "The print button"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "How many indicators should beginners start with on their chart?",
                    options: [
                        "As many as possible",
                        "At least 10",
                        "Volume only — keep it clean",
                        "None ever"
                    ],
                    correctAnswer: 2
                }
            ]
        },
        {
            id: "first-demo-order",
            title: "Placing Your First Order",
            content: `
# Your First Trade (On Demo!)

Time to place your very first order. We'll walk through the exact steps using a demo account.

## Step-by-Step: Your First Market Order

![Launch Button](https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1600&q=80)

### Step 1: Open Your Demo Platform
- Log into your paper trading account
- Load the **MES** (Micro E-mini S&P 500) chart

### Step 2: Set Your Quantity
- Set to **1 contract** (the minimum)
- Never start with more than 1

### Step 3: Click BUY (Market Order)
- This instantly buys 1 MES at the current ask price
- You are now "Long 1 MES"

### Step 4: Watch Your Position
- Your P&L will tick up/down in real-time
- Each tick = $1.25 profit or loss

### Step 5: Close the Position
- Click "Flatten" or "Close Position"
- This sells your 1 MES contract
- Your P&L is now realized (locked in)

## What You Should Notice

After your first trade, pay attention to:
- **Slippage** — Did you fill at the exact price you expected?
- **Speed** — How fast did the order execute?
- **P&L movement** — How quickly does 1 MES move in dollars?
- **Emotions** — Even on demo, notice how you FEEL

## Practice Exercises

Do these 10 times each on demo:
1. Buy 1 contract → Hold 1 minute → Close
2. Sell 1 contract → Hold 1 minute → Close
3. Buy with a limit order (below current price)
4. Set a bracket order (entry + stop + target)

> [!TIP]
> **Your goal is not to make money on demo.** Your goal is to become so comfortable with the platform that order placement is second nature. When real money is on the line, you don't want to be figuring out where the "sell" button is.
`,
            quiz: [
                {
                    question: "What should your first demo trade be?",
                    options: [
                        "10 ES contracts with maximum leverage",
                        "1 MES contract — the smallest possible size",
                        "Short selling gold futures",
                        "Options on crude oil"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is the primary goal of demo trading?",
                    options: [
                        "Making as much virtual money as possible",
                        "Becoming comfortable with the platform so order placement is second nature",
                        "Impressing friends with fake profits",
                        "Finding the best indicators"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is 'slippage'?",
                    options: [
                        "When your chair slides on the floor",
                        "The difference between your expected fill price and your actual fill price",
                        "When the platform crashes",
                        "A type of chart pattern"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "account-metrics",
            title: "Understanding Account Metrics",
            content: `
# Reading Your Account Statement

Your account dashboard shows critical numbers. Misunderstanding even one can lead to overleveraging or margin calls.

## Key Account Metrics

![Financial Report](https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80)

| Metric | Definition | Example |
|---|---|---|
| **Account Balance** | Total cash in account (start of day) | $10,000 |
| **Open P&L** | Current profit/loss on open positions | -$250 |
| **Net Liquidating Value** | Balance + Open P&L (real-time worth) | $9,750 |
| **Initial Margin** | Required to open new positions | $1,200 |
| **Maintenance Margin** | Required to hold existing positions | $1,000 |
| **Available Margin** | How much you can use for new trades | $8,550 |

## The Danger Zone

**Available Margin** is the number that matters most:
- When it approaches **zero**, you can't open new trades
- When Net Liquidating Value drops below **Maintenance Margin**, you get a margin call
- Your broker will auto-liquidate positions to protect themselves

## Daily Statements

Every trading day, your broker sends a statement showing:
- Previous day balance
- All trades executed (with commissions)
- Margin charges
- End-of-day balance
- Open position mark-to-market values

## Calculating Your True Costs

Don't forget these hidden costs:
- **Commissions:** ~$1.00 round trip per MES
- **Data fees:** ~$15/month for CME data
- **Platform fees:** $0-100/month depending on platform
- **Slippage:** ~$1.25/trade on average (1 tick on MES)

> [!TIP]
> **Check your Net Liquidating Value, not your Balance.** Your balance only updates at end of day. Net Liq shows your REAL account value right now, including open position profits and losses.
`,
            quiz: [
                {
                    question: "What is Net Liquidating Value?",
                    options: [
                        "The amount you initially deposited",
                        "Your account balance plus unrealized P&L from open positions",
                        "The total commissions you've paid",
                        "Your available margin only"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "When does a margin call occur?",
                    options: [
                        "When you make too much profit",
                        "When Net Liquidating Value drops below Maintenance Margin",
                        "Every Friday",
                        "When you open a new position"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Which metric should you monitor in real-time during trading?",
                    options: [
                        "Account Balance (end of day only)",
                        "Net Liquidating Value (real-time account worth)",
                        "Previous month's statement",
                        "Total commissions paid this year"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "commissions-fees",
            title: "Commissions and Fees",
            content: `
# The Cost of Doing Business

Every trade has a cost. Understanding your total trading costs helps you set realistic profit targets and avoid death by a thousand cuts.

## Commission Structure

Most futures commissions are charged **per side, per contract**:

| Broker | Per Side | Round Trip | 10 Trades/Day |
|---|---|---|---|
| AMP | $0.25 | $0.50 | $5.00 |
| NinjaTrader | $0.53 | $1.06 | $10.60 |
| TradeStation | $1.50 | $3.00 | $30.00 |

"Per side" means you pay once to buy AND once to sell.

## Exchange Fees

On top of broker commissions, **exchanges charge fees**:
- CME fees: ~$1.18/round trip for ES, ~$0.30 for MES
- These are non-negotiable, set by the exchange

## Data Feed Costs

Real-time market data isn't free:
| Data | Monthly Cost |
|---|---|
| CME Level 1 | ~$10-15 |
| CME Level 2 (DOM) | ~$25 |
| ICE data | ~$10-15 |

## Total Cost Example

Trading MES, 10 round trips/day with AMP:
- Commissions: 10 × $0.50 = **$5.00**
- Exchange fees: 10 × $0.30 = **$3.00**
- Slippage (1 tick avg): 10 × $1.25 = **$12.50**
- **Total daily cost: ~$20.50**
- Monthly (20 days): **~$410**

This means you need to make **$410/month just to break even** before any profit.

> [!TIP]
> **Commissions compound against you.** If you're overtrading (20+ trades/day on MES), your monthly costs could exceed $800. Fewer but higher-quality trades dramatically improve your bottom line.
`,
            quiz: [
                {
                    question: "What does 'per side' mean in commission structure?",
                    options: [
                        "You only pay when you profit",
                        "You pay commission both when you buy AND when you sell",
                        "You pay once per day",
                        "Commission is only charged on losing trades"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Besides broker commissions, what other fees must you pay?",
                    options: [
                        "No other fees exist",
                        "Exchange fees and data feed costs",
                        "Only taxes",
                        "ATM withdrawal fees"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Approximately how much does a beginner need to make monthly just to cover costs?",
                    options: ["$0 — trading is free", "$50", "$200-400+", "$5,000"],
                    correctAnswer: 2
                }
            ]
        },
        {
            id: "data-feeds",
            title: "Data Feeds Explained",
            content: `
# The Pulse of the Market: Data Feeds

Your trading platform is only as good as the **data** flowing into it. Understand data feeds to avoid costly mistakes.

## What is a Data Feed?

A data feed is a **live stream of market data** delivered to your platform:
- Every trade that occurs (price, size, time)
- Every order in the book (bid/ask updates)
- Volume, open interest, settlement prices

## Types of Data

| Type | What It Shows | Who Needs It |
|---|---|---|
| **Level 1** | Best bid, best ask, last trade | Everyone |
| **Level 2** | Full order book depth (DOM) | Active day traders |
| **Tick Data** | Every single trade tick | Scalpers, algo traders |

## Data Feed Providers

Your broker typically provides data, but you can also use third-party feeds:
- **CQG** — Industry standard, very reliable
- **Rithmic** — Low latency, popular with day traders
- **DTN IQFeed** — Good for historical data
- **CME Direct** — Straight from the exchange

## Data Quality Issues

Bad data can cause real problems:
- **Delayed data** — Trading on 15-minute old prices is gambling blindly
- **Dropped ticks** — Missing price data creates false chart patterns
- **Stale quotes** — Platform showing yesterday's price as current

### How to Check:
1. Compare your platform's price with TradingView or CME website
2. If prices don't match, your data feed may have issues
3. Contact your broker immediately

> [!TIP]
> **Always trade with real-time data.** Free data is often delayed 10-20 minutes. The $10-15/month for live CME data is the cheapest insurance you'll ever buy. Never trade futures on delayed data.
`,
            quiz: [
                {
                    question: "What is a Level 1 data feed?",
                    options: [
                        "The cheapest gaming subscription",
                        "Best bid, best ask, and last trade price",
                        "Complete historical data from 1900",
                        "News headlines only"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What problem can a delayed data feed cause?",
                    options: [
                        "Your charts will look better",
                        "You'll trade on outdated prices, essentially gambling blind",
                        "Your commissions will increase",
                        "No problems at all"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "How can you verify your data feed is working correctly?",
                    options: [
                        "Just trust it",
                        "Compare your platform's prices with a reference like TradingView or CME website",
                        "Turn it off and on again",
                        "Ask other traders what they see"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "mobile-vs-desktop",
            title: "Mobile vs Desktop Trading",
            content: `
# Phone vs Computer: Where Should You Trade?

Mobile trading apps are tempting — trade from anywhere! But there are serious considerations.

## Desktop Advantages

![Desktop Trading Setup](https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1600&q=80)

- ✅ Multiple charts and windows simultaneously
- ✅ Full DOM and order flow tools
- ✅ Keyboard shortcuts for fast execution
- ✅ Stable internet connection (wired)
- ✅ Better analysis with drawing tools
- ✅ Lower latency (faster execution)

## Mobile Advantages

- ✅ Monitor positions away from desk
- ✅ Emergency exit capability
- ✅ Check pre-market conditions
- ✅ Alerts and notifications

## Mobile Dangers

- ❌ Small screen = limited information
- ❌ Fat finger errors (wrong button)
- ❌ Cellular connection can drop
- ❌ Distractions (notifications, calls)
- ❌ Impulsive trading (boredom trades)
- ❌ No real DOM or tape reading

## The Right Approach

| Task | Device |
|---|---|
| Analysis and planning | Desktop |
| Trade execution | Desktop |
| Position monitoring | Mobile (OK) |
| Emergency exits | Mobile (OK) |
| New trade entries | Mobile (Avoid) |
| Scalping | Desktop ONLY |

## The Toilet Trade Trap

Many traders admit to placing trades from the bathroom, grocery store, or while driving. This is **extremely dangerous**:
- No analysis backing the trade
- Emotional/impulsive decision
- Can't manage the trade properly
- Distracted environment

> [!WARNING]
> **Use mobile for monitoring, not trading.** The convenience of mobile trading is a double-edged sword. Most "bathroom trades" are impulsive, poorly planned, and result in losses. Be disciplined about where and when you trade.
`,
            quiz: [
                {
                    question: "What is mobile trading best used for?",
                    options: [
                        "Scalping and day trading",
                        "Monitoring positions and emergency exits",
                        "Complex chart analysis",
                        "Placing new trades while driving"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Why is desktop trading preferred for execution?",
                    options: [
                        "Because phones are too expensive",
                        "Multiple screens, keyboard shortcuts, stable connection, and full tools",
                        "Because exchanges require it",
                        "Because mobile apps don't exist"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is the 'toilet trade trap'?",
                    options: [
                        "A chart pattern",
                        "Impulsive, poorly planned trades placed from mobile in inappropriate settings",
                        "A type of order",
                        "A regulatory violation"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "platform-security",
            title: "Platform Security",
            content: `
# Protecting Your Trading Account

Your trading account contains real money. Security isn't optional — it's essential.

## Account Security Checklist

![Cybersecurity Lock](https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&w=1600&q=80)

### Must-Have Security:
- ✅ **Strong unique password** (16+ characters, not reused)
- ✅ **Two-Factor Authentication (2FA)** — Enable on every account
- ✅ **Dedicated email** for trading accounts only
- ✅ **Password manager** (Bitwarden, 1Password)
- ✅ **Updated software** — Platform, OS, and antivirus

### Internet Security:
- ✅ Wired connection preferred (more stable)
- ✅ Strong WiFi password (WPA3 if available)
- ❌ **NEVER** trade on public WiFi (coffee shops, airports)
- ❌ **NEVER** log into trading accounts on shared computers

## Backup Plans

Things WILL go wrong. Have a plan:

| Risk | Backup Plan |
|---|---|
| Internet goes down | Mobile hotspot ready |
| Power outage | Laptop battery + mobile |
| Platform crashes | Broker phone number saved |
| Computer dies | Platform on second device |

## Your Broker's Phone Number

**Save your broker's trade desk phone number in your phone.** If everything goes wrong and you have open positions, you can call to close them.

## Withdrawal Security

- Only withdraw to accounts in YOUR name
- Set up withdrawal whitelist addresses
- Monitor email for unauthorized withdrawal attempts
- Review account statements weekly

> [!TIP]
> **Treat your trading account like a bank vault.** No shared passwords, no public WiFi, no saving credentials on shared devices. The few minutes spent on security can prevent thousands in losses from unauthorized access.
`,
            quiz: [
                {
                    question: "What should you NEVER do when trading?",
                    options: [
                        "Use a wired internet connection",
                        "Enable two-factor authentication",
                        "Trade on public WiFi networks",
                        "Use a password manager"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "What should you save in your phone for emergencies?",
                    options: [
                        "Your trading password",
                        "Your broker's trade desk phone number",
                        "Screenshots of your P&L",
                        "Other traders' phone numbers"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is the most important backup plan to have?",
                    options: [
                        "A second trading strategy",
                        "A mobile hotspot and broker phone number in case internet/platform fails",
                        "A friend who can trade for you",
                        "Extra monitors"
                    ],
                    correctAnswer: 1
                }
            ]
        }
    ]
};
