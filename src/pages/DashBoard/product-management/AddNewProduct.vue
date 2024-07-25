<template>
    <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 24px; width: 80vw; margin-top: 24px;">

    <q-card-section
        style="display:flex; height: 44px; justify-content: flex-end; align-items: center; gap: 24px; align-self: stretch;"
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
            @click="saveChanges()"
        />

        <q-btn
            label="Cancel"
            icon="bi-x"
            style="border-radius: var(--Radii-radius-button, 6px); border: 1px solid var(--magenta, #EE0D50); display: flex; align-items: center; justify-content: center; align-self: stretch; color: #EE0D50; font-size: 14px; font-weight: 500; height: 44px;"
            @click="$router.go(-1)"
        />

    </q-card-section>

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
                      @update:model-value="featuredImage!== null && handleUpload(featuredImage)"
                    >
                        <div v-if="featuredImage === null">
                            <q-icon name="add_photo_alternate" size="80px" color="grey-6" />
                        </div>
                        <div v-else>
                            <q-img :src="featuredImageUrl" style="width:161px; height: 161px; margin-top: 188px; border-radius: 8px; object-fit:cover;" />
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
                        style="display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid #ccc;
                        color: var(--color-text, #09090B); font-family: Inter; font-size: 16px; font-style: normal; font-weight: 500; line-height: 24px;
                        height: 160px; width: 147px; padding: var(--Spacing-spacing-md, 12px) var(--Spacing-spacing-xl, 24px);"
                        v-model="SKU"
                        maxlength="16"
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
                        style="display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid #ccc;
                            color: var(--color-text, #09090B); font-family: Inter; font-size: 20px; font-style: normal; font-weight: 600; line-height: 32px;
                            height: 160px; width: 953px; padding: var(--Spacing-spacing-md, 12px) var(--Spacing-spacing-xl, 24px);"
                        v-model="title"
                        maxlength="120"
                    />
                </div>
            </q-card-section>
        </div>
    
        <div
            style="display: flex; justify-content: center; align-items: center; min-height: 48px; margin-top: -30px"
            >
            <q-card-section
                style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--Spacing-spacing-2xs, 4px)"
            >
                <div>
                    Category <span style="color: red;">*</span>
                </div>
            
                <q-btn
                    color="white"
                    text-color="black"
                    style="width: 540px; min-height: 48px; height: auto">
                    <div v-if="categories.some(category => category.checked)">
                        <div v-for="category in categories" :key="category.name">
                            <div v-if="category.checked" @change="selectCategory">
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
                                                    <q-checkbox v-model="child.checked" :label="child.name" @click="toggleCategory(category, child)"/>
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
                        style="width: 547px; min-height: 48px; height: 48px"
                        borderless
                        />
                </q-card>
            </q-card-section>
    
            <q-card-section
                class="q-mt-lg"
                style="display: flex; flex-direction: column; align-items: flex-start; gap: var(--Spacing-spacing-2xs, 4px);">
    
                <q-btn
                    text-color="pink"
                    style="border-radius: var(--Radii-radius-button, 6px); border: 1px solid var(--magenta, #EE0D50);
                    display: flex; align-items: center; justify-content: center; align-self: stretch;
                    color: #EE0D50; font-size: 14px; font-weight: 500; height: 46px;"
                    @click="Notify.create({message: 'New tag added', color: 'primary', position: 'top'})"
                > 
                    <q-icon name="bi-trash" size="xs" style="margin-right: 10px"/>
                    Delete Product
                </q-btn>
            </q-card-section>
        </div>
    
        <q-card-section
            style="display: flex; flex-direction: column; align-items: flex-start; margin-top: -30px"
            >
            <div>
                Product Description <span style="color: red;">*</span>
            </div>

            <q-editor
                style="width: 1330px; min-height: 245px; text-align: left"
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
            style="display: flex; flex-direction: column; align-items: flex-start; margin-top: -30px"
            >
            <div>
                Add a PDF guide, manual or instructions <span style="color: red;">*</span>
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
                    Add a technical specifications sheet in PDF format (drag & drop or click)
                </div>
            </template>
            </q-file>
        </q-card-section>

        <q-card-section
            class="q-mt-xs"
            style="display: flex; flex-direction: column; align-items: flex-start; margin-top: -30px"
            >
            <div>
                Add a technical specifications sheet in Excel format <span style="color: red;">*</span>
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
                        Add a technical specifications sheet in Excel format (drag & drop or click)
                    </div>
                </template>
            </q-file>
        </q-card-section>
        
        <div style="display: flex; flex-direction: column; gap: 24px; width: 1362px; margin-top: -20px">
            <div v-for="(variant, variantIndex) in variants" :key="variantIndex" class="variant-section">
                <q-separator style="width:1330px; margin-left: 15px"/>
                <q-card-section style="display: flex; gap: 24px;">
                    <!-- Image upload and delete button column -->
                    <div style="text-align: start; display: flex; flex-direction: column; gap: 12px;">
                        <div style="margin-bottom: -12px">
                            Image <span style="color: red;">*</span>
                        </div>
                        <div>
                            <q-card>
                                <q-file
                                    class="clickable-card-section"
                                    borderless
                                    v-model="variant.image"
                                    accept="image/*"
                                    no-preview
                                    style="height: 200px; width: 200px; border: 1px dashed #E0E0E0;
                                        display: flex; align-items: center; justify-content: center; flex-direction: column;"
                                    @update:model-value="handleUpload(variant)"
                                    >
                                    <div v-if="variant.image === null">
                                        <q-icon name="add_photo_alternate" size="80px" color="grey-6" />
                                    </div>
                                    <div v-else>
                                        <q-img :src="variant.imagePreview" style="width:200px; height: 200px; margin-top: 168px; border-radius: 8px; object-fit:cover;" />
                                    </div>
                                </q-file>
                            </q-card>
                        </div>
                        <q-btn
                            label="Delete Variant"
                            icon="bi-trash"
                            style="border-radius: var(--Radii-radius-button, 6px); border: 1px solid var(--magenta, #EE0D50); color: #EE0D50; font-size: 14px; font-weight: 500; height: 44px;"
                            @click="deleteVariant(variantIndex)"
                        />
                    </div>
                    <!-- Variant details column -->
                    <div style="display: flex; flex-direction: column; gap: 12px; flex-grow: 1;">
                        <div style="display: flex; gap: 12px;">
                            <div style="text-align: start; flex-grow: 1">
                                Variant Name <span style="color: red;">*</span>
                                <q-input v-model="variant.name" placeholder="Variant Name" outlined style="flex: 1; background-color: white" />
                            </div>
                            <div style="text-align: start; flex-grow: 1">
                                SKU <span style="color: red;">*</span>
                                <q-input v-model="variant.sku" placeholder="SKU" outlined style="flex: 1; background-color: white" />
                            </div>
                        </div>
                        <div style="display: flex; gap: 12px;">
                            <div style="text-align: start; flex-grow: 1">
                                In Stock <span style="color: red;">*</span>
                                <q-input v-model="variant.inStock" outlined style="flex: 1; background-color: white" />
                            </div>

                            <div style="text-align: start; flex-grow: 1">
                                Price <span style="color: red;">*</span>
                                <q-input v-model="variant.price" outlined style="flex: 1; background-color: white" />
                            </div>

                            <div style="text-align: start; flex-grow: 1">
                                Discount
                                <q-select v-model="variant.discountType" :options="['%', 'RON']" outlined style="flex: 1; background-color: white" />
                            </div>
                            
                            <div style="text-align: start; flex-grow: 1; max-width: 180px">
                                Discount Price
                                <q-input
                                    filled
                                    readonly
                                    v-model="variant.discountPrice"
                                    >
                                    <template v-slot:prepend>
                                        <div v-if="variant.discountType === '%'">%</div>
                                        <div v-else>RON</div>
                                    </template>
                                </q-input>
                            </div>
                        </div>

                        <q-separator />

                        <!-- Types column -->
                        <div style="display: flex; flex-direction: column; gap: 12px; flex-grow: 1; margin-top: ">
                            <div v-for="(type, typeIndex) in variant.types" :key="typeIndex" style="display: flex; gap: 12px;">
                                <div style="text-align: start; flex: 1; ">
                                    Type <span style="color: red;">*</span>
                                    <q-select
                                    v-model="type.name" :options="typeOptions.map(option => option.name)"
                                    outlined @update:model-value="type.unit = ''; type.value = ''" 
                                    style="background-color: white;"
                                    />
                                </div>
                                <div style="text-align: start; flex: 1">
                                    Unit <span style="color: red;">*</span>
                                    <q-select
                                        v-model="type.unit" :options="typeOptions.find(option => option.name === type.name)?.units"
                                        outlined style="background-color: white;"
                                        />
                                </div>
                                <div style="text-align: start; flex: 1">
                                    Value <span style="color: red;">*</span>
                                    <q-input
                                        v-model="type.value"
                                        outlined style="background-color: white;"
                                        />
                                </div>
                                <q-btn icon="bi-trash" @click="deleteType(variant, typeIndex)"
                                    style="border-radius: var(--Radii-radius-button, 6px); border: 1px solid var(--magenta, #EE0D50); color: #EE0D50; font-size: 14px; font-weight: 500; height: 45px; margin-top: 25px"
                                />
                            </div>
                            <q-btn label="Add Type" icon="add" @click="addType(variant)" style="background-color: white; width: 340px; align-self: center; margin-left: -67.5px; border-radius: 12px"/>
                        </div>
                    </div>
                </q-card-section>
            </div>
            <q-btn label="Add Variant" icon="add" @click="addVariant" style="background-color: white; width: 340px; align-self: center; margin-left: 155px; margin-top: -20px; border-radius: 12px"/>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';
import {db} from '@/firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';

interface CategoryType {
    name: string;
    checked: boolean;
    children: { name: string; checked: boolean; }[];
}

interface VariantType {
  name: string;
  unit: string;
  value: number | string;
}

interface Variant {
  image: File | null;
  imagePreview: string;
  name: string;
  sku: string;
  inStock: number;
  price: number;
  discountType: '%' | 'RON';
  discountPrice: number | 'Discounted';
  types: VariantType[];
}

interface dataToSendType {
  featuredImage: string | null;
  SKU: string;
  title: string;
  categories: CategoryType[];
  tags: string[];
  qeditor: string;
//   pdfFiles: File[];
//   excelFiles: File[];
  variants: Variant[];
}

const route = useRouter();

// Basic product information
const featuredImage = ref(null);
const featuredImageUrl = ref('');
const SKU = ref('');
const title = ref('');
const selectedCategory = ref('');
const categories = ref<CategoryType[]>([
    { name: 'Casă și Grădină', checked: false, children: [
        { name: 'Gresie și faianță', checked: false },
        { name: 'Finisaje Baie', checked: false },
        { name: 'Grădină și exterior', checked: false }
    ]},
    { name: 'Electrice și iluminat', checked: false, children: [
        { name: 'Cabluri', checked: false },
        { name: 'Becuri', checked: false },
        { name: 'Corpuri de iluminat', checked: false }
    ]},
    { name: 'Materiale de construcție', checked: false, children: [
        { name: 'Ciment', checked: false },
        { name: 'Nisip', checked: false },
        { name: 'Caramizi', checked: false }
    ]},
    { name: 'Instalații termice și sanitare', checked: false, children: [
        { name: 'Radiatoare', checked: false },
        { name: 'Boilere', checked: false },
        { name: 'Vane', checked: false }
    ]},
    { name: 'Vopsea și finisaje', checked: false, children: [
        { name: 'Vopsele de interior', checked: false },
        { name: 'Vopsele de exterior', checked: false },
        { name: 'Lacuri', checked: false }
    ]}
]);
const tags = ref([]);
const qeditor = ref('');
const pdfFiles = ref([]);
const excelFiles = ref([]);

// Variants information and types options
const variants = ref<Variant[]>([
  {
    image: null,
    imagePreview: '',
    name: '',
    sku: '',
    inStock: 0,
    price: 0,
    discountType: '%',
    discountPrice: 'Discounted',
    types: [{
        name: '',
        unit: '',
        value: '',
        }],
  },
]);
const typeOptions = [
  { name: 'Dimensions', units: ['mm', 'cm', 'm', 'in', 'ft'], valueType: 'int/float' },
  { name: 'Color/Swatch', units: ['color names', 'HEX/RGB values'], valueType: 'HEX' },
  { name: 'Weight', units: ['g', 'kg', 'lb', 't'], valueType: 'int/float' },
  { name: 'Volume', units: ['ml', 'L', 'm³', 'gal', 'ft³'], valueType: 'int/float' },
  { name: 'Quantity', units: ['pcs', 'units', 'packs', 'boxes', 'bundles'], valueType: 'list/dropdown' },
  { name: 'Grade/Quality', units: ['A', 'B', 'C', 'Premium', 'Standard', 'Economy'], valueType: 'list/dropdown' },
  { name: 'Thickness', units: ['mm', 'in'], valueType: 'int/float' },
  { name: 'Length', units: ['m', 'cm', 'mm', 'ft', 'in'], valueType: 'int/float' },
  { name: 'Width', units: ['m', 'cm', 'mm', 'ft', 'in'], valueType: 'int/float' },
  { name: 'Diameter', units: ['mm', 'cm', 'in'], valueType: 'int/float' },
  { name: 'Strength', units: ['PSI', 'MPa', 'N/mm²'], valueType: 'int/float' },
  { name: 'Hardness', units: ['Rockwell', 'Brinell', 'Mohs'], valueType: 'dropdown' },
  { name: 'Material', units: ['Wood', 'Metal', 'Plastic', 'Concrete', 'Composite'], valueType: 'dropdown/string' },
  { name: 'Finish', units: ['Glossy', 'Matte', 'Satin', 'Textured', 'Polished'], valueType: 'dropdown/string' },
  { name: 'Type of Cut', units: ['Rough', 'Smooth', 'Sawn', 'Planed'], valueType: 'dropdown/string' },
];

// Data to send to the backend
const dataToSend: dataToSendType = {
  featuredImage: null,
  SKU: '',
  title: '',
  categories: [],
  tags: [],
  qeditor: '',
//   pdfFiles: [],
//   excelFiles: [],
  variants: [],
};

// Handle the upload of the featured image and display it
const handleUpload = (item: File | Variant) => {
    if (item instanceof File) {
        featuredImageUrl.value = URL.createObjectURL(item);
    } else if (item && item.image instanceof File) {
        item.imagePreview = URL.createObjectURL(item.image);
    }
}

// Toggle the checked status of a category and its children based on the clicked child
const toggleCategory = (selectedCategory: { checked: boolean; children: any[]; }, clickedChild: any) => {
    // Deselect all children in the selected category except the clicked one
    selectedCategory.children.forEach(child => {
        child.checked = false;
    });

    // Select the clicked child
    clickedChild.checked = true;

    // Update the selected category's checked status based on its children
    selectedCategory.checked = selectedCategory.children.some(child => child.checked);

    // Deselect checkboxes in other categories
    categories.value.forEach(category => {
        if (category !== selectedCategory) {
            uncheckChildren(category);
        }
    });
}

// Uncheck all children of a category if the category is unchecked
const uncheckChildren = (category: { checked: any; children: any[]; }) => {
    category.checked = false;
    if (!category.checked) {
        category.children.forEach(child => child.checked = false);
    }
}

// Select a category
const selectCategory = () => {
    selectedCategory.value = categories.value.find(category => category.checked).name;
}

// Add a new variant to the variants array
const addVariant = () => {
  variants.value.push({
    image: null,
    imagePreview: '',
    name: '',
    sku: '',
    inStock: 0,
    price: 0,
    discountType: '%',
    discountPrice: 'Discounted',
    types: [{
        name: '',
        unit: '',
        value: '',
        }],
  });
};

// Delete a variant from the variants array
const deleteVariant = (index: number) => {
  variants.value.splice(index, 1);
};

// Add a new type to a variant
const addType = (variant: Variant) => {
  variant.types.push({
    name: '',
    unit: '',
    value: '',
  });
};

// Delete a type from a variant
const deleteType = (variant: Variant, index: number) => {
  variant.types.splice(index, 1);
};

// Save the changes made to the product and send the data to the backend
const saveChanges = async () => {
  if (featuredImage.value !== null && SKU.value !== '' && title.value !== '' && categories.value.some(category => category.checked)
  && tags.value.length > 0 && qeditor.value !== '' &&
variants.value.every(variant => variant.image !== null && variant.name !== '' && variant.sku !== '' && variant.inStock > 0 && variant.price > 0
&& variant.types.every(type => type.name !== '' && type.unit !== '' && type.value !== ''))) {
    dataToSend.featuredImage = featuredImageUrl.value;
    dataToSend.SKU = SKU.value;
    dataToSend.title = title.value;
    dataToSend.categories = categories.value;
    dataToSend.tags = tags.value;
    dataToSend.qeditor = qeditor.value;
    // dataToSend.pdfFiles = pdfFiles.value;
    // dataToSend.excelFiles = excelFiles.value;
    dataToSend.variants = variants.value;
    dataToSend.variants.forEach(variant => {
        variant.image = null;
    })

    await setDoc(doc(db, 'products', selectedCategory.value), dataToSend);

    Notify.create({message: 'Product saved successfully', color: 'positive', position: 'top'});

    route.push('/dashboard/overview');
    console.log(dataToSend);
  } else {
    Notify.create({message: 'Please fill in all the required fields', color: 'negative', position: 'top'});
  }
};

</script>

<style scoped>
</style>
