import { SignJWT, jwtVerify } from 'jose'
import { JWT_SECRET_KEY } from '$env/static/private'

function getJwtSecretKey(): Uint8Array {
  const secretKey = JWT_SECRET_KEY
  return new TextEncoder().encode(secretKey)
}

export async function getJwtToken({ id, username }: any): Promise<string> {
  const token = await new SignJWT({ id, username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(new TextEncoder().encode(JWT_SECRET_KEY))

  return token
}

export async function verifyJwtToken(token: string | null): Promise<{ id: string; username: string } | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey())

    return payload as {
      id: string
      username: string
    }
  } catch (error) {
    return null
  }
}
