<script lang="ts" setup>
import type { ISimpleNestedNodeExcerptActionable } from '@/types/tree'

const props = defineProps<{
  node: ISimpleNestedNodeExcerptActionable
  depth: number
}>()

// const nodeelement = ref()
const isOpen = shallowRef(false)
const toggle = () => (isOpen.value = !isOpen.value)

// فرض بر اینه که داده‌ی children از بیرون وصل میشه
const children = computed(() => props.node.children || [])

// const targetIsVisible = shallowRef(true)

// const { stop } = useIntersectionObserver(
//   nodeelement,
//   ([entry], observerElement) => {
//     targetIsVisible.value = entry?.isIntersecting || false
//   },
// )
</script>

<template>
  <div class="mb-2">
    <VCard ref="nodeelement" flat>
      <VCardTitle>
        <VBtn v-if="node.children || (node.excerptCount?.total ?? 0 > 0)" variant="plain" size="medium" @click="toggle">
          <VIcon class="mr-1 ml-2" size="small">
            {{ isOpen ? 'tabler-chevron-down' : 'tabler-chevron-left' }}
          </VIcon>
        </VBtn>
        <span v-else class="mr-7" />
        <strong>{{ node.title }}</strong>
      </VCardTitle>

      <VExpandTransition>
        <div v-if="isOpen" class="pt-2 pr-6">
          <!-- نمایش توضیح نود -->
          <!--
            <VCardText v-if="node.hasDescription">
            {{ node.excerpts }}
            </VCardText>
          -->

          <!-- فیش‌ها -->
          <div>
            <div
              v-for="(excerpt, i) in node.excerpts"
              :key="excerpt.id"
              :item-index="i"
              class="pl-2" style="position: relative;"
            >
              <MCDataShelfBox
                :model-value="excerpt"
                :prev-item-order="i - 1" :item-index="i"
                :next-item-order="i + 1"
                :prev-item-priority="i > 0 ? node.excerpts[i - 1].priority : -1"
                :next-item-priority="i < node.excerpts.length - 1 ? node.excerpts[i + 1].priority : -1" readonly-mode
              />
            </div>
          </div>
          <div>
            <!-- نودهای فرزند -->
            <MCPreviewTreeNode
              v-for="child in children"
              :key="child.id"
              :node="child"
              :depth="depth + 1"
            />
          </div>
        </div>
      </VExpandTransition>
    </VCard>
  </div>
</template>
