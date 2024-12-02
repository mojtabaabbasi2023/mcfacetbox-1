<script setup lang="ts">
import { ISearchResultTabBox } from '@/types/SearchResult';

const props = defineProps({
    title: { type: String },

})

interface Emit {
    (e: 'close'): void; // ایونت جدید close اضافه شد
    (e: 'open'): void; // ایونت جدید close اضافه شد
}

const tabdatamodel = ref()
const dataitems = reactive<ISearchResultTabBox>({
    id: 0, content: [
        { id: 0, title: 'حدیث', content: [{ id: 0, title: 'این یک متن شماره یک تستی حدیث است' }, { id: 0, title: 'این یک متن تستی شماره دو حدیث است' }, { id: 0, title: 'این یک متن تستی شماره سه  حدیث است' }] }
        , { id: 1, title: 'قران', content: [{ id: 0, title: 'این یک متن تستی شماره دو +-قران است' }, { id: 0, title: 'این یک متن تستی شماره یک قرآناست' },] }
        , { id: 2, title: 'ترجمه', content: [{ id: 0, title: 'این یک متن تستی  ترجمه است' }] }]
})

const emit = defineEmits<Emit>();
</script>

<template>
    <VCard>
        <VTabs v-model="tabdatamodel" align-tabs="start">
            <VTab v-for="item in dataitems.content" :key="item.id" :text="item.title" :value="item.id"></VTab>
        </VTabs>
        <VTabsWindow v-model="tabdatamodel">
            <VTabsWindowItem v-for="item in dataitems.content" :key="item.id" :value="item.id">
                <VCard>
                    <VCardText>
                        <VDataIterator :items="item.content" :items-per-page="1">
                            <template v-slot:default="{ items }">
                                <p v-for="(textData, j) in items" :key="j">{{ textData
                                    .raw.title }}</p>
                            </template>

                            <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
                                <VFooter class="justify-space-between text-body-2 mt-1">
                                    <div>
                                        <span class="ml-2">Page {{ page }} of {{ pageCount }}</span>
                                        <VBtn :disabled="page === 1" class="me-2" icon="tabler-arrow-right"
                                            size="xsmall" @click="prevPage"></VBtn>
                                        <VBtn :disabled="page === pageCount" icon="tabler-arrow-left" size="xsmall"
                                            @click="nextPage"></VBtn>
                                    </div>
                                </VFooter>
                            </template>
                        </VDataIterator>
                    </VCardText>
                </VCard>
            </VTabsWindowItem>
        </VTabsWindow>
    </VCard>
</template>
