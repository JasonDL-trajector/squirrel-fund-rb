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

export const createDepositsBatch = mutation({
  args: {
    deposits: v.array(
      v.object({
        name: v.string(),
        email: v.string(),
        depositAmount: v.number(),
        depositDate: v.string(),
        depositNote: v.string(),
      })
    ),
  },
  async handler(ctx, args) {
    try {
      for (const d of args.deposits) {
        if (!Number.isFinite(d.depositAmount)) {
          throw new Error('Invalid deposit amount');
        }
        if (!d.depositDate || typeof d.depositDate !== 'string') {
          throw new Error('Invalid deposit date');
        }
        await ctx.db.insert('deposits', {
          name: d.name,
          email: d.email,
          depositAmount: d.depositAmount,
          depositDate: d.depositDate,
          depositNote: d.depositNote,
        });
      }
      return { count: args.deposits.length };
    } catch (err) {
      // Any error will cause Convex to roll back the entire mutation
      throw err;
    }
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

export const updateDeposit = mutation({
  args: {
    id: v.id('deposits'),
    name: v.string(),
    depositAmount: v.number(),
    depositDate: v.string(),
    depositNote: v.string(),
  },
  async handler(ctx, args) {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
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
