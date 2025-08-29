import type { GridResult, ISimpleDTO } from '@/types/baseModels'

export const loadUsers = async (gateId: number) => {
  return await $api<ISimpleDTO<string>[]>(`app/gate/${gateId}/user/simple`)
}

export const loadRoles = async (gateId: number) => {
  return await $api<GridResult<ISimpleDTO<string>>>(`app/role/simple?gateId=${gateId}`)
}
