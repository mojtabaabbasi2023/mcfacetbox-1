import { LoginState } from '@/types/baseModels'

export const useLoginState = createGlobalState(
  () => {
    const Loginstate = ref<LoginState>(LoginState.Login)

    return { Loginstate }
  },
)
