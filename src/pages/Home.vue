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
        <q-card-section horizontal style="height: 40px">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="white"
          indicator-color="white"
          align="justify"
          narrow-indicator
          style="margin-bottom: -5px;"
        >
          <q-tab name="1"
            :style="tab === '1' ? 'background-color: white !important; color: black !important; border-radius: 10px 10px 0px 0px;' : ''"
            label="Dupa departament" />
          <q-tab name="2"
            :style="tab === '2' ? 'background-color: white !important; color: black !important; border-radius: 10px 10px 0px 0px;' : ''"
            label="Materiale de constructii" />
          <q-tab name="3"
          :style="tab === '3' ? 'background-color: white !important; color: black !important; border-radius: 10px 10px 0px 0px;' : ''"
            label="Oferte speciale" />
        </q-tabs>
            
        </q-card-section>
        </q-banner>
        
        <q-card-section
            horizontal
            style="display: flex; justify-content: flex-start; align-items: flex-start; gap: 20px; align-self: stretch; padding: 0px 32px; margin-top: -15px"
        >
            <q-card
                bordered
                style="display: flex; width: auto; max-width: 40vw;
                padding: 24px 12px 24px 24px; flex-direction: column;
                align-items: flex-start; gap: 10px; border-radius: 0px 0px 20px 20px;
                background-color: #FFF;
                background: #FFF;  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.10);"
            >
                <q-tab-panels 
                    v-model="tab" 
                    animated
                >
                <q-tab-panel 
                    name="1"
                    style=" display: flex; width: 589px; padding: 24px 12px 24px 24px;
                    flex-direction: column; align-items: flex-start; gap: 10px;
                    border-radius: 0px 0px 20px 20px;
                    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.10);"
                >

                <q-card-section
                    style="display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 24px; align-self: stretch; height: 505px"
                    horizontal
                    class="text-left"
                >
                    <q-card-section
                        style="display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
                        gap: 24px; align-self: stretch; margin-left:-50px; margin-top: -30px; margin-bottom: -20px"
                        vertical
                    >
                        <q-img
                            src="/src/assets/savings.png"
                            style="width: 267px; height: 168px; border-radius: 12px;"
                            fit="fill"
                        />

                        <q-img
                            src="/src/assets/fifty.png"
                            style="width: 267px; height: 168px; border-radius: 12px;"
                            fit="fill"
                        />

                        <q-img
                            src="/src/assets/garantid.png"
                            style="width: 267px; height: 168px; border-radius: 12px;"
                            fit="fill"
                        />
                    </q-card-section>
                        
                    <q-card-section
                        style="display: flex; flex-direction: column; justify-content: center;
                        align-items: flex-start; align-self: stretch; margin-left:-50px; margin-top: -35px;"
                        vertical
                        class="q-pl-xl"
                    >
                    

                        <div>
                            <div class="text-bold q-pt-lg" style="font-size: 14px">
                                <i class="bi bi-bricks" /> Materiale de construcție
                            </div>
                            <div style="font-size: 14px">Materiale durabile pentru zeci de ani</div>
                            <div style="font-size: 12px">Lemn, feronerie, construcții, unelte ...</div>
                        </div>

                        <div>
                            <div class="text-bold q-pt-lg" style="font-size: 14px">
                                <i class="bi bi-house" /> Casă
                            </div>
                            <div style="font-size: 14px">Soluții complete pentru casa ta</div>
                            <div style="font-size: 12px">Electrocasnice, baie, decorațiuni ...</div>
                        </div>

                        <div>
                            <div class="text-bold q-pt-lg" style="font-size: 14px">
                                <i class="bi bi-tree" /> Grădină și exterior
                            </div>
                            <div style="font-size: 14px">Tot ce ai nevoie pentru exterior</div>
                            <div style="font-size: 12px">Grătare, terase, echipamente, mobilier ...</div>
                        </div>

                        <div>
                            <div class="text-bold q-pt-lg" style="font-size: 14px">
                                <i class="bi bi-lightning-charge" /> Electrice și iluminat
                            </div>
                            <div style="font-size: 14px">Eficiență energetică și iluminat modern</div>
                            <div style="font-size: 12px">Electrocasnice, baie, decorațiuni ...</div>
                        </div>

                        <div>
                            <div class="text-bold q-pt-lg" style="font-size: 14px">
                                <i class="bi bi-thermometer-sun" /> Instalații termice și sanitare
                            </div>
                            <div style="font-size: 14px">Soluții pentru confortul tău zilnic</div>
                            <div style="font-size: 12px">Încălzire, răcire, instalații sanitare ...</div>
                        </div>

                        <div>
                            <div class="text-bold q-pt-lg" style="font-size: 14px">
                                <i class="bi bi-brush" /> Vopsea și finisaje
                            </div>
                            <div style="font-size: 14px">Finisaje profesionale pentru orice</div>
                            <div style="font-size: 12px">Vopseluri, lacuri, jaluzele, finisaje ...</div>
                        </div>
                        
                    </q-card-section>
                </q-card-section>

                    </q-tab-panel>
                    <q-tab-panel name="2">
                    <div class="text-h6">Alarms</div>
                    Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit. Mail Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                style="height: 600px; align-self: stretch;
                border-radius: 36px; background: url(<path-to-image>) lightgray 50% / cover no-repeat;
                    box-shadow: 0px 4px 6px -4px rgba(16, 24, 40, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10); width: 100%"
                fit="contain"
            >
                <q-carousel-slide :name="1" img-src="@/assets/1.jpg" />
                <q-carousel-slide :name="2" img-src="@/assets/2.jpg" />
                <q-carousel-slide :name="3" img-src="@/assets/3.jpg" />
                <q-carousel-slide :name="4" img-src="@/assets/4.jpg" />
                <q-carousel-slide :name="5" img-src="@/assets/5.jpg" />
            </q-carousel>
        
        </q-card-section>
        
                <!-- Filters -->
                <q-card-section
                horizontal
                style="display: flex; align-items: center; gap: 24px; align-self: stretch; margin-left:30px; margin-top: 20px"
            >
                <q-card style="display: flex; align-items: center; gap: 10px;">
                    <q-icon size="sm">
                        <q-img style="display: flex; align-items: center;gap: 10px;" src="@/assets/tag.svg" />
                    </q-icon>
                    <div
                        style="color: var(--blue1, #2563EB); text-align: center;  font-family: Inter;font-size: 12px; font-style: normal; font-weight: 500; line-height: 16px; /* 133.333% */"
                    >
                        Cautari populare
                    </div>
                </q-card>
    
                <q-btn
                    style="display: flex; padding: var(--Spacing-spacing-2xs, 4px) var(--Spacing-spacing-sm, 8px); justify-content: center; align-items: center; gap: var(--Spacing-spacing-2xs, 4px); border-radius: var(--Radii-radius, 6px); border: 1px solid var(--blue-light, rgba(37, 99, 235, 0.30)); background: var(--color-bg, #FFF);"
                    label="Lac pentru gard"
                    unelevated
                />
    
                <q-btn
                    style="display: flex; padding: var(--Spacing-spacing-2xs, 4px) var(--Spacing-spacing-sm, 8px); justify-content: center; align-items: center; gap: var(--Spacing-spacing-2xs, 4px); border-radius: var(--Radii-radius, 6px); border: 1px solid var(--blue-light, rgba(37, 99, 235, 0.30)); background: var(--color-bg, #FFF);"
                    label="Gratar"
                    unelevated
                />
    
                <q-btn
                    style="display: flex; padding: var(--Spacing-spacing-2xs, 4px) var(--Spacing-spacing-sm, 8px); justify-content: center; align-items: center; gap: var(--Spacing-spacing-2xs, 4px); border-radius: var(--Radii-radius, 6px); border: 1px solid var(--blue-light, rgba(37, 99, 235, 0.30)); background: var(--color-bg, #FFF);"
                    label="Carbuni"
                    unelevated
                />
    
                <q-btn
                    style="display: flex; padding: var(--Spacing-spacing-2xs, 4px) var(--Spacing-spacing-sm, 8px); justify-content: center; align-items: center; gap: var(--Spacing-spacing-2xs, 4px); border-radius: var(--Radii-radius, 6px); border: 1px solid var(--blue-light, rgba(37, 99, 235, 0.30)); background: var(--color-bg, #FFF);"
                    label="Panou lemn"
                    unelevated
                />
    
                <q-btn
                    style="display: flex; padding: var(--Spacing-spacing-2xs, 4px) var(--Spacing-spacing-sm, 8px); justify-content: center; align-items: center; gap: var(--Spacing-spacing-2xs, 4px); border-radius: var(--Radii-radius, 6px); border: 1px solid var(--blue-light, rgba(37, 99, 235, 0.30)); background: var(--color-bg, #FFF);"
                    label="Parchet"
                    unelevated
                />
    
                <q-btn
                    style="display: flex; padding: var(--Spacing-spacing-2xs, 4px) var(--Spacing-spacing-sm, 8px); justify-content: center; align-items: center; gap: var(--Spacing-spacing-2xs, 4px); border-radius: var(--Radii-radius, 6px); border: 1px solid var(--blue-light, rgba(37, 99, 235, 0.30)); background: var(--color-bg, #FFF);"
                    label="Vopsea Interior"
                    unelevated
                />
    
            </q-card-section>
    
            <!-- Biggest Discounts -->
            <q-card-section
                horizontal
                style="display: flex; align-items: center; gap: 25px;"
            >
                <div style="margin-left: 30px;color: var(--color-icon, #18181B); font-family: Inter; font-size: 48px;
                    font-style: normal; font-weight: 600; line-height: 58px; /* 120.833% */"
                    >Cele mai mari reduceri</div>
    
                <div style="width: 296px; display: flex; align-items: center; gap: 12px; border-radius: 12px;
                    background: var(--color-bg-error-muted-hover, #FEE2E2);">
    
                    <q-icon style="width: 32px; height: 32px; margin-left: 52.5px">
                        <q-img src="@/assets/clock.svg" />
                    </q-icon>
                    <div style="
                        color: var(--magenta, #EE0D50);
                        font-family: Inter;
                        font-size: 24px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: 38px; /* 158.333% */"
                    >
                        Expiră mâine!
                    </div>
                </div>
    
            </q-card-section>
    
            <!-- Products -->
            <q-card-section
                horizontal
                style="display: flex; align-items: center; gap: 10px; align-self: stretch;"
            >
                <q-btn icon="chevron_left" @click="scrollLeft" flat />
    
                <q-scroll-area style="height: 403px; max-width: 100vw; display: flex; align-items: flex-start; gap: 16px; flex: 1 0 0; box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);" ref="scrollAreaRef">
                    <div class="row no-wrap" style="display: flex; gap: 20px;">
                        <q-card
                            bordered
                            style="display: flex; padding: 18px 16px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); border: 1px solid var(--color-border-info-muted, #60A5FA);background: #FFF;"
                            >
                                
                            <div class="text-h6" @click="() => router.push('/product')">Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg</div>
                            <q-card-section
                                horizontal
                                syle="display: flex; width: 334px; padding: 12px; align-items: center; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); background: rgba(255, 255, 255, 0.00);"
                            >
                                <q-img
                                    src="https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/sac_ciment.png?alt=media&token=fca04947-f2f5-433c-ace0-ad3b216c9465"
                                    style="width: 150px; height: 187.238px; background: url(<path-to-image>) lightgray 50% / cover no-repeat;"
                                    @click="() => router.push('/product')"
                                />
                                <q-card-section
                                    vertical
                                    style="display: flex; flex-direction: column; align-items: flex-start; gap: 4px; flex: 1 0 0;"
                                >
                                    <div style="align-self: stretch; color: rgba(238, 13, 80, 0.80); font-family: Inter; font-size: 24px; font-style: normal; font-weight: 400; line-height: 38px;  text-decoration-line: strikethrough; text-decoration:line-through"
                                    >
                                        32.99 Lei
                                    </div>
    
                                    <div
                                        style="width: 150px; height: 96px; color: var(--green, #0CD496); font-family: Inter; font-size: 36px; font-style: normal; font-weight: 800; line-height: 48px; /* 133.333% */"
                                    >
                                        28.99 LEI
                                    </div>
                                    <div
                                        style="width: 150px; color: var(--blue1, #2563EB); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px; /* 142.857% */"
                                    >
    
                                    </div>
                                </q-card-section>
                            </q-card-section>
                            
                            <q-btn
                                label="Adauga in cos"
                                @click="() => addedToCart()"
                                style="display: flex; height: var(--Size-size-button-xl, 48px); padding: var(--Spacing-spacing-sm, 8px) var(--Spacing-spacing-lg, 16px); justify-content: center; align-items: center; gap: var(--Spacing-spacing-sm, 8px); align-self: stretch; border-radius: var(--Spacing-spacing-lg, 16px); background: var(--blue1, #2563EB); box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10);"
                            />
                        </q-card>
    
                        <q-card
                            bordered
                            style="display: flex; padding: 18px 16px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); border: 1px solid var(--color-border-info-muted, #60A5FA);background: #FFF;"
                            >
                                
                            <div class="text-h6" @click="() => router.push('/product')">Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg</div>
                            <q-card-section
                                horizontal
                                syle="display: flex; width: 334px; padding: 12px; align-items: center; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); background: rgba(255, 255, 255, 0.00);"
                            >
                                <q-img
                                    src="https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/sac_ciment.png?alt=media&token=fca04947-f2f5-433c-ace0-ad3b216c9465"
                                    style="width: 150px; height: 187.238px; background: url(<path-to-image>) lightgray 50% / cover no-repeat;"
                                    @click="() => router.push('/product')"
                                />
                                <q-card-section
                                    vertical
                                    style="display: flex; flex-direction: column; align-items: flex-start; gap: 4px; flex: 1 0 0;"
                                >
                                    <div style="align-self: stretch; color: rgba(238, 13, 80, 0.80); font-family: Inter; font-size: 24px; font-style: normal; font-weight: 400; line-height: 38px;  text-decoration-line: strikethrough; text-decoration:line-through"
                                    >
                                        32.99 Lei
                                    </div>
    
                                    <div
                                        style="width: 150px; height: 96px; color: var(--green, #0CD496); font-family: Inter; font-size: 36px; font-style: normal; font-weight: 800; line-height: 48px; /* 133.333% */"
                                    >
                                        28.99 LEI
                                    </div>
                                    <div
                                        style="width: 150px; color: var(--blue1, #2563EB); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px; /* 142.857% */"
                                    >
    
                                    </div>
                                </q-card-section>
                            </q-card-section>
                            
                            <q-btn
                                label="Adauga in cos"
                                @click="() => addedToCart()"
                                style="display: flex; height: var(--Size-size-button-xl, 48px); padding: var(--Spacing-spacing-sm, 8px) var(--Spacing-spacing-lg, 16px); justify-content: center; align-items: center; gap: var(--Spacing-spacing-sm, 8px); align-self: stretch; border-radius: var(--Spacing-spacing-lg, 16px); background: var(--blue1, #2563EB); box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10);"
                            />
                        </q-card>
    
                        <q-card
                            bordered
                            style="display: flex; padding: 18px 16px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); border: 1px solid var(--color-border-info-muted, #60A5FA);background: #FFF;"
                            >
                                
                            <div class="text-h6" @click="() => router.push('/product')">Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg</div>
                            <q-card-section
                                horizontal
                                syle="display: flex; width: 334px; padding: 12px; align-items: center; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); background: rgba(255, 255, 255, 0.00);"
                            >
                                <q-img
                                    src="https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/sac_ciment.png?alt=media&token=fca04947-f2f5-433c-ace0-ad3b216c9465"
                                    style="width: 150px; height: 187.238px; background: url(<path-to-image>) lightgray 50% / cover no-repeat;"
                                    @click="() => router.push('/product')"
                                />
                                <q-card-section
                                    vertical
                                    style="display: flex; flex-direction: column; align-items: flex-start; gap: 4px; flex: 1 0 0;"
                                >
                                    <div style="align-self: stretch; color: rgba(238, 13, 80, 0.80); font-family: Inter; font-size: 24px; font-style: normal; font-weight: 400; line-height: 38px;  text-decoration-line: strikethrough; text-decoration:line-through"
                                    >
                                        32.99 Lei
                                    </div>
    
                                    <div
                                        style="width: 150px; height: 96px; color: var(--green, #0CD496); font-family: Inter; font-size: 36px; font-style: normal; font-weight: 800; line-height: 48px; /* 133.333% */"
                                    >
                                        28.99 LEI
                                    </div>
                                    <div
                                        style="width: 150px; color: var(--blue1, #2563EB); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px; /* 142.857% */"
                                    >
    
                                    </div>
                                </q-card-section>
                            </q-card-section>
                            
                            <q-btn
                                label="Adauga in cos"
                                @click="() => addedToCart()"
                                style="display: flex; height: var(--Size-size-button-xl, 48px); padding: var(--Spacing-spacing-sm, 8px) var(--Spacing-spacing-lg, 16px); justify-content: center; align-items: center; gap: var(--Spacing-spacing-sm, 8px); align-self: stretch; border-radius: var(--Spacing-spacing-lg, 16px); background: var(--blue1, #2563EB); box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10);"
                            />
                        </q-card>
    
    
                        <q-card
                            bordered
                            style="display: flex; padding: 18px 16px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); border: 1px solid var(--color-border-info-muted, #60A5FA);background: #FFF;"
                            >
                                
                            <div class="text-h6" @click="() => router.push('/product')">Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg</div>
                            <q-card-section
                                horizontal
                                syle="display: flex; width: 334px; padding: 12px; align-items: center; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); background: rgba(255, 255, 255, 0.00);"
                            >
                                <q-img
                                    src="https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/sac_ciment.png?alt=media&token=fca04947-f2f5-433c-ace0-ad3b216c9465"
                                    style="width: 150px; height: 187.238px; background: url(<path-to-image>) lightgray 50% / cover no-repeat;"
                                    @click="() => router.push('/product')"
                                />
                                <q-card-section
                                    vertical
                                    style="display: flex; flex-direction: column; align-items: flex-start; gap: 4px; flex: 1 0 0;"
                                >
                                    <div style="align-self: stretch; color: rgba(238, 13, 80, 0.80); font-family: Inter; font-size: 24px; font-style: normal; font-weight: 400; line-height: 38px;  text-decoration-line: strikethrough; text-decoration:line-through"
                                    >
                                        32.99 Lei
                                    </div>
    
                                    <div
                                        style="width: 150px; height: 96px; color: var(--green, #0CD496); font-family: Inter; font-size: 36px; font-style: normal; font-weight: 800; line-height: 48px; /* 133.333% */"
                                    >
                                        28.99 LEI
                                    </div>
                                    <div
                                        style="width: 150px; color: var(--blue1, #2563EB); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px; /* 142.857% */"
                                    >
    
                                    </div>
                                </q-card-section>
                            </q-card-section>
                            
                            <q-btn
                                label="Adauga in cos"
                                @click="() => addedToCart()"
                                style="display: flex; height: var(--Size-size-button-xl, 48px); padding: var(--Spacing-spacing-sm, 8px) var(--Spacing-spacing-lg, 16px); justify-content: center; align-items: center; gap: var(--Spacing-spacing-sm, 8px); align-self: stretch; border-radius: var(--Spacing-spacing-lg, 16px); background: var(--blue1, #2563EB); box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10);"
                            />
                        </q-card>
    
    
                        <q-card
                            bordered
                            style="display: flex; padding: 18px 16px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); border: 1px solid var(--color-border-info-muted, #60A5FA);background: #FFF;"
                            >
                                
                            <div class="text-h6" @click="() => router.push('/product')">Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg</div>
                            <q-card-section
                                horizontal
                                syle="display: flex; width: 334px; padding: 12px; align-items: center; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); background: rgba(255, 255, 255, 0.00);"
                            >
                                <q-img
                                    src="https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/sac_ciment.png?alt=media&token=fca04947-f2f5-433c-ace0-ad3b216c9465"
                                    style="width: 150px; height: 187.238px; background: url(<path-to-image>) lightgray 50% / cover no-repeat;"
                                    @click="() => router.push('/product')"
                                />
                                <q-card-section
                                    vertical
                                    style="display: flex; flex-direction: column; align-items: flex-start; gap: 4px; flex: 1 0 0;"
                                >
                                    <div style="align-self: stretch; color: rgba(238, 13, 80, 0.80); font-family: Inter; font-size: 24px; font-style: normal; font-weight: 400; line-height: 38px;  text-decoration-line: strikethrough; text-decoration:line-through"
                                    >
                                        32.99 Lei
                                    </div>
    
                                    <div
                                        style="width: 150px; height: 96px; color: var(--green, #0CD496); font-family: Inter; font-size: 36px; font-style: normal; font-weight: 800; line-height: 48px; /* 133.333% */"
                                    >
                                        28.99 LEI
                                    </div>
                                    <div
                                        style="width: 150px; color: var(--blue1, #2563EB); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px; /* 142.857% */"
                                    >
    
                                    </div>
                                </q-card-section>
                            </q-card-section>
                            
                            <q-btn
                                label="Adauga in cos"
                                @click="() => addedToCart()"
                                style="display: flex; height: var(--Size-size-button-xl, 48px); padding: var(--Spacing-spacing-sm, 8px) var(--Spacing-spacing-lg, 16px); justify-content: center; align-items: center; gap: var(--Spacing-spacing-sm, 8px); align-self: stretch; border-radius: var(--Spacing-spacing-lg, 16px); background: var(--blue1, #2563EB); box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10);"
                            />
                        </q-card>
    
    
                        <q-card
                            bordered
                            style="display: flex; padding: 18px 16px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); border: 1px solid var(--color-border-info-muted, #60A5FA);background: #FFF;"
                            >
                                
                            <div class="text-h6" @click="() => router.push('/product')">Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg</div>
                            <q-card-section
                                horizontal
                                syle="display: flex; width: 334px; padding: 12px; align-items: center; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); background: rgba(255, 255, 255, 0.00);"
                            >
                                <q-img
                                    src="https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/sac_ciment.png?alt=media&token=fca04947-f2f5-433c-ace0-ad3b216c9465"
                                    style="width: 150px; height: 187.238px; background: url(<path-to-image>) lightgray 50% / cover no-repeat;"
                                    @click="() => router.push('/product')"
                                />
                                <q-card-section
                                    vertical
                                    style="display: flex; flex-direction: column; align-items: flex-start; gap: 4px; flex: 1 0 0;"
                                >
                                    <div style="align-self: stretch; color: rgba(238, 13, 80, 0.80); font-family: Inter; font-size: 24px; font-style: normal; font-weight: 400; line-height: 38px;  text-decoration-line: strikethrough; text-decoration:line-through"
                                    >
                                        32.99 Lei
                                    </div>
    
                                    <div
                                        style="width: 150px; height: 96px; color: var(--green, #0CD496); font-family: Inter; font-size: 36px; font-style: normal; font-weight: 800; line-height: 48px; /* 133.333% */"
                                    >
                                        28.99 LEI
                                    </div>
                                    <div
                                        style="width: 150px; color: var(--blue1, #2563EB); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px; /* 142.857% */"
                                    >
    
                                    </div>
                                </q-card-section>
                            </q-card-section>
                            
                            <q-btn
                                label="Adauga in cos"
                                @click="() => addedToCart()"
                                style="display: flex; height: var(--Size-size-button-xl, 48px); padding: var(--Spacing-spacing-sm, 8px) var(--Spacing-spacing-lg, 16px); justify-content: center; align-items: center; gap: var(--Spacing-spacing-sm, 8px); align-self: stretch; border-radius: var(--Spacing-spacing-lg, 16px); background: var(--blue1, #2563EB); box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10);"
                            />
                        </q-card>
    
                        <q-card
                            bordered
                            style="display: flex; padding: 18px 16px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); border: 1px solid var(--color-border-info-muted, #60A5FA);background: #FFF;"
                            >
                                
                            <div class="text-h6" @click="() => router.push('/product')">Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg</div>
                            <q-card-section
                                horizontal
                                syle="display: flex; width: 334px; padding: 12px; align-items: center; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); background: rgba(255, 255, 255, 0.00);"
                            >
                                <q-img
                                    src="https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/sac_ciment.png?alt=media&token=fca04947-f2f5-433c-ace0-ad3b216c9465"
                                    style="width: 150px; height: 187.238px; background: url(<path-to-image>) lightgray 50% / cover no-repeat;"
                                    @click="() => router.push('/product')"
                                />
                                <q-card-section
                                    vertical
                                    style="display: flex; flex-direction: column; align-items: flex-start; gap: 4px; flex: 1 0 0;"
                                >
                                    <div style="align-self: stretch; color: rgba(238, 13, 80, 0.80); font-family: Inter; font-size: 24px; font-style: normal; font-weight: 400; line-height: 38px;  text-decoration-line: strikethrough; text-decoration:line-through"
                                    >
                                        32.99 Lei
                                    </div>
    
                                    <div
                                        style="width: 150px; height: 96px; color: var(--green, #0CD496); font-family: Inter; font-size: 36px; font-style: normal; font-weight: 800; line-height: 48px; /* 133.333% */"
                                    >
                                        28.99 LEI
                                    </div>
                                    <div
                                        style="width: 150px; color: var(--blue1, #2563EB); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px; /* 142.857% */"
                                    >
    
                                    </div>
                                </q-card-section>
                            </q-card-section>
                            
                            <q-btn
                                label="Adauga in cos"
                                @click="() => addedToCart()"
                                style="display: flex; height: var(--Size-size-button-xl, 48px); padding: var(--Spacing-spacing-sm, 8px) var(--Spacing-spacing-lg, 16px); justify-content: center; align-items: center; gap: var(--Spacing-spacing-sm, 8px); align-self: stretch; border-radius: var(--Spacing-spacing-lg, 16px); background: var(--blue1, #2563EB); box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10);"
                            />
                        </q-card>
                        
                    </div>
                </q-scroll-area>
                <q-btn icon="chevron_right" @click="scrollRight" flat />
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
import { Notify } from 'quasar';

const router = useRouter();

const search = ref<string>('');

const slide = ref<number>(1);

const tab = ref<string>('1');

const isLogged = ref<boolean>(false);
isLogged.value = auth.currentUser !== null;

const addedToCart = () => {
    Notify.create({
        message: 'Produsul a fost adaugat in cos!',
        color: 'positive',
        position: 'top',
        timeout: 2000
    });
}

const position = ref<number>(0);
const scrollAreaRef = ref<any>(null);

const scrollLeft = () => {
    // scrollAreaRef.value.setScrollPosition('horizontal', -position.value, 300)
    // position.value = Math.floor(Math.random() * 1001) * 20
    const scrollDistance = 200; // Smaller scroll distance
    const scrollDuration = 500; // Slower scroll speed (500ms)
        
    // Calculate the new position by subtracting the scroll distance
    position.value -= scrollDistance;
    scrollAreaRef.value.setScrollPosition('horizontal', position.value, scrollDuration);

}


const scrollRight = () => {
    const scrollDistance = 200; // Smaller scroll distance
    const scrollDuration = 500; // Slower scroll speed (500ms)

    // Increase the position by the scroll distance
    position.value += scrollDistance;
    scrollAreaRef.value.setScrollPosition('horizontal', position.value, scrollDuration);
}

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
