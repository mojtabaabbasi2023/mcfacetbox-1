<script lang="ts" setup>
// !SECTION این دیالوگ برای جستجو لیست های تک سطحی و انتخاب یک یا چند مورد میباشد

import { useTreeStoreV3 } from '@/store/treeStoreV3'
import type { INodeChangePriority, ISimpleFlatNodeActionable } from '@/types/tree'
import { SelectionType } from '@/types/baseModels'
import { NodeLocationType, SimpleFlatNodeActionable, SingleNodeNewModel, getNodeTypeNameSpace } from '@/types/tree'

interface Prop {
  isDialogVisible: boolean
  selectedNode: ISimpleFlatNodeActionable
  selectedTreeId: number
}

const props = defineProps<Prop>()
const emit = defineEmits<Emit>()
const selectedNodes = ref<number[]>([])
const activeActions = ref(false)
const nodeAddingType = ref(NodeLocationType.SiblingAfter)
const nodeTitle = ref('')
const loading = ref(false)
const treeStore = useTreeStoreV3()
const { t } = useI18n({ useScope: 'global' })

interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
  (e: 'errorHasOccured', message: string): void
  (e: 'nodeAdded', node: ISimpleFlatNodeActionable): void
  (e: 'nodeAddedFailed', message: string): void

}

const onReset = (closedialog: boolean = false) => {
  if (closedialog)
    emit('update:isDialogVisible', false)
  activeActions.value = false
}

// watch(selectedNodes, () => {
//   console.log('selectednode', selectedNodes.value)
// })
function dataEntryChanged(phrase: string) {
  nodeTitle.value = phrase
  if (phrase.length > 0)
    activeActions.value = true
  else
    activeActions.value = false
}

const addNewNode = async () => {
  loading.value = true
  try {
    const resultData = await $api<INodeChangePriority>(`app/node/${getNodeTypeNameSpace(nodeAddingType.value)}`, {
      method: 'POST',
      body: JSON.parse(JSON.stringify(new SingleNodeNewModel(props.selectedTreeId, props.selectedNode.id, nodeTitle.value))),
      ignoreResponseError: false,
    })

    const result = treeStore.createNode({ id: resultData.id, title: nodeTitle.value, parentId: props.selectedNode.id, tempData: null, priority: resultData.priority }, props.selectedNode.id, nodeAddingType.value)

    if (!result) {
      emit('nodeAddedFailed', t('alert.probleminnodeaddrefreshpage'))

      return
    }

    emit('nodeAdded', new SimpleFlatNodeActionable(resultData.id, nodeTitle.value, props.selectedNode.id))
    loading.value = false
  }
  catch (error) {
    loading.value = false

    if (error instanceof CustomFetchError && error.code !== '0')
      emit('nodeAddedFailed', error.message)
    else emit('nodeAddedFailed', t('alert.probleminnodeaddrefreshpage'))
  }
}

const addRootNode = () => {

}

defineExpose({ addRootNode })
</script>

<template>
  <VDialog
    v-if="props.isDialogVisible" :width="$vuetify.display.smAndDown ? 'auto' : DialogSizeSM" :model-value="props.isDialogVisible"
    persistent @update:model-value="onReset(true)"
  >
    <DialogCloseBtn :disabled="loading" @click="onReset(true)" />
    <VCard variant="flat" :subtitle="`${$t('tree.selectednode')}: ${props.selectedNode.title}`" :title="$t('tree.addnewnode')" class="pa-1">
      <MCSearchApiAutoComplete
        v-model:selected-items="selectedNodes"
        auto-focus :max-height="400" :api-url="`app/node/simple?treeid=${props.selectedTreeId}`" :selection-type="SelectionType.Single" class="pt-1"
        fill-search-phrase-with-selected @search-phrase-changed="dataEntryChanged"
      />
      <VDivider v-if="activeActions" />

      <template #actions>
        <div v-if="activeActions" class="w-100 d-flex justify-center py-2 px-2">
          <VRadioGroup v-model="nodeAddingType" inline>
            <VRadio :label="$t('before')" :value="NodeLocationType.SiblingBefore" false-icon="tabler-circle" true-icon="tabler-circle-filled" />
            <VRadio :label="$t('after')" :value="NodeLocationType.SiblingAfter" false-icon="tabler-circle" true-icon="tabler-circle-filled" />

            <VRadio :label="$t('tree.childnode')" :value="NodeLocationType.Children" false-icon="tabler-circle" true-icon="tabler-circle-filled" :disabled="selectedNode.id === -1" />
          </VRadioGroup>
          <VBtn type="submit" class="me-3" :loading="loading" @click="addNewNode">
            <span>
              {{ $t('accept') }}
            </span>
          </VBtn>
          <VBtn type="reset" variant="tonal" color="error" :disabled="loading" @click="onReset">
            {{ $t('cancel') }}
          </VBtn>
        </div>
      </template>
    </VCard>
  </VDialog>
</template>
