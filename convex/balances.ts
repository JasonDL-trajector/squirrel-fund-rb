import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createBalance = mutation({
  args: {
    balanceAmount: v.number(),
    balanceDate: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert('balances', {
      balanceAmount: args.balanceAmount,
      balanceDate: args.balanceDate,
    });
  },
});

export const createBalancesBatch = mutation({
  args: {
    balances: v.array(
      v.object({
        balanceAmount: v.number(),
        balanceDate: v.string(),
      })
    ),
  },
  async handler(ctx, args) {
    try {
      for (const b of args.balances) {
        if (!Number.isFinite(b.balanceAmount)) {
          throw new Error('Invalid balance amount');
        }
        if (!b.balanceDate || typeof b.balanceDate !== 'string') {
          throw new Error('Invalid balance date');
        }
        await ctx.db.insert('balances', {
          balanceAmount: b.balanceAmount,
          balanceDate: b.balanceDate,
        });
      }
      return { count: args.balances.length };
    } catch (err) {
      // Any error will cause Convex to roll back the entire mutation
      throw err;
    }
  },
});

export const listBalances = query({
  args: {},
  async handler(ctx) {
    const balances = await ctx.db.query('balances')
      .order('asc')
      .collect();
    return balances;
  },
});

export const getCurrentBalance= query({
  args: {},
  async handler(ctx) {
    const balances = await ctx.db.query('balances')
      .order('desc')
      .first();
    return balances;
  },
});

export const editCurrentBalance = mutation({
  args: {
    id: v.id('balances'),
    balanceAmount: v.number(),
  },
  async handler(ctx, args) {
    const { id, balanceAmount } = args;
    await ctx.db.patch(id, { balanceAmount });
  },
});

export const updateBalance = mutation({
  args: {
    id: v.id('balances'),
    balanceAmount: v.number(),
    balanceDate: v.string(),
  },
  async handler(ctx, args) {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const deleteBalance = mutation({
  args: {
    id: v.id('balances'),
  },
  async handler(ctx, args) {
    await ctx.db.delete(args.id);
  },
});
