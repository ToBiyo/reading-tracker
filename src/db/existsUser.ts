import { db, users } from "@/db/db";
import { eq } from "drizzle-orm";


export async function existsUser(email: string) {

    const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if(!existing){
    return false;
  }

  return existing;

}