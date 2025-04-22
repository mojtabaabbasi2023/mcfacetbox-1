<script lang="ts" setup>
import { SelectionType, SizeType } from '@/types/baseModels'

interface Prop {
  isDialogVisible: boolean
  selectedDataBoxId: number
  locX: number
  locY: number
  treeId: number

}

const props = defineProps<Prop>()
const emit = defineEmits<Emit>()
const selectedNodes = ref<number[]>([])
const searchPhrase = ref('')
const loading = ref(false)
const { t } = useI18n({ useScope: 'global' })

interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
  (e: 'errorHasOccured', message: string): void
  (e: 'labelAdded', nodeid: number, labelcount: number): void
}

const onReset = (closedialog: boolean = false) => {
  if (closedialog)
    emit('update:isDialogVisible', false)
}

const addlabels = async () => {
  loading.value = true
  try {
    await $api(`app/excerpt/${props.selectedDataBoxId}/labels`, {
      method: 'PUT',
      body: JSON.parse(JSON.stringify(selectedNodes.value)),
      ignoreResponseError: false,
    })

    emit('labelAdded', props.selectedDataBoxId, selectedNodes.value.length)
    loading.value = false
  }
  catch (error) {
    loading.value = false

    if (error instanceof CustomFetchError && error.code > 0)
      emit('errorHasOccured', error.message)
    else emit('errorHasOccured', t('alert.probleminnodeaddrefreshpage'))
  }
}
</script>

<template>
  <VDialog
    :scrim="false"
    :width="$vuetify.display.smAndDown ? 'auto' : DialogSizeXS" :model-value="props.isDialogVisible"
    :target="[locX, locY]" location-strategy="connected" @update:model-value="onReset(true)"
  >
    <DialogCloseBtn icon-size="16px" :disabled="loading" @click="onReset(true)" />
    <VCard variant="flat" class="v-card-sm" :title="$t('datashelfbox.addlabel')" :height="400">
      <VCardText class="pa-0">
        <MCSearchApiAutoComplete
          v-model:selected-items="selectedNodes" placeholder="datashelfbox.labeltitle" activeaction api-url-add-data="app/label" :actionedata="{ treeid: treeId }"
          auto-focus :max-height="255" :api-url="`app/label/simple?treeid=${treeId}`" :selection-type="SelectionType.Multiple" class="pt-0"
          :fill-search-phrase-with-selected="false" :list-item-size="SizeType.SM" load-all-list @error-has-occured="emit('errorHasOccured', $event)"
        />
      </VCardText>
      <VDivider />

      <template #actions>
        <div class="w-100 d-flex justify-center py-1 px-1">
          <VBtn type="submit" class="me-3" :loading="loading" :disabled="!(searchPhrase.length > 0 || selectedNodes.length > 0)" @click="addlabels">
            <span>
              {{ $t('add') }}
            </span>
          </VBtn>
        </div>
      </template>
    </VCard>
  </VDialog>
</template>
