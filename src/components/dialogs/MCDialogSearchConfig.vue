<script lang="ts" setup>
import { SearchConfig } from '@/types/baseModels'

interface Prop {
  isDialogVisible: boolean
  locX: number
  locY: number

}

const props = defineProps<Prop>()
const emit = defineEmits<Emit>()
const locx = shallowRef(0)
const locy = shallowRef(0)

// const searchConfig = shallowRef(SearchConfig.OneOrMore)
const { t } = useI18n({ useScope: 'global' })
const searchConfig = defineModel<SearchConfig>({ default: SearchConfig.All })
interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
}

const onReset = (closedialog: boolean = false) => {
  if (closedialog)
    emit('update:isDialogVisible', false)
}

onMounted(() => {
  locx.value = props.locX
  locy.value = props.locY
})
</script>

<template>
  <VDialog
    v-if="props.isDialogVisible"
    :width="370" :model-value="props.isDialogVisible" :scrim="false"
    :target="[locx, locy + 40]" location-strategy="connected" @update:model-value="onReset(true)"
  >
    <VCard variant="flat" class="v-card-xs">
      <VCardText class="pa-2">
        <div class="w-100 d-flex flex-row justify-center">
          <VRadioGroup v-model="searchConfig" inline>
            <VRadio :label="$t('searchconfig.OneOrMore')" :value="SearchConfig.OneOrMore" false-icon="tabler-circle" true-icon="tabler-circle-filled" />
            <VRadio :label="$t('searchconfig.All')" :value="SearchConfig.All" false-icon="tabler-circle" true-icon="tabler-circle-filled" />

            <VRadio :label="$t('searchconfig.Exact')" :value="SearchConfig.Exact" false-icon="tabler-circle" true-icon="tabler-circle-filled" />
          </VRadioGroup>
        </div>
      </VCardText>
      <VDivider />
    </VCard>
  </VDialog>
</template>
