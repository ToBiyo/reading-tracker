import {db, users} from "@/db/db";


type userInput = {
    name: string;
    email: string;
    password: string;
}

export async function addCredentialUser(user: userInput) {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
}