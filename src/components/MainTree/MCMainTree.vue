<script setup lang="ts">
import { VTreeview } from 'vuetify/labs/VTreeview'
import type { ISimpleTree } from '@/types/baseModels'
import { createTreeIndex } from '@/types/tree'

import { useSelectedNode } from '@/store/treeStore'

// watch(selectedProjects, (newvalue, oldvalue) => {
//     roleData.projects = convertSimpleTreeToSimpleDtoArray(projectList).filter((item) => selectedProjects.value.includes(item.id))
// })
const props = defineProps({
  title: { type: String },
})

const emit = defineEmits<Emit>()
const items = [{ title: 'Option 1', value: 'Option 1' }, { title: 'Option 2', value: 'Option 2' }, { title: 'Option 3', value: 'Option 3' }]
const projectList = reactive<ISimpleTree[]>([{ id: 1, title: 'موسوعه یک', children: [{ id: 2, title: 'درخت یک' }, { id: 3, title: 'درخت دو' }] }, {
  id: 4, title: 'موسوعه دو', children: [{ id: 5, title: 'درخت سه' }, {
    id: 6, title: 'درخت چهار', children: [{ id: 7, title: 'درخت پنج' }, {
      id: 8,
      title: 'عَلِيُّ بْنُ مُحَمَّدٍ عَنْ سَهْلِ بْنِ زِيَادٍ عَنْ عَمْرِو بْنِ عُثْمَانَ عَنْ مُفَضَّلِ بْنِ صَالِحٍ عَنْ سَعْدِ بْنِ طَرِيفٍ عَنِ اَلْأَصْبَغِ بْنِ نُبَاتَةَ عَنْ عَلِيٍّ عَلَيْهِ اَلسَّلاَمُ قَالَ: هَبَطَ جَبْرَئِيلُ عَلَى آدَمَ عَلَيْهِ اَلسَّلاَمُ فَقَالَ يَا آدَمُ إِنِّي أُمِرْتُ أَنْ أُخَيِّرَكَ وَاحِدَةً مِنْ ثَلاَثٍ فَاخْتَرْهَا وَ دَعِ اِثْنَتَيْنِ فَقَالَ لَهُ آدَمُ يَا جَبْرَئِيلُ وَ مَا اَلثَّلاَثُ فَقَالَ اَلْعَقْلُ وَ اَلْحَيَاءُ وَ اَلدِّينُ فَقَالَ آدَمُ إِنِّي قَدِ اِخْتَرْتُ اَلْعَقْلَ فَقَالَ جَبْرَئِيلُ لِلْحَيَاءِ وَ اَلدِّينِ اِنْصَرِفَا وَ دَعَاهُ - فَقَالاَ يَا جَبْرَئِيلُ إِنَّا أُمِرْنَا أَنْ نَكُونَ مَعَ اَلْعَقْلِ حَيْثُ كَانَ قَالَ فَشَأْنَكُمَا وَ عَرَجَ .', children: [{ id: 51, title: 'درخت 9', children: [{ id: 65, title: 'درخت 9', children: [{ id: 21, title: 'درخت 9', children: [{ id: 54, title: 'درخت 9', children: [{ id: 80, title: 'درخت 9', children: [{ id: 90, title: 'درخت 9', children: [{ id: 19, title: 'درخت 9', children: [{ id: 91, title: 'درخت 9' }] }] }] }] }] }] }] }]
    }]
  }]
}])
const selectedProjects = ref<number[]>([])
const treeIndex = reactive<Record<number, ISimpleTree>>({})

interface Emit {
  (e: 'close'): void // ایونت جدید close اضافه شد
  (e: 'open'): void // ایونت جدید close اضافه شد
}

const selectenode = useSelectedNode()

function updateTreeIndex(treeData: ISimpleTree[]) {
  // اینجا فرض می‌شود که createTreeIndex(tree) یک شیء جدید برمی‌گرداند
  const newTreeIndex = createTreeIndex(treeData)

  // به‌روزرسانی مقادیر در treeIndex
  Object.assign(treeIndex, { ...newTreeIndex })
}

const selectTreeNode = (item: ISimpleTree) => {
  if (selectenode.simpleTreeModelStored.id > 0) {
    treeIndex[selectenode.simpleTreeModelStored.id].selected = false
    console.log(treeIndex[item.id])
  }

  //   treeNodeDeselectAll(projectList)
  item.selected = true
  selectenode.simpleTreeModelStored.id = item.id
  selectenode.simpleTreeModelStored.title = item.title
  selectenode.simpleTreeModelStored.selected = item.selected
  selectenode.simpleTreeModelStored.children = item.children
}

onMounted(() => {
  updateTreeIndex(projectList)
})

// watch(selectenode.simpleTreeModelStored, newval => {
//   console.log('storechange', newval)
// })
</script>

<template>
  <div class="mc-main-tree">
    <VRow no-gutters class="btn-box toolbar">
      <IconBtn size="small" @click="">
        <VIcon icon="tabler-search" size="22" />
      </IconBtn>
      <IconBtn size="small" @click="">
        <VIcon icon="tabler-box-multiple" size="22" />
      </IconBtn>
      <IconBtn size="small" @click="">
        <VIcon icon="tabler-select" size="22" />
      </IconBtn>
      <IconBtn size="small" @click="">
        <VIcon icon="tabler-trash-x" size="22" />
      </IconBtn>
      <IconBtn size="small" @click="">
        <VIcon icon="tabler-plug-connected" size="22" />
      </IconBtn>
      <IconBtn size="small" @click="">
        <VIcon icon="tabler-brand-openai" size="22" />
      </IconBtn>
      <IconBtn size="small" @click="">
        <VIcon icon="tabler-eraser" size="22" />
      </IconBtn>
    </VRow>

    <VRow dense class="header">
      <VCol />
      <VCol cols="auto">
        {{ $t('tree.nodes') }}
      </VCol>
    </VRow>

    <div class="tree-view-scroll">
      <VTreeview v-model:selected="selectedProjects" :items="projectList" expand-icon="mdi-menu-left" item-value="id"
        item-title="title" density="compact" :lines="false">
        <template #title="{ item }">
          <div :class="`no-select ${item.selected ? 'selected' : ''}`" :style="item.selected ? 'color:red' : ''"
            @dblclick="selectTreeNode(item)">
            <VTooltip :text="item.title">
              <template #activator="{ props }">
                <VRow v-bind="props" dense class="mx-0">
                  <VCol class="tree-title">
                    {{ item.title }}
                  </VCol>
                  <VCol cols="auto" class="tree-node">
                    <template v-if="item.children && item.children.length > 0">
                      {{ item.children.length }}
                    </template>
                  </VCol>
                </VRow>
              </template>
            </VTooltip>
          </div>
        </template>
      </VTreeview>
    </div>
  </div>
</template>
