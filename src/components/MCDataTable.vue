<script lang="ts" setup>
import { VCardTitle } from 'vuetify/lib/components/index.mjs';

// const currentdate = ref('');

const props = defineProps({
    headers: Array<object>,
    apiUrl: { type: String, required: true },
    searchLabel: { type: String, default: '' },

})

// import {useTemplateRef} from vue

class GridResult<T> {
    page = 0
    totalPages = 0
    totalItems = 0
    items: Array<T> = []
}

// interface Props {
//     headers: Array<{}>
//     apiUrl: string
//     searchLabel: string
// }

const { t } = useI18n({ useScope: 'global' })
const searchQuery = ref('')
const selectedRole = ref()
const selectedPlan = ref()
const selectedStatus = ref()

const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

const updateOptions = (options: any) => {
    sortBy.value = options.sortBy[0]?.key
    orderBy.value = options.sortBy[0]?.order
}

const { data: resultData, execute: fetchData, isFetching: loadingdata, onFetchResponse, onFetchError } = useApi<GridResult<any>>(createUrl(props.apiUrl, {
    query: {
        q: searchQuery,
        status: selectedStatus,
        plan: selectedPlan,
        role: selectedRole,
        itemsPerPage,
        page,
        sortBy,
        orderBy,
    },
}), { immediate: false })

setTimeout(async () => {
    try {
        await fetchData(false)
    }
    catch (error) {
        console.log('fetchthrow', error)
    }
}, 1000)

// await useApi<GridResult<UserProperties>>(createUrl('/apps/users'),(
//     options: {
//     immediate: false,
// }
// )

onFetchResponse(response => {
    response.json().then(value => {
        // console.log('hasresponse', value)
        // datatableItems.value = value.items
        // console.log('datatableitems', datatableItems.value)
        // console.log(datatable.value);
    })
})

onFetchError(error => {
    // console.log('haserror', error)
})

const datatableItems = computed((): any[] => {
    if (resultData.value)
        return resultData.value.items

    else
        return new Array<any>()
})

const datatableTotalItems = computed(() => {
    if (resultData.value)
        return resultData.value.totalItems

    else
        return 0
})

const searchLabelDefault = computed(() => {
    if (props.searchLabel.length > 0)
        return props.searchLabel

    else
        return t('search')
})

const refreshData = () => fetchData(false)


// 👉 Delete user
const deleteUser = async (id: number) => {
    await $api(`/apps/users/${id}`, {
        method: 'DELETE',
    })

    // refetch User
    // TODO: Make this async
    // fetchUsers2()
}
defineExpose({ refreshData })

</script>

<template>
    <section>
        <VCard>
            <VCardTitle class="d-flex flex-wrap gap-1">
                <div class="d-flex align-center flex-wrap gap-4 ma-2">
                    <!-- 👉 Search  -->
                    <AppTextField v-model="searchQuery" :placeholder="searchLabelDefault"
                        style="inline-size: 15.625rem;" />

                    <!-- 👉 Add user button -->
                    <!--
            <AppSelect v-model="selectedRole" placeholder="Select Role" :items="roles" clearable
            clear-icon="tabler-x" style="inline-size: 10rem;" />
            <MCInputDatePicker v-model:selected-date="currentdate"></MCInputDatePicker>
          -->

                    <VSpacer />
                </div>

                <div class="d-flex gap-2 align-center ma-2 ms-auto ">
                    <p class="text-body-1 mb-0">
                        {{ $t('Show') }}
                    </p>
                    <AppSelect :model-value="itemsPerPage" :items="[
                        { value: 10, title: '10' },
                        { value: 25, title: '25' },
                        { value: 50, title: '50' },
                        { value: 100, title: '100' },
                        { value: -1, title: 'All' },
                    ]" style="inline-size: 5.5rem;" @update:model-value="itemsPerPage = parseInt($event, 10)" />
                </div>
            </VCardTitle>

            <VDivider />

            <!-- SECTION datatable -->
            <VDataTableServer ref="datatable" v-model:items-per-page="itemsPerPage" v-model:page="page"
                :items-per-page-options="[
                    { value: 10, title: '10' },
                    { value: 20, title: '20' },
                    { value: 50, title: '50' },
                    { value: -1, title: '$vuetify.dataFooter.itemsPerPageAll' },
                ]" :items="datatableItems" :items-length="datatableTotalItems" :headers="headers" class="text-no-wrap"
                show-select :loading="loadingdata" @update:options="updateOptions">


                <template v-for="slotName in Object.keys($slots)" #[slotName]="slotScope">
                    <slot :name="slotName" v-bind="slotScope" />
                </template>
                <!-- Actions -->
                <template #item.actions="{ item }">
                    <IconBtn @click="deleteUser(item.id)">
                        <VIcon icon="tabler-trash" />
                    </IconBtn>

                    <IconBtn>
                        <VIcon icon="tabler-eye" />
                    </IconBtn>
                    <!-- <VBtn icon variant="text" color="medium-emphasis">
                        <VIcon icon="tabler-dots-vertical" />
                        <VMenu activator="parent">
                            <VList>
                                <VListItem :to="{ name: 'apps-user-view-id', params: { id: item.id } }">
                                    <template #prepend>
                                        <VIcon icon="tabler-eye" />
                                    </template>

<VListItemTitle>View</VListItemTitle>
</VListItem>

<VListItem link>
    <template #prepend>
                                        <VIcon icon="tabler-pencil" />
                                    </template>
    <VListItemTitle>Edit</VListItemTitle>
</VListItem>

<VListItem @click="deleteUser(item.id)">
    <template #prepend>
                                        <VIcon icon="tabler-trash" />
                                    </template>
    <VListItemTitle>Delete</VListItemTitle>
</VListItem>
</VList>
</VMenu>
</VBtn> -->
                </template>

                <template #bottom>
                    <TablePagination v-model:page="page" :items-per-page="itemsPerPage"
                        :total-items="datatableTotalItems" />
                </template>
            </VDataTableServer>
            <!-- SECTION -->
        </VCard>

        <!-- 👉 Add New User -->
        <!-- <MCDialogGateAdd v-model:is-dialog-visible="isAddNewGateDialogVisible" @user-data="addNewUser" /> -->
    </section>
</template>

<style lang="scss">
.v-card-title {
    padding: 0;
}
</style>
