import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createDeposit = mutation({
  args: {
    name: v.string(),
    depositAmount: v.number(),
    depositDate: v.string(),
    depositNote: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert('deposits', {
      name: args.name,
      depositAmount: args.depositAmount,
      depositDate: args.depositDate,
      depositNote: args.depositNote,
    });
  },
});

export const listDeposits = query({
  args: {},
  async handler(ctx) {
    const deposits = await ctx.db.query('deposits')
      .order('desc')
      .collect();
    return deposits;
  },
});

export const listRecentDeposits = query({
  args: {},
  async handler(ctx) {
    const deposits = await ctx.db.query('deposits')
      .order('desc')
      .take(5);
    return deposits;
  },
});
