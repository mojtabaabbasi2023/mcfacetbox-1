<script lang="ts" setup>
// !SECTION این دیالوگ برای جستجو لیست های تک سطحی و انتخاب یک یا چند مورد میباشد

import { SizeType } from '@/types/baseModels'
import { type ITreeExcerpt, SimpleNestedNodeExcerptAcionableModel } from '@/types/tree'

interface Prop {
  isDialogVisible: boolean
  treeid: number
}

const props = defineProps<Prop>()
const emit = defineEmits<Emit>()
const loading = shallowRef(false)
const opening = shallowRef(false)
const { t } = useI18n({ useScope: 'global' })
const treeExcerpt = reactive<ITreeExcerpt>({ id: 0, title: '', nodes: [{ ...new SimpleNestedNodeExcerptAcionableModel() }], excerptCount: null })

interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
  (e: 'errorHasOccured', message: string): void
}
onMounted(async () => {
  await loadTreeData()
})
async function loadTreeData() {
  opening.value = true
  try {
    const result = await $api <ITreeExcerpt>(`app/node/preview/${props.treeid}`, {
      method: 'GET',
    })

    Object.assign(treeExcerpt, result)
    opening.value = false
  }
  catch (error) {
    opening.value = false
    if (error instanceof CustomFetchError && error.code !== '0')
      emit('errorHasOccured', error.message)
    else emit('errorHasOccured', t('httpstatuscodes.0'))
    emit('update:isDialogVisible', false)
  }
}
</script>

<template>
  <VDialog
    v-if="props.isDialogVisible" :model-value="props.isDialogVisible"
    persistent :scrollable="false"
  >
    <DialogCloseBtn :disabled="loading" @click="emit('update:isDialogVisible', false)" />
    <MCLoading :loadingsize="SizeType.MD" :showloading="opening" />

    <VCard variant="flat" :loading="opening" :min-height="200" class="pa-1">
      <VCardTitle class="primary white--text pr-4 pb-2">
        {{ $t('tree.preview') }}
        <VSpacer />
      </VCardTitle>
      <div class="mc-data-scrolly">
        <VDivider />
        <MCPreviewTreeNode v-for="node in treeExcerpt.nodes" :key="node.id" :node="node" :depth="0" />
      </div>
    </VCard>
  </VDialog>
</template>
