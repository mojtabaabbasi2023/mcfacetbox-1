import { v4 as uuidV4 } from 'uuid'

export function NewUUID() {
  const uuid = uuidV4()

  return uuid.toString()
}
