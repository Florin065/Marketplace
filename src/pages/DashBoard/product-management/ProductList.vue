<template>

    <q-page
        style="display: flex; padding: 10px 0px; flex-direction: column; align-items: flex-start; gap: 12px; align-self: stretch;"
    >
        <!-- Buttons for adding... -->
        <q-card-section
            horizontal
            style="display: flex; align-items: center; gap: 12.985vw; align-self: stretch;"
        >
            <!-- TODO: Font: Nunito Sans -->
            <div
                style="font-size: 32px; font-style: normal; font-weight: 700; letter-spacing: -0.114px;"
            >
                Products
            </div>

            <q-card-section
                horizontal
                style="display: flex; align-items: center; gap: 16px;"
            >
                <q-btn
                    v-for="button in buttons"
                    :key="button.label"
                    :label="button.label"
                    :icon="button.icon"
                    @click="button.action"
                    :style="`display: flex; align-items: center; justify-content: center; gap: var(--Spacing-spacing-sm, 8px); border-radius: var(--Radii-radius-button, 6px); background: ${button.backgroundColor}; color: ${button.color} height: var(--Size-size-button-md, 40px); padding: var(--Spacing-space-2, 8px) var(--Spacing-spacing-lg, 16px); border: 1px solid var(--color-border-focusRing, ${button.borderColor});`"
                    :flat="button.isFlat"
                    :color="button.color"
                    />


                <q-btn
                    style="border-radius: var(--Radii-radius-button, 6px); color: var(--color-text, #09090B); border: 1px solid var(--color-border-primary, #18181B);"
                    @click="() => {Notify.create({ message: 'Bulk Actions clicked', color: 'positive', position: 'top' }); bulk = !bulk;}"
                    v-if="!bulk"
                >       
                    <div style="display: flex; justify-content: center; align-items: center; padding: var(--Spacing-space-2, 8px) var(--Spacing-spacing-lg, 12px); gap: var(--Spacing-spacing-sm, 8px);">
                        <q-icon class="bi bi-eye" /> 
                        Bulk Actions
                    </div>
                </q-btn>

            </q-card-section>
        </q-card-section>

        <!-- Filters -->
        <q-card-section
            horizontal
            style="display: flex; justify-content: space-between; align-items: center; align-self: stretch;"
            v-if="!bulk"
        >
            <q-card-section
                horizontal
                style="display: flex; align-items: center; gap: 21px; padding: 0px 12px; height: 70px; border-radius: 10px; border: 0.6px solid #D5D5D5; background: var(--color-bg, #FFF);"
            >

                <div
                    style="display: flex; padding: var(--Spacing-spacing-md, 12px) 12px var(--Spacing-spacing-md, 12px) 0px; flex-direction: column; justify-content: center; align-items: center; gap: 5px; border-right: 1px solid var(--color-border, #E4E4E7); font-size: 14px;"
                >
                    <q-icon class="bi bi-funnel" size="sm"/>
                    Filter By
                </div>

                <q-btn
                    v-for="item in filterMenu"
                    :key="item.label"
                    :label="item.label"
                    style="display: flex; padding: 0px 12px; align-items: center; align-self: stretch; border-right: 1px solid var(--color-border, #E4E4E7); color: var(--color-text-muted, #71717A); font-size: 14px; font-weight: 700;"
                    flat
                >
                    <q-icon class="bi bi-chevron-down" size="xs" style="margin-left: 2px;" />
                    <q-menu anchor="bottom middle" self="top middle">
                        <q-list style="min-width: 100px" v-for="option in item.options">
                            <q-item clickable v-close-popup>
                                <q-item-section 
                                :style="item.selected === option ? 'color: #007BFF;' : ''"
                                @click="() => { item.selected = option; applyFilter(); }"
                                >{{ option }}</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>

                <q-btn
                    v-for="item in filterSlider"
                    :key="item.label"
                    :label="item.label"
                    style="display: flex; padding: 0px 12px; align-items: center; align-self: stretch; border-right: 1px solid var(--color-border, #E4E4E7); color: var(--color-text-muted, #71717A); font-size: 14px; font-weight: 700;"
                    flat
                >
                    <q-icon class="bi bi-chevron-down" size="xs" style="margin-left: 2px;" />
                    <q-menu anchor="bottom middle" self="top middle">
                        
                        <q-item>
                            <q-item-section>
                                <q-input v-model="item.selected.value.min" style="width: 5vw; margin-right: 2vw;" @change="applyFilter" />
                                <q-input v-model="item.selected.value.max" style="width: 5vw;" @change="applyFilter" />
                            </q-item-section>
                        </q-item>
                        
                        <q-item style="min-width: 10vw; margin-top: 4vh;;">
                            <q-range
                                v-model="item.selected.value"
                                :min="0"
                                :max="maxValue(rows, item.col as keyof Product)"
                                label-always
                                @change="applyFilter"
                            ></q-range>
                        </q-item>

                    </q-menu>
                </q-btn>
                <q-btn
                    style="display: flex; justify-content: space-between; align-items: center; align-self: stretch; color: #EA0234; min-width: 98px; font-size: 14px; font-weight: 600;"
                    flat
                    @click="() => {
                        for (let item of filterMenu) item.selected = 'None';
                        for (let item of filterSlider) item.selected.value = {min: 0, max: maxValue(rows, item.col as keyof Product)}; newRows = rows;
                        search = '';
                        for (let item of rows) item.selected = false;
                        applyFilter();
                    }"
                >
                    <q-icon class="bi bi-arrow-counterclockwise" />
                    Reset Filter
                </q-btn>
            </q-card-section>
            
            <q-input
                style="display: flex; align-items: center; padding: 0px 12px; border-radius: 10px; border: 0.6px solid #D5D5D5; background: var(--color-bg, #FFF); gap: 21px; height: 70px; width: 14.6vw"
                v-model="search"
                placeholder="Search for Product Name or SKU"
                icon="add"
            >
                <template v-slot:prepend>
                    <q-icon name="search" />
                </template>
            </q-input>
        </q-card-section>

        <!-- 4 Buttons -->
        <q-card-section
            horizontal
            style="display: flex; padding: 8px 12px; align-items: center; gap: 2.4vw; border-radius: 12px; background: var(--color-bg, #FFF); box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);"
            v-if="bulk"
        >
        <q-btn
            v-for="button in buttonsFour"
            :key="button.label"
            :label="button.label"
            :icon="button.icon"
            @click="button.action"
            :style="`display: flex; align-items: center; justify-content: center; gap: var(--Spacing-spacing-sm, 8px); border-radius: var(--Radii-radius-button, 6px); color: ${button.color}; height: var(--Size-size-button-md, 40px); padding: var(--Spacing-space-2, 8px) var(--Spacing-spacing-lg, 16px); border: 1px solid var(--color-border-focusRing, ${button.color});`"
            />
        </q-card-section>

        <!-- Table -->
        <!-- TODO: The columns doesn't have 'align' property even though it recognizes it. -->
        <q-table
            :rows="newRows"
            :columns="columns"
            row-key="SKU"
            style="display: flex; padding: 8px 0px; flex-direction: column; justify-content: flex-end; gap: 12px; align-self: stretch; border-radius: 16px; background: var(--color-bg, #FFF); width: 85vw"
            :rows-per-page-options="[5, 7, 10, 20]"
            :pagination="{ rowsPerPage: 7 }"
            :visible-columns = "['image', 'SKU', 'productName', 'category', 'price', 'inStock', 'options', 'actions'].concat(bulk ? ['selected'] : [])"
            dense
        >
            <template v-slot:body-cell-image="props">
            <q-td :props="props">
                <q-img :src="props.row.image" fit="contain" style="width: 71.525px; height: 60px;"></q-img>
            </q-td>
            </template>

            <template v-slot:body-cell-options="props">
            <q-td :props="props">
                <div class="options-container">
                <q-chip
                    v-for="option in props.row.options"
                    :key="option"
                    :label="option"
                    outline
                    square
                    class="option-chip"
                />
                </div>
            </q-td>
            </template>

            <template v-slot:body-cell-price="props">
                <q-td :props="props">
                  {{ props.row.price }} {{ props.row.currency }}
                </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
            <q-td :props="props">
                  <q-btn icon="bi-pencil-square" style="color: #D5D5D5" @click="editItem(props.row)"></q-btn>
                  <q-btn icon="bi-trash" style="color: #EF3862" @click="deleteItem(props.row)"></q-btn>
            </q-td>
            </template>

            <template v-slot:body-cell-productName="props">
            <q-td :props="props" style="max-width: 20vw; white-space: normal; overflow-wrap: break-word;">
                {{ props.row.productName }}
            </q-td>
            </template>

            <!-- Selected box -->
            <template v-slot:body-cell-selected="props">
                <q-td :props="props">
                    <q-checkbox v-model="props.row.selected" />
                </q-td>
            </template>
        </q-table>

    </q-page>

