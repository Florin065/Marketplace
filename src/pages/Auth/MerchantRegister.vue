<template>
    <q-header
        bordered
        class="bg-grey-3 text-primary"
        style="padding: 20px; height: 150px; width: 100%;"
        src="~/src/assets/banner.jpeg"
    >
        <q-toolbar>
            <q-img src="~/src/assets/logo.png"
            style="height: 120px; width: 120px; margin-left: 100px;"
            fit="contain" @click="() => router.push('/')"/>
        </q-toolbar>
    </q-header>

    <q-page class="flex flex-center">
        <q-card-section
            vertical
            style="display: flex; flex-direction: column; align-items: flex-start; gap: 20px; flex-shrink: 0; background: var(--White, #FFF);"
        >
            <div style="align-self: stretch; color: var(--green, #0CD496); text-align: center; font-family: Inter; font-size: 36px; font-style: normal; font-weight: 600; line-height: 48px;">
                Formular de înregistrare
            </div>

            <q-tabs
                dense
                class="text-bold text-primary"
            >
                <q-card
                    style="display: flex; padding: var(--Spacing-spacing-2xs, 4px); align-items: flex-start; align-self: stretch; border-radius: var(--Radii-radius, 6px); background: var(--color-bg-subtle, #FAFAFA);"             
                >
                <q-tab
                    v-for="tab in tabs"
                    :key="tab.key"
                    :name="tab.name"
                    :label="tab.name"
                    :style="{
                        display: 'flex',
                        padding: 'var(--Spacing-spacing-2xs, 4px) var(--Spacing-spacing-md, 12px)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        flex: '1 0 0',
                        borderRadius: 'var(--Radii-radius-sm, 4px)',
                        background: tab.isActive ? 'var(--color-bg, #FFF)' : '',
                        color: tab.isActive ? 'var(--color-text, #000)' : 'var(--green, #0CD496)',
                        textAlign: 'center',
                    }"
                    @click="{tab.isActive = true; updateTabs(tab)}"
                />
                </q-card>
            </q-tabs>

            <div>
                <q-tab-panels
                    v-model="tab"
                    animated
                >
                    <q-tab
                        name="1"
                    >
                        AAAAAAAAAA
                    </q-tab>

                </q-tab-panels>
            </div>

        </q-card-section>
    </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tabs = ref([
    {name: 'Informatii generale', key: '1', isActive: true},
    {name: 'Detalii Plată', key: '2', isActive: false,},
    {name: 'Documente', key: '3', isActive: false},
    {name: 'Gamă de produse', key: '4', isActive: false},
    {name: 'Informații operaționale', key: '5', isActive: false},
]);

const updateTabs = (tab) => {
    tabs.value.forEach((t) => {
        if (t.key !== tab.key) {
            t.isActive = false;
        }
    });
};

const tab = ref('1');

</script>
