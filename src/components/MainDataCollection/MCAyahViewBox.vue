<script setup lang="ts">
import type { GridResultFacet } from '@/types/baseModels'
import { DataBoxType, MessageType, SizeType } from '@/types/baseModels'
import { type IDataShelfBoxNew } from '@/types/dataShelf'
import type { IAyahSearchResultItem, IAyahTranslateItem } from '@/types/ayahResult'
import { AyahSearchResultItemModel } from '@/types/ayahResult'
import { DataShelfBoxModelNew } from '@/types/dataShelf'
import { getSelectedTextWithinElement } from '@/utils/htmlUtils'

import type { ISearchResultItem } from '@/types/SearchResult'

const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const { t } = useI18n({ useScope: 'global' })

// const { t } = useI18n({ useScope: 'global' })
const loadinglocal = ref(false)
const loadingMore = ref(false)
const showfulltext = ref(false)
const translatelist = shallowReactive<IAyahTranslateItem[]>([])
const relatedayah = shallowReactive<IAyahSearchResultItem[]>([])
const relatedayahPage = shallowRef(1)
const relatedayahPageSize = shallowRef(10)
const relatedayahTotalCount = shallowRef(0)
const translateayahPage = shallowRef(1)
const translateayahPageSize = shallowRef(10)
const translateayahTotalCount = shallowRef(0)

// const { selectedNode } = useTree()
interface Props {
  dataitem: AyahSearchResultItemModel
  isExpanded: boolean
  searchPhrase: string
}
interface Emit {
  (e: 'messageHasOccured', message: string, type: MessageType): void
  (e: 'contentToNodeAdded', connectednodeid: number): void
  (e: 'dataitemchanged', value: AyahSearchResultItemModel): void
  (e: 'oncontextmenuselect', mouseEvent: MouseEvent, contenttype: DataBoxType, boxdata: IDataShelfBoxNew): void
}
async function selectmorelessHadith() {
  if (showfulltext.value) {
    showfulltext.value = false

    return
  }
  if (!showfulltext.value && props.dataitem.text.length > 1) {
    showfulltext.value = true

    return
  }
  loadingMore.value = true
  await loadcompleteayah()
  loadingMore.value = false
}
async function loadcompleteayah() {
  try {
    const result = await $api <AyahSearchResultItemModel>(`app/source/quran/${props.dataitem.id}${(props.searchPhrase && props.searchPhrase.length > 1) ? `?searchPhrase=${props.searchPhrase}` : ''}`, {
      method: 'GET',
    })

    if (result.id) {
      emit('dataitemchanged', result)
      showfulltext.value = true
    }
  }
  catch (error) {
    if (error instanceof CustomFetchError && error.code !== '0')
      emit('messageHasOccured', error.message, MessageType.error)
    emit('messageHasOccured', t('httpstatuscodes.0'), MessageType.error)
  }
}
async function loadtranslate() {
  loadinglocal.value = true
  try {
    const result = await $api <GridResultFacet<IAyahTranslateItem>>(`app/source/quran/${props.dataitem.id}/translate?PageNumber=${translateayahPage.value}&PageSize=${translateayahPageSize.value}`, {
      method: 'GET',
    })

    translatelist.splice(0)
    translatelist.push(...result.items)
    translateayahTotalCount.value = result.totalCount

    loadinglocal.value = false
  }
  catch (error) {
    loadinglocal.value = false

    if (error instanceof CustomFetchError && error.code !== '0')
      emit('messageHasOccured', error.message, MessageType.error)
    emit('messageHasOccured', t('httpstatuscodes.0'), MessageType.error)
  }
}
async function loadrelated() {
  loadinglocal.value = true
  try {
    const result = await $api <GridResultFacet<IAyahSearchResultItem>>(`app/source/quran/${props.dataitem.id}/related?PageNumber=${relatedayahPage.value}&PageSize=${relatedayahPageSize.value}`, {
      method: 'GET',
    })

    relatedayah.splice(0)

    relatedayah.push(...result.items.map(item => {
      return new AyahSearchResultItemModel(item.highLight, item.id, item.ayahNumber, item.link, item.shortText, item.text, item.surahTitle, item.surahId)
    }))
    relatedayahTotalCount.value = result.totalCount
    loadinglocal.value = false
  }
  catch (error) {
    loadinglocal.value = false

    if (error instanceof CustomFetchError && error.code !== '0')
      emit('messageHasOccured', error.message, MessageType.error)
    emit('messageHasOccured', t('httpstatuscodes.0'), MessageType.error)
  }
}
const dataTabValue = ref(1)

// onMounted(async () => {
//   if (props.isExpanded) {
//     loadinglocal.value = true
//     await loadcompleteayah()
//     loadinglocal.value = false
//   }
// })
watch(dataTabValue, async newval => {
  switch (newval) {
    case 2:
      if (translatelist.length < 1)
        loadtranslate()
      break;
    case 3:
      if (relatedayah.length < 1)
        loadrelated()
    break;
    default:
      break;
  }
})
function openBoxLink(linkPath: string) {
  if (linkPath.length > 0)
    window.open(linkPath, '_blank')
}
watch(relatedayahPage, () => {
  loadrelated()
},
)
watch(translateayahPage, () => {
  loadtranslate()
},
)

const onContextMenu = (e: MouseEvent, contentType: DataBoxType, contentdata: IDataShelfBoxNew, htmlElement?: HTMLElement) => {
  // prevent the browser's default menu

  e.preventDefault()

  let selectedText = ''
  if (htmlElement)
    selectedText = getSelectedTextWithinElement(htmlElement)

  if (selectedText.length > 0)
    contentdata.content = selectedText

  emit('oncontextmenuselect', e, contentType, contentdata)
}

