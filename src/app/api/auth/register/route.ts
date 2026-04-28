// app/api/auth/register/route.ts
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { existsUser } from "@/db/existsUser";
import { addCredentialUser } from "@/db/addCredentialUser";
import { jsonResponse } from "@/lib/helpers/jsonResponseHelper";


export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  // controlla se l'utente esiste già
  const existingUser = await existsUser(email);

  // se esiste, restituisci un errore
  if (existingUser) {
    return jsonResponse({
      success: false,
      message: "User already exists",
    }, { status: 400 }) ;
  }

  // hash della password
  const hashedPassword = await bcrypt.hash(password, 10);

  // prepara i dati dell'utente da inserire
  const inputUser = {
    name : name,
    email : email,
    password : hashedPassword
  }

  // crea l'utente
  const newUser = await addCredentialUser(inputUser);

  return jsonResponse({
    success: true,
    message: "User registered successfully",
    data: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  });
}
