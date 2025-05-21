<script setup lang="ts">
import { SizeType } from '@/types/baseModels'
import type { MessageType } from '@/types/baseModels'
import type { IHadithSearchResultItem } from '@/types/SearchResult'

const props = defineProps<Props>()

// const emit = defineEmits<Emit>()
// const { t } = useI18n({ useScope: 'global' })
const loadinglocal = ref(false)

// const { selectedNode } = useTree()
interface Props {
  dataitem: IHadithSearchResultItem
  isExpanded: boolean
  loading: boolean
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
const dataTabValue = ref(1)

// onMounted(() => {
//   loadinglocal.value = true
// })
</script>

<template>
  <VCard v-no-context-menu class="w-100 h-100 d-flex flex-column justify-start">
    <MCLoading v-if="props.loading || loadinglocal" :showloading="props.loading || loadinglocal" :loadingsize="SizeType.MD" />
    <!-- <VCard variant="text"> -->
    <VRow v-if="props.isExpanded" no-gutters dense class="align-center flex-0-0">
      <VTabs v-model="dataTabValue" density="comfortable" hide-slider grow>
        <VTab :value="1" variant="elevated" rounded="sm">
          {{ $t('hadith') }}
        </VTab>
        <VTab :value="2" variant="elevated" rounded="sm">
          {{ $t('translate') }}
        </VTab>
        <VTab :value="3" variant="elevated" rounded="sm">
          {{ $t('relatedhadith') }}
        </VTab>
      </VTabs>
    </VRow>
    <VDivider />
    <div class="overflow-y-auto mb-2">
      <VTabsWindow v-model="dataTabValue">
        <VTabsWindowItem :value="3" :transition="false">
          <VCardText />
        </VTabsWindowItem>

        <VTabsWindowItem :value="2" :transition="false">
          <VCardText />
        </VTabsWindowItem>
        <VTabsWindowItem :value="1" :transition="false">
          <VCardText class="py-1 px-1">
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
  </VCard>
</template>

<style lang="css">
.hadith-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scrollable-content {
  /* flex-grow: 1; */
  overflow-y: auto;
  /* display: flex;
  flex-direction: column; */
}

.hadithtext {
  padding: 0.5rem;
}
</style>
