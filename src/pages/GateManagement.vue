<script setup lang="ts">
//!SECTION این فرم برای مدیریت پنل ها در این سامانه میباشد
import MCDataTable from '@/components/MCDataTable.vue';
import { serviceDelete } from '@/services/genericServices';
import { useToast } from "vue-toastification";


const { t } = useI18n({ useScope: 'global' })
const mcdatatable = ref(MCDataTable)

const toast = useToast();
// GateHeaders
const gateHeaders = [
    { title: t('gatetitle'), key: 'gateTitle' },
    { title: t('mobilenumber'), key: 'contact' },
    { title: t('nameandfamily'), key: 'nameFamily' },
    { title: t('createDate'), key: 'createDate' },
    { title: t('expireDate'), key: 'expireDate' },
    { title: t('status'), key: 'active', sortable: false },
    { title: t('users'), key: 'users', sortable: false },
    { title: '', key: 'actions', sortable: false },
]

const gateApiUrl = '/apps/gates'

function clickbutton() {
    isAddNewGateDialogVisible.value = true;
}

// 👉 search filters
const roles = [
    { title: 'Admin', value: 'admin' },
    { title: 'Author', value: 'author' },
    { title: 'Editor', value: 'editor' },
    { title: 'Maintainer', value: 'maintainer' },
    { title: 'Subscriber', value: 'subscriber' },
]

const resolveUserRoleVariant = (role: string) => {
    const roleLowerCase = role.toLowerCase()

    if (roleLowerCase === 'subscriber')
        return { color: 'primary', icon: 'tabler-user' }
    if (roleLowerCase === 'author')
        return { color: 'warning', icon: 'tabler-settings' }
    if (roleLowerCase === 'maintainer')
        return { color: 'success', icon: 'tabler-chart-donut' }
    if (roleLowerCase === 'editor')
        return { color: 'info', icon: 'tabler-pencil' }
    if (roleLowerCase === 'admin')
        return { color: 'error', icon: 'tabler-device-laptop' }
    return { color: 'primary', icon: 'tabler-user' }
}

const resolveUserStatusVariant = (stat: string) => {
    const statLowerCase = stat.toLowerCase()
    if (statLowerCase === 'pending')
        return 'warning'
    if (statLowerCase === 'active')
        return 'success'
    if (statLowerCase === 'inactive')
        return 'secondary'
    return 'primary'
}

const isAddNewGateDialogVisible = ref(false)

const gateDataAdded = (gateDataId: number) => {
    mcdatatable.value.refreshData()
}

const deleteUser = async (id: number) => {
    const { data, error } = await serviceDelete(id, gateApiUrl)
    if (data.value) {
        toast.success("دیتا با موفقیت درج شد");
    }
    else if (error.value) {
        toast.error("مشکل در افزودن دیتا بوجود آمد");
    }
}
</script>
<template>
    <section>
        <VCard>
            <VBtn @click="clickbutton">
                TestLoad
            </VBtn>
            <VDivider />

            <MCDataTable ref="mcdatatable" :headers="gateHeaders" :api-url="gateApiUrl">
                <template #item.user="{ item }">
                    <div class="d-flex align-center gap-x-4">
                        <VAvatar size="34" :variant="!item.avatar ? 'tonal' : undefined"
                            :color="!item.avatar ? resolveUserRoleVariant(item.role).color : undefined">
                            <VImg v-if="item.avatar" :src="item.avatar" />
                            <span v-else>{{ avatarText(item.fullName) }}</span>
                        </VAvatar>
                        <div class="d-flex flex-column">
                            <h6 class="text-base">
                                <RouterLink :to="{ name: 'apps-user-view-id', params: { id: item.id } }"
                                    class="font-weight-medium text-link">
                                    {{ item.fullName }}
                                </RouterLink>
                            </h6>
                            <div class="text-sm">
                                {{ item.email }}
                            </div>
                        </div>
                    </div>
                </template>

                <template #item.role="{ item }">
                    <div class="d-flex align-center gap-x-2">
                        <VIcon :size="22" :icon="resolveUserRoleVariant(item.role).icon"
                            :color="resolveUserRoleVariant(item.role).color" />

                        <div class="text-capitalize text-high-emphasis text-body-1">
                            {{ item.role }}
                        </div>
                    </div>
                </template>

                <template #item.plan="{ item }">
                    <div class="text-body-1 text-high-emphasis text-capitalize">
                        {{ item.currentPlan }}
                    </div>
                </template>

                <template #item.status="{ item }">
                    <VChip :color="resolveUserStatusVariant(item.status)" size="small" label class="text-capitalize">
                        {{ item.status }}
                    </VChip>
                </template>
            </MCDataTable>
        </VCard>

        <!-- 👉 Add New User -->
        <MCDialogGateAdd v-model:is-dialog-visible="isAddNewGateDialogVisible" @gate-data-added="gateDataAdded"
            :gate-api-url="gateApiUrl" />
    </section>
</template>
