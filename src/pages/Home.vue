<template>
    <q-page class="page-layout">
        <!-- Seasonal discount; this will only show when there is an active discount! TODO: Function to get active discount. -->
        <q-banner
            class="discountBanner"
        >
            <div
                class="text-white"
                style="font-size: 14px; font-weight: 500; line-height: 1.2; text-align: center;"
            >
            Nu rata oferta verii! 20% reducere la orice din categoria Casă și grădină până pe 28 iulie!
            <q-icon size="14px" style="font-size: 14px; font-weight: 500; line-height: 1.2; text-align: center;">%</q-icon>
        </div>
        </q-banner>

        <!-- LOGO - Search-bar - Row with: Cart | Currency | Profile -->
        <q-card-section
            horizontal
            style="display: flex; height: 40px; padding: 0px 20px; justify-content: space-between; align-items: center; align-self: stretch;"
        >
            <!-- LOGO -->
             <q-img
                src="@/assets/logo.png"
                style="width: 58px; height: 38px"
                fit="contain"
                @click="() => router.push('/')"
            />

            <!-- SEARCH BAR -->
            <q-input
                v-model="search"
                placeholder="Caută produse..."
                style="width: 500px;"
                outlined
                dense
            />

            <!-- TODO: Only when user logged in. Otherwise Log In button -->
            <!-- ROW WITH: Cart | Currency | Profile -->
            <q-card-section
                horizontal
                style="display: flex; align-items: center; gap: 12px;"
                v-if="isLogged"
            >
            <!-- Cart -->
                <q-btn
                    style="display: flex; align-items: center; padding-right: 10px; gap:10px;"
                    @click="() => router.push('/cart')"
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
                    style="display: flex; justify-content: center; align-items: center; gap: var(--Spacing-spacing-xs, 8px); max-height: 40px;"
                    @click="() => router.push('/profile')"
                >

                    <q-icon 
                    name="account_circle" 
                    style="display: flex; justify-content: flex-end; align-items: center; gap: var(--Spacing-spacing-xs, 8px);" 
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
                @click="() => router.push('/login')"
                class="button-style"
                style="height: 40px; width: 150px;"
                v-if="!isLogged"
            />
            <!-- Log In Button-->
             <!-- TODO: Modify v-if so it only appears when user not logged in. -->
            </q-card-section>
    
        <!-- Banner: Departments, Construction Mats, Offers --> 
        <q-banner 
            class="navigationBanner"
        >
            <q-card-section horizontal>
                <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="white"
          indicator-color="white"
          align="justify"
          narrow-indicator
        >
          <q-tab name="1" label="Dupa departament" />
          <q-tab name="2" label="Materiale de constructii" />
          <q-tab name="3" label="Oferte speciale" />
        </q-tabs>
            
            </q-card-section>
        </q-banner>
        
        <q-card-section
            horizontal
            style="display: flex; justify-content: flex-start; align-items: flex-start; gap: 20px; align-self: stretch; padding: 0px 20px;"
        >

            <q-card
                bordered
                style="display: flex; width: auto; max-width: 40vw; padding: 24px 12px 24px 24px; flex-direction: column; align-items: flex-start; gap: 10px; border-radius: 0px 0px 20px 20px; background: #FFF;  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.10);"

            >
                <q-tab-panels 
                    v-model="tab" 
                    animated
                >
                    <q-tab-panel name="1">
                    <div class="text-h6">Mails</div>
                    Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </q-tab-panel>
        
                    <q-tab-panel name="2">
                    <div class="text-h6">Alarms</div>
                    2 Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </q-tab-panel>
        
                    <q-tab-panel name="3">
                    <div class="text-h6">Movies</div>
                    3 Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </q-tab-panel>
                </q-tab-panels>
            </q-card>
            <q-carousel
                :autoplay="5000"
                v-model="slide"
                animated
                navigation
                infinite
                style="height: 600px; align-self: stretch; border-radius: 36px; background: url(<path-to-image>) lightgray 50% / cover no-repeat; box-shadow: 0px 4px 6px -4px rgba(16, 24, 40, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10); width: 100%"
            >
                <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
                <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
                <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
                <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
            </q-carousel>
        
        </q-card-section>

        <q-btn
            label="LogOut"
            @click="logout"
            class="button-style"
            style="height: 40px; width: 150px"
        />
    </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import logout from '@/firebase/firebase-logout'
import { useRouter } from 'vue-router';
import {auth} from '@/firebase/firebase';

const router = useRouter();

const search = ref<string>('');

const slide = ref<number>(1);

const tab = ref<string>('1');

const isLogged = ref<boolean>(false);
isLogged.value = auth.currentUser !== null;

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

.navigationBanner {
    display: flex;
    height: 48px;
    padding: 4px 20px 0px 20px;
    align-items: center;
    gap: 12px;
    align-self: stretch;

    background: var(--gradient, linear-gradient(90deg, #2563EB 2%, #0CD496 100%));
}

</style>
