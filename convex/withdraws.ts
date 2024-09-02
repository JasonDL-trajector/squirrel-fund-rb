import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createWithdraw = mutation({
  args: {
    name: v.string(),
    withdrawAmount: v.number(),
    withdrawDate: v.string(),
    withdrawNote: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert('withdraws', {
      name: args.name,
      withdrawAmount: args.withdrawAmount,
      withdrawDate: args.withdrawDate,
      withdrawNote: args.withdrawNote,
    });
  },
});

export const listWithdraws = query({
  args: {},
  async handler(ctx) {
    const withdraws = await ctx.db.query('withdraws')
      .order('desc')
      .collect();
    return withdraws;
  },
});

export const listRecentWithdraws = query({
  args: {},
  async handler(ctx) {
    const withdraws = await ctx.db.query('withdraws')
      .order('desc')
      .take(5);
    return withdraws;
  },
});