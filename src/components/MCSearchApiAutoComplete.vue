<script lang="ts" setup>
// !SECTION این دیالوگ برای جستجو لیست های تک سطحی و انتخاب یک یا چند مورد میباشد

import type { GridResult, ISimpleSelectableDTO, SizeType } from '@/types/baseModels'
import { SelectionType } from '@/types/baseModels'

interface Prop {
  apiUrl: string
  apiUrlAddData?: string
  selectionType: SelectionType
  maxHeight?: number
  fillSearchPhraseWithSelected?: boolean
  showParentTitle?: boolean
  listItemSize?: SizeType
  loadAllList?: boolean
  placeholder?: string
  activeaction?: boolean
  actionedata?: Record<string, any>
}
const props = defineProps<Prop>()

const emit = defineEmits<Emit>()

const { t } = useI18n({ useScope: 'global' })

interface Emit {
  (e: 'errorHasOccured', message: string): void
  (e: 'loadingStateChanged', loading: boolean, dataItemsCount: number): void
  (e: 'searchPhraseChanged', searchPhrase: string): void

}
const itemsPerPage = ref(10000)
const page = ref(1)
const selectedItemsLocal = defineModel<number[]>('selectedItems', { default: [] })
const searchResult = reactive<ISimpleSelectableDTO<number>[]>([])
const searchPhrase = ref('')
const actionInprogress = ref(false)
const actionloading = ref(false)
let timeout: ReturnType<typeof setTimeout> | null = null

// const onReset = () => {
//   // Reset all predefined properties
// }
const selectionStrategy = computed(() => {
  switch (props.selectionType) {
    case SelectionType.Single:
      return 'single-independent'
    case SelectionType.Multiple:
      return 'independent'
    default:
      break;
  }
})

const { execute: fetchData, isFetching: loadingdata, data: searchResultFirst, onFetchResponse, onFetchError } = useApi<GridResult<ISimpleSelectableDTO<number>>>(createUrl(props.apiUrl ?? '', {
  query: {
    filter: searchPhrase,
    itemsPerPage,
    page,
  },
}), {
  refetch: false,
  immediate: false,
}).get()

onFetchResponse(response => {
  response.json().then(value => {
    searchResult.splice(0)
    selectedItemsLocal.value.splice(0)
    if (searchResultFirst.value)
      searchResult.push(...searchResultFirst.value.items)
    actionInprogress.value = true
  })
})

onMounted(() => {
//   if (props.selectedItems)
//     selectedItemsLocal.value.push(...props.selectedItems)
//   console.log('selecteditems', props.selectedItems)

  if (props.loadAllList) {
    setTimeout(() => {
      fetchData()
    }, 1000)
  }
})
onFetchError(() => {
  actionInprogress.value = true
  emit('errorHasOccured', 'probleminGetInformation')
})

async function addSearchData() {
  try {
    const actionDatas = { ...props.actionedata, title: searchPhrase.value }
    if (isNullOrUndefined(props.apiUrlAddData))
      return
    actionloading.value = true
    await $api(props.apiUrlAddData, {
      method: 'POST',
      body: JSON.parse(JSON.stringify(actionDatas)),
      ignoreResponseError: false,
    })
    actionloading.value = false
    fetchData()
  }
  catch (error) {
    console.log('error', error)

    actionloading.value = false
    if (error instanceof CustomFetchError && error.code > 0)
      emit('errorHasOccured', error.message)
    else emit('errorHasOccured', t('httpstatuscodes.0'))
  }
}

const onReset = () => {
  actionInprogress.value = false
  searchPhrase.value = ''
  selectedItemsLocal.value.splice(0)
  searchResult.splice(0)
  if (props.loadAllList)
    fetchData()
}

watch(selectedItemsLocal, () => {
  if ((props.fillSearchPhraseWithSelected ?? false) && props.selectionType === SelectionType.Single)
    searchPhrase.value = searchResult.find(item => { return item.id === selectedItemsLocal.value[0] })?.title ?? ''
})
watch(searchPhrase, () => {
  if (searchPhrase.value.length > 2) {
    if (timeout)
      clearTimeout(timeout)

    timeout = setTimeout(() => {
      actionInprogress.value = false
      fetchData(false)
    }, 2000)
  }

  emit('searchPhraseChanged', searchPhrase.value)
})

watch(searchResult, () => {
  emit('loadingStateChanged', loadingdata.value, searchResult.length)
})
</script>

<template>
  <VCard variant="flat" class="pb-3">
    <!-- <MCLoading :showloading="loadingdata" /> -->
    <div class="search-container">
      <VTextField
        v-model:model-value="searchPhrase" autofocus :placeholder="$t(props.placeholder ? props.placeholder : 'search')" append-inner-icon="tabler-search"
        clearable density="compact" :loading="loadingdata" @click:clear="onReset"
      >
        <template #append>
          <div v-if="props.activeaction" class="px-2">
            <VBtn variant="elevated" icon="tabler-plus" rounded="lg" size="small" :loading="actionloading" @click="addSearchData" />
          </div>
        </template>
      </VTextField>
    </div>

    <VList
      v-if="searchResult.length > 0"
      v-model:selected="selectedItemsLocal"
      :class="`${props.listItemSize ? `v-list-${props.listItemSize}` : ''}`" item-value="key" item-title="title"
      lines="one"
      :select-strategy="selectionStrategy"
      :return-object="false"
      :max-height="`${props.maxHeight ?? 400}px`"
    >
      <!-- <VVirtualScroll :items="filteredItems" :height="(props.scrollItemCount ?? 10) * 20"> -->
      <VListItem v-for="item in searchResult" :key="item.id" :title="item.title" :value="item.id">
        <template #title>
          <span v-if="item.parentTitle && item.parentTitle.length > 0" class="opacity-60">{{ item.parentTitle }} / </span>
          <span>{{ item.title }}</span>
        </template>
        <template #prepend="{ isSelected }">
          <VListItemAction start>
            <VCheckbox :model-value="isSelected" density="compact" />
          </VListItemAction>
        </template>
      </VListItem>
    </VList>
    <div v-else-if="actionInprogress" class="w-100 h-100 py-6" style="text-align: center;">
      <span>
        {{ $t('thereisnoitem') }}
      </span>
    </div>
  </VCard>
  <!-- </PerfectScrollbar> -->
</template>
