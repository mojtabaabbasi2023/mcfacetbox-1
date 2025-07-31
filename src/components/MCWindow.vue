<script setup lang="ts">
const props = defineProps({
  title: { type: String },
})

const emit = defineEmits<Emit>()

interface Emit {
  (e: 'close'): void // ایونت جدید close اضافه شد
  (e: 'open'): void // ایونت جدید close اضافه شد
  (e: 'move'): void
}
</script>

<template>
  <!-- <div class=" h-100"> -->
  <VCard class="elevation-1 content-box">
    <div class="tool-bar my-1" style="display: flex; justify-content: space-between; align-items: center;">
      <div class="title mb-1">
        {{ props.title }}
      </div>

      <div>
        <div class="btn-box mb-1" style="display: flex; gap: 8px; align-items: center;">
          <slot name="actions" />
          <VIcon icon="tabler-settings" size="18" @click="emit('open')" />
          <!-- <VIcon icon="tabler-x" size="18" @click="emit('close')" /> -->
        </div>
      </div>
    </div>
    <div class="content">
      <slot name="default" />
    </div>
  </VCard>
  <!-- </div> -->
</template>
