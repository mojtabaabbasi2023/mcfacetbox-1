<script setup lang="ts">
//!SECTION این دیالوگ برای افزودن و یا ویرایش یک پنل یا درگاه کاربری میباشد
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import AppTextarea from '@/@core/components/app-form-elements/AppTextarea.vue';
import { serviceAdd } from '@/services/genericServices';
import { GateModel, GateProperties } from '@/types/gate';
import { useToast } from "vue-toastification";
import type { VForm } from 'vuetify/components/VForm';

const { t } = useI18n({ useScope: 'global' })
const toast = useToast();


interface Emit {
    (e: 'update:isDialogVisible', value: boolean): void
    (e: 'gateDataAdded', value: number): void
}

interface Props {
    isDialogVisible: boolean
    gateApiUrl: string
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const isFormValid = ref(false)
const refForm = ref<VForm>()
const isactive = ref(true)
const email = ref('')
const isloading = ref(false)
let gateModel = reactive<GateModel>(new GateModel())


async function gateAdd() {

    const { serviceData, serviceError } = await serviceAdd<GateProperties>(gateModel, props.gateApiUrl)
    if (serviceData.value) {
        toast.success(t("dateinsertsuccess"));
        emit('gateDataAdded', serviceData.value)
        emit('update:isDialogVisible', false)
        nextTick(() => {
            refForm.value?.reset()
            refForm.value?.resetValidation()
        })
    }
    else if (serviceError.value) {
        toast.error(t("datainsertfaild"));
    }
}
const onSubmit = () => {
    refForm.value?.validate().then(({ valid }) => {
        if (valid) {
            isloading.value = true
            setTimeout(() => {
                isloading.value = false
                gateAdd()
            }, 3000);
            return;
        }
    })
}

const onReset = () => {
    emit('update:isDialogVisible', false)
    refForm.value?.reset()
}
</script>

<template>
    <VDialog :width="$vuetify.display.smAndDown ? 'auto' : 900" :model-value="props.isDialogVisible"
        @update:model-value="onReset" persistent>
        <!-- 👉 Dialog close btn -->
        <DialogCloseBtn @click="onReset" :disabled="isloading" />
        <!-- <PerfectScrollbar :options="{ wheelPropagation: false }"> -->
        <VCard flat :title="$t('gateaddedit')" :subtitle="$t('gateaddeditsubtitle')">
            <VCardText>
                <!-- 👉 Form -->
                <VForm ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
                    <VRow>
                        <!-- 👉 Gate Title-->
                        <VCol cols="12">
                            <AppTextField v-model="gateModel.gateTitle"
                                :rules="[requiredValidator(gateModel.gateTitle, $t('validatorrequired'))]"
                                :label="$t('gatetitle')" placeholder="" />
                        </VCol>

                        <VCol cols="12">
                            <VRow>
                                <!-- 👉 Contact -->
                                <VCol cols="12" sm="6">
                                    <AppTextField v-model="gateModel.contact" type="number"
                                        :rules="[requiredValidator(gateModel.contact, $t('validatorrequired'))]"
                                        :label="$t('mobilenumber')" placeholder="09xx-xxx-xx-xx" />
                                </VCol>
                                <!-- 👉 Email -->
                                <VCol cols="12" sm="6">
                                    <AppTextField v-model="gateModel.email"
                                        :rules="[requiredValidator(gateModel.email, $t('validatorrequired')), emailValidator(gateModel.email, $t('validatoremail'))]"
                                        :label="$t('email')" placeholder="ٍE-mail" />
                                </VCol>
                            </VRow>

                        </VCol>
                        <VCol cols="12">
                            <VRow>
                                <!-- 👉 Name -->
                                <VCol sm="6" cols="12">
                                    <AppTextField v-model="gateModel.nameFamily"
                                        :rules="[requiredValidator(gateModel.nameFamily, $t('validatorrequired'))]"
                                        :label="$t('nameandfamily')" placeholder="" />
                                </VCol>
                                <!-- 👉 UserType -->
                                <VCol sm="4" cols="12">
                                    <AppSelect v-model="gateModel.userType" :label="$t('usertype')"
                                        placeholder="Select Role"
                                        :rules="[requiredValidator(gateModel.userType, $t('validatorrequired'))]"
                                        :items="['Admin', 'Author', 'Editor', 'Maintainer', 'Subscriber']" />
                                </VCol>
                                <VCol sm="2" cols="12" align-self="end">
                                    <VSwitch v-model="isactive" :label="$t('active')" />

                                </VCol>
                            </VRow>
                        </VCol>
                        <VCol cols="12">
                            <AppTextarea v-model="gateModel.description" :label="$t('description')"
                                placeholder="Write note here..." :rows="4" />
                        </VCol>


                        <!-- 👉 Submit and Cancel -->
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
