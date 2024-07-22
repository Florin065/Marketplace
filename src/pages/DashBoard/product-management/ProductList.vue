<template>

    <q-page
        style="display: flex; flex-direction: column; align-items: flex-start; gap: 12px; align-self: stretch; padding: 10px 0px;"
    >
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
                    style="border-radius: var(--Radii-radius-button, 6px); color: var(--color-text, #09090B); border: 1px solid var(--color-border-primary, #18181B);
"
                >       
                    <div style="display: flex; justify-content: center; align-items: center; padding: var(--Spacing-space-2, 8px) var(--Spacing-spacing-lg, 12px); gap: var(--Spacing-spacing-sm, 8px);">
                        <q-icon class="bi bi-eye" /> 
                        Bulk Actions
                    </div>
                </q-btn>

            </q-card-section>
        </q-card-section>

        <q-card-section
            horizontal
            style="display: flex; justify-content: space-between; align-items: center; align-self: stretch;"
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
                    v-for="item in filter"
                    :key="item.label"
                    :label="item.label"
                    style="display: flex; padding: 0px 12px; align-items: center; align-self: stretch; border-right: 1px solid var(--color-border, #E4E4E7); color: var(--color-text-muted, #71717A); font-size: 14px; font-weight: 700;"
                    flat
                >
                    <q-icon class="bi bi-chevron-down" size="xs" style="margin-left: 2px;" />
                    <q-menu anchor="bottom middle" self="top middle">
                        <q-list style="min-width: 100px" v-for="option in item.options">
                            <q-item clickable v-close-popup>
                                <q-item-section>{{ option }}</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
                <q-btn
                    style="display: flex; justify-content: space-between; align-items: center; align-self: stretch; color: #EA0234; min-width: 98px; font-size: 14px; font-weight: 600;"
                    flat
                >
                    <q-icon class="bi bi-arrow-counterclockwise" />
                    Reset Filter
                </q-btn>
            </q-card-section>
            
            <q-input
                style="display: flex; align-items: center; padding: 0px 12px; border-radius: 10px; border: 0.6px solid #D5D5D5; background: var(--color-bg, #FFF); gap: 21px; height: 70px;"
                v-model="search"
                placeholder="Product Name / SKU"
                icon="add"
                
            >
                <template v-slot:prepend>
                    <q-icon name="search" />
                </template>
            </q-input>
        </q-card-section>
        <!-- TODO: The columns doesn't have 'align' property even though it recognizes it. -->
        <q-table
            :rows="rows"
            :columns="columns"
            row-key="SKU"
            style="display: flex; padding: 8px 0px; flex-direction: column; justify-content: flex-end; gap: 12px; align-self: stretch; border-radius: 16px; background: var(--color-bg, #FFF);"
            :rows-per-page-options="[5, 7, 10, 20]"
            :pagination="{ rowsPerPage: 7 }"
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

            <template v-slot:body-cell-actions="props">
            <q-td :props="props">
                <q-btn icon="edit" @click="editItem(props.row)"></q-btn>
                <q-btn icon="delete" @click="deleteItem(props.row)"></q-btn>
            </q-td>
            </template>

            <template v-slot:body-cell-productName="props">
            <q-td :props="props" style="max-width: 8vw; white-space: normal; overflow-wrap: break-word;">
                {{ props.row.productName }}
            </q-td>
            </template>
        </q-table>

    </q-page>

</template>


<script setup lang="ts">
import { Notify } from 'quasar';
import { ref } from 'vue';

const search = ref('');

