import { createHash } from "crypto"

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = createHash("sha256").update(password).digest("hex")
  return hashedPassword
}