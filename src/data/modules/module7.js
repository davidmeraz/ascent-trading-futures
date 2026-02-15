export const module7 = {
    title: "Module 7: Risk Management 101",
    lessons: [
        {
            id: "why-risk-management",
            title: "Why Risk Management is Everything",
            content: `
# The One Skill That Determines Everything

If there is ONE lesson that will save your trading career, it's this one. **Risk management is not a chapter — it's the entire book.**

## The Harsh Reality

![Warning Sign](https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1600&q=80)

Consider two traders:
- **Trader A:** 90% win rate, ZERO risk management
- **Trader B:** 40% win rate, EXCELLENT risk management

**Who makes more money?** Trader B. Every time.

### Why?
Trader A wins 9 out of 10 trades, making $100 each = $900 profit
But on that ONE loss, they lose $1,500 (no stop, moved stop, averaged down)
**Net: -$600**

Trader B loses 6 out of 10 trades, losing $100 each = -$600
But on those 4 wins, they make $250 each = $1,000
**Net: +$400**

## The Core Principle

> **"Protect your capital first. Profits are a byproduct of good risk management."**

Your trading account is like oxygen:
- Without it, you're dead (can't trade)
- Preserving it should be your #1 priority
- Everything else is secondary

## The Three Pillars of Risk Management

1. **Position Sizing** — How much to risk per trade
2. **Stop Losses** — Where to exit when wrong
3. **Daily Limits** — Maximum loss per day/week

## What Happens Without Risk Management

- 1 bad trade can erase weeks of profits
- A losing streak becomes account destruction
- Emotions take over (revenge trading, gambling)
- You blow the account and quit trading forever

> [!TIP]
> **You are not a trader. You are a risk manager.** Trading is the vehicle, but risk management is the driving. A great driver in a bad car survives. A bad driver in a race car crashes. Focus on being the best risk manager you can be.
`,
            quiz: [
                {
                    question: "Which trader is more likely to be profitable over time?",
                    options: [
                        "90% win rate with no risk management",
                        "40% win rate with excellent risk management",
                        "Both are equally profitable",
                        "Neither can be profitable"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What are the three pillars of risk management?",
                    options: [
                        "Charts, indicators, and news",
                        "Position sizing, stop losses, and daily limits",
                        "Buy, hold, and pray",
                        "Speed, accuracy, and volume"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Why is protecting capital the #1 priority?",
                    options: [
                        "Because brokers require it",
                        "Because without capital you can't trade — it's your lifeline",
                        "Because the exchange monitors your balance",
                        "It's not — profits are more important"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "the-one-percent-rule",
            title: "The 1% Rule",
            content: `
# The Golden Rule: Never Risk More Than 1-2%

The **1% Rule** states that you should never risk more than 1-2% of your total account on a single trade. This is non-negotiable.

## The Math Behind 1%

With a $10,000 account, 1% risk = **$100 per trade**

### Surviving a Losing Streak:

| Consecutive Losses | 1% Risk | 5% Risk | 10% Risk |
|---|---|---|---|
| 5 losses | -$490 (95.1% left) | -$2,263 (77.4% left) | -$4,095 (59% left) |
| 10 losses | -$956 (90.4% left) | -$4,013 (59.9% left) | -$6,513 (34.9% left) |
| 20 losses | -$1,821 (81.8% left) | -$6,415 (35.8% left) | -$8,784 (12.2% left) |

**At 1% risk, even 20 consecutive losses leave you with 81.8% of your account.** You can recover. At 10% risk, you're nearly wiped out.

## Calculating Position Size from Risk

**Formula:** Number of contracts = Max Risk / (Stop Distance × Tick Value)

### Example:
- Account: $10,000
- Max Risk (1%): $100
- Stop distance: 8 ticks on MES
- Tick value: $1.25

Contracts = $100 / (8 × $1.25) = $100 / $10 = **10 MES contracts**

But wait — can you afford 10 contracts? Check margin requirements too!

## Adjusting Risk Based on Context

| Scenario | Risk Level |
|---|---|
| High-probability setup | 1.5-2% |
| Normal setup | 1% |
| Uncertain/choppy market | 0.5% |
| First trade of the day | 0.5% (warm up) |
| After 2 consecutive losses | 0.5% (reduce size) |

> [!TIP]
> **Start at 0.5% risk if you're new to live trading.** You can always increase to 1% once you're consistently following your rules. It's easier to scale up from conservative sizing than to recover from aggressive sizing.
`,
            quiz: [
                {
                    question: "According to the 1% Rule, how much should you risk per trade on a $10,000 account?",
                    options: ["$10", "$100", "$500", "$1,000"],
                    correctAnswer: 1
                },
                {
                    question: "After 20 consecutive losses at 1% risk, approximately how much of your account remains?",
                    options: ["0% — you're wiped out", "~20%", "~50%", "~82%"],
                    correctAnswer: 3
                },
                {
                    question: "What risk percentage is recommended for beginners just starting live trading?",
                    options: ["5%", "2%", "0.5%", "10%"],
                    correctAnswer: 2
                }
            ]
        },
        {
            id: "position-sizing",
            title: "Position Sizing",
            content: `
# Right-Sizing: How Many Contracts?

Position sizing is a simple calculation, but it's the most powerful tool in your risk management arsenal. Get this right, and survival is almost guaranteed.

## The Position Sizing Formula

**Number of Contracts = Max Dollar Risk / (Stop Distance in Ticks × Dollar per Tick)**

## Step-by-Step Examples

### Example 1: MES Trade
- Account: $5,000
- Risk: 1% = $50
- Stop: 10 ticks
- Tick value: $1.25

**Contracts = $50 / (10 × $1.25) = $50 / $12.50 = 4 contracts**

### Example 2: ES Trade
- Account: $25,000
- Risk: 1% = $250
- Stop: 8 ticks
- Tick value: $12.50

**Contracts = $250 / (8 × $12.50) = $250 / $100 = 2.5 → Round down to 2 contracts**

⚠️ **Always round DOWN, never up!**

## Dynamic Position Sizing

As your account grows or shrinks, your position size changes:

| Account Value | 1% Risk | MES Contracts (10-tick stop) |
|---|---|---|
| $3,000 | $30 | 2 contracts |
| $5,000 | $50 | 4 contracts |
| $10,000 | $100 | 8 contracts |
| $20,000 | $200 | 16 contracts |

## Common Sizing Mistakes

❌ **Fixed size regardless of stop** — A 5-tick stop and 20-tick stop need different sizes
❌ **Sizing based on feelings** — "I feel confident, let me add more"
❌ **Averaging down** — Adding to a loser increases risk exponentially
❌ **Not adjusting after losses** — After drawdown, reduce size

> [!TIP]
> **Let the math decide, not your ego.** If the formula says 2 contracts, trade 2 contracts. Not 3 "because you feel good." Not 5 "because the setup looks amazing." Trust the math.
`,
            quiz: [
                {
                    question: "If your max risk is $100 and your stop is 8 ticks at $12.50/tick, how many ES contracts should you trade?",
                    options: ["1 contract", "2 contracts", "5 contracts", "8 contracts"],
                    correctAnswer: 0
                },
                {
                    question: "When the formula gives a fractional result (like 2.5 contracts), what should you do?",
                    options: [
                        "Round up to 3",
                        "Round down to 2 — always round down",
                        "Trade 2.5",
                        "Double it to 5"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is 'averaging down' and why is it dangerous?",
                    options: [
                        "Taking profits too early",
                        "Adding to a losing position, which exponentially increases risk",
                        "Reducing position size after wins",
                        "Using a smaller timeframe"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "stop-loss-placement",
            title: "Stop Loss Placement",
            content: `
# Where to Draw the Line: Stop Loss Placement

Knowing you need a stop is step 1. Knowing WHERE to place it is the art that separates surviving traders from defeated ones.

## Stop Placement Methods

### 1. Structure-Based (Best for Beginners)
Place your stop just beyond a support/resistance level:
- Long trade → Stop below the nearest support
- Short trade → Stop above the nearest resistance

**Why it works:** If price breaks the level, your trade thesis is wrong.

### 2. ATR-Based
Use the **Average True Range** indicator to set stops based on volatility:
- Calculate 1.5× ATR of your timeframe
- Set stop at that distance from entry

**Why it works:** Adapts to market conditions — wider in volatile markets, tighter in calm.

### 3. Fixed Tick Stop
Always use the same number of ticks (e.g., 12 ticks on ES):
- Simple and consistent
- Doesn't account for market structure
- Good for scalping

## Stop Placement Rules

| Rule | Detail |
|---|---|
| **Not too tight** | Leave room for normal market noise |
| **Not too wide** | Don't risk more than 1-2% of account |
| **Beyond structure** | Beyond visible support/resistance |
| **Before entry** | Know your stop BEFORE you enter |

## The "Random Stop" Problem

Placing stops at random levels is like wearing a seatbelt made of paper:

❌ Stop at exactly your entry -$50 (arbitrary)
✅ Stop below the last swing low (structural)

## Never Do These Things

1. **Never trade without a stop** — This is the fastest path to account destruction
2. **Never move your stop further away** — If wrong, get out and reassess
3. **Never remove your stop** — "Hoping" is not a strategy
4. **Never use mental stops** — "I'll exit if it gets to 5,000" → You won't

> [!TIP]
> **Your stop should be placed where your trade idea is WRONG, not where your comfort level is.** If support is at 5,000, your stop goes below 5,000 — not at some arbitrary distance from your entry.
`,
            quiz: [
                {
                    question: "Where should a structure-based stop be placed for a long trade?",
                    options: [
                        "At your entry price",
                        "Just below the nearest support level",
                        "At a random distance from entry",
                        "Above resistance"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Why are 'mental stops' (not placing actual stop orders) dangerous?",
                    options: [
                        "Because they cost more",
                        "Because when emotions kick in, you're unlikely to actually exit at your planned level",
                        "Because the exchange requires real stops",
                        "Mental stops are actually better"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What should determine your stop placement?",
                    options: [
                        "Your comfort level with losing",
                        "A round number you like",
                        "Where your trade idea is proven WRONG (structural level)",
                        "What other traders are doing"
                    ],
                    correctAnswer: 2
                }
            ]
        },
        {
            id: "risk-reward-ratio",
            title: "Risk/Reward Ratio",
            content: `
# The Equation: Risk vs Reward

The **Risk/Reward Ratio (R:R)** is the relationship between how much you could lose versus how much you could gain. It's the mathematical foundation of profitable trading.

## Understanding R:R

**Formula:** R:R = Potential Loss : Potential Gain

| Risk | Reward | R:R | Rating |
|---|---|---|---|
| $100 | $100 | 1:1 | Need 50%+ win rate |
| $100 | $200 | 1:2 | Need 34%+ win rate |
| $100 | $300 | 1:3 | Need 25%+ win rate |
| $200 | $100 | 2:1 | Need 67%+ win rate ❌ |

## The Minimum: 1:2 R:R

At a 1:2 R:R, you can **lose more than half your trades and still profit**:

10 trades at 1:2 R:R, 40% win rate:
- 6 losses × $100 = -$600
- 4 wins × $200 = +$800
- **Net profit: +$200** ✅

This is why R:R matters more than win rate!

## Calculating R:R Before Every Trade

Before entering:
1. **Entry:** 5,000
2. **Stop:** 4,992 (Risk = 8 points = $100 on MES)
3. **Target:** 5,016 (Reward = 16 points = $200 on MES)
4. **R:R = 1:2 ✅ Take the trade**

If target was only 5,004:
- Reward = 4 points = $50
- R:R = 1:0.5 — **1:2 minimum not met** ❌ Skip this trade

## R:R vs Win Rate Sweet Spot

| R:R | Min Win Rate | Net Result (per 100 trades) |
|---|---|---|
| 1:1 | 55% | 55×$100 - 45×$100 = +$1,000 |
| 1:2 | 35% | 35×$200 - 65×$100 = +$500 |
| 1:3 | 30% | 30×$300 - 70×$100 = +$2,000 |

> [!TIP]
> **Only take trades with at least 1:2 R:R.** This single rule eliminates most bad trades. Before clicking "Buy," ask: "Is my target at least twice the distance of my stop?" If not, skip it.
`,
            quiz: [
                {
                    question: "What does a 1:3 Risk/Reward ratio mean?",
                    options: [
                        "You risk $3 to make $1",
                        "You risk $1 to potentially make $3",
                        "You take 3 trades per day",
                        "You need a 75% win rate"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "With a 1:2 R:R, what is the minimum win rate needed to be profitable?",
                    options: ["10%", "~34%", "50%", "67%"],
                    correctAnswer: 1
                },
                {
                    question: "What should you do if a potential trade only offers a 1:0.5 R:R?",
                    options: [
                        "Take it anyway — every trade is worth trying",
                        "Double your position to compensate",
                        "Skip it — minimum 1:2 R:R is required",
                        "Remove your stop to improve the ratio"
                    ],
                    correctAnswer: 2
                }
            ]
        },
        {
            id: "max-daily-loss",
            title: "Maximum Daily Loss",
            content: `
# The Kill Switch: Maximum Daily Loss

A **Maximum Daily Loss (MDL)** is a hard limit on how much you can lose in a single day. When you hit it, you stop trading. No exceptions.

## Why You Need a Daily Limit

Without one, here's what happens:
1. You lose 2 trades (-$200)
2. Frustration kicks in
3. You increase size to "make it back"
4. You lose again (-$400)
5. Panic → more trades, bigger size
6. Day ends: -$2,000 (what started as -$200)

This is called **revenge trading** and it destroys accounts.

## Setting Your MDL

| Account Size | Suggested MDL | In Dollars |
|---|---|---|
| $5,000 | 2-3% | $100-150 |
| $10,000 | 2-3% | $200-300 |
| $25,000 | 2-3% | $500-750 |
| $50,000 | 2-3% | $1,000-1,500 |

## The MDL Protocol

When you hit your MDL:
1. **STOP immediately** — Close all positions
2. **Cancel all orders** — Nothing pending
3. **Walk away** — Physically leave your desk
4. **Review** — What went wrong? Write it down
5. **Return tomorrow** — Fresh day, fresh mind

## Advanced: Tiered Limits

| Level | Trigger | Action |
|---|---|---|
| **Yellow** | -1% daily | Reduce position size by 50% |
| **Orange** | -2% daily | Trade only 1 contract, maximum 2 trades |
| **Red** | -3% daily | STOP. Done for the day. |

## Weekly and Monthly Limits

Beyond daily:
- **Weekly limit:** 5% max drawdown → Take 1-2 days off
- **Monthly limit:** 10% max drawdown → Reassess strategy entirely

> [!TIP]
> **Set your MDL in your platform if possible.** Some platforms allow automatic trade lockout after hitting a loss limit. This removes the human element — your emotions can't override a machine lock.
`,
            quiz: [
                {
                    question: "What is a Maximum Daily Loss (MDL)?",
                    options: [
                        "The most you've ever lost in one day",
                        "A pre-set limit on how much you're allowed to lose before stopping for the day",
                        "The exchange's daily loss limit",
                        "A type of stop order"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What is 'revenge trading'?",
                    options: [
                        "Trading against another trader specifically",
                        "Increasing size and frequency after losses to try to 'win it back'",
                        "A winning strategy",
                        "Trading a competing exchange"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What should you do IMMEDIATELY when hitting your MDL?",
                    options: [
                        "Try one more trade to end the day positive",
                        "Switch to a different market",
                        "Stop trading, close all positions, and walk away from the screen",
                        "Double your position size"
                    ],
                    correctAnswer: 2
                }
            ]
        },
        {
            id: "drawdown-management",
            title: "Drawdown Management",
            content: `
# The Valley: Managing Drawdowns

A **drawdown** is the decline from your account's peak to its lowest point before recovering. Every trader experiences drawdowns — how you handle them defines your career.

## Understanding Drawdown Math

The deeper the hole, the harder it is to climb out:

| Drawdown | Recovery Needed | Difficulty |
|---|---|---|
| -5% | +5.3% | Easy |
| -10% | +11.1% | Manageable |
| -20% | +25% | Hard |
| -30% | +42.9% | Very Hard |
| -50% | +100% | Nearly impossible |
| -70% | +233% | Career-ending |

After a 50% loss, you need to **DOUBLE** your remaining money just to break even. This is why preventing large drawdowns is critical.

## Drawdown Response Protocol

### Phase 1: Normal (-1% to -5%)
- Continue trading normally
- Review recent trades for errors
- Maintain standard position size

### Phase 2: Caution (-5% to -10%)
- Reduce position size by 50%
- Tighten entry criteria (only A+ setups)
- Review trading plan for drift

### Phase 3: Defense (-10% to -15%)
- Trade minimum size only (1 micro contract)
- Go back to demo for 1 week
- Complete full strategy review

### Phase 4: Emergency (-15%+)
- STOP live trading completely
- Full analysis: Is the strategy broken, or execution broken?
- Paper trade for 2-4 weeks before resuming
- Consider mentor or coach

## Psychological Impact

Drawdowns don't just hurt your account — they hurt your mind:
- Confidence drops
- Fear of pulling the trigger
- Overcompensation (revenge trading)
- Self-doubt spiral

> [!TIP]
> **Drawdowns are inevitable — account blowups are optional.** Every professional trader has drawdown periods. The difference is they have protocols to prevent drawdowns from becoming catastrophic. Design your protocol BEFORE you need it.
`,
            quiz: [
                {
                    question: "If your account drops 20%, what return do you need to break even?",
                    options: ["20%", "25%", "30%", "50%"],
                    correctAnswer: 1
                },
                {
                    question: "What should you do during a -10% to -15% drawdown?",
                    options: [
                        "Trade bigger to recover faster",
                        "Trade minimum size and consider returning to demo",
                        "Ignore it and keep trading normally",
                        "Switch to a completely new strategy"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Why is preventing large drawdowns so important?",
                    options: [
                        "Because the exchange charges penalties",
                        "Because the deeper the drawdown, the exponentially harder recovery becomes",
                        "Because your broker closes your account at -10%",
                        "It's not important — losses are normal"
                    ],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: "correlation-risk",
            title: "Correlation Risk",
            content: `
# Hidden Danger: Correlation Risk

If you trade multiple markets or take multiple positions, you might think you're diversified. But if those positions are **correlated**, you could be taking 2x or 3x the risk you think.

## What is Correlation?

**Correlation** measures how much two assets move together:
- **+1.0** = Move exactly together (same direction, same magnitude)
- **0** = No relationship
- **-1.0** = Move exactly opposite

## Common Correlations in Futures

| Pair | Correlation | What It Means |
|---|---|---|
| ES & NQ | ~0.90+ | Move together most of the time |
| ES & YM | ~0.95+ | Almost identical movement |
| Gold & Dollar | ~-0.60 | Often move opposite |
| Oil & Airlines | ~-0.40 | Often inverse |
| ES & VIX | ~-0.80 | Strongly inverse |

## The Danger

If you're Long 1 ES AND Long 1 NQ, thinking you have two independent trades:
- ES = $250K notional
- NQ = $360K notional
- **Total exposure:** $610K

But since they're 90%+ correlated, when one drops, BOTH drop. You effectively have **ONE giant position**, not two diversified ones.

## How to Manage Correlation Risk

1. **Don't double up on correlated markets** — Long ES + Long NQ ≈ Long 2x ES
2. **Check correlations** before adding positions
3. **If trading the same direction** in correlated markets, reduce size on each
4. **True diversification** requires markets with LOW correlation

## Beneficial Correlation

You can USE correlation to your advantage:
- If you're Long ES and want a hedge → Short NQ partially
- If gold is rallying → Dollar likely weakening (check DXY)
- If VIX is spiking → Be cautious with long stock index positions

> [!TIP]
> **Ask yourself: if the S&P drops 2%, which of my positions also lose money?** If all of them do, you're not diversified — you're concentrated. Treat correlated positions as ONE combined risk.
`,
            quiz: [
                {
                    question: "What does a correlation of +0.90 between ES and NQ mean?",
                    options: [
                        "They always move in opposite directions",
                        "They move together about 90% of the time",
                        "They have no relationship",
                        "NQ is 90% cheaper than ES"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Why is being Long ES and Long NQ simultaneously risky?",
                    options: [
                        "Because it's against exchange rules",
                        "Because they're highly correlated — you effectively have one doubled position",
                        "Because NQ is more expensive",
                        "It's not risky at all"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "What correlation exists between VIX and stock indices?",
                    options: [
                        "Strongly positive (+0.80)",
                        "No correlation (0)",
                        "Strongly negative (~-0.80) — they move opposite",
                        "They move together sometimes"
                    ],
                    correctAnswer: 2
                }
            ]
        },
        {
            id: "psychology-of-loss",
            title: "The Psychology of Loss",
            content: `
# Your Brain is Working Against You

Losses don't just hurt your wallet — they hijack your brain. Understanding the psychology of loss is essential for long-term survival.

## Loss Aversion

![Brain Psychology](https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1600&q=80)

Research shows that **losing $100 feels twice as painful** as winning $100 feels good. This is called **Loss Aversion** — and it causes:

- Holding losers too long ("It might come back!")
- Taking profits too early ("Lock it in before it reverses!")
- Moving stops further away ("Give it more room!")
- Not taking valid setups ("What if I lose again?")

## The Emotional Cycle of a Losing Trade

1. **Entry:** Excitement and hope
2. **Price moves against you:** Anxiety
3. **Approaching stop loss:** Denial ("It'll come back")
4. **Stop hits:** Anger or frustration
5. **After the loss:** Revenge or fear
6. **Next trade:** Either overtrade (revenge) or freeze (fear)

## Breaking the Cycle

### Reframe Losses
- A loss is NOT a failure — it's a **business expense**
- Even the best traders lose 40-60% of their trades
- A stopped trade that followed the plan = **SUCCESS** (you managed risk)

### The "Next Trade" Mindset
Professional poker players don't tilt after one bad hand. They know:
- Each trade is independent
- The previous result doesn't affect the next
- The PROCESS matters, not individual outcomes

## Practical Tools

1. **Wait 5 minutes** after a loss before trading again
2. **Take 3 deep breaths** before every trade
3. **Write down your emotions** in your trading journal
4. **Have a walkaway rule** — 3 consecutive losses = take a break

> [!TIP]
> **The best trade you'll ever make is the one you DON'T take when tilted.** Walking away from the screen after a painful loss is one of the hardest but most profitable things you can do.
`,
            quiz: [
                {
                    question: "What is 'Loss Aversion'?",
                    options: [
                        "A strategy to avoid losses",
                        "The psychological phenomenon where losses feel ~2x more painful than equal gains feel good",
                        "When you're afraid to trade",
                        "A type of stop loss"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "After a losing trade, what should you do before taking another trade?",
                    options: [
                        "Immediately enter a bigger trade to recover",
                        "Wait at least 5 minutes, breathe, and assess your emotional state",
                        "Check social media for tips",
                        "Change your strategy completely"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "How should you view a trade that hit your stop loss but followed your plan?",
                    options: [
                        "As a failure",
                        "As proof that trading doesn't work",
                        "As a SUCCESS — you managed risk properly",
                        "As a reason to change strategies"
                    ],
                    correctAnswer: 2
                }
            ]
        },
        {
            id: "building-risk-plan",
            title: "Building Your Risk Plan",
            content: `
# Your Personal Risk Constitution

A **Risk Management Plan** is a written document that codifies ALL your risk rules. You follow it no matter what your emotions say.

## The Risk Plan Template

### Section 1: Account Rules
- Starting capital: $_____
- Maximum risk per trade: _____% ($_____)
- Maximum daily loss: _____% ($_____)
- Maximum weekly loss: _____% ($_____)
- Maximum drawdown before pausing: _____%

### Section 2: Position Sizing
- Default contract size: _____ contracts
- Position sizing formula: Risk / (Stop × Tick Value)
- Maximum contracts per trade: _____
- Maximum open positions: _____

### Section 3: Stop Loss Rules
- EVERY trade has a stop (non-negotiable)
- Stop placement method: Structure / ATR / Fixed ✓
- Minimum R:R ratio: 1:_____
- Stop can NEVER be moved further away

### Section 4: Daily Protocol
- Pre-market routine (time: _____)
- Maximum trades per day: _____
- Loss limit actions (Yellow/Orange/Red)
- End-of-day review (time: _____)

### Section 5: Emergency Procedures
- Platform crash: Call broker at _____
- Internet failure: Use mobile hotspot
- Emotional distress: Walk away, review plan
- 3 consecutive losses: Stop for minimum 30 minutes

## Signing Your Plan

Once written, **sign and date it.** This creates a psychological contract with yourself. When emotions try to override your rules, you look at your signature and remember the commitment.

## Review Schedule

- **Daily:** Check adherence to rules
- **Weekly:** Review metrics and adjust
- **Monthly:** Full plan review with potential updates
- **After any blown rule:** Write what happened and why

> [!TIP]
> **Print your risk plan and keep it next to your monitor.** In the heat of a losing streak, you won't "remember" your rules. Your emotional brain will override your rational brain. Having the rules physically visible acts as a lifeline.
`,
            quiz: [
                {
                    question: "What is a Risk Management Plan?",
                    options: [
                        "A strategy for making more profit",
                        "A written document codifying ALL risk rules that must be followed regardless of emotions",
                        "A report for your broker",
                        "A mental list of guidelines"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "Why should you sign and date your risk plan?",
                    options: [
                        "For legal reasons",
                        "Because your broker requires it",
                        "It creates a psychological contract with yourself, a commitment to follow the rules",
                        "It's just a formality"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "Where should your risk plan be kept?",
                    options: [
                        "Hidden in a drawer",
                        "On your phone only",
                        "Printed and visible next to your monitor",
                        "Memorized and never written down"
                    ],
                    correctAnswer: 2
                }
            ]
        }
    ]
};
