<script setup lang="ts">
import { MessageType, SizeType } from '@/types/baseModels'
import { HadithSearchResultItemModel, HadithTranslateItemModel } from '@/types/SearchResult'
import type { IHadithSearchResultItem, IHadithTranslateItem } from '@/types/SearchResult'

const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const { t } = useI18n({ useScope: 'global' })

// const { t } = useI18n({ useScope: 'global' })
const loadinglocal = ref(false)
const loadingMore = ref(false)
const showfulltext = ref(false)
const hadithItemLocal = reactive<IHadithSearchResultItem>(new HadithSearchResultItemModel())
const translatelist = reactive<IHadithTranslateItem[]>([])

// const { selectedNode } = useTree()
interface Props {
  dataitem: IHadithSearchResultItem
  isExpanded: boolean
  searchPhrase: string
}
interface Emit {
  (e: 'messageHasOccured', message: string, type: MessageType): void
  (e: 'contentToNodeAdded', connectednodeid: number): void
  (e: 'dataitemchanged', value: IHadithSearchResultItem): void
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
  await loadcompletehadith()
  loadingMore.value = false
}
async function loadcompletehadith() {
  try {
    const result = await $api <IHadithSearchResultItem>(`app/source/hadith/${props.dataitem.id}${(props.searchPhrase && props.searchPhrase.length > 1) ? `?searchPhrase=${props.searchPhrase}` : ''}`, {
      method: 'GET',
    })

    emit('dataitemchanged', result)
    showfulltext.value = true
  }
  catch (error) {
    if (error instanceof CustomFetchError && error.code > 0)
      emit('messageHasOccured', error.message, MessageType.error)
    emit('messageHasOccured', t('httpstatuscodes.0'), MessageType.error)
  }
}
async function loadtranslate() {
  loadinglocal.value = true
  try {
    const result = await $api <IHadithTranslateItem[]>(`app/source/hadith/${props.dataitem.id}/translate`, {
      method: 'GET',
    })

    translatelist.push(...result)
    loadinglocal.value = false
  }
  catch (error) {
    loadinglocal.value = false

    if (error instanceof CustomFetchError && error.code > 0)
      emit('messageHasOccured', error.message, MessageType.error)
    emit('messageHasOccured', t('httpstatuscodes.0'), MessageType.error)
  }
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
const dataTabValue = ref(1)

onMounted(async () => {
  if (props.isExpanded && props.dataitem.text.length < 1) {
    loadinglocal.value = true
    await loadcompletehadith()
    loadinglocal.value = false
  }
})
watch(dataTabValue, async newval => {
  switch (newval) {
    case 2:
      if (translatelist.length < 1)
        loadtranslate()
      break;

    default:
      break;
  }
})
function openBoxLink(linkPath: string) {
  window.open(linkPath, '_blank')
}

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
          {{ $t('hadith') }}
        </VTab>
        <VTab :value="2" variant="elevated" rounded="sm">
          {{ $t('translate') }}<span class="pr-1">({{ props.dataitem.translateCount.toString() }})</span>
        </VTab>
        <VTab :value="3" variant="elevated" rounded="sm">
          {{ $t('relatedhadith') }}<span class="pr-1">({{ props.dataitem.hadithRelatedCount.toString() }})</span>
        </VTab>
      </VTabs>
    </VRow>
    <div class="overflow-y-auto mb-2">
      <VTabsWindow v-model="dataTabValue">
        <VTabsWindowItem :value="3" :transition="false">
          <VCardText />
        </VTabsWindowItem>

        <VTabsWindowItem :value="2" :transition="false">
          <VCard v-for="(item) in translatelist" :key="item.id" class="mc-search-result">
            <div class="py-1 px-1">
              <VRow>
                <VCol>
                  <div class="flex">
                    <div>
                      <span class="searchDataBoxInfoTitle"> {{ $t('address') }}: </span><span class="searchDataBoxInfoText">{{ `${item.sourceMainTitle}, ${`${$t('volume')} ${props.dataitem.vol}`}, ${`${$t('pagenum')} ${props.dataitem.pageNum}`}` }} </span>
                      <VBtn icon size="22" variant="text" class="mx-2" @click="openBoxLink(item.noorLibLink)">
                        <VIcon icon="tabler-external-link" size="18" />
                      </VBtn>
                    </div>
                  </div>
                </VCol>
              </VRow>
              <VRow no-gutters class="justify-start align-start">
                <VCol md="12">
                  <div v-html="item.text" />
                </VCol>
              </VRow>
            </div>
          </VCard>
        </VTabsWindowItem>
        <VTabsWindowItem :value="1" :transition="false">
          <div class="py-1 px-1">
            <VRow>
              <VCol>
                <div class="flex">
                  <div v-if="props.dataitem.qaelList.length > 1">
                    <span class="searchDataBoxInfoTitle"> {{ $t('qael') }}: </span><span class="searchDataBoxInfoText">{{ props.dataitem.qaelTitleList }}</span>
                  </div>
                  <div>  <span class="searchDataBoxInfoTitle"> {{ $t('address') }}: </span><span class="searchDataBoxInfoText">{{ `${props.dataitem.bookTitle}, ${`${$t('volume')} ${props.dataitem.vol}`}, ${`${$t('pagenum')} ${props.dataitem.pageNum}`}` }} </span></div>
                </div>
              </VCol>
            </VRow>
            <VRow no-gutters class="justify-start align-start hadithtext">
              <VCol md="12">
                <div v-html="(props.dataitem.text.length > 1 && (showfulltext || props.isExpanded)) ? props.dataitem.text : props.dataitem.highlightText" />
                <VBtn v-if="props.dataitem.highLight.some(item => item.includes('...')) && !showfulltext && !props.isExpanded" style="font-size: large;" variant="text" :loading="loadingMore" @click="selectmorelessHadith">
                  {{ $t('more') }}
                </VBtn>
                <VBtn v-if="showfulltext && !props.isExpanded" style="font-size: large;" variant="text" :loading="loadingMore" @click="selectmorelessHadith">
                  {{ $t('less') }}
                </VBtn>
              </VCol>
            </VRow>
          </div>
        </VTabsWindowItem>
      </VTabsWindow>
    </div>
    <!--
      <VCardText style="height: auto;">
      <VRow>
      <VCol>
      <div class="flex">
      <div v-if="props.dataitem.qaelList.length > 1">
      <span class="searchDataBoxInfoTitle"> {{ $t('qael') }}: </span><span class="searchDataBoxInfoText">{{ props.dataitem.qaelTitleList }}</span>
      </div>
      <div>  <span class="searchDataBoxInfoTitle"> {{ $t('address') }}: </span><span class="searchDataBoxInfoText">{{ `${props.dataitem.bookTitle}, ${`${$t('volume')} ${props.dataitem.vol}`}, ${`${$t('pagenum')} ${props.dataitem.pageNum}`}` }} </span></div>
      </div>
      </VCol>
      </VRow>
      <VRow no-gutters class="justify-start align-start">
      <VCol md="12">
      <div v-if="props.dataitem" class="hadithtext" v-html="props.dataitem.highlightText" />
      </VCol>
      </VRow>
      </VCardText>
    -->

    <!-- </VCard> -->
  </div>
</template>