const columns = [
        { name: 'image', label: 'Image',  field: 'image', align: 'center' },
        { name: 'SKU', label: 'SKU', field: 'SKU', sortable: true, align: 'center'  },
        { name: 'productName', label: 'Product Name', field: 'productName', sortable: true, align: 'center'  },
        { name: 'category', label: 'Category', field: 'category', sortable: true, align: 'center'  },
        { name: 'price', label: 'Price', field: 'price', sortable: true, align: 'center'  },
        { name: 'inStock', label: 'In Stock', field: 'inStock', sortable: true, align: 'center'  },
        { name: 'options', label: 'Options', field: 'options', align: 'center'  },
        { name: 'actions', label: 'Actions', field: 'actions', align: 'center'  }
];
const rows = [
        {
          image: 'https://s3-alpha-sig.figma.com/img/d420/ab08/174f1393eb4867c484c35bbd1aab104d?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RfqegEixi78n~Ja-E9W9uTXVI-eli1xZgV5z0qF3613RRKSsE~VliWWyJlh-~xvd66OyiEUYqLXBSqRb0NLn1Mt9ILMCdF035hW2n9SSsl-eI8Uou3vUSjZQIp54iL20q4j~Vfwa-iM1zocrNeEMpqEamIf5EIUmM0Q7bcGxluQA890STXKNi2Oy-xIvPJBQz9v6OpdqBhDQ8FS4BeZgdVhp0XFGz4-dRJQmmOk0tTuPzaHHbQn1ehDsULsKpOzdn0HlPobgbGZAkdpT0ipP32VSH00UquiJx3pMJh2qqh8EL-wGFx2tI4vdTZ2eGEJlJVDyl8uo5wLWMX0HiLqH9w__',
          SKU: '218754322',
          productName: 'Cherestea nerindeluita, Detroit City, lemn mold, A/ B, 2000 x 100 x 22 mm',
          category: 'Scânduri',
          price: '€ 6.00',
          inStock: 63,
          options: ['alb', 'galben', 'maro', 'mustar']
        },
        {
          image: 'https://www.figma.com/file/Nye8DVipMC2A78sDwCXLv9/image/5f2553518f412a3af1f64d0ce6bb2777f81b74b0',
          SKU: '218754323',
          productName: 'Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg',
          category: 'Ciment, lianti, var',
          price: '€ 192.00',
          inStock: 13,
          options: ['20 kg', '40 kg', '50 kg', '60 kg']
        },
        {
          image: 'https://s3-alpha-sig.figma.com/img/d420/ab08/174f1393eb4867c484c35bbd1aab104d?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RfqegEixi78n~Ja-E9W9uTXVI-eli1xZgV5z0qF3613RRKSsE~VliWWyJlh-~xvd66OyiEUYqLXBSqRb0NLn1Mt9ILMCdF035hW2n9SSsl-eI8Uou3vUSjZQIp54iL20q4j~Vfwa-iM1zocrNeEMpqEamIf5EIUmM0Q7bcGxluQA890STXKNi2Oy-xIvPJBQz9v6OpdqBhDQ8FS4BeZgdVhp0XFGz4-dRJQmmOk0tTuPzaHHbQn1ehDsULsKpOzdn0HlPobgbGZAkdpT0ipP32VSH00UquiJx3pMJh2qqh8EL-wGFx2tI4vdTZ2eGEJlJVDyl8uo5wLWMX0HiLqH9w__',
          SKU: '218754324',
          productName: 'Cherestea nerindeluita, Detroit City, lemn mold, A/ B, 2000 x 100 x 22 mm',
          category: 'Scânduri',
          price: '€ 6.00',
          inStock: 63,
          options: ['alb', 'galben', 'maro', 'mustar']
        },
        {
          image: 'https://www.figma.com/file/Nye8DVipMC2A78sDwCXLv9/image/5f2553518f412a3af1f64d0ce6bb2777f81b74b0',
          SKU: '218754325',
          productName: 'Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg',
          category: 'Ciment, lianti, var',
          price: '€ 192.00',
          inStock: 13,
          options: ['20 kg', '40 kg', '50 kg', '60 kg']
        },
        {
          image: 'https://s3-alpha-sig.figma.com/img/d420/ab08/174f1393eb4867c484c35bbd1aab104d?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RfqegEixi78n~Ja-E9W9uTXVI-eli1xZgV5z0qF3613RRKSsE~VliWWyJlh-~xvd66OyiEUYqLXBSqRb0NLn1Mt9ILMCdF035hW2n9SSsl-eI8Uou3vUSjZQIp54iL20q4j~Vfwa-iM1zocrNeEMpqEamIf5EIUmM0Q7bcGxluQA890STXKNi2Oy-xIvPJBQz9v6OpdqBhDQ8FS4BeZgdVhp0XFGz4-dRJQmmOk0tTuPzaHHbQn1ehDsULsKpOzdn0HlPobgbGZAkdpT0ipP32VSH00UquiJx3pMJh2qqh8EL-wGFx2tI4vdTZ2eGEJlJVDyl8uo5wLWMX0HiLqH9w__',
          SKU: '218754326',
          productName: 'Cherestea nerindeluita, Detroit City, lemn mold, A/ B, 2000 x 100 x 22 mm',
          category: 'Scânduri',
          price: '€ 6.00',
          inStock: 63,
          options: ['alb', 'galben', 'maro', 'mustar']
        },
        {
          image: 'https://www.figma.com/file/Nye8DVipMC2A78sDwCXLv9/image/5f2553518f412a3af1f64d0ce6bb2777f81b74b0',
          SKU: '218754327',
          productName: 'Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg',
          category: 'Ciment, lianti, var',
          price: '€ 192.00',
          inStock: 13,
          options: ['20 kg', '40 kg', '50 kg', '60 kg']
        },
        {
          image: 'https://s3-alpha-sig.figma.com/img/d420/ab08/174f1393eb4867c484c35bbd1aab104d?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RfqegEixi78n~Ja-E9W9uTXVI-eli1xZgV5z0qF3613RRKSsE~VliWWyJlh-~xvd66OyiEUYqLXBSqRb0NLn1Mt9ILMCdF035hW2n9SSsl-eI8Uou3vUSjZQIp54iL20q4j~Vfwa-iM1zocrNeEMpqEamIf5EIUmM0Q7bcGxluQA890STXKNi2Oy-xIvPJBQz9v6OpdqBhDQ8FS4BeZgdVhp0XFGz4-dRJQmmOk0tTuPzaHHbQn1ehDsULsKpOzdn0HlPobgbGZAkdpT0ipP32VSH00UquiJx3pMJh2qqh8EL-wGFx2tI4vdTZ2eGEJlJVDyl8uo5wLWMX0HiLqH9w__',
          SKU: '218754328',
          productName: 'Cherestea nerindeluita, Detroit City, lemn mold, A/ B, 2000 x 100 x 22 mm',
          category: 'Scânduri',
          price: '€ 6.00',
          inStock: 63,
          options: ['alb', 'galben', 'maro', 'mustar']
        },
        {
          image: 'https://www.figma.com/file/Nye8DVipMC2A78sDwCXLv9/image/5f2553518f412a3af1f64d0ce6bb2777f81b74b0',
          SKU: '218754329',
          productName: 'Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg',
          category: 'Ciment, lianti, var',
          price: '€ 192.00',
          inStock: 13,
          options: ['20 kg', '40 kg', '50 kg', '60 kg']
        },
        {
          image: 'https://s3-alpha-sig.figma.com/img/d420/ab08/174f1393eb4867c484c35bbd1aab104d?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RfqegEixi78n~Ja-E9W9uTXVI-eli1xZgV5z0qF3613RRKSsE~VliWWyJlh-~xvd66OyiEUYqLXBSqRb0NLn1Mt9ILMCdF035hW2n9SSsl-eI8Uou3vUSjZQIp54iL20q4j~Vfwa-iM1zocrNeEMpqEamIf5EIUmM0Q7bcGxluQA890STXKNi2Oy-xIvPJBQz9v6OpdqBhDQ8FS4BeZgdVhp0XFGz4-dRJQmmOk0tTuPzaHHbQn1ehDsULsKpOzdn0HlPobgbGZAkdpT0ipP32VSH00UquiJx3pMJh2qqh8EL-wGFx2tI4vdTZ2eGEJlJVDyl8uo5wLWMX0HiLqH9w__',
          SKU: '218754330',
          productName: 'Cherestea nerindeluita, Detroit City, lemn mold, A/ B, 2000 x 100 x 22 mm',
          category: 'Scânduri',
          price: '€ 6.00',
          inStock: 63,
          options: ['alb', 'galben', 'maro', 'mustar']
        },
        {
          image: 'https://www.figma.com/file/Nye8DVipMC2A78sDwCXLv9/image/5f2553518f412a3af1f64d0ce6bb2777f81b74b0',
          SKU: '218754331',
          productName: 'Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg',
          category: 'Ciment, lianti, var',
          price: '€ 192.00',
          inStock: 13,
          options: ['20 kg', '40 kg', '50 kg', '60 kg']
        },
        {
          image: 'https://s3-alpha-sig.figma.com/img/d420/ab08/174f1393eb4867c484c35bbd1aab104d?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RfqegEixi78n~Ja-E9W9uTXVI-eli1xZgV5z0qF3613RRKSsE~VliWWyJlh-~xvd66OyiEUYqLXBSqRb0NLn1Mt9ILMCdF035hW2n9SSsl-eI8Uou3vUSjZQIp54iL20q4j~Vfwa-iM1zocrNeEMpqEamIf5EIUmM0Q7bcGxluQA890STXKNi2Oy-xIvPJBQz9v6OpdqBhDQ8FS4BeZgdVhp0XFGz4-dRJQmmOk0tTuPzaHHbQn1ehDsULsKpOzdn0HlPobgbGZAkdpT0ipP32VSH00UquiJx3pMJh2qqh8EL-wGFx2tI4vdTZ2eGEJlJVDyl8uo5wLWMX0HiLqH9w__',
          SKU: '218754332',
          productName: 'Cherestea nerindeluita, Detroit City, lemn mold, A/ B, 2000 x 100 x 22 mm',
          category: 'Scânduri',
          price: '€ 6.00',
          inStock: 63,
          options: ['alb', 'galben', 'maro', 'mustar']
        },
        {
          image: 'https://www.figma.com/file/Nye8DVipMC2A78sDwCXLv9/image/5f2553518f412a3af1f64d0ce6bb2777f81b74b0',
          SKU: '218754333',
          productName: 'Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg',
          category: 'Ciment, lianti, var',
          price: '€ 192.00',
          inStock: 13,
          options: ['20 kg', '40 kg', '50 kg', '60 kg']
        },
];

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

