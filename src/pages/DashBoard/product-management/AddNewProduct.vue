<template>

    <q-card-section
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
            style="border-radius: var(--Radii-radius-button, 6px); border: 1px solid var(--magenta, #EE0D50); display: flex; align-items: center; justify-content: center; align-self: stretch; color: #EE0D50; font-size: 14px; font-weight: 500; height: 44px; margin-right: 80px"
            @click="Notify.create({message: 'Changes discarded', color: 'negative', position: 'top'})"
        />

    </q-card-section>

    <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 24px; width: 80vw; margin-top: 24px;">
        <div class="row">
            <q-card-section
                style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--Space-spacing-2xs, 4px);"
                >
                <div>
                    Featured product image <span style="color: red;">*</span>
                </div>

                <q-card style="border-radius: 8px; border: 1px dashed #E0E0E0; display: flex; align-items: center; justify-content: center; width: 160px; height: 160px;">
                    <q-file
                      borderless class="clickable-card-section"
                      v-model="featuredImage"
                      style="width: 100%; height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;"
                      accept="image/*"
                      no-preview
                      @update:model-value="handleUpload()"
                    >
                        <div v-if="featuredImage === null">
                            <q-icon name="add_photo_alternate" size="80px" color="grey-6" />
                        </div>
                        <div v-else>
                            <q-img :src="featuredImageUrl" style="width:161px; height: 161px; margin-top: 188px; border-radius: 8px" />
                        </div>
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
    
        <div
            style="display: flex; justify-content: center; align-items: center; min-height: 48px;"
            >
            <q-card-section
                style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--Spacing-spacing-2xs, 4px)"
            >
                <div>
                    Category <span style="color: red;">*</span>
                </div>
            
                <q-btn style="width: 550px; min-height: 48px; height:auto">
                    <div v-if="categories.some(category => category.checked)">
                        <div v-for="category in categories" :key="category.name">
                            <div v-if="category.checked">
                                {{ category.name }} —> {{ category.children.filter(child => child.checked).map(child => child.name).join(' + ') }}
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        Click to select
                    </div>                        
                    <q-menu fit>
                        <q-list dense v-for="category in categories" :key="category.name">
                            <q-item clickable>
                                <q-item-section>
                                    <q-item-label>
                                        <q-checkbox v-model="category.checked" :disable="!category.checked" @click="uncheckChildren(category)"/>
                                        {{ category.name }}
                                    </q-item-label>
                                </q-item-section>
                                <q-item-section side>
                                    <q-icon name="bi-chevron-right" />
                                </q-item-section>
                
                                <q-menu anchor="top end" self="top start">
                                    <q-list dense>
                                        <q-item clickable v-for="child in category.children" :key="child.name">
                                            <q-item-section>
                                                <q-item-label>
                                                    <q-checkbox v-model="child.checked" :label="child.name" @click="toggleCategory(category)" />
                                                </q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-menu>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
            </q-card-section>
    
            <q-card-section
                style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--Spacing-spacing-2xs, 4px)"
                >
                <div>
                    Tags <span style="color: red;">*</span>
                </div>
    
                <q-card>
                    <q-select
                        v-model="tags"
                        multiple
                        :options="['Special', 'Reducere vară', 'Black Friday', 'New Collection', 'gresie', 'geam']"
                        style="width: 561px; min-height: 48px; height: 48px"
                        borderless
                        />
                </q-card>
            </q-card-section>
    
            <q-card-section
                class="q-mt-lg"
                style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--Spacing-spacing-2xs, 4px);">
    
                <q-btn
                    label="Delete variant"
                    icon="bi-trash"
                    text-color="pink"
                    style="height: 48px; width: 154px;
                            color: var(--magenta, #EE0D50); font-family: Inter; font-size: 10.5px; font-style: normal; font-weight: 500; line-height: 20px;"
                    @click="Notify.create({message: 'New tag added', color: 'primary', position: 'top'})"
                />
            </q-card-section>
        </div>
    
        <q-card-section
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
            style="display: flex; flex-direction: column; align-items: flex-start"
            >
            <div>
                Adaugă un ghid (PDF) <span style="color: red;">*</span>
            </div>

            <q-file
                v-model="pdfFiles"
                style="width: 1330px; height: 56px; text-align: left; background: var(--color-bg, #FFF)"
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
                style="width: 1330px; height: 56px; text-align: left; background: var(--color-bg, #FFF)"
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

const featuredImage = ref(null);
const featuredImageUrl = ref('');
const handleUpload = () => {
    console.log('handleUpload is triggered');
    if (featuredImage.value) {
        featuredImageUrl.value = URL.createObjectURL(featuredImage.value);
    }
}

const SKU = ref('');
const title = ref('');

const categories = ref([
    {
        name: 'Casă și Grădină',
        checked: false,
        children: [
            { name: 'Gresie și faianță', checked: false },
            { name: 'Finisaje Baie', checked: false },
            { name: 'Grădină și exterior', checked: false }
        ]
    },
    {
        name: 'Electrice și iluminat',
        checked: false,
        children: [
            { name: 'Cabluri', checked: false },
            { name: 'Becuri', checked: false },
            { name: 'Corpuri de iluminat', checked: false }
        ]
    },
    {
        name: 'Materiale de construcție',
        checked: false,
        children: [
            { name: 'Ciment', checked: false },
            { name: 'Nisip', checked: false },
            { name: 'Caramizi', checked: false }
        ]
    },
    {
        name: 'Instalații termice și sanitare',
        checked: false,
        children: [
            { name: 'Radiatoare', checked: false },
            { name: 'Boilere', checked: false },
            { name: 'Vane', checked: false }
        ]
    },
    {
        name: 'Vopsea și finisaje',
        checked: false,
        children: [
            { name: 'Vopsele de interior', checked: false },
            { name: 'Vopsele de exterior', checked: false },
            { name: 'Lacuri', checked: false }
        ]
    }
])

const toggleCategory = (category: { checked: any; children: any[]; }) => {
    category.checked = category.children.some(child => child.checked);
}

const uncheckChildren = (category: { checked: any; children: any[]; }) => {
    if (!category.checked) {
        category.children.forEach(child => child.checked = false);
    }
}

const tags = ref([]);
const qeditor = ref('');
const pdfFiles = ref([]);
const excelFiles = ref([]);

</script>

<style scoped>
</style>
