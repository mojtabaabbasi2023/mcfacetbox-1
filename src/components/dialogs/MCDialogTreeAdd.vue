<script setup lang="ts">
//!SECTION این دیالوگ برای افزودن و یا ویرایش یک پروژه میباشد
import AppTextarea from '@/@core/components/app-form-elements/AppTextarea.vue';
import { serviceAdd, serviceUpdate } from '@/services/genericServices';
import { ITreeTitle, TreeTitleModel } from '@/types/tree';
import { useToast } from "vue-toastification";
import type { VForm } from 'vuetify/components/VForm';

const { t } = useI18n({ useScope: 'global' })
const toast = useToast();


interface Emit {
    (e: 'update:isDialogVisible', value: boolean): void
    (e: 'treeTitleDataAdded', value: number): void
    (e: 'treeTitleDataUpdated', value: number): void

}


const props = defineProps({
    isDialogVisible: { type: Boolean, default: false },
    apiUrl: String,
})
const emit = defineEmits<Emit>()

const isFormValid = ref(false)
const refForm = ref<VForm>()
const isloading = ref(false)
const treeTitleData = reactive<ITreeTitle>(new TreeTitleModel())


async function projectAdd() {

    const { serviceData, serviceError } = await serviceAdd<ITreeTitle>(treeTitleData, props.apiUrl == undefined ? '' : props.apiUrl)
    if (serviceData.value) {
        toast.success(t("alert.dataActionSuccess"));
        emit('treeTitleDataAdded', serviceData.value)
        emit('update:isDialogVisible', false)
        nextTick(() => {
            onReset()
        })
    }
    else if (serviceError.value) {
        toast.error(t("alert.dataActionFailed"));
    }
}

async function projectEdit() {

    const { serviceData, serviceError } = await serviceUpdate<ITreeTitle>(treeTitleData, treeTitleData.id, props.apiUrl == undefined ? '' : props.apiUrl)
    if (serviceData.value) {
        toast.success(t("alert.dataActionSuccess"));
        emit('treeTitleDataUpdated', serviceData.value)
        emit('update:isDialogVisible', false)
        nextTick(() => {
            onReset()
        })
    }
    else if (serviceError.value) {
        toast.error(t("alert.dataActionFailed"));
    }
}
const onSubmit = () => {
    refForm.value?.validate().then(({ valid }) => {
        if (valid) {
            isloading.value = true
            if (treeTitleData.id > 0) {
                projectEdit()
            }
            else
                projectAdd()
            return;
        }
    })
}

const onReset = () => {
    isloading.value = false
    treeTitleData.id = 0;
    emit('update:isDialogVisible', false)
    refForm.value?.reset()
    refForm.value?.resetValidation()
}

const updateTreeTitle = (treeTitleDataItem: ITreeTitle) => {
    objectMap(treeTitleData, useCloned(treeTitleDataItem))
}


defineExpose({ updateTreeTitle })
</script>

<template>
    <VDialog :width="$vuetify.display.smAndDown ? 'auto' : 900" :model-value="props.isDialogVisible"
        @update:model-value="onReset" persistent>
        <DialogCloseBtn @click="onReset" :disabled="isloading" />
        <VCard flat :title="$t('tree.addedit')" :subtitle="$t('tree.addeditsubtitle')">
            <VCardText>
                <!-- 👉 Form -->
                <VForm ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
                    <VRow>
                        <VCol cols="12">
                            <AppTextField v-model="treeTitleData.title"
                                :rules="[requiredValidator(treeTitleData.title, $t('validatorrequired'))]"
                                :label="$t('tree.title')" placeholder="" />
                        </VCol>
                        <VCol cols="12">
                            <VRow>
                                <VCol cols="12" align-self="end">
                                    <VSwitch v-model="treeTitleData.isActive" :label="$t('active')" />
                                </VCol>
                            </VRow>

                        </VCol>
                        <VCol cols="12">
                            <AppTextarea v-model="treeTitleData.description" :label="$t('description')"
                                placeholder="Write note here..." :rows="4" />
                        </VCol>
                        <VCol cols="12">
                            <VBtn type="submit" class="me-3">
                                <VProgressCircular size="20" width="3" v-if="isloading" indeterminate>
                                </VProgressCircular>
                                <span v-else>
                                    {{ $t('accept') }}
                                </span>
                            </VBtn>
                            <VBtn type="reset" variant="tonal" color="error" @click="onReset" :disabled="isloading">
                                {{ $t('cancel') }}
                            </VBtn>
                        </VCol>
                    </VRow>
                </VForm>
            </VCardText>
        </VCard>
        <!-- </PerfectScrollbar> -->
    </VDialog>

</template>
