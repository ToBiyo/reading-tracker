import { existsUser } from "./existsUser";
import bcrypt from "bcryptjs";


export async function verifyCredentialUser(email: string, password: string) {
  try {
    const user = await existsUser(email);

    if (!user) {
      return null; // Utente non trovato
    }

    // Qui dovresti implementare la logica per verificare la password
    // Ad esempio, se stai usando bcrypt, potresti fare qualcosa del genere:
    // Assicurati di avere la password criptata memorizzata nel database

    if (user.password === null) {
      return null; // L'utente esiste ma non ha una password (ad esempio, account creato tramite OAuth)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null; // Password non valida
    }

    return user; // Restituisci l'utente se le credenziali sono valide
  } catch (error) {
    console.error("Error verifying user credentials:", error);
    throw new Error("Failed to verify user credentials");
  }
}
