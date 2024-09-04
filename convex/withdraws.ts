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
    const withdraws = await ctx.db.query('withdraws').collect();
    withdraws.sort((a, b) => new Date(b.withdrawDate).getTime() - new Date(a.withdrawDate).getTime());
    return withdraws;
  },
});

export const listRecentWithdraws = query({
  args: {},
  async handler(ctx) {
    const withdraws = await ctx.db.query('withdraws').collect();
    withdraws.sort((a, b) => new Date(b.withdrawDate).getTime() - new Date(a.withdrawDate).getTime());
    const recentWithdraws = withdraws.slice(0, 5);
    
    return recentWithdraws;
  },
});

export const updateWithdraw = mutation({
  args: {
    id: v.id('withdraws'),
    name: v.string(),
    withdrawAmount: v.number(),
    withdrawDate: v.string(),
    withdrawNote: v.string(),
  },
  async handler(ctx, args) {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const deleteWithdraws = mutation({
  args: {
    id: v.id('withdraws'),
  },
  async handler(ctx, args) {
    await ctx.db.delete(args.id);
  },
});
