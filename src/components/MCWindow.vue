<script setup lang="ts">
const props = defineProps({
    title: { type: String },
})

interface Emit {
    (e: 'close'): void; // ایونت جدید close اضافه شد
    (e: 'open'): void; // ایونت جدید close اضافه شد
}

const emit = defineEmits<Emit>();
</script>

<template>
    <div class='content-box'>
        <div class='content'>
            <VRow no-gutters justify="space-between" align="center" class="tool-bar">
                <div class='title'>
                    {{ title }}
                </div>
                <div>
                    <VRow no-gutters class="btn-box">
                        <IconBtn @click="emit('open')" size="small">
                            <VIcon icon="tabler-settings" size="18" />
                        </IconBtn>
                        <IconBtn @click="emit('close')" size="small">
                            <VIcon icon="tabler-x" size="18" />
                        </IconBtn>
                    </VRow>
                </div>
            </VRow>
            <slot name="default">

            </slot>
        </div>
    </div>
</template>

<style lang="scss"></style>
