<template>
    <q-layout view="hhh lpR fff">
  
      <q-page-container class="page-layout">
        <!-- Seasonal discount; this will only show when there is an active discount! TODO: Function to get active discount. -->
         <!-- TODO: Modify pixels to vh or vw. -->
         <q-banner
         class="discountBanner"
     >
         <div
             class="text-white"
             style="font-size: 1.4vh; font-weight: 500; line-height: 1.2; text-align: center;"
         >
         Nu rata oferta verii! 20% reducere la orice din categoria Casă și grădină până pe 28 iulie!
         <q-icon size="1.4vh" style="font-size: 1.4vh; font-weight: 500; line-height: 1.2; text-align: center;">%</q-icon>
     </div>
     </q-banner>

     <!-- LOGO - Search-bar - Row with: Cart | Currency | Profile -->
     <q-card-section
         horizontal
         style="display: flex; height: 4.16vh; padding: 0px 1.18vw; justify-content: space-between; align-items: center; align-self: stretch;"
     >
         <!-- LOGO -->
          <q-img
             src="@/assets/logo.png"
             style="width: 3.72vw; height: 4.07vh"
             fit="contain"
             @click="() => router.push('/')"
         />

         <!-- SEARCH BAR -->
         <q-input
             v-model="search"
             placeholder="Caută produsele de care ai nevoie"
             style="width: 29.62vw;"
             dense
         >
             <template v-slot:prepend>
                 <q-icon name="search" />
             </template>

         </q-input>

         <!-- TODO: Only when user logged in. Otherwise Log In button -->
         <!-- ROW WITH: Cart | Currency | Profile -->
         <q-card-section
             horizontal
             style="display: flex; align-items: center; gap: 1.25vh;"
             v-if="isLogged"
         >
         <!-- Cart -->
             <q-btn
                 style="display: flex; align-items: center; padding-right: 2.28vw; gap: 2.28vw;"
                 @click="() => router.push('/cart')"
                 flat
             >
                 <q-icon name="shopping_cart" />
                 <div style="text-transform: none; font-size: 14px; font-family: Inter; font-style: normal; font-weight: 400; line-height: 20px; text-align:right">Vezi cosul</div>
             </q-btn>

             <q-separator vertical inset />

             <!-- Currency -->
             RON

             <q-separator vertical inset />

             <!-- Profile -->
             <q-btn
                 style="display: flex; justify-content: center; align-items: center; gap: var(--Spacing-spacing-xs, 1.82vw); max-height: 4.28vh;"
                 @click="() => router.push('/profile')"
                 flat
             >

                 <q-icon 
                 name="account_circle" 
                 style="display: flex; justify-content: flex-end; align-items: center; gap: var(--Spacing-spacing-xs, 1.82vw);" 
                 />
                 <!-- TODO: Add User's name instead of Florian Subtirica and the photo from database -->
                 <q-card-section
                     vertical
                     style="display: flex; flex-direction: column; align-items: flex-start;" 
                 >
                     <div 
                         style="text-transform: none; font-family: Inter; font-size: 14px; font-style: normal; font-weight: 700; line-height: 20px;"
                     >
                         Florian Subtirelul
                     </div>
                     <div 
                         style="color: var(--color-text-muted, #71717A); text-align: right; font-family: Inter; font-size: 14px; font-style: normal; font-weight: 400; line-height: 20px; text-transform: none;"
                     >
                         Contul tau
                     </div>
                 </q-card-section>
             
             </q-btn>

         
         </q-card-section>
         
         <q-btn
             label="Log In"
             @click="() => router.push('/auth/login')"
             class="button-style"
             style="height: 40px; width: 150px;"
             v-if="!isLogged"
         />
         <!-- Log In Button-->
         </q-card-section>
 
        <router-view />
      </q-page-container>
  
    </q-layout>
  </template>

<script setup lang="ts">

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from "@/firebase/firebase";

const search = ref('');
const router = useRouter();

const isLogged = ref<boolean>(false);
isLogged.value = auth.currentUser !== null;

defineOptions({
    name: 'HomeLayout',
  })

</script>

<style scoped>

.page-layout {
    display: flex;
    width: 100vw;
    padding-bottom: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    background: #FFF;
}

.discountBanner {
    display: flex;
    min-height: 36px;
    height: 36px;
    padding: 8px 16px;
    flex-direction: center;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    
    background: var(--color-bg-success-strong, #059669);
}

</style>
