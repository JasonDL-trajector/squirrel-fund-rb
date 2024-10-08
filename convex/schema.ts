import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  deposits: defineTable({
    depositAmount: v.float64(),
    depositDate: v.string(),
    depositNote: v.string(),
    name: v.string(),
    email: v.string(),
  }),
  withdraws: defineTable({
    withdrawAmount: v.float64(),
    withdrawDate: v.string(),
    withdrawNote: v.string(),
    name: v.string(),
  }),
  balances: defineTable({
    balanceAmount: v.float64(),
    balanceDate: v.string(),
  }),
  bills: defineTable({
    name: v.string(),
    amount: v.number(),
    dueDate: v.string(),
    status: v.string(),
  }),
});
