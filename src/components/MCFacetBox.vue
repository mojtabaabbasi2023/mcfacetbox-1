<script setup lang="ts">
import type { ISimpleSelectableDTO } from '@/types/baseModels'

interface Props {
  dataitems: ISimpleSelectableDTO[]
  searchable: boolean
  facettitle: string
}
const props = defineProps<Props>()

const selectedItems = ref<number[]>([])
const searchText = ref('')
const facetDateItem = ref()

// const facetDateItem = computed(() => (
//   searchItems<ISimpleSelectableDTO>(props.dataitems, searchText.value, 'text')
// ))

// watch((searchText), newval => {
//   facetDateItem.value = searchItems<ISimpleSelectableDTO>(props.dataitems, newval, 'text')
// })

function searchinfacet(e: any) {
  searchText.value = e
}
</script>

<template>
  <VCard>
    <VList
      v-model:selected="selectedItems"
      lines="one"
      select-strategy="leaf"
    >
      <VListSubheader>{{ props.facettitle }}</VListSubheader>
      <VTextField
        v-show="props.searchable" :label="$t('search')" prepend-inner-icon="tabler-search" clearable
        :model-value="facetDateItem"
        @update:model-value="searchinfacet"
      />
      <VListItem
        v-for="item in props.dataitems"
        :key="item.id"
        :title="item.text"
        :value="item.text"
      >
        <template #prepend="{ isSelected }">
          <VListItemAction start>
            <VCheckbox :model-value="isSelected" />
          </VListItemAction>
        </template>
      </VListItem>
    </VList>
  </VCard>
</template>
