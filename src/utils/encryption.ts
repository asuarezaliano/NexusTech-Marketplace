import { env } from 'app/config/env'

const ENCRYPTION_KEY = env.ENCRYPTION_KEY
if (!ENCRYPTION_KEY) {
  throw new Error('ENCRYPTION_KEY is required')
}

async function getKey() {
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(ENCRYPTION_KEY),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  )

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('salt'),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-CBC', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

export async function encrypt(text: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const key = await getKey()

  // Generate a 16-byte IV
  const iv = crypto.getRandomValues(new Uint8Array(16))

  const encrypted = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, data)

  // Convert both IV and encrypted data to base64 separately
  const ivBase64 = Buffer.from(iv).toString('base64')
  const encryptedBase64 = Buffer.from(new Uint8Array(encrypted)).toString('base64')

  // Combine them with a delimiter
  return `${ivBase64}:${encryptedBase64}`
}

export async function decrypt(text: string | undefined) {
  if (!text) return null

  try {
    // Split the combined string back into IV and data
    const [ivBase64, encryptedBase64] = text.split(':')
    if (!ivBase64 || !encryptedBase64) return null

    // Convert back from base64
    const iv = Buffer.from(ivBase64, 'base64')
    const encryptedData = Buffer.from(encryptedBase64, 'base64')

    const key = await getKey()

    const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, encryptedData)

    return new TextDecoder().decode(decrypted)
  } catch (error) {
    console.error('Decryption error:', error)
    return null
  }
}
