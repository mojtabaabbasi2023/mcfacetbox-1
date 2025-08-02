<script lang="ts" setup>
interface Prop {
  isDialogVisible: boolean
  description: string
  locX: number
  locY: number

}

const props = defineProps<Prop>()
const emit = defineEmits<Emit>()
const loading = ref(false)
const opening = ref(false)
const locx = shallowRef(0)
const locy = shallowRef(0)

const { t } = useI18n({ useScope: 'global' })

interface Emit {
  (e: 'update:isDialogVisible', value: boolean): void
  (e: 'errorHasOccured', message: string): void
}

const onReset = (closedialog: boolean = false) => {
  if (closedialog)
    emit('update:isDialogVisible', false)
}

onMounted(() => {
  locx.value = props.locX
  locy.value = props.locY
})
</script>

<template>
  <VDialog
    v-if="props.isDialogVisible"
    :width="$vuetify.display.smAndDown ? 'auto' : DialogSizeXS" :model-value="props.isDialogVisible" :scrim="false"
    :target="[locx, locy]" location-strategy="connected" @update:model-value="onReset(true)"
  >
    <DialogCloseBtn :disabled="loading" icon-size="16" btn-size="22" @click="onReset(true)" />
    <VCard variant="flat" class="v-card-sm" :loading="opening">
      <!--
        <VBtn size="small" variant="text" style="position: absolute;left: -8px;top:-8px;width: 10px;" @click="onReset(true)">
        <VIcon icon="tabler-x" size="16" />
        </VBtn>
      -->
      <VCardText class="pa-4">
        {{ props.description }}
      </VCardText>
      <VDivider />
    </VCard>
  </VDialog>
</template>
