<script lang="ts" setup>
// !SECTION این دیالوگ برای جستجو لیست های تک سطحی و انتخاب یک یا چند مورد میباشد

import type { IDataShelfBoxView } from '@/types/dataShelf'
import { DataShelfBoxModelView } from '@/types/dataShelf'
import type { ISimpleDTO } from '@/types/baseModels'
import { SizeType } from '@/types/baseModels'

interface Prop {
  isDialogVisible: boolean
  selectedDataBoxId: number
  serviceurl: string
}

const props = defineProps<Prop>()
const emit = defineEmits<Emit>()
const loading = ref(false)
const opening = ref(false)
const { t } = useI18n({ useScope: 'global' })
const databoxItem = reactive<DataShelfBoxModelView>(new DataShelfBoxModelView())

// const apiUrl = ref('')
const mcsourcehistory = ref()
interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
  (e: 'errorHasOccured', message: string): void
}

const tableHeaders = [
  { title: t('content'), key: 'content' },
  { title: t('datashelfbox.connectednodesimple'), key: 'node', sortable: false },
  { title: t('description'), key: 'description', sortable: false },
  { title: t('labels'), key: 'labels', sortable: false },
  { title: t('creatoruser'), key: 'creatorFullName' },
  { title: t('createDate'), key: 'creationTime' },
]

onMounted(async () => {
  nextTick(() => mcsourcehistory.value.refreshData())
})
async function getDataBoxItem() {
  opening.value = true
  try {
    const result = await $api <IDataShelfBoxView>(`app/excerpt/${props.selectedDataBoxId}`, {
      method: 'GET',
    })

    Object.assign(databoxItem, result)
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
    v-if="props.isDialogVisible" :width="$vuetify.display.mdAndDown ? 'auto' : DialogSizeMD" :model-value="props.isDialogVisible"
    persistent
  >
    <DialogCloseBtn :disabled="loading" @click="emit('update:isDialogVisible', false)" />

    <VCard variant="flat" :loading="opening" :min-height="200" class="pa-3">
      <MCLoading :loadingsize="SizeType.MD" :showloading="opening" />
      <VCardTitle class="primary white--text">
        {{ $t('datashelfbox.about') }}
        <VSpacer />
      </VCardTitle>
      <VDivider />
      <MCDataTable ref="mcsourcehistory" :headers="tableHeaders" :api-url="props.serviceurl" :gateid="0" :autostart="false">
        <template #item.labels="{ value }">
          <div class="d-flex align-center gap-x-4">
            {{ value.labels && value.labels.map((item: ISimpleDTO<number>) => `${item.title}`).join(' ,') }}
          </div>
        </template>
        <template #item.node="{ value }">
          <div class="d-flex align-center gap-x-4">
            {{ value.node.title }}
          </div>
        </template>
        <template #item.creationTime="{ value }">
          <div class="d-flex align-center gap-x-4">
            {{ usePersianDate(value.creationTime) }}
          </div>
        </template>
      </MCDataTable>
    </VCard>
  </VDialog>
</template>
