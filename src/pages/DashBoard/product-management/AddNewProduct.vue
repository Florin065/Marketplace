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

    <div style="margin-left: 165px">
        <div class="row q-mt-md">
            <q-card-section
                style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--Space-spacing-2xs, 4px);"
                >
                <div>
                    Featured product image <span style="color: red;">*</span>
                </div>

                <q-card style="border-radius: 8px; border: 1px dashed #E0E0E0; display: flex; align-items: center; justify-content: center; width: 160px; height: 160px;">
                    <q-file borderless
                      v-model="featuredImage"
                      style="width: 100%; height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;"
                      accept="image/*"
                      @rejected="Notify.create({message: 'The file is not an image', color: 'negative', position: 'top'})"
                    >
                      <template v-slot>
                          <q-icon name="add_photo_alternate" size="80px" color="grey-6" />
                      </template>
                    </q-file>
                </q-card>
                  
            </q-card-section>
    
            <q-card-section
                style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--Space-spacing-2xs, 4px);"
                >
                <div>
                    SKU / Product code <span style="color: red;">*</span>
                </div>

                <div style="display: flex; align-items: center; border-radius: var(--Radii-radius-input, 6px); border: 1px solid var(--color-border, #E4E4E7); background: var(--color-bg, #FFF);">
                    <q-input borderless placeholder="SKU"
                        style="display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid #ccc; height: 160px; width: 147px; padding: var(--Spacing-spacing-md, 12px) var(--Spacing-spacing-xl, 24px);"
                        v-model="SKU"
                    />
                </div>
            </q-card-section>
    
            <q-card-section
                style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--Space-spacing-2xs, 4px);"
                >
                <div>
                    Product Title <span style="color: red;">*</span>
                </div>

                <div style="display: flex; align-items: center; border-radius: var(--Radii-radius-input, 6px); border: 1px solid var(--color-border, #E4E4E7); background: var(--color-bg, #FFF);">
                    <q-input borderless placeholder="Product Title"
                        style=" display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid #ccc; height: 160px; width: 953px; padding: var(--Spacing-spacing-md, 12px) var(--Spacing-spacing-xl, 24px);"
                        v-model="title"
                    />
                </div>
            </q-card-section>
        </div>
    
        <div class="row q-mt-xs">
            <q-card-section
                style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--Spacing-spacing-2xs, 4px)"
                >
                <div>
                    Category <span style="color: red;">*</span>
                </div>
    
                <q-select
                    filled
                    v-model="category"
                    :options="['Electronics', 'Clothing', 'Shoes', 'Accessories']"
                    style="height: 48px; width: 561px;"
                />
            </q-card-section>
    
            <q-card-section
                class="col"
                style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--Spacing-spacing-2xs, 4px)"
                >
                <div>
                    Tags <span style="color: red;">*</span>
                </div>
    
                <q-select
                    filled
                    v-model="tags"
                    multiple
                    :options="['Special', 'Reducere vară', 'Black Friday', 'New Collection', 'gresie', 'geam']"
                    style="height: 48px; width: 561px;"
                />
            </q-card-section>
    
            <q-card-section
                class="col q-mt-lg"
                style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--Spacing-spacing-2xs, 4px); margin-left: 190px">
    
                <q-btn
                    label="Delete variant"
                    icon="bi-trash"
                    text-color="pink"
                    style="height: 54px; width: 154px;
                            color: var(--magenta, #EE0D50); font-family: Inter; font-size: 10.5px; font-style: normal; font-weight: 500; line-height: 20px;"
                    @click="Notify.create({message: 'New tag added', color: 'primary', position: 'top'})"
                />
            </q-card-section>
        </div>
    
        <q-card-section
            class="q-mt-xs"
            style="display: flex; flex-direction: column; align-items: flex-start"
            >
            <div>
                Product Description <span style="color: red;">*</span>
            </div>

            <q-editor
                style="width: 1330px; height: 245px; text-align: left"
                placeholder="Enter a description..."
                v-model="qeditor"
                :dense="$q.screen.lt.md"
                :toolbar="[
                    [
                    {
                        label: $q.lang.editor.align,
                        icon: $q.iconSet.editor.align,
                        fixedLabel: true,
                        list: 'only-icons',
                        options: ['left', 'center', 'right', 'justify']
                    },
                    {
                        label: $q.lang.editor.align,
                        icon: $q.iconSet.editor.align,
                        fixedLabel: true,
                        options: ['left', 'center', 'right', 'justify']
                    }
                    ],
                    ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                    ['token', 'hr', 'link', 'custom_btn'],
                    [
                    {
                        label: $q.lang.editor.formatting,
                        icon: $q.iconSet.editor.formatting,
                        list: 'no-icons',
                        options: [
                        'p',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'code'
                        ]
                    },
                    {
                        label: $q.lang.editor.fontSize,
                        icon: $q.iconSet.editor.fontSize,
                        fixedLabel: true,
                        fixedIcon: true,
                        list: 'no-icons',
                        options: [
                        'size-1',
                        'size-2',
                        'size-3',
                        'size-4',
                        'size-5',
                        'size-6',
                        'size-7'
                        ]
                    },
                    {
                        label: $q.lang.editor.defaultFont,
                        icon: $q.iconSet.editor.font,
                        fixedIcon: true,
                        list: 'no-icons',
                        options: [
                        'default_font',
                        'arial',
                        'arial_black',
                        'comic_sans',
                        'courier_new',
                        'impact',
                        'lucida_grande',
                        'times_new_roman',
                        'verdana'
                        ]
                    },
                    'removeFormat'
                    ],
                    ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
    
                    ['undo', 'redo'],
                    ['viewsource']
                ]"
                :fonts="{
                    arial: 'Arial',
                    arial_black: 'Arial Black',
                    comic_sans: 'Comic Sans MS',
                    courier_new: 'Courier New',
                    impact: 'Impact',
                    lucida_grande: 'Lucida Grande',
                    times_new_roman: 'Times New Roman',
                    verdana: 'Verdana'
                }"
            />
        </q-card-section>

        <q-card-section
            class="q-mt-xs"
            style="display: flex; flex-direction: column; align-items: flex-start"
            >
            <div>
                Adaugă un ghid (PDF) <span style="color: red;">*</span>
            </div>

            <q-file
                v-model="pdfFiles"
                style="width: 1330px; height: 56px; text-align: left"
                accept=".pdf"
                use-chips
                multiple
                outlined
                @rejected="Notify.create({message: 'The file is not a PDF', color: 'negative', position: 'top'})"
            >
            <template v-slot:prepend>
                <q-icon class="q-ml-lg" name="bi-file-earmark-arrow-up" />

                <div v-if="pdfFiles.length === 0"
                  style="margin-left: 8px; font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px;">
                    Adaugă un fișier PDF tip Ghid, Manual sau instrucțiuni (.pdf) (drag & drop sau click)
                </div>
            </template>
            </q-file>
        </q-card-section>

        <q-card-section
            class="q-mt-xs"
            style="display: flex; flex-direction: column; align-items: flex-start"
            >
            <div>
                Adauga un ghid (excel or spreadsheet) <span style="color: red;">*</span>
            </div>

            <q-file
                v-model="excelFiles"
                style="width: 1330px; height: 56px; text-align: left"
                accept=".xls, .xlsx, .csv, .gsheet"
                use-chips
                multiple
                outlined
                @rejected="Notify.create({message: 'The file is not an Excel or a Spreadsheet', color: 'negative', position: 'top'})"
            >
            <template v-slot:prepend>
                <q-icon class="q-ml-lg" name="bi-file-earmark-arrow-up" />

                <div v-if="excelFiles.length === 0"
                style="margin-left: 8px; font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px;">
                    Adaugă fișă specificații tehnice în format excel sau spreadsheet (.xlsx, .csv, .xls, .gsheet) (drag & drop sau click)
                </div>
            </template>
            </q-file>
        </q-card-section>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Notify } from 'quasar';

const SKU = ref('');
const title = ref('');
const category = ref('');
const tags = ref([]);
const qeditor = ref('');
const pdfFiles = ref([]);
const excelFiles = ref([]);
const featuredImage = ref([]);

</script>

<style scoped>

</style>