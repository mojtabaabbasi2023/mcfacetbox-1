<script setup lang="ts">
import ContextMenu from '@imengyu/vue3-context-menu'
import type { ISimpleTreeActionable } from '@/types/baseModels'
import { DataBoxType, MessageType, SizeType } from '@/types/baseModels'
import { DataShelfBoxModelNew, type IDataShelfBoxNew } from '@/types/dataShelf'
import type { IHadithSearchResultItem } from '@/types/SearchResult'

const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const { t } = useI18n({ useScope: 'global' })
const tempSelectedTabBoxItem = reactive<DataShelfBoxModelNew>(new DataShelfBoxModelNew(0, props.selectedTreeId, 0, ''))

// const { selectedNode } = useTree()
const dialogSelectNodeVisible = ref(false)
const loadinglocal = ref(false)
interface Props {
  dataitemHadith?: IHadithSearchResultItem
  dataitemQuran?: any
  dataitemVocab?: any
  selectedTreeId: number
  selectedNode: ISimpleTreeActionable
  boxType: DataBoxType
}
interface Emit {
  (e: 'messageHasOccured', message: string, type: MessageType): void
  (e: 'contentToNodeAdded', connectednodeid: number): void
}

// const props = defineProps<>({
//   dataitems: {
//     type: SearchResultTabBoxModel,
//     required: true,
//     validator: value => {
//       return value instanceof SearchResultTabBoxModel // Ensure the instance is correct
//     },
//   },
// })
const dataTabValue = ref()
async function addContentToNode(datashelfbox: IDataShelfBoxNew) {
  loadinglocal.value = true
  try {
    await $api(`app/excerpt/${DataBoxType[props.boxType]}`, {
      method: 'POST',
      body: JSON.stringify(datashelfbox),
      ignoreResponseError: false,
    })
    emit('contentToNodeAdded', datashelfbox.nodeId)
  }
  catch (error) {
    if (error instanceof CustomFetchError && error.code !== '0')
      emit('messageHasOccured', error.message, MessageType.error)
    else emit('messageHasOccured', t('httpstatuscodes.0'), MessageType.error)
  }
  loadinglocal.value = false
}

const selectedHighlight = computed(() => {
  if (props.dataitemHadith && props.dataitemHadith.id > 0)
    return props.dataitemHadith.highlightText

  else if (props.dataitemQuran && props.dataitemQuran.id > 0)
    return props.dataitemQuran.highlightText
})

const selectedId = computed(() => {
  if (props.dataitemHadith && props.dataitemHadith.id > 0)
    return props.dataitemHadith.id

  else if (props.dataitemQuran && props.dataitemQuran.id > 0)
    return props.dataitemQuran.id
})

// interface Emit {
//   (e: 'close'): void // ایونت جدید close اضافه شد
//   (e: 'open'): void // ایونت جدید close اضافه شد
// }
const onContextMenu = (e: MouseEvent) => {
  // prevent the browser's default menu
  e.preventDefault()

  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    items: [
      {
        disabled: props.selectedNode.id <= 0,
        icon: h('i', {
          class: 'tabler-plug-connected icon iconfont',
          style: {
            width: '18px',
            height: '18px',
          },
        }),
        label: t('datagathering.connecttoselectednode'),
        onClick: () => {
          addContentToNode({ content: selectedHighlight.value, description: '', labels: [], nodeId: props.selectedNode.id, treeId: 9, footNotes: [], id: 0, sourceId: selectedId.value.toString() })
        },
      },
      {
        label: t('datagathering.connecttocustomnode'),
        icon: h('i', {
          class: 'tabler-plug icon iconfont',
          style: {
            width: '18px',
            height: '18px',
          },
        }),
        onClick: () => {
        //   tempSelectedTabBoxItem.content = selectedItem.title
          dialogSelectNodeVisible.value = true
        },
      },
      {
        icon: h('i', {
          class: 'tabler-plug-off icon iconfont',
          style: {
            width: '18px',
            height: '18px',
          },
        }),
        label: t('datagathering.connecttotree'),
        onClick: () => {
          addContentToNode({ content: selectedHighlight.value, description: '', labels: [], nodeId: 0, treeId: props.selectedTreeId, footNotes: [], id: 0, sourceId: selectedId.value.toString() })
        },
      },
      {
        label: t('datagathering.copy'),
        icon: h('i', {
          class: 'tabler-copy icon iconfont',
          style: {
            width: '18px',
            height: '18px',
          },
        }),
        onClick: () => {
          alert('You click a menu item')
        },
      },

    //   {
    //     label: 'A submenu',
    //     children: [
    //       { label: 'Item1' },
    //       { label: 'Item2' },
    //       { label: 'Item3' },
    //     ],
    //   },
    ],
  })
}

onMounted(() => {
  loadinglocal.value = true
})
</script>

<template>
  <VCard v-no-context-menu style="height: 100%;">
    <MCLoading :showloading="loadinglocal" :loadingsize="SizeType.MD" />
    <!-- <VCard variant="text"> -->
    <VRow no-gutters dense class="align-center" justify="space-between">
      <VTabs v-model="dataTabValue" density="compact" hide-slider>
        <VTab :value="1" variant="elevated" rounded="sm">
          {{ $t('hadith') }}
        </VTab>
        <VTab :value="2" variant="elevated" rounded="sm">
          {{ $t('translate') }}
        </VTab>
        <VTab :value="3" variant="elevated" rounded="sm">
          {{ $t('word') }}
        </VTab>
      </VTabs>
    </VRow>
    <VDivider />
    <VTabsWindow ref="mainDataResult" v-model="dataTabValue" class="mc-data-scroll">
      <VTabsWindowItem :value="3" :transition="false" />
      <VTabsWindowItem :value="2" :transition="false" />
      <VTabsWindowItem :value="1" :transition="false" />
      <VCardText style="height: auto;" @contextmenu="onContextMenu($event)">
        <MCDialogSelectNode
          v-if="dialogSelectNodeVisible" v-model:is-dialog-visible="dialogSelectNodeVisible" :selected-item="selectedHighlight"
          :selected-tree-id="props.selectedTreeId" @nodehasbeenselected="(nodeid) => addContentToNode(new DataShelfBoxModelNew(0, props.selectedTreeId, nodeid, selectedHighlight, '', [], [], selectedId.toString()))"
        />
        <VRow>
          <VCol>
            <div v-if="props.dataitemHadith && props.dataitemHadith.id > 0" class="flex">
              <div v-if="props.dataitemHadith.qaelList.length > 1">
                <span class="searchDataBoxInfoTitle"> {{ $t('qael') }}: </span><span class="searchDataBoxInfoText">{{ props.dataitemHadith.qaelTitleList }}</span>
              </div>
              <div>  <span class="searchDataBoxInfoTitle"> {{ $t('address') }}: </span><span class="searchDataBoxInfoText">{{ `${props.dataitemHadith.bookTitle}, ${`${$t('volume')} ${props.dataitemHadith.vol}`}, ${`${$t('pagenum')} ${props.dataitemHadith.pageNum}`}` }} </span></div>
            </div>
          </VCol>
        </VRow>
        <VRow no-gutters class="justify-start align-start">
          <VCol md="12">
            <div v-if="props.dataitemHadith" class="hadithtext" v-html="props.dataitemHadith.highlightText" />
          </VCol>
        </VRow>
      </VCardText>
    </VTabsWindow>

    <!-- </VCard> -->
  </VCard>
</template>
