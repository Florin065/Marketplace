<template>

    <q-card-section
        hotizontal
        style="display:flex; height: 44px; justify-content: flex-end; align-items: center; gap: 24px; align-self: stretch; width: 80vw;"
    >
        <q-btn
            label="Add global discount"
            icon="bi-percent"
            style="background: var(--blue1, #2563EB); border-radius: var(--Radii-radius-button, 6px); display:flex; align-self: stretch; justify-content:center; align-items:center; color: #fff; font-size: 14px; font-weight: 500; height: 44px"
            @click="Notify.create({message: 'Global discount added', color: 'primary', position: 'top'})"
        />

        <q-btn
            label="Save Changes"
            icon="bi-check2"
            style="background: var(--green, #0CD496); border-radius: var(--Rad11-radius-button, 6px); display:flex; align-self: stretch; justify-content: center; align-items: center; color: #fff; font-size: 14px; font-weight: 500; height: 44px"
            @click="Notify.create({message: 'Changes saved', color: 'positive', position: 'top'})"
        />

        <q-btn
            label="Cancel"
            icon="bi-x"
            style="border-radius: var(--Radii-radius-button, 6px); border: 1px solid var(--magenta, #EE0D50); display: flex; align-items: center; justify-content: center; align-self: stretch; color: #EE0D50; font-size: 14px; font-weight: 500; height: 44px"
            @click="Notify.create({message: 'Changes discarded', color: 'negative', position: 'top'})"
        />

    </q-card-section>

    <q-card-section
        style="display: flex; align-items: center; gap: 24px; align-self: stretch;"
        horizotnal
    >
        <div
            style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--Space-spacing-2xs, 4px);"
        >
            Featured Product image

            <div
                style="display: flex; min-height: var(--Size-size-input-sm, 36px); padding: var(--Spacing-spacing-3xl, 48px); align-items: center; gap: var(--Space-spacing-sm, 8px); border-radius: var(--Radii-radius-input, 6px); border: 1px solid var(--color-border, #E4E4E7); background: var(--color-bg, #FFF);"
            >
                <q-uploader
                ref="uploader"
                url="/upload"
                style="width: 160px; height: 160px; display: flex; align-items: center; justify-content: center; border-radius: 10px; cursor: pointer;"
                @added="Notify.create({message: 'Image uploaded', color: 'primary', position: 'top'})"
                >
                <q-icon name="bi-image-fill" size="70px" color="grey-6" />
                </q-uploader>
            </div>
        </div>

        <div
            style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--Space-spacing-2xs, 4px);"
        >
            SKU / Product code
            <!-- TODO: Autogenerate, can change but has to verify that it is unique -->
            <div style="display: flex; align-items: center; border-radius: var(--Radii-radius-input, 6px); border: 1px solid var(--color-border, #E4E4E7); background: var(--color-bg, #FFF);">
                <q-input
                  style=" display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid #ccc; height: 160px; width: 147px; padding: var(--Spacing-spacing-md, 12px) var(--Spacing-spacing-xl, 24px);
"
                  v-model="SKU"
                />
              </div>
        </div>
    </q-card-section>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import {Notify} from 'quasar';

const file = ref(null);
const SKU = ref('');

</script>