</template>


<script setup lang="ts">
import { Notify } from 'quasar';
import { ref, watch } from 'vue';

const search = ref('');

const columns = [
        {name: 'selected', label: 'Selected', field: 'selected', align: 'center' },
        { name: 'image', label: 'Image',  field: 'image', align: 'center' },
        { name: 'SKU', label: 'SKU', field: 'SKU', sortable: true, align: 'center'  },
        { name: 'productName', label: 'Product Name', field: 'productName', sortable: true, align: 'center'  },
        { name: 'category', label: 'Category', field: 'category', sortable: true, align: 'center'  },
        { name: 'price', label: 'Price', field: 'price', sortable: true, align: 'center'  },
        { name: 'inStock', label: 'In Stock', field: 'inStock', sortable: true, align: 'center'  },
        { name: 'options', label: 'Options', field: 'options', align: 'center'  },
        { name: 'actions', label: 'Actions', field: 'actions', align: 'center'  }
];

// TODO: Get the products fromt the database once it's connected.
const rows = [
    {
          image: 'https://s3-alpha-sig.figma.com/img/d420/ab08/174f1393eb4867c484c35bbd1aab104d?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RfqegEixi78n~Ja-E9W9uTXVI-eli1xZgV5z0qF3613RRKSsE~VliWWyJlh-~xvd66OyiEUYqLXBSqRb0NLn1Mt9ILMCdF035hW2n9SSsl-eI8Uou3vUSjZQIp54iL20q4j~Vfwa-iM1zocrNeEMpqEamIf5EIUmM0Q7bcGxluQA890STXKNi2Oy-xIvPJBQz9v6OpdqBhDQ8FS4BeZgdVhp0XFGz4-dRJQmmOk0tTuPzaHHbQn1ehDsULsKpOzdn0HlPobgbGZAkdpT0ipP32VSH00UquiJx3pMJh2qqh8EL-wGFx2tI4vdTZ2eGEJlJVDyl8uo5wLWMX0HiLqH9w__',
          SKU: '218754322',
          productName: 'Cherestea nerindeluita diferita, Detroit City, lemn mold, A/ B, 2000 x 100 x 22 mm',
          category: 'Scânduri',
          price: 8.00,
          currency: '€',
          inStock: 3,
          options: ['mesteacan', 'stejar', 'lemn'],
          selected: false,
        },
        {
          image: 'https://www.figma.com/file/Nye8DVipMC2A78sDwCXLv9/image/5f2553518f412a3af1f64d0ce6bb2777f81b74b0',
          SKU: '218754323',
          productName: 'Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg',
          category: 'Ciment, lianti, var',
          price: 58.00,
          currency: '€',
          inStock: 103,
          options: ['20 kg', '40 kg', '50 kg', '60 kg'],
          selected: false,
        },
        {
          image: 'https://s3-alpha-sig.figma.com/img/d420/ab08/174f1393eb4867c484c35bbd1aab104d?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RfqegEixi78n~Ja-E9W9uTXVI-eli1xZgV5z0qF3613RRKSsE~VliWWyJlh-~xvd66OyiEUYqLXBSqRb0NLn1Mt9ILMCdF035hW2n9SSsl-eI8Uou3vUSjZQIp54iL20q4j~Vfwa-iM1zocrNeEMpqEamIf5EIUmM0Q7bcGxluQA890STXKNi2Oy-xIvPJBQz9v6OpdqBhDQ8FS4BeZgdVhp0XFGz4-dRJQmmOk0tTuPzaHHbQn1ehDsULsKpOzdn0HlPobgbGZAkdpT0ipP32VSH00UquiJx3pMJh2qqh8EL-wGFx2tI4vdTZ2eGEJlJVDyl8uo5wLWMX0HiLqH9w__',
          SKU: '218754324',
          productName: 'Cherestea nerindeluita, Detroit City, lemn mold, A/ B, 2000 x 100 x 22 mm',
          category: 'Scânduri',
          price: 4.00,
          currency: '€',
          inStock: 65,
          options: ['mesteacan', 'stejar', 'lemn'],
          selected: false,
        },
        {
          image: 'https://www.figma.com/file/Nye8DVipMC2A78sDwCXLv9/image/5f2553518f412a3af1f64d0ce6bb2777f81b74b0',
          SKU: '218754325',
          productName: 'Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg',
          category: 'Ciment, lianti, var',
          price: 510.00,
          currency: '€',
          inStock: 42,
          options: ['20 kg', '40 kg', '50 kg', '60 kg'],
          selected: false,
        },
        {
          image: 'https://s3-alpha-sig.figma.com/img/d420/ab08/174f1393eb4867c484c35bbd1aab104d?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RfqegEixi78n~Ja-E9W9uTXVI-eli1xZgV5z0qF3613RRKSsE~VliWWyJlh-~xvd66OyiEUYqLXBSqRb0NLn1Mt9ILMCdF035hW2n9SSsl-eI8Uou3vUSjZQIp54iL20q4j~Vfwa-iM1zocrNeEMpqEamIf5EIUmM0Q7bcGxluQA890STXKNi2Oy-xIvPJBQz9v6OpdqBhDQ8FS4BeZgdVhp0XFGz4-dRJQmmOk0tTuPzaHHbQn1ehDsULsKpOzdn0HlPobgbGZAkdpT0ipP32VSH00UquiJx3pMJh2qqh8EL-wGFx2tI4vdTZ2eGEJlJVDyl8uo5wLWMX0HiLqH9w__',
          SKU: '218754326',
          productName: 'Cherestea nerindeluita, Detroit City, lemn mold, A/ B, 2000 x 100 x 22 mm',
          category: 'Scânduri',
          price: 4.00,
          currency: '€',
          inStock: 1,
          options: ['mesteacan', 'stejar', 'lemn'],
          selected: false,
        },
        {
          image: 'https://www.figma.com/file/Nye8DVipMC2A78sDwCXLv9/image/5f2553518f412a3af1f64d0ce6bb2777f81b74b0',
          SKU: '218754327',
          productName: 'Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg',
          category: 'Ciment, lianti, var',
          price: 200.00,
          currency: '€',
          inStock: 75,
          options: ['20 kg', '40 kg', '50 kg', '60 kg'],
          selected: false,
        },
        {
          image: 'https://s3-alpha-sig.figma.com/img/d420/ab08/174f1393eb4867c484c35bbd1aab104d?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RfqegEixi78n~Ja-E9W9uTXVI-eli1xZgV5z0qF3613RRKSsE~VliWWyJlh-~xvd66OyiEUYqLXBSqRb0NLn1Mt9ILMCdF035hW2n9SSsl-eI8Uou3vUSjZQIp54iL20q4j~Vfwa-iM1zocrNeEMpqEamIf5EIUmM0Q7bcGxluQA890STXKNi2Oy-xIvPJBQz9v6OpdqBhDQ8FS4BeZgdVhp0XFGz4-dRJQmmOk0tTuPzaHHbQn1ehDsULsKpOzdn0HlPobgbGZAkdpT0ipP32VSH00UquiJx3pMJh2qqh8EL-wGFx2tI4vdTZ2eGEJlJVDyl8uo5wLWMX0HiLqH9w__',
          SKU: '218754328',
          productName: 'Cherestea nerindeluita, Detroit City, lemn mold, A/ B, 2000 x 100 x 22 mm',
          category: 'Scânduri',
          price: 8.00,
          currency: '€',
          inStock: 63,
          options: ['mesteacan', 'stejar', 'lemn'],
          selected: false,

        },
        {
          image: 'https://www.figma.com/file/Nye8DVipMC2A78sDwCXLv9/image/5f2553518f412a3af1f64d0ce6bb2777f81b74b0',
          SKU: '218754329',
          productName: 'Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg',
          category: 'Ciment, lianti, var',
          price: 92.00,
          currency: '€',
          inStock: 13,
          options: ['20 kg', '40 kg', '50 kg', '60 kg'],
          selected: false,
        },
        {
          image: 'https://s3-alpha-sig.figma.com/img/d420/ab08/174f1393eb4867c484c35bbd1aab104d?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RfqegEixi78n~Ja-E9W9uTXVI-eli1xZgV5z0qF3613RRKSsE~VliWWyJlh-~xvd66OyiEUYqLXBSqRb0NLn1Mt9ILMCdF035hW2n9SSsl-eI8Uou3vUSjZQIp54iL20q4j~Vfwa-iM1zocrNeEMpqEamIf5EIUmM0Q7bcGxluQA890STXKNi2Oy-xIvPJBQz9v6OpdqBhDQ8FS4BeZgdVhp0XFGz4-dRJQmmOk0tTuPzaHHbQn1ehDsULsKpOzdn0HlPobgbGZAkdpT0ipP32VSH00UquiJx3pMJh2qqh8EL-wGFx2tI4vdTZ2eGEJlJVDyl8uo5wLWMX0HiLqH9w__',
          SKU: '218754330',
          productName: 'Cherestea nerindeluita, Detroit City, lemn mold, A/ B, 2000 x 100 x 22 mm',
          category: 'Scânduri',
          price: 6.00,
          currency: '€',
          inStock: 27,
          options: ['mesteacan', 'stejar', 'lemn'],
          selected: false,
        },
        {
          image: 'https://www.figma.com/file/Nye8DVipMC2A78sDwCXLv9/image/5f2553518f412a3af1f64d0ce6bb2777f81b74b0',
          SKU: '218754331',
          productName: 'Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg',
          category: 'Ciment, lianti, var',
          price: 375.00,
          currency: '€',
          inStock: 91,
          options: ['20 kg', '40 kg', '50 kg', '60 kg'],
          selected: false,
        },
        {
          image: 'https://s3-alpha-sig.figma.com/img/d420/ab08/174f1393eb4867c484c35bbd1aab104d?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RfqegEixi78n~Ja-E9W9uTXVI-eli1xZgV5z0qF3613RRKSsE~VliWWyJlh-~xvd66OyiEUYqLXBSqRb0NLn1Mt9ILMCdF035hW2n9SSsl-eI8Uou3vUSjZQIp54iL20q4j~Vfwa-iM1zocrNeEMpqEamIf5EIUmM0Q7bcGxluQA890STXKNi2Oy-xIvPJBQz9v6OpdqBhDQ8FS4BeZgdVhp0XFGz4-dRJQmmOk0tTuPzaHHbQn1ehDsULsKpOzdn0HlPobgbGZAkdpT0ipP32VSH00UquiJx3pMJh2qqh8EL-wGFx2tI4vdTZ2eGEJlJVDyl8uo5wLWMX0HiLqH9w__',
          SKU: '218754332',
          productName: 'Cherestea nerindeluita, Detroit City, lemn mold, A/ B, 2000 x 100 x 22 mm',
          category: 'Scânduri',
          price: 6.00,
          currency: '€',
          inStock: 4,
          options: ['mesteacan', 'stejar', 'lemn'],
          selected: false,
        },
        {
          image: 'https://www.figma.com/file/Nye8DVipMC2A78sDwCXLv9/image/5f2553518f412a3af1f64d0ce6bb2777f81b74b0',
          SKU: '218754333',
          productName: 'Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg',
          category: 'Ciment, lianti, var',
          price: 192.00,
          currency: '€',
          inStock: 13,
          options: ['20 kg', '40 kg', '50 kg', '60 kg'],
          selected: false,
        },
];

interface Product {
  image: string;
  SKU: string;
  productName: string;
  category: string;
  price: number;
  currency: string;
  inStock: number;
  options: string[];
};

const newRows = ref(rows);

const buttons = [
    {
        label: 'Add Product List',
        icon: 'add',
        color: '#FFF',
        backgroundColor: '#2563EB',
        borderColor: '#2563EB',
        action: () => Notify.create({ message: 'Add Product List clicked', color: 'positive', position: 'top' }),
        isFlat: false
    },
    {
        label: 'Add Single Product',
        icon: 'add',
        color: 'primary',
        backgroundColor: 'transparent',
        borderColor: '#3B82F6',
        action: () => Notify.create({ message: 'Add Single Product clicked', color: 'positive', position: 'top' }),
        isFlat: true
    },
    {
        label: 'View Product List',
        color: 'var(--color-text, #09090B)',
        backgroundColor: 'transparent',
        borderColor: '#181818B',
        action: () => Notify.create({ message: 'View Product List clicked', color: 'positive', position: 'top' }),
        isFlat: true
    }
];

const buttonsFour = [
    {
        label: 'Bulk Actions',
        icon: 'bi-eye',
        color: '#000000',
        action: () => {Notify.create({ message: 'Bulk Actions clicked', color: 'positive', position: 'top' }); bulk.value = !bulk.value;},
    },
    {
        label: 'Offer Discount',
        icon: 'bi-percent',
        color: '#000000',
        action: () => Notify.create({ message: 'Offer Discount clicked', color: 'positive', position: 'top' }),
    },
    {
        label: 'Set same price',
        icon: 'bi-currency-euro',
        color: '#000000',
        action: () => Notify.create({ message: 'Set same price clicked', color: 'positive', position: 'top' }),
    },
    {
        label: 'Delete Selected',
        icon: 'bi-trash',
        color: '#EE0D50',
        action: () => {Notify.create({ message: 'Deleted selected items', color: 'negative', position: 'top' }); newRows.value = newRows.value.filter(row => !row.selected);},
    }
]

