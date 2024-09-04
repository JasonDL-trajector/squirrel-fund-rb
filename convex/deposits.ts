import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

type Deposit = {
  _id: string;
  _creationTime: number;
  depositAmount: number;
  depositDate: string;
  depositNote: string;
  email: string;
  name: string;
};

export const createDeposit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    depositAmount: v.number(),
    depositDate: v.string(),
    depositNote: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert('deposits', {
      name: args.name,
      email: args.email,
      depositAmount: args.depositAmount,
      depositDate: args.depositDate,
      depositNote: args.depositNote,
    });
  },
});

export const listDeposits = query({
  args: {},
  async handler(ctx) {
    const deposits = await ctx.db.query("deposits").collect();
    deposits.sort((a, b) => new Date(b.depositDate).getTime() - new Date(a.depositDate).getTime());
    return deposits;
  },
});

export const listRecentDeposits = query({
  args: {},
  async handler(ctx) {
    const deposits = await ctx.db.query("deposits").collect();
    deposits.sort((a, b) => new Date(b.depositDate).getTime() - new Date(a.depositDate).getTime());
    const recentDeposits = deposits.slice(0, 5);

    return recentDeposits;
  },
});

export const deleteDeposits = mutation({
  args: {
    id: v.id('deposits'),
  },
  async handler(ctx, args) {
    await ctx.db.delete(args.id);
  },
});
