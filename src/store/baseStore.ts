import { NavLinkStateName } from '@/@layouts/types'
import { LoginState } from '@/types/baseModels'

export const useLoginState = createGlobalState(
  () => {
    const Loginstate = ref<LoginState>(LoginState.Login)

    return { Loginstate }
  },
)

export const useNavLinkSelectState = createGlobalState(
  () => {
    const selectState = ref<NavLinkStateName>(NavLinkStateName.None)

    return { selectState }
  },
)
