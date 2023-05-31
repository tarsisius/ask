'use server'
import { SignJWT, jwtVerify } from 'jose'

export async function verifyJwtToken(token: string | null) {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    )
    return payload as {
      id: string
      username: string
    }
  } catch (error) {
    return null
  }
}

export async function getJwtToken({
  id,
  username,
}: {
  id: string
  username: string
}) {
  const token = await new SignJWT({ id, username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY))
  return token
}
