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
    :width="400" :model-value="props.isDialogVisible" :scrim="false"
    :target="[locx, locy + 40]" location-strategy="connected" @update:model-value="onReset(true)"
  >
    <!-- <DialogCloseBtn :disabled="loading" icon-size="16" btn-size="22" @click="onReset(true)" /> -->
    <VCard variant="flat" class="v-card-sm">
      <!--
        <VBtn size="small" variant="text" style="position: absolute;left: -8px;top:-8px;width: 10px;" @click="onReset(true)">
        <VIcon icon="tabler-x" size="16" />
        </VBtn>
      -->
      <VCardText class="pa-4">
        <div class="w-100 d-flex flex-row justify-center">
          <VRadioGroup v-model="searchConfig" inline>
            <VRadio :label="$t('searchconfig.OneOrMore')" :value="SearchConfig.OneOrMore" false-icon="tabler-circle" true-icon="tabler-circle-filled" />
            <VRadio :label="$t('searchconfig.All')" :value="SearchConfig.All" false-icon="tabler-circle" true-icon="tabler-circle-filled" />

            <VRadio :label="$t('searchconfig.Exact')" :value="SearchConfig.Exact" false-icon="tabler-circle" true-icon="tabler-circle-filled" />
          </VRadioGroup>
          <!--
            <VBtn type="submit" class="me-3" :loading="loading" @click="addNewNode">
            <span>
            {{ $t('accept') }}
            </span>
            </VBtn>
          -->
          <!--
            <VBtn type="reset" variant="tonal" color="error" :disabled="loading" @click="onReset">
            {{ $t('cancel') }}
            </VBtn>
          -->
        </div>
      </VCardText>
      <VDivider />
    </VCard>
  </VDialog>
</template>