const filter = [
    {
        label: 'Option Type',
        options: ['New tab', 'New incognito tab', 'Recent tabs', 'History', 'Downloads', 'Settings', 'Help & Feedback'],
        selected: 'New tab',
    }, 
    {
        label: 'Category',
        options: ['New tab', 'New incognito tab', 'Recent tabs', 'History', 'Downloads', 'Settings', 'Help & Feedback'],
        selected: 'New tab',
    }, 
    {
        label: 'Price between',
        options: ['New tab', 'New incognito tab', 'Recent tabs', 'History', 'Downloads', 'Settings', 'Help & Feedback'],
        selected: 'New tab',
    }, 
    {
        label: 'Left in Stock',
        options: ['New tab', 'New incognito tab', 'Recent tabs', 'History', 'Downloads', 'Settings', 'Help & Feedback'],
        selected: 'New tab',
    }
]

const editItem = (item) => {
    Notify.create({ message: `Edit ${item.productName}`, color: 'positive', position: 'top' });
};

const deleteItem = (item) => {
    Notify.create({ message: `Delete ${item.productName}`, color: 'negative', position: 'top' });
};
</script>

<style>
.options-container {
  display: flex;
  width: 175px;
  align-items: center;
  align-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.option-chip {
    display: flex;
    height: var(--Size-size-input-lg, 44px);
    padding: var(--Spacing-spacing-sm, 8px) var(--Spacing-spacing-lg, 16px);
    align-items: center;
    gap: var(--Spacing-spacing-sm, 8px);
    flex-shrink: 0;
    border-radius: var(--Radii-radius-input, 6px);
    border: 1px solid var(--color-border, #E4E4E7);
    background: var(--color-bg, #FFF);

    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}
</style>
