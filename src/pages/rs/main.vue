<script setup>
import { Pane, Splitpanes } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';

const items = [{ title: 'Option 1', value: 'Option 1' }, { title: 'Option 2', value: 'Option 2' }, { title: 'Option 3', value: 'Option 3' }]
const menu = ref(false);
</script>

<template>
    <div class="main">
        <Splitpanes style="block-size: calc(100vh - 157px);" :rtl="true" class="default-theme">
            <Pane size="30">
                <MCWindow title="درخت خانواده" @open="menu = true" class="family-tree">
                    <VRow no-gutters class="btn-box family-tree-toolbar">
                        <IconBtn @click="" size="small">
                            <VIcon icon="tabler-search" size="22" />
                        </IconBtn>
                        <IconBtn @click="" size="small">
                            <VIcon icon="tabler-select" size="22" />
                        </IconBtn>
                        <IconBtn @click="" size="small">
                            <VIcon icon="tabler-trash-x" size="22" />
                        </IconBtn>

                    </VRow>
                </MCWindow>

            </Pane>

            <Pane>
                <Splitpanes horizontal :rtl="true" class="default-theme">
                    <Pane>
                        <MCWindow title="گردآوری اطلاعات" @open="menu = true">
                            <template #default>
                                //TODO - تست کامپوننت تب بار، این کد موقتی است
                                <MCSearchResultTabBox></MCSearchResultTabBox>
                            </template>
                        </MCWindow>
                    </Pane>

                    <Pane>
                        <MCWindow title="قفسه داده" @open="menu = true" />
                    </Pane>
                </Splitpanes>
            </Pane>
        </Splitpanes>

        <VMenu v-model="menu">
            <VList :items="items" />
        </VMenu>
    </div>
</template>