const filterMenu = [
    {
        label: 'Option Type',
        options: ['None', 'Type 1', 'Type 2', 'Type 3', 'Type 4'],
        selected: 'None',
    }, 
    {
        label: 'Category',
        options: ['None', 'Scânduri', 'Ciment, lianti, var'],
        selected: 'None',
    }
]

const bulk = ref(false);

const maxValue = (array: Product[], property: keyof Product): number => {
  return array.reduce((max, item) => {
    if (typeof item[property] === 'number') {
      return Math.max(max, item[property] as number);
    }
    throw new Error(`Property ${property} is not a number.`);
  }, -Infinity);
}

const filterSlider = [
    {
        label: 'Price between',
        col: 'price',
        selected: ref({min: 0, max: maxValue(rows, 'price')}),
    }, 
    {
        label: 'Left in Stock',
        col: 'inStock',
        selected: ref({min: 0, max: maxValue(rows, 'inStock')}),
    }
]

const applyFilter = () => {
    // Filter all the rows based on the selected filters
    newRows.value = rows.filter(row => {
        return filterMenu.every(filter => filter.selected === 'None' || row[filter.label.toLowerCase()] === filter.selected)
            && filterSlider.every(filter => filter.selected.value.min <= row[filter.col] && row[filter.col] <= filter.selected.value.max)
            && (row.productName.toLowerCase().includes(search.value.toLowerCase()) || row.SKU.toLowerCase().includes(search.value.toLowerCase()));
    });
}

watch(search, applyFilter);

const editItem = (item) => {
    Notify.create({ message: `Edit ${item.productName}`, color: 'positive', position: 'top' });
};

const deleteItem = (item) => {
    Notify.create({ message: `Delete ${item.productName}`, color: 'negative', position: 'top' });
    newRows.value = newRows.value.filter(row => row !== item);
};
</script>

<style>
.options-container {
  display: flex;
  max-width: 18vw;
  align-items: center;
  align-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.option-chip {
    display: flex;
    height: var(--Size-size-input-sm, 44px);
    padding: var(--Spacing-spacing-sm, 8px) var(--Spacing-spacing-lg, 16px);
    align-items: center;
    gap: var(--Spacing-spacing-sm, 8px);
    flex-shrink: 0;
    border-radius: var(--Radii-radius-input, 6px);
    border: 1px solid var(--color-border, #E4E4E7);
    background: var(--color-bg, #FFF);
    scale: 1;

    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}

</style>
