export const module6 = {
    title: "Module 6: Order Types",
    lessons: [
        {
            id: "market-order",
            title: "The Market Order",
            content: `
# The Instant Button: Market Orders

A **market order** is the simplest order type — it says "Buy (or sell) right now at whatever the current price is."

## How It Works

1. You click "Buy Market"
2. Your order goes to the exchange
3. It fills at the best available **ask price**
4. You now own the contract

## Advantages ✅
- **Speed** — Fills immediately (or near-instantly)
- **Certainty** — You WILL get filled (in liquid markets)
- **Simple** — No price to specify

## Disadvantages ❌
- **Slippage** — You may not get the exact price you saw
- **Cost** — You cross the spread (pay the ask to buy, hit bid to sell)
- **Danger in volatility** — During fast moves, slippage can be severe

## When to Use Market Orders

| Situation | Use Market? |
|---|---|
| Exiting a losing position quickly | ✅ YES — Speed > Price |
| Breaking news, need to get in NOW | ✅ YES — But risky |
| Normal entry with no urgency | ❌ NO — Use limit |
| Low liquidity / wide spread | ❌ NO — Slippage too high |

## Slippage Example

You see ES at 5,000.25 and hit Buy Market:
- **Normal conditions:** Fill at 5,000.25 (0 slippage) ✅
- **Fast-moving market:** Fill at 5,000.75 (2 ticks slippage) ⚠️
- **Major news event:** Fill at 5,003.00 (11 ticks slippage!) ❌

> [!WARNING]
> **Market orders during major news events can be devastating.** If NFP data drops and the market gaps 20 points, your market order will fill at the new price, not the one you saw. Use limit orders around news unless you absolutely need to exit.
`,
            quiz: [
                {
                    question: "What does a market order guarantee?",
                    options: [
                        "The exact price you want",
                        "Execution — you WILL get filled, but the price may differ",
                        "Zero commissions",
                        "A profitable trade"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is 'slippage'?",
                    options: [
                        "When your chair slides on the floor",
                        "The difference between expected price and actual fill price",
                        "A type of chart pattern",
                        "When the market closes early"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "When is a market order most appropriate?",
                    options: [
                        "During low-liquidity overnight hours",
                        "When you need to exit a losing position immediately",
                        "When spreads are extremely wide",
                        "For every trade you make"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "limit-order",
            title: "The Limit Order",
            content: `
# The Patient Order: Limit Orders

A **limit order** says "I will only buy at this price or better." It gives you price control but not time control.

## How It Works

**Buy Limit:** "Buy 1 MES at 5,000.00 or lower"
- Your order sits in the book at 5,000.00
- It will ONLY fill if price comes down to 5,000.00
- If price never reaches 5,000.00, you don't get filled

**Sell Limit:** "Sell 1 MES at 5,010.00 or higher"
- Your order sits at 5,010.00
- Fills when price reaches UP to 5,010.00
- Often used as a profit target

## Advantages ✅
- **Price control** — You get the price you want (or better)
- **No slippage** — You specify the exact price
- **Spread savings** — You join the bid/ask instead of crossing
- **Discipline** — Forces you to plan ahead

## Disadvantages ❌
- **May not fill** — If price doesn't reach your level
- **Opportunity cost** — The trade runs without you
- **Partial fills** — Sometimes only some contracts fill

## Limit Order Use Cases

| Use Case | Example |
|---|---|
| **Buying a pullback** | Buy limit at 5,000 (support level) |
| **Taking profit** | Sell limit at 5,015 (target) |
| **Getting a better price** | Buy limit 1 tick below current price |
| **Avoiding bad entries** | "I'll only buy if price comes to my level" |

## Pro Tip: The Limit + Cancel Strategy

1. Set a buy limit at your support level
2. If price approaches but doesn't fill, watch the reaction
3. If the level breaks → cancel the order (don't buy falling knives)
4. If price bounces → you're in at the perfect price

> [!TIP]
> **Default to limit orders.** Unless speed is critical (exiting a loser), always use limits. Over months, the savings from avoiding slippage and spreads will be significant.
`,
            quiz: [
                {
                    question: "What does a Buy Limit order guarantee?",
                    options: [
                        "That you will be filled",
                        "That you will pay no more than your specified price",
                        "Immediate execution",
                        "A profitable trade"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is the main disadvantage of limit orders?",
                    options: [
                        "They always cause slippage",
                        "They are more expensive than market orders",
                        "They may not fill if price doesn't reach your specified level",
                        "They can only be used for selling"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "How can limit orders save you money over time?",
                    options: [
                        "By avoiding commissions",
                        "By joining the spread instead of crossing it, saving 1 tick per trade",
                        "By guaranteeing profits",
                        "They don't save money"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "stop-order",
            title: "The Stop Order",
            content: `
# Your Safety Net: Stop Orders

A **stop order** becomes a market order when a specific price is reached. It's primarily used for **risk management** — limiting your losses.

## How a Stop Loss Works

You're Long 1 MES at 5,010:
1. You set a **Sell Stop** at 5,000 (your maximum loss point)
2. If price drops to 5,000, your stop triggers
3. Your sell stop becomes a **market order**
4. You sell at 5,000 (or near it), limiting your loss to 10 points

## Stop Order Types

### Sell Stop (for Long positions)
- Placed BELOW your entry price
- Triggers a sell to close your long position
- Protects against downside

### Buy Stop (for Short positions)
- Placed ABOVE your entry price
- Triggers a buy to close your short position
- Protects against upside

### Buy Stop (for Breakout entries)
- Placed ABOVE current price
- "If price breaks above 5,020, buy me in"
- Used for breakout trading strategies

## Stop Order Risks

⚠️ **Stops become MARKET orders** when triggered. This means:
- In fast markets, fills may be worse than your stop price
- During gaps, your stop could fill significantly lower/higher
- This is called "stop slippage" and is unavoidable

## Where to Place Stops

| Method | Description |
|---|---|
| **Below support** | Place stop just below a key support level |
| **ATR-based** | Use Average True Range to set dynamic stops |
| **Percentage-based** | Risk 1-2% of account per trade |
| **Fixed ticks** | Always risk X ticks (e.g., 8 ticks on ES) |

> [!TIP]
> **A trade without a stop is a gamble, not a trade.** EVERY trade should have a stop loss before you enter. No exceptions. The stop defines your risk — without it, your loss is theoretically unlimited.
`,
            quiz: [
                {
                    question: "What happens when a stop order is triggered?",
                    options: [
                        "It cancels all other orders",
                        "It becomes a market order and executes at the best available price",
                        "It becomes a limit order",
                        "Nothing — it just sends an alert"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Where should you place a stop for a long position?",
                    options: [
                        "Above your entry price",
                        "At your entry price",
                        "Below your entry price, at a level that defines your maximum acceptable loss",
                        "Wherever you feel lucky"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "What is the risk of stop orders during fast-moving markets?",
                    options: [
                        "They won't trigger at all",
                        "They may fill at a worse price than expected (slippage)",
                        "They always fill at the exact price",
                        "They create additional commissions"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "stop-limit-orders",
            title: "Stop-Limit Orders",
            content: `
# Precision Control: Stop-Limit Orders

A **Stop-Limit** combines a stop trigger with a limit price. It gives you more control over your fill, but adds risk of NOT filling.

## How It Works

Instead of becoming a market order (like a regular stop), a stop-limit becomes a **limit order** when triggered.

**Example:**
- Stop Price: 5,000 (trigger)
- Limit Price: 4,998 (worst acceptable fill)
- If price drops to 5,000 → a limit order to sell at 4,998 or better is activated
- You'll fill between 5,000 and 4,998

## Stop-Limit vs Regular Stop

| Feature | Stop (Market) | Stop-Limit |
|---|---|---|
| **Execution guarantee** | YES | NO |
| **Price control** | NO | YES |
| **Slippage protection** | NO | YES |
| **Risk of not filling** | NO | YES |

## The Critical Decision

**Regular Stop:** You WILL get out, but the price might be bad
**Stop-Limit:** You MIGHT get out, but the price will be good

## When to Use Each

### Use Regular Stop When:
- This is your **primary risk management** stop
- Protecting against catastrophic loss
- You absolutely MUST exit

### Use Stop-Limit When:
- You want to avoid extreme slippage around news
- Setting entries on breakouts where you only want a specific price
- The market has normal liquidity

> [!WARNING]
> **Never use stop-limits as your only risk management tool.** If the market gaps through your stop-limit range, your order WON'T fill and your losses continue to grow. For protective stops, regular stops are safer because they guarantee execution.
`,
            quiz: [
                {
                    question: "What happens when a stop-limit order is triggered?",
                    options: [
                        "It becomes a market order",
                        "It becomes a limit order with your specified limit price",
                        "It cancels itself",
                        "It doubles your position"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is the main risk of using a stop-limit for risk management?",
                    options: [
                        "Higher commissions",
                        "It may NOT fill if the market gaps through your limit price",
                        "It's too slow",
                        "It always creates slippage"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "For your primary protective stop, which type is safer?",
                    options: [
                        "Stop-Limit (better price control)",
                        "Regular Stop (guarantees execution)",
                        "No stop at all",
                        "Both are equally safe"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "bracket-orders",
            title: "Bracket Orders (OCO)",
            content: `
# Set and Forget: Bracket Orders

A **bracket order** is the professional's trade setup. It enters you into a position and simultaneously sets your stop loss AND profit target.

## What is a Bracket Order?

Three orders linked together:
1. **Entry order** — Gets you into the trade
2. **Stop loss** — Protects your downside (below entry for longs)
3. **Profit target** — Takes your profit (above entry for longs)

The stop and target are **OCO (One-Cancels-Other)** — when one fills, the other automatically cancels.

## Example: Long Trade

Entry: Buy 1 MES at 5,000 (Market)
Stop Loss: Sell at 4,992 (-8 points, -$40 risk)
Profit Target: Sell at 5,016 (+16 points, +$80 profit)

- If price hits 5,016 → Target fills, stop cancels ✅
- If price hits 4,992 → Stop fills, target cancels ❌

## Why Bracket Orders Are Essential

1. **Discipline** — Your exit plan is set BEFORE the trade starts
2. **Emotion-free** — You can't move your targets in the heat of the moment
3. **Risk defined** — You know your maximum loss before entering
4. **Walk away** — Once set, the orders manage themselves

## Setting Up Bracket Orders

Most platforms let you pre-configure brackets:
- Default stop: 8 ticks
- Default target: 16 ticks  
- Adjust before each trade as needed

## Advanced: Trailing Brackets

Some platforms offer **trailing stops** within brackets:
- Your stop automatically follows price upward (for longs)
- Locks in profit as the trade moves in your favor
- But gives the trade room to breathe

> [!TIP]
> **Always use bracket orders.** They enforce discipline, define risk, and prevent emotional decision-making. Set your bracket BEFORE you enter, and resist the urge to modify it during the trade.
`,
            quiz: [
                {
                    question: "What does OCO stand for in bracket orders?",
                    options: [
                        "Only Cancel Once",
                        "One-Cancels-Other — when one fills, the other cancels",
                        "Order Confirmation Online",
                        "Open-Close-Open"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "In a bracket order for a long position, what are the three components?",
                    options: [
                        "Three different entry prices",
                        "Entry + Stop Loss (below) + Profit Target (above)",
                        "Three profit targets at different levels",
                        "Entry only, no stops"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Why are bracket orders important for discipline?",
                    options: [
                        "They cost less in commissions",
                        "They force you to define your exit plan before entering the trade",
                        "They guarantee profits",
                        "They make charts look better"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "trailing-stops",
            title: "Trailing Stops",
            content: `
# Letting Winners Run: Trailing Stops

A **trailing stop** is a dynamic stop loss that **follows price** in your favor but doesn't move against you.

## How Trailing Stops Work

You're Long 1 MES at 5,000 with a 10-point trailing stop:

| Price Moves To | Trailing Stop At | Status |
|---|---|---|
| 5,000 (entry) | 4,990 | Initial stop |
| 5,005 | 4,995 | Stop followed up ↑ |
| 5,015 | 5,005 | Stop followed up ↑ |
| 5,010 (pullback) | 5,005 | Stop STAYS ↔ |
| 5,020 | 5,010 | Stop followed up ↑ |
| 5,012 (drops) | 5,010 | **TRIGGERED** — exit at 5,010 |

**Result:** Entered at 5,000, exited at 5,010. Profit: 10 points ($50 on MES).

## Types of Trailing Stops

| Type | How It Trails |
|---|---|
| **Fixed tick** | Trails by a set number of ticks (e.g., 20 ticks) |
| **ATR-based** | Trails based on market volatility |
| **Percentage** | Trails by a percentage of the price |
| **Candle-based** | Moves to below the low of the previous candle |

## Pros and Cons

### Pros ✅
- Lets winning trades run
- Locks in profit automatically
- Removes emotion from exit decisions

### Cons ❌
- Can get stopped out on normal pullbacks
- Too tight = stopped out too early
- Too wide = gives back too much profit

## Finding the Right Distance

- **Too tight (5 ticks on ES):** Stopped out by noise
- **Too wide (50 ticks):** Gives back most of your profit
- **Sweet spot:** 2-3× the Average True Range (ATR) of your timeframe

> [!TIP]
> **Not every trade needs a trailing stop.** For scalps with fixed targets, bracket orders are better. Use trailing stops on trades where you believe a larger move is possible but don't know the exact target.
`,
            quiz: [
                {
                    question: "How does a trailing stop behave?",
                    options: [
                        "It moves in both directions with price",
                        "It follows price in your favor but stays in place during pullbacks",
                        "It stays at your entry price forever",
                        "It moves against you"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What happens if a trailing stop is set too tight?",
                    options: [
                        "You make more profit",
                        "Nothing changes",
                        "Normal market noise stops you out prematurely",
                        "Your account gets a bonus"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "When is a trailing stop most useful?",
                    options: [
                        "On every single trade",
                        "When you believe a larger trend move is possible but don't know the exact target",
                        "Only on losing trades",
                        "Only on 1-minute charts"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "gtc-vs-day",
            title: "GTC vs Day Orders",
            content: `
# Time Limits: How Long Does Your Order Live?

Every order has a **time-in-force** setting that determines how long it stays active. Understanding this prevents unexpected fills.

## Time-in-Force Options

### Day Order (DAY)
- **Expires:** At the end of the current trading session
- **Use:** Most day trading orders
- **Benefit:** Don't wake up to surprise fills overnight
- **This is usually the default setting**

### Good Till Cancelled (GTC)
- **Expires:** Never (until you manually cancel it)
- **Use:** Swing trade entries at specific levels
- **Risk:** Forgetting about old orders that fill unexpectedly

### Good Till Date (GTD)
- **Expires:** On a specific date you set
- **Use:** Orders tied to specific events or catalysts

## The GTC Trap

**Real scenario that happens to beginners:**
1. Monday: You set a buy limit at 4,950 (GTC)
2. Price never reaches it, you forget about it
3. Thursday: Major news drops, market crashes to 4,940
4. Your old order fills at 4,950 — while the market is in free fall
5. You now own a position you didn't want, in a crashing market

## Best Practices

| Trader Type | Default TIF | Why |
|---|---|---|
| **Scalper** | DAY | No overnight risk |
| **Day Trader** | DAY | Clean slate each day |
| **Swing Trader** | GTC or GTD | Need orders to persist |

## End-of-Day Checklist

Before stepping away:
1. ✅ Flatten all day trade positions
2. ✅ Cancel all working orders (if day trading)
3. ✅ Check for any GTC orders still active
4. ✅ Verify your account has no unexpected positions

> [!TIP]
> **Default to DAY orders.** Set your platform to DAY as the default time-in-force. This way, any order you forget to cancel will die at end of session, preventing surprise overnight fills.
`,
            quiz: [
                {
                    question: "What does a 'Day' order do at the end of the trading session?",
                    options: [
                        "Converts to a GTC order",
                        "Automatically cancels if not filled",
                        "Doubles in size",
                        "Executes at market close"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is the risk of GTC (Good Till Cancelled) orders?",
                    options: [
                        "They expire too quickly",
                        "Forgetting about them and getting unexpected fills days or weeks later",
                        "They cost more in commissions",
                        "They can only be used for buying"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What should you set as your platform's default time-in-force?",
                    options: [
                        "GTC — so orders never expire",
                        "DAY — so forgotten orders cancel at session end",
                        "IOC — so orders cancel instantly",
                        "FOK — so orders fill or die"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "fok-ioc-orders",
            title: "Fill or Kill and IOC Orders",
            content: `
# Speed Orders: FOK and IOC

These are **aggressive order types** designed for when you need fills under specific conditions. They're less common for beginners but important to understand.

## Fill or Kill (FOK)

**Definition:** The ENTIRE order must fill instantly, or it cancels completely.

**Example:**
- You want to buy exactly 10 MES contracts at 5,000
- If all 10 can fill immediately → Order executes
- If only 7 can fill immediately → ENTIRE order cancels (no partial fill)

**Use case:** When you need a specific quantity and don't want partial fills.

## Immediate or Cancel (IOC)

**Definition:** Fill as much as possible IMMEDIATELY, cancel the rest.

**Example:**
- You want to buy 10 MES contracts at 5,000
- 7 are available immediately → 7 contracts fill
- Remaining 3 → Cancelled (don't wait for them)

**Use case:** When you want instant execution but accept partial fills.

## Comparison

| Feature | FOK | IOC | Regular Limit |
|---|---|---|---|
| Partial fills? | NO | YES | YES |
| Waits for price? | NO | NO | YES |
| Speed | Instant or cancel | Instant, then cancel | Patient |

## When Beginners Need These

Honestly? **Rarely.** As a beginner trading 1-2 MES contracts:
- Regular limit orders work fine
- You won't have partial fill concerns
- Market orders handle urgency

These become important when:
- Trading larger quantities (10+ contracts)
- Algorithmic trading
- Institutional order management

> [!TIP]
> **Know these exist, but don't worry about using them yet.** Focus on mastering Market, Limit, Stop, and Bracket orders first. FOK and IOC are tools for later in your journey when position sizing increases.
`,
            quiz: [
                {
                    question: "What does a Fill or Kill (FOK) order do?",
                    options: [
                        "Fills slowly over several minutes",
                        "Fills the ENTIRE order instantly or cancels completely — no partial fills",
                        "Keeps trying until the end of the day",
                        "Only works on Friday"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "How does IOC differ from FOK?",
                    options: [
                        "They are identical",
                        "IOC allows partial fills, FOK requires complete fill or nothing",
                        "IOC is slower than FOK",
                        "IOC can only be used for selling"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Should beginners focus on FOK/IOC orders?",
                    options: [
                        "Yes, use them for every trade",
                        "No — master Market, Limit, Stop, and Bracket orders first",
                        "Only for demo trading",
                        "Only on Mondays"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "order-routing",
            title: "Order Routing Basics",
            content: `
# The Journey: How Your Order Reaches the Exchange

When you click "Buy," your order goes on a journey from your screen to the exchange. Understanding this helps you appreciate execution quality.

## The Order Flow Path

1. **You click Buy** on your platform
2. **Platform** validates the order (correct symbol, size, margin check)
3. **Broker** receives the order (via internet)
4. **Broker's system** validates and routes to exchange
5. **Exchange matching engine** finds a seller
6. **Trade matches** — confirmation sent back
7. **You see the fill** on your platform

Total time: **50-200 milliseconds** for retail traders

## What Can Go Wrong

| Problem | Impact | Solution |
|---|---|---|
| Slow internet | Delayed order arrival | Use wired connection |
| Platform lag | Buttons don't respond | Restart platform |
| Broker outage | Orders don't send | Have phone number ready |
| Exchange halt | No matching occurs | Wait for trading to resume |

## Direct Market Access (DMA)

Some brokers offer **DMA** — your orders go more directly to the exchange with fewer intermediaries:
- **Faster execution** (fewer hops)
- **Better fills** (no order manipulation)
- **More expensive** (higher data/platform costs)

## Smart Order Routing

Advanced platforms offer smart routing that:
- Finds the best price across multiple venues
- Selects the fastest execution path
- Usually automatic — you don't need to configure it

> [!TIP]
> **For beginners, don't overthink order routing.** With established brokers like NinjaTrader, AMP, or Interactive Brokers, your order routing is already optimized. Focus on your trading rather than microseconds of execution speed.
`,
            quiz: [
                {
                    question: "How long does it typically take for a retail order to reach the exchange?",
                    options: [
                        "5-10 minutes",
                        "50-200 milliseconds",
                        "Exactly 1 second",
                        "Instantly (0 milliseconds)"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is Direct Market Access (DMA)?",
                    options: [
                        "A type of chart pattern",
                        "A more direct route for orders to reach the exchange with fewer intermediaries",
                        "A social media platform for traders",
                        "A free service from all brokers"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What should you have ready in case your broker's platform goes down?",
                    options: [
                        "A second trading strategy",
                        "Your broker's trade desk phone number for emergency order placement",
                        "A different market to trade",
                        "A newspaper"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "order-strategy-building",
            title: "Building Your Order Strategy",
            content: `
# Putting It All Together: Your Order Playbook

Now that you know all the order types, let's build a **systematic approach** to order management.

## The Trade Execution Checklist

Before EVERY trade, know these 5 things:

1. **Entry Type:** Limit? Market? Stop?
2. **Entry Price:** Where exactly are you getting in?
3. **Stop Loss:** Where do you exit if wrong?
4. **Profit Target:** Where do you take profit?
5. **Position Size:** How many contracts?

## The Standard Workflow

### Step 1: Identify the Setup
"I see a bull flag on the 5-minute chart at support"

### Step 2: Define the Trade
- Entry: Buy Limit at 5,000 (support level)
- Stop: 4,992 (-8 points)
- Target: 5,016 (+16 points)
- Size: 1 MES contract
- Risk/Reward: 1:2 ($10 risk, $20 reward)

### Step 3: Place the Bracket Order
Enter all three orders simultaneously

### Step 4: Manage
- If filled → let the bracket work
- If not filled within 30 min → cancel and reassess
- DON'T modify the stop

## Common Order Mistakes

| Mistake | Fix |
|---|---|
| No stop loss | ALWAYS set a stop before entry |
| Moving stop further away | Accept the loss, follow your plan |
| Chasing entries with market orders | Be patient, use limits |
| Forgetting to set quantity | Double-check before clicking |
| Wrong direction (buy vs sell) | Slow down, verify the order ticket |

## Order Management Rules

1. **Never trade without a stop** — This is non-negotiable
2. **Use brackets** — Let the system manage your exits
3. **Default to limits** — Cross the spread only when necessary
4. **Check before clicking** — Verify symbol, quantity, and direction
5. **Have a maximum daily order limit** — Prevents overtrading

> [!TIP]
> **Write your trade plan BEFORE touching the order buttons.** Decide entry, stop, target, and size on paper (or in your journal), then execute. This prevents impulse errors and emotional trading.
`,
            quiz: [
                {
                    question: "What 5 things should you know before EVERY trade?",
                    options: [
                        "Color of candles, time of day, moon phase, news, weather",
                        "Entry type, entry price, stop loss, profit target, and position size",
                        "Broker name, commission, platform, data feed, monitor size",
                        "Which indicator is green, trend line color, moving average period"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is the most common and dangerous order mistake?",
                    options: [
                        "Using too many indicators",
                        "Trading without a stop loss",
                        "Using the wrong color theme",
                        "Trading too few contracts"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Why should you write your trade plan before touching order buttons?",
                    options: [
                        "Because the exchange requires it",
                        "To prevent impulse errors and emotional trading decisions",
                        "To waste time",
                        "Because your broker can see your notes"
                    ],
                    correctAnswer: 1
                }
            ]
        }
    ]
};
