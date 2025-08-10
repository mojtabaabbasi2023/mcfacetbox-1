import { createMongoAbility } from '@casl/ability'

export type Actions = 'Create' | 'Update' | 'Delete' | 'State' | 'Description' |
'Merge' | 'Move' | 'Copy' | 'Connect' | 'Supervision' | 'Link' | 'Setting' | 'All' | 'Reference' | 'Cleanup' | 'Preview'

// ex: Post, Comment, User, etc. We haven't used any of these in our demo though.
export type Subjects = 'Node' | 'Excerpt' | 'All'

export interface Rule { action: Actions; subject: Subjects }

export const ability = createMongoAbility<[Actions, Subjects]>()

// export const setServerPermissions = async (treeid: number): Promise<boolean> => {
//   try {
//     const permissionDataResult = await $api<Rule[]>(`app/tree/${treeid}/user/permissions`)

//     useCookie('userAbilityRules').value = JSON.stringify(permissionDataResult)
//     ability.update(permissionDataResult)

//     return true
//   }
//   catch (error) {
//     return false
//   }
// }
