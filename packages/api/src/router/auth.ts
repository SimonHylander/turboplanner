import { createId } from "@paralleldrive/cuid2";
import { TRPCError } from "@trpc/server";

import { eq, schema } from "@acme/db";
import { RegisterUserSchema } from "@acme/validators";

import { createToken } from "../auth/token";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { hashPassword } from "../utils/hash-password";

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!";
  }),

  register: publicProcedure
    .input(RegisterUserSchema)
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, input.email));

      if (existing.length > 0) {
        return new TRPCError({
          code: "CONFLICT",
          message: "The email has already been taken",
        });
      }

      const id = createId();
      const password = await hashPassword(input.password);

      try {
        await ctx.db.insert(schema.users).values({
          id,
          name: input.name,
          email: input.email,
          password,
          level: 1,
          experience: 0,
        });

        const users = await ctx.db
          .select()
          .from(schema.users)
          .where(eq(schema.users.id, id))
          .limit(1);

        if (users.length === 0) {
          return new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to retrieve user",
          });
        }

        const user = users[0];

        if (!user) {
          return new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to retrieve user",
          });
        }

        const token = await createToken(user);

        return {
          token,
        };
      } catch (error) {
        console.error("Faild register user: ", error);

        return new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to register user",
          cause: error,
        });
      }
    }),
});
