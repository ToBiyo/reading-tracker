import {db, users} from "@/db/db";
import { User } from "next-auth";


type googleUserInput = Pick<User, "name" | "email" | "image">

export async function addGoogleUser(user: googleUserInput) {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
}