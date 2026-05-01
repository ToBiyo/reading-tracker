import { testApiHandler } from "next-test-api-route-handler";
import * as handler from "@/app/api/auth/register/route";
import { describe, it, expect, beforeEach } from "vitest";
import { db, users } from "@/db/db";
import { createFakeUser, createInvalidUser } from "../factories/userFactory";

describe("POST /api/auth/register", () => {
  beforeEach(async () => {
    await db.delete(users);
  });

  it.each(Array.from({ length: 5 }))(
    "should register a new user successfully",
    async () => {
      const testUser = createFakeUser();
      await testApiHandler({
        appHandler: handler,
        async test({ fetch }) {
          const response = await fetch({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testUser),
          });
          const data = await response.json();
          expect(response.status).toBe(201);
          expect(data.success).toBe(true);
        },
      });
    },
  );

  it.each(Array.from({ length: 5 }))(
    "should return 400 if user already exists",
    async () => {
      const testUser = createFakeUser();
      await testApiHandler({
        appHandler: handler,
        async test({ fetch }) {
          await fetch({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testUser),
          });
        },
      });

      // Try to register the same user again
      await testApiHandler({
        appHandler: handler,
        async test({ fetch }) {
          const response = await fetch({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testUser),
          });

          const data = await response.json();
          expect(response.status).toBe(400);
          expect(data.success).toBe(false);
        },
      });
    },
  );



    it.each(Array.from({ length: 5 }))(
    "should return 400 if data is invalid",
    async () => {
      const testUser = createInvalidUser();
      await testApiHandler({
        appHandler: handler,
        async test({ fetch }) {
          const response = await fetch({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testUser),
          });
          const data = await response.json();
          expect(response.status).toBe(400);
          expect(data.success).toBe(false);
        },
      });
    },
  );
  

  
});
