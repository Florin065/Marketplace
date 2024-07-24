<template>
    <q-page
        style="display: flex; padding: 10px 0px; flex-direction: column; align-items: flex-start; gap: 12px; align-self: stretch;"
    >
    <!-- Products + 3 buttonsThree -->
        <q-card-section
            horizontal
            style="display: felx; align-items: center; align-self: center; gap: 17.4vw;"
        >
            <div
            style='color: #202224; font-size: 32px; font-style: normal; font-weight: 700; line-height: normal; letter-spacing: -0.114px;'>
                Products
            </div>
            
            <q-card-section
                horizontal
                style="display:flex; gap: 1.6vw; align-items: center;"
            >
                <q-btn
                v-for="button in buttonsThree"
                :key="button.label"
                :label="button.label"
                :icon="button.icon"
                @click="button.action"
                :style="`display: flex; align-items: center; justify-content: center; gap: var(--Spacing-spacing-sm, 8px); border-radius: var(--Radii-radius-button, 6px); background: ${button.backgroundColor}; color: ${button.color} height: var(--Size-size-button-md, 40px); padding: var(--Spacing-space-2, 8px) var(--Spacing-spacing-lg, 16px); border: 1px solid var(--color-border-focusRing, ${button.borderColor});`"
                :flat="button.isFlat"
                :color="button.color"
                />
            </q-card-section>
        </q-card-section>

        <!-- 4 Buttons -->
        <q-card-section
            horizontal
            style="display: flex; padding: 8px 12px; align-items: center; gap: 2.4vw; border-radius: 12px; background: var(--color-bg, #FFF); box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);"
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
        <q-table
            :rows="rows"
            :columns="columns"
            row-key="SKU"
            style="display: flex; padding: 8px 0px; flex-direction: column; justify-content: flex-end; gap: 12px; align-self: stretch; border-radius: 16px; background: var(--color-bg, #FFF);"
            :rows-per-page-options="[5, 7, 10, 20]"
            :pagination="{ rowsPerPage: 7 }"
        >
            <!-- Image -->
            <template v-slot:body-cell-image="props">
                <q-td :props="props">
                    <q-img :src="props.row.image" fit="contain" style="width: 71.525px; height: 60px;"></q-img>
                </q-td>
            </template>

            <!-- Options -->
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

            <!-- Price -->
            <template v-slot:body-cell-price="props">
                <q-td :props="props">
                {{ props.row.price }} {{ props.row.currency }}
                </q-td>
            </template>

            <!-- Actions Edit/Delete -->
            <template v-slot:body-cell-actions="props">
            <q-td :props="props">
                    
                <q-btn icon="bi-pencil-square" style="color: #D5D5D5" @click="editItem(props.row)"></q-btn>
                <q-btn icon="bi-trash" style="color: #EF3862" @click="deleteItem(props.row)"></q-btn>
            </q-td>
            </template>

            <!-- Name -->
            <template v-slot:body-cell-productName="props">
            <q-td :props="props" style="max-width: 20vw; white-space: normal; overflow-wrap: break-word;">
                {{ props.row.productName }}
            </q-td>
            </template>

            <!-- Selected box -->
             <!-- TODO: Select box not updating when clicked -->
            <template v-slot:body-cell-selected="props">
                <q-td :props="props">
                    <q-checkbox v-model="props.row.selected" @click="() => {console.log(props.row.selected); }" />
                </q-td>
            </template>
        </q-table>  
    </q-page>

</template>

<script setup lang='ts'>
import { Notify } from 'quasar';
import { ref } from 'vue';

const buttonsThree = [
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
        action: () => Notify.create({ message: 'Bulk Actions clicked', color: 'positive', position: 'top' }),
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
        action: () => Notify.create({ message: 'Bulk Actions clicked', color: 'positive', position: 'top' }),
    }
]

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
const rows = ref([
        {
          image: 'https://s3-alpha-sig.figma.com/img/d420/ab08/174f1393eb4867c484c35bbd1aab104d?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RfqegEixi78n~Ja-E9W9uTXVI-eli1xZgV5z0qF3613RRKSsE~VliWWyJlh-~xvd66OyiEUYqLXBSqRb0NLn1Mt9ILMCdF035hW2n9SSsl-eI8Uou3vUSjZQIp54iL20q4j~Vfwa-iM1zocrNeEMpqEamIf5EIUmM0Q7bcGxluQA890STXKNi2Oy-xIvPJBQz9v6OpdqBhDQ8FS4BeZgdVhp0XFGz4-dRJQmmOk0tTuPzaHHbQn1ehDsULsKpOzdn0HlPobgbGZAkdpT0ipP32VSH00UquiJx3pMJh2qqh8EL-wGFx2tI4vdTZ2eGEJlJVDyl8uo5wLWMX0HiLqH9w__',
          SKU: '218754322',
          productName: 'Cherestea nerindeluita, Detroit City, lemn mold, A/ B, 2000 x 100 x 22 mm',
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
]);

const editItem = (item) => {
    Notify.create({ message: `Edit ${item.productName} clicked`, color: 'positive', position: 'top' });
}

const deleteItem = (item) => {
    Notify.create({ message: `Delete ${item.productName} clicked`, color: 'negative', position: 'top' });
}

</script>

<style scoped>
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