// function relatedHadithItemChanged(searchresultItem: ISearchResultItem) {
//   const index = relatedayah.findIndex(item => item.id === searchresultItem.id)
//   if (index !== -1)
//     relatedayah[index].text = searchresultItem.text
// }

// onMounted(() => {
//   loadinglocal.value = true
// })
</script>

<template>
  <div v-no-context-menu class="w-100 h-100 d-flex flex-column justify-start">
    <!-- <VCard variant="text"> -->
    <MCLoading v-if="loadinglocal" :showloading="loadinglocal" :loadingsize="SizeType.MD" />

    <VRow v-if="props.isExpanded" no-gutters dense class="align-center flex-0-0">
      <VTabs v-model="dataTabValue" density="comfortable" hide-slider>
        <VTab :value="1" variant="elevated" rounded="sm">
          {{ $t('ayah') }}
        </VTab>
        <VTab :value="2" variant="elevated" rounded="sm">
          {{ $t('translate') }}
          <!-- <span class="pr-1">({{ props.dataitem.translateCount.toString() }})</span> -->
        </VTab>
        <VTab :value="3" variant="elevated" rounded="sm">
          {{ $t('relatedayah') }}
          <!-- <span class="pr-1">({{ props.dataitem.hadithRelatedCount.toString() }})</span> -->
        </VTab>
      </VTabs>
    </VRow>
    <div class="overflow-y-auto mb-2">
      <VTabsWindow v-model="dataTabValue">
        <VTabsWindowItem :value="3" :transition="false">
          <div v-if="relatedayah.length > 0 && dataTabValue === 3" class="d-flex flex-column position-relative">
            <div class="pl-2 py-2">
              <MCSearchResultBox
                v-for="(item) in relatedayah"
                :key="item.id" nestedmode :box-type="DataBoxType.quran" :expandable="false"
                :dataitem="item" :search-phrase="searchPhrase"
                @message-has-occured="(message, type) => $emit('messageHasOccured', message, type)" @oncontextmenuselect="onContextMenu"
              />
            </div>
            <div class="paging-container-fixed">
              <TablePagination
                v-model:page="relatedayahPage"
                density="compact"
                :items-per-page="relatedayahPageSize"
                :total-items="relatedayahTotalCount"
              />
            </div>
          </div>
        </VTabsWindowItem>

        <VTabsWindowItem :value="2" :transition="false">
          <div v-if="dataTabValue === 2" class="d-flex flex-column position-relative">
            <div v-for="(item) in translatelist" :key="item.id" class="mc-search-result">
              <div
                class="py-1 px-1" @contextmenu="(e) => {
                  const textContainer = e.currentTarget.querySelector('.selectable-content') || e.currentTarget;
                  onContextMenu(e, DataBoxType.text, new DataShelfBoxModelNew(0, 0, 0, item.text, '', [], [], '0'), textContainer)
                }"
              >
                <VRow>
                  <VCol>
                    <div class="flex">
                      <div>
                        <span class="searchDataBoxInfoTitle no-select"> {{ $t('address') }}: </span><span class="searchDataBoxInfoText">{{ `${item.bookTitle}, ${`${$t('volume')} ${item.volumeNumber}`}, ${`${$t('pagenum')} ${item.bookFromPage}`}` }} </span>
                        <VBtn icon size="22" variant="text" class="mx-2" @click="openBoxLink(item.noorLibLink)">
                          <VIcon icon="tabler-external-link" size="18" />
                        </VBtn>
                      </div>
                    </div>
                  </VCol>
                </VRow>
                <!-- @contextmenu="onContextMenu($event, DataBoxType.text, new DataShelfBoxModelNew(0, 0, 0, item.text, '', [], [], '0'), ($event.currentTarget as HTMLElement))" -->
                <VRow no-gutters class="justify-start align-start">
                  <VCol md="12">
                    <div class="selectable-content" v-html="item.text" />
                  </VCol>
                </VRow>
              </div>
            </div>
            <div class="paging-container-fixed">
              <TablePagination
                v-model:page="translateayahPage"
                density="compact"
                :items-per-page="translateayahPageSize"
                :total-items="translateayahTotalCount"
              />
            </div>
          </div>
        </VTabsWindowItem>
        <VTabsWindowItem :value="1" :transition="false">
          <div v-if="dataTabValue === 1" class="py-1 px-1">
            <VRow v-if="props.dataitem.surahTitle">
              <VCol>
                <div class="flex no-select">
                  <div> <span class="searchDataBoxInfoText">{{ `${props.dataitem.surahTitle}, ${`${$t('ayah')} ${props.dataitem.ayahNumber}`}` }} </span></div>
                </div>
              </VCol>
            </VRow>
            <!-- @contextmenu="onContextMenu($event, DataBoxType.hadith, new DataShelfBoxModelNew(0, 0, 0, props.dataitem.text, '', [], [], props.dataitem.id.toString()), ($event.currentTarget as HTMLElement))" -->
            <VRow
              no-gutters class="justify-start align-start hadithtext"

              @contextmenu="(e) => {
                const textContainer = e.currentTarget.querySelector('.selectable-content') || e.currentTarget;
                onContextMenu(e, DataBoxType.quran, new DataShelfBoxModelNew(0, 0, 0, props.dataitem.text, '', [], [], props.dataitem.id.toString()), textContainer)
              }"
            >
              <VCol md="12">
                <div class="selectable-content" v-html="props.dataitem.text" />
                <!-- test: {{ (props.dataitem.highLight) ? 'true' : 'false' }} -->
              </VCol>
            </VRow>
          </div>
        </VTabsWindowItem>
      </VTabsWindow>
    </div>
  </div>
</template>
