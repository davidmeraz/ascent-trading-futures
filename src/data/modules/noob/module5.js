export const module5 = {
    title: "Module 5: Chart Basics",
    lessons: [
        {
            id: "what-is-price-chart",
            title: "What is a Price Chart?",
            content: `
# Your Map: The Price Chart

A price chart is a **visual history** of where the market has been. It's the primary tool every trader uses to make decisions.

## Types of Charts

![Chart Analysis](https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80)

### 1. Line Chart
- Connects closing prices with a line
- Simple and clean
- Good for seeing the overall trend
- Hides intraday details

### 2. Bar Chart (OHLC)
- Shows Open, High, Low, Close for each period
- More information than line charts
- Used by traditional traders

### 3. Candlestick Chart ⭐
- Same data as bar charts but **color-coded**
- Green/White = Price went UP (bullish)
- Red/Black = Price went DOWN (bearish)
- **Most popular** — this is what we'll use

## The Axes

| Axis | What It Shows |
|---|---|
| **Y-axis (vertical)** | Price |
| **X-axis (horizontal)** | Time |

## Chart Scaling

- **Linear scale:** Equal spacing for equal price moves ($5,000 to $5,010 = same space as $5,010 to $5,020)
- **Logarithmic scale:** Equal spacing for equal percentage moves (useful for long-term charts)

For day trading, always use **linear scale**.

> [!TIP]
> **Candlestick charts are the industry standard.** They show the most information in the most intuitive visual format. Get comfortable reading candles — it's the language every trader speaks.
`,
            quiz: [
                {
                    question: "Which chart type is most popular among modern traders?",
                    options: ["Line Chart", "Bar Chart", "Candlestick Chart", "Point and Figure Chart"],
                    correctAnswer: 2
                },
                {
                    question: "What does a green candlestick indicate?",
                    options: [
                        "The market is closed",
                        "Price went DOWN during that period",
                        "Price went UP during that period (bullish)",
                        "High volume"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "Which scale should day traders use?",
                    options: ["Logarithmic", "Linear", "Fibonacci", "Random"],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "candlestick-anatomy",
            title: "Candlestick Anatomy",
            content: `
# Reading Candles Like a Pro

Every candlestick tells a story of the battle between buyers and sellers. Learning to read them is essential.

## The Four Data Points

Each candle shows:
1. **Open** — Where price started
2. **High** — The highest price reached
3. **Low** — The lowest price reached
4. **Close** — Where price ended

## Candle Structure

### The Body
- The thick part between Open and Close
- **Long body** = Strong conviction (buyers or sellers dominated)
- **Short body** = Indecision (neither side won)

### The Wicks (Shadows)
- Thin lines above and below the body
- **Upper wick** = Price went up here but sellers pushed it back down
- **Lower wick** = Price went down here but buyers pushed it back up
- **Long wicks** = Rejection of that price level

## Key Single-Candle Patterns

| Pattern | Look | Meaning |
|---|---|---|
| **Doji** | Tiny body, equal wicks | Indecision, potential reversal |
| **Hammer** | Small body, long lower wick | Bullish reversal (at bottom) |
| **Shooting Star** | Small body, long upper wick | Bearish reversal (at top) |
| **Marubozu** | Full body, no wicks | Extreme conviction |
| **Spinning Top** | Small body, equal wicks | Indecision |

## Reading the Story

A candle with a long lower wick at a support level tells you:
> "Sellers tried to push price down, but buyers stepped in aggressively and pushed it back up. The bulls are defending this level."

> [!TIP]
> **Context is everything.** A hammer at a major support level is powerful. A hammer in the middle of nowhere is meaningless. Always read candles within their context — never in isolation.
`,
            quiz: [
                {
                    question: "What do long wicks on a candlestick indicate?",
                    options: [
                        "High volume",
                        "Rejection of that price level — price tried but was pushed back",
                        "The candle is broken",
                        "The market was closed"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What pattern has a small body with a long lower wick and signals bullish reversal?",
                    options: ["Doji", "Marubozu", "Hammer", "Shooting Star"],
                    correctAnswer: 2
                },
                {
                    question: "Why should you never read candlestick patterns in isolation?",
                    options: [
                        "Because candles are unreliable",
                        "Because the pattern's meaning depends on context — where it appears matters",
                        "Because you need at least 100 candles",
                        "Because only institutions can read them"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "timeframes-explained",
            title: "Timeframes Explained",
            content: `
# Timeframes: Choosing Your Lens

The same market looks completely different depending on which **timeframe** you choose. Understanding this prevents confusion and conflicting signals.

## What is a Timeframe?

Each candle represents a fixed period of time:

| Timeframe | Each Candle = | Best For |
|---|---|---|
| 1-minute | 1 minute of activity | Scalping |
| 5-minute | 5 minutes | Day trading (standard) |
| 15-minute | 15 minutes | Day trading (context) |
| 1-hour | 1 hour | Swing trading |
| 4-hour | 4 hours | Swing trading |
| Daily | 1 full trading day | Position trading |
| Weekly | 1 week | Long-term analysis |

## The Timeframe Paradox

The SAME market can look different on different timeframes:
- **5-min chart:** Looks like it's crashing (scary red candles)
- **Daily chart:** Just a normal pullback within a strong uptrend

This is why you need **multiple timeframe analysis** — checking at least 2-3 timeframes.

## Recommended Timeframe Combination

| Role | Timeframe | Purpose |
|---|---|---|
| **Higher** | 1-hour or Daily | See the big picture trend |
| **Trading** | 5-minute | Your main decision chart |
| **Entry** | 1-minute | Fine-tune your entry |

## Common Mistakes

❌ Using 1-second charts (too much noise)
❌ Using only one timeframe (missing context)
❌ Switching timeframes mid-trade to justify staying in a loser
❌ Analysis paralysis from checking too many timeframes

> [!TIP]
> **The 5-minute chart is your bread and butter.** It shows enough detail for entries without the noise of lower timeframes. Start here and only zoom in/out when you need context.
`,
            quiz: [
                {
                    question: "What timeframe is considered the standard for day trading?",
                    options: ["1-second", "1-minute", "5-minute", "Daily"],
                    correctAnswer: 2
                },
                {
                    question: "Why is multiple timeframe analysis important?",
                    options: [
                        "To make charts look more colorful",
                        "Because the same market can look different on different timeframes",
                        "Because exchanges require it",
                        "To increase trading costs"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is a common mistake with timeframes?",
                    options: [
                        "Using the 5-minute chart",
                        "Checking the daily chart for context",
                        "Switching timeframes mid-trade to justify staying in a losing position",
                        "Using the same timeframe every day"
                    ],
                    correctAnswer: 2
                }
            ]
        },
        {
            id: "support-resistance",
            title: "Support and Resistance",
            content: `
# The Invisible Walls: Support and Resistance

Support and resistance are the **most fundamental concepts** in technical analysis. They are price levels where the market has historically reacted.

## What is Support?

![Foundation Wall](https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80)

**Support** is a price level where **buyers step in** and prevent the price from falling further. Think of it as a floor.

- Price falls toward support
- Buyers overwhelm sellers
- Price bounces back up
- The more times it bounces, the stronger the support

## What is Resistance?

**Resistance** is a price level where **sellers step in** and prevent the price from rising further. Think of it as a ceiling.

- Price rises toward resistance
- Sellers overwhelm buyers
- Price falls back down
- The more times it fails here, the stronger the resistance

## Key Principles

### 1. Role Reversal
When support **breaks**, it becomes resistance. When resistance **breaks**, it becomes support. This is one of the most reliable patterns in trading.

### 2. Round Numbers
Prices like 5,000, 4,500, and 18,000 act as psychological support/resistance because humans think in round numbers.

### 3. Multiple Touches = Strength
A level that has been tested 5 times is stronger than one tested twice. Each touch validates it.

### 4. Volume Confirms Breaks
A break through support/resistance on **high volume** is more likely real. Low volume breaks often fail.

> [!TIP]
> **Don't fight strong support and resistance.** If price keeps bouncing off a level, trade WITH the bounce rather than trying to force through. Let the market tell you when a level has truly broken.
`,
            quiz: [
                {
                    question: "What is a 'support' level?",
                    options: [
                        "A price where sellers dominate",
                        "A price level where buyers step in and prevent further decline",
                        "The highest price of the day",
                        "A random horizontal line"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What happens when a support level breaks?",
                    options: [
                        "It disappears forever",
                        "It becomes a resistance level (role reversal)",
                        "The market closes",
                        "It becomes stronger support"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Why do round numbers (like 5,000) often act as support/resistance?",
                    options: [
                        "Because the exchange sets them as limits",
                        "Because humans think in round numbers, creating psychological barriers",
                        "Because algorithms like round numbers",
                        "They don't — round numbers are irrelevant"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "trend-lines",
            title: "Trend Lines",
            content: `
# Drawing the Map: Trend Lines

Trend lines are the simplest tool to visualize the market's direction. Connecting highs and lows reveals the underlying structure.

## What is a Trend Line?

A trend line is a **diagonal line** connecting two or more price points:
- **Uptrend line:** Connect rising lows (support)
- **Downtrend line:** Connect falling highs (resistance)

## How to Draw Them

### Uptrend Line:
1. Find two consecutive **higher lows**
2. Draw a line connecting them
3. Extend the line forward
4. The third touch **validates** the trend line

### Downtrend Line:
1. Find two consecutive **lower highs**
2. Draw a line connecting them
3. Extend the line forward
4. The third touch validates it

## Trend Line Rules

| Rule | Detail |
|---|---|
| **Minimum touches** | 2 to draw, 3 to validate |
| **Wicks vs bodies** | Be consistent — use either wicks or bodies |
| **Steeper = weaker** | Very steep trend lines break sooner |
| **Valid until broken** | Once cleanly broken, the trend line is dead |

## Using Trend Lines for Trading

- **Buy** when price touches an uptrend line (support bounce)
- **Sell** when price touches a downtrend line (resistance rejection)
- **Exit** when price breaks through the trend line

## Common Drawing Mistakes

❌ Forcing a line to fit — if it doesn't look clean, it's not valid
❌ Drawing too many lines — cluttering your chart
❌ Ignoring the trend line break — holding your position when the line is broken

> [!TIP]
> **Less is more with trend lines.** Only draw the obvious, clear ones. If you have to squint or stretch to make a line "work," it's probably not a valid trend line. The best ones are visible from across the room.
`,
            quiz: [
                {
                    question: "How do you draw an uptrend line?",
                    options: [
                        "Connect falling highs",
                        "Connect rising lows",
                        "Draw a horizontal line at the current price",
                        "Connect random points"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "How many touches validate a trend line?",
                    options: ["1", "2", "3", "10"],
                    correctAnswer: 2
                },
                {
                    question: "What does a steeper trend line generally indicate?",
                    options: [
                        "A stronger, more reliable trend",
                        "The trend is likely to break sooner — steep trends are unsustainable",
                        "More trading volume",
                        "An institutional trend"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "moving-averages-intro",
            title: "Moving Averages Introduction",
            content: `
# The Smoothing Effect: Moving Averages

Moving averages are the **most used indicator** in the world. They smooth out price noise to show you the underlying trend.

## What is a Moving Average?

A moving average (MA) calculates the **average closing price** over a set number of periods.

**Example:** A 20-period MA on a 5-minute chart averages the last 20 candles' closing prices.

## Types of Moving Averages

### Simple Moving Average (SMA)
- Gives **equal weight** to all periods
- Smoother but slower to react
- Good for identifying longer-term trends

### Exponential Moving Average (EMA)
- Gives **more weight** to recent prices
- Faster to react to new data
- Better for short-term trading

## Key Moving Average Periods

| Period | Use | Description |
|---|---|---|
| **9 EMA** | Very short-term | Scalping, fast moves |
| **20 EMA** | Short-term | Day trading standard |
| **50 SMA** | Medium-term | Swing trading |
| **200 SMA** | Long-term | Major trend identifier |

## How to Use Moving Averages

### Trend Direction
- Price ABOVE the MA → Uptrend
- Price BELOW the MA → Downtrend

### Dynamic Support/Resistance
Moving averages act as **moving support/resistance** levels. Price often bounces off the 20 EMA in a strong trend.

### Crossovers
When a fast MA (9) crosses above a slow MA (21), it's a **bullish signal**. When it crosses below, **bearish**.

> [!TIP]
> **Don't use too many MAs.** Two or three is enough (e.g., 9 EMA + 21 EMA). Adding more just creates confusion and contradictory signals. Keep it clean.
`,
            quiz: [
                {
                    question: "What does a moving average do?",
                    options: [
                        "Predicts exact future prices",
                        "Smooths out price noise to show the underlying trend",
                        "Counts the number of trades",
                        "Measures trading volume"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is the difference between SMA and EMA?",
                    options: [
                        "They are the same thing",
                        "EMA gives more weight to recent prices, making it faster to react",
                        "SMA is only for stocks, EMA for futures",
                        "EMA uses daily data only"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What does it mean when price is consistently above the 200 SMA?",
                    options: [
                        "The market is in a short-term downtrend",
                        "The market is in a major long-term uptrend",
                        "Moving averages are broken",
                        "Nothing — the 200 SMA is useless"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "volume-on-charts",
            title: "Volume on Charts",
            content: `
# Volume Bars: The Confirmation Tool

Volume bars appear at the bottom of your chart and show **how many contracts traded** during each candle. They confirm or deny what price is telling you.

## Reading Volume Bars

![Volume Analysis](https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1600&q=80)

- **Tall bars** = High volume (lots of participation)
- **Short bars** = Low volume (few traders active)
- Volume bars are usually colored to match the candle (green = up, red = down)

## Volume + Price Action

| Price Action | Volume | Interpretation |
|---|---|---|
| Big green candle | HIGH volume | ✅ Healthy buying, trend likely continues |
| Big green candle | LOW volume | ⚠️ Weak buying, might reverse |
| Big red candle | HIGH volume | ✅ Strong selling, decline likely continues |
| Big red candle | LOW volume | ⚠️ Weak selling, might bounce |
| Any candle | SPIKE in volume | 🔔 Pay attention! Something significant happened |

## Volume Spikes at Key Levels

When price reaches support/resistance and volume spikes, it means **a battle is happening** at that level:
- Volume spike + price holds = Level is strong
- Volume spike + price breaks through = Legitimate breakout

## Volume Patterns Through the Day

Typical ES volume pattern:
1. **High** at market open (8:30-9:30 AM CT)
2. **Drops** during mid-day (11:00 AM - 1:00 PM)
3. **Picks up** in afternoon (1:00 - 3:00 PM)
4. **Spikes** near close (3:00 - 4:00 PM)

The mid-day low volume period is called the "lunch hour chop" — many traders avoid this time.

> [!TIP]
> **Volume is truth.** Price can be manipulated briefly, but volume cannot be faked on a macro level. When price and volume agree, trust the move. When they disagree, be cautious.
`,
            quiz: [
                {
                    question: "What does a big green candle with LOW volume suggest?",
                    options: [
                        "A strong, healthy uptrend",
                        "Weak buying power — the move might not sustain",
                        "That volume doesn't matter",
                        "An immediate reversal is guaranteed"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "When is volume typically lowest during the US session?",
                    options: [
                        "At market open",
                        "Mid-day lunch hours (11 AM - 1 PM CT)",
                        "Near market close",
                        "Volume is constant throughout the day"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What does a volume spike at a key support level indicate?",
                    options: [
                        "Nobody is interested in that price",
                        "A significant battle between buyers and sellers at that level",
                        "The exchange is malfunctioning",
                        "Time to stop trading for the day"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "basic-chart-patterns",
            title: "Basic Chart Patterns",
            content: `
# Patterns: When the Market Repeats Itself

Certain price formations appear repeatedly across all markets and timeframes. Recognizing them gives you a structured way to trade.

## Continuation Patterns

These suggest the trend will CONTINUE:

### Bull Flag 🟢
1. Strong upward move (the "pole")
2. Slight downward consolidation (the "flag")
3. Breakout upward continues the trend

### Bear Flag 🔴
1. Strong downward move
2. Slight upward consolidation
3. Breakout downward continues the decline

### Triangle (Ascending)
- Higher lows pressing into flat resistance
- Typically breaks UP
- Volume decreases into the triangle, then explodes on breakout

## Reversal Patterns

These suggest the trend is about to CHANGE:

### Double Top 🔴
1. Price hits resistance — bounces down
2. Price returns to same level — bounces down again
3. "M" shape — bearish signal

### Double Bottom 🟢
1. Price hits support — bounces up
2. Price returns to same level — bounces up again
3. "W" shape — bullish signal

### Head and Shoulders 🔴
1. Left shoulder → Head (higher high) → Right shoulder
2. Neckline connects the lows
3. Break below neckline = trend reversal

## Important Rules

1. **Patterns fail.** No pattern is 100% reliable — always use stops
2. **Wait for confirmation.** Don't trade the pattern BEFORE it completes
3. **Volume confirms.** Real breakouts come with volume
4. **Don't force it.** If it doesn't look clean, skip it

> [!TIP]
> **Learn 2-3 patterns well before learning more.** The Bull Flag and Double Bottom are the highest-probability patterns for beginners. Master these before adding complexity.
`,
            quiz: [
                {
                    question: "What does a Bull Flag pattern signal?",
                    options: [
                        "The trend is reversing to bearish",
                        "A continuation of the uptrend after a brief consolidation",
                        "The market is closed",
                        "Extreme volatility is ahead"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What shape does a Double Bottom form?",
                    options: [
                        "An 'M' shape",
                        "A 'V' shape",
                        "A 'W' shape — bullish reversal signal",
                        "A circle"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "What should ALWAYS accompany your pattern-based trades?",
                    options: [
                        "A lucky charm",
                        "A stop loss, because no pattern is 100% reliable",
                        "At least 10 more indicators",
                        "Approval from another trader"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "multiple-timeframe-analysis",
            title: "Multiple Timeframe Analysis",
            content: `
# The Big Picture: Multiple Timeframe Analysis

Looking at one timeframe is like reading one paragraph of a book. **Multiple timeframe analysis (MTA)** tells the full story.

## The Three-Screen Method

| Screen | Timeframe | Purpose |
|---|---|---|
| **1. Trend** | Daily or 1-Hour | Determine the major trend direction |
| **2. Signal** | 5-Minute | Find your trading setup |
| **3. Entry** | 1-Minute | Fine-tune your exact entry point |

## How It Works

### Step 1: Higher Timeframe (Direction)
Check the 1-hour chart:
- Is it trending up, down, or sideways?
- Where are the major support/resistance levels?
- **Decision:** "I will only look for LONG trades today"

### Step 2: Trading Timeframe (Setup)
Check the 5-minute chart:
- Is there a Bull Flag forming?
- Is price pulling back to the 20 EMA?
- **Decision:** "I see a setup forming near support"

### Step 3: Entry Timeframe (Precision)
Check the 1-minute chart:
- Wait for a bullish candle pattern (hammer, engulfing)
- Place your entry with a tight stop

## The Rule of Three

**Only take trades where all three timeframes agree:**
- Higher timeframe says UP ✅
- Trading timeframe shows a bullish setup ✅
- Entry timeframe confirms with a buy signal ✅

If any timeframe disagrees → **No trade.** Wait for alignment.

## Common MTA Mistakes

❌ Trading against the higher timeframe trend
❌ Only using the entry timeframe (missing the big picture)
❌ Getting paralyzed by too many timeframes (stick to 3)

> [!TIP]
> **Trade WITH the higher timeframe, enter on the lower timeframe.** This is the single most powerful concept in technical analysis. You're using the big trend's momentum while entering at optimal prices.
`,
            quiz: [
                {
                    question: "What is the purpose of the higher timeframe in MTA?",
                    options: [
                        "To find your exact entry point",
                        "To determine the major trend direction",
                        "To count candles",
                        "To calculate commissions"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "When should you take a trade according to MTA?",
                    options: [
                        "Whenever you feel like it",
                        "Only when all three timeframes agree on direction",
                        "Only on the 1-minute chart",
                        "Only on the daily chart"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is the 'Rule of Three' in MTA?",
                    options: [
                        "Take exactly 3 trades per day",
                        "All three timeframes must agree before entering a trade",
                        "Use only 3 indicators",
                        "Wait 3 minutes before trading"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "chart-customization",
            title: "Chart Settings and Customization",
            content: `
# Making It Yours: Chart Customization

A well-configured chart reduces noise and helps you make better decisions. Here's how to set up a clean, professional workspace.

## Color Scheme

### Dark Mode (Recommended for Long Sessions):
- **Background:** Dark gray (#1a1a2e) or black
- **Bull candles:** Green or lime
- **Bear candles:** Red
- **Grid lines:** Very subtle or off
- **Text:** White or light gray

### Why Dark Mode?
- Reduces eye strain during long sessions
- Most professional traders use dark backgrounds
- Makes colored elements (candles, indicators) pop

## Essential Settings

| Setting | Recommendation | Why |
|---|---|---|
| **Candle Style** | Candlestick | Most information density |
| **Grid** | Off or very faint | Reduces visual noise |
| **Crosshair** | On | Precisely read prices |
| **Volume** | Bottom panel | Confirm price moves |
| **Right Margin** | ~20% empty | Room for future price action |

## What to Remove

Strip your chart of these common distractions:
- ❌ News headlines on chart
- ❌ More than 2-3 indicators
- ❌ Watermarks and logos
- ❌ Bright grid lines
- ❌ Multiple colored backgrounds

## Building Chart Templates

Once you've configured your perfect setup:
1. **Save it as a template** — Most platforms support this
2. **Name it clearly** — "ES_DayTrading_5min"
3. **Create templates** for each timeframe
4. **Back up your templates** — Don't lose your work!

## The Clean Chart Philosophy

Many elite traders use **"naked charts"** — price and volume only, no indicators:
- Forces you to read price action
- Eliminates conflicting signals
- Builds true chart reading skill

> [!TIP]
> **A clean chart is a clear mind.** If your chart looks like a Christmas tree with lights everywhere, you'll struggle to make decisions. Start clean, add only what you truly need, and resist the urge to add more.
`,
            quiz: [
                {
                    question: "Why is dark mode recommended for trading charts?",
                    options: [
                        "Because it looks more professional",
                        "It reduces eye strain and makes colored elements more visible",
                        "Because exchanges require it",
                        "It makes the market move differently"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is a 'naked chart'?",
                    options: [
                        "A chart with no data",
                        "A chart showing only price and volume with no indicators",
                        "A chart that is unpublished",
                        "A chart from an unregulated exchange"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "How many indicators should a beginner have on their chart?",
                    options: [
                        "As many as possible (10+)",
                        "Exactly 7",
                        "2-3 maximum to avoid conflicting signals",
                        "None ever"
                    ],
                    correctAnswer: 2
                }
            ]
        }
    ]
};
