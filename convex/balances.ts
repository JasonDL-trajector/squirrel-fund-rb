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