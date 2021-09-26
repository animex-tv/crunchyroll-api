import crypto from 'crypto'

export function quickHash(value: string) {
  return crypto.createHash('md5').update(value).digest('hex')
}
