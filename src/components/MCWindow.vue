<script setup lang="ts">
const props = defineProps({
  title: { type: String },
})

const emit = defineEmits<Emit>()

interface Emit {
  (e: 'close'): void // ایونت جدید close اضافه شد
  (e: 'open'): void // ایونت جدید close اضافه شد
}
</script>

<template>
  <div class="content-box">
    <div class="content">
      <VRow
        no-gutters
        justify="space-between"
        align="center"
        class="tool-bar"
      >
        <div class="title">
          {{ title }}
        </div>
        <div>
          <VRow
            no-gutters
            class="btn-box"
          >
            <IconBtn
              size="small"
              @click="emit('open')"
            >
              <VIcon
                icon="tabler-settings"
                size="18"
              />
            </IconBtn>
            <IconBtn
              size="small"
              @click="emit('close')"
            >
              <VIcon
                icon="tabler-x"
                size="18"
              />
            </IconBtn>
          </VRow>
        </div>
      </VRow>
      <slot name="default" />
    </div>
  </div>
</template>

<style lang="scss">
.tool-bar {
  border-block-end: 1px solid #7f56d9;
}

.title {
  font-weight: bold;
  margin-inline-end: 10px;
}

.content-box {
  padding: 10px;
  background-color: #f8f7fa;
  block-size: 100%;
}

.content {
  border-radius: 6px;
  background-color: white;
  block-size: 100%;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 7.5%);
}
</style>
