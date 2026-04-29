import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { verifyCredentialUser } from "@/db/verifyCredentialUser";
import { existsUser } from "@/db/existsUser";
import { addGoogleUser } from "@/db/addGoogleUser";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      // La funzione authorize viene chiamata quando un utente tenta di accedere con le credenziali fornite
      authorize: async (credentials) => {
        const email = credentials.email as string
        const password = credentials.password as string
        return await verifyCredentialUser(email, password)
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({user, account}){
      if(account?.provider === "google"){

        if(!user.email || !user.name) return false;

       const existingUser = await existsUser(user.email!);
        if(!existingUser){
           const newUser = await addGoogleUser(user);
           
        }
      }
      return true;
    }
  }
  
});