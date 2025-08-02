<script setup lang="ts">
interface Props {
  icon?: string
  iconSize?: string
  btnSize?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'tabler-x',
  iconSize: '20',
  btnSize: '30',
})
</script>

<template>
  <IconBtn
    variant="elevated"
    :size="props.btnSize"
    :ripple="false"
    class="v-dialog-close-btn"
  >
    <VIcon
      :icon="props.icon"
      :size="props.iconSize"
    />
  </IconBtn>
</template>
