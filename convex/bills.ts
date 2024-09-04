import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createBill = mutation({
  args: {
    name: v.string(),
    amount: v.number(),
    dueDate: v.string(),
    status: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert('bills', {
      name: args.name,
      amount: args.amount,
      dueDate: args.dueDate,
      status: args.status,
    });
  },
});

export const listBills = query({
  args: {},
  async handler(ctx) {
    const bills = await ctx.db.query('bills').collect();
    bills.sort((a, b) => (a.status === 'Unpaid' ? -1 : 1));
    return bills;
  },
});

export const updateBill = mutation({
  args: {
    id: v.id('bills'),
    name: v.string(),
    amount: v.number(),
    dueDate: v.string(),
    status: v.string(),
  },
  async handler(ctx, args) {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const deleteBill = mutation({
  args: {
    id: v.id('bills'),
  },
  async handler(ctx, args) {
    await ctx.db.delete(args.id);
  },
});
