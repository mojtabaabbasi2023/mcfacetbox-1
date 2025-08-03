<script lang="ts" setup>
const props = defineProps<{
  node: any
  depth: number
}>()

const isOpen = ref(true)
const toggle = () => (isOpen.value = !isOpen.value)

// فرض بر اینه که داده‌ی children از بیرون وصل میشه
const children = computed(() => props.node.children || [])
</script>

<template>
  <div :style="{ marginLeft: `${depth * 16}px` }" class="mb-2">
    <VCard outlined>
      <VCardTitle @click="toggle">
        <VIcon class="mr-2" size="small">
          {{ isOpen ? 'mdi-chevron-down' : 'mdi-chevron-right' }}
        </VIcon>
        <strong>{{ node.title }}</strong>
      </VCardTitle>

      <VExpandTransition>
        <div v-show="isOpen">
          <!-- نمایش توضیح نود -->
          <VCardText v-if="node.description">
            {{ node.description }}
          </VCardText>

          <!-- فیش‌ها -->
          <VList v-if="node.excerpts && node.excerpts.length > 0" dense>
            <VListItem
              v-for="excerpt in node.excerpts"
              :key="excerpt.id"
              class="pl-6"
            >
              <VListItemContent>
                <VListItemTitle>{{ excerpt.content }}</VListItemTitle>
                <VListItemSubtitle v-if="excerpt.description">
                  {{ excerpt.description }}
                </VListItemSubtitle>
              </VListItemContent>
            </VListItem>
          </VList>

          <!-- نودهای فرزند -->
          <MCPreviewTreeNode
            v-for="child in children"
            :key="child.id"
            :node="child"
            :depth="depth + 1"
          />
        </div>
      </VExpandTransition>
    </VCard>
  </div>
</template>

<style lang="scss">

</style>
