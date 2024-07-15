<template>
    <q-page class="page-layout">
        <!-- Banner: Departments, Construction Mats, Offers --> 
         <!-- TODO: move above to layout -->
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
            style="display: flex; justify-content: flex-start; align-items: flex-start; gap: 20px; align-self: stretch; padding: 0px 3.42vh; margin-top: -15px"
        >
            <q-card
                bordered
                style="display: flex; width: auto; max-width: 40vw;
                padding: 24px 12px 24px 24px; flex-direction: column;
                align-items: flex-start; gap: 2.87vw; border-radius: 0px 0px 20px 20px;
                background-color: #FFF;
                background: #FFF;  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.10);"
            >
                <q-tab-panels 
                    v-model="tab" 
                    animated
                >
                <!-- TODO: change here measurement unit -->
                <q-tab-panel 
                    name="1"
                    style=" display: flex; width: 589px; padding: 24px 12px 24px 24px; 
                    flex-direction: column; align-items: flex-start; gap: 2.87vw;
                    border-radius: 0px 0px 20px 20px;
                    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.10);"
                >

                <q-card-section
                    style="display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 24px; align-self: stretch; height: 54.06vh"
                    horizontal
                    class="text-left"
                >
                    <q-card-section
                        style="display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
                        gap: 24px; align-self: stretch; margin-left: -50px; margin-top: -3.21vh; margin-bottom: -2.14vh"
                        vertical
                    >
                        <q-img
                            src="/src/assets/savings.png"
                            style="width: 14.8vw; height: 17.4vh; border-radius: 12px;"
                            fit="fill"
                        />

                        <q-img
                            src="/src/assets/fifty.png"
                            style="width: 14.8vw; height: 17.4vh; border-radius: 12px;"
                            fit="fill"
                        />

                        <q-img
                            src="/src/assets/garantid.png"
                            style="width: 14.8vw; height: 17.4vh; border-radius: 12px;"
                            fit="fill"
                        />
                    </q-card-section>
                        
                    <q-card-section
                        style="display: flex; flex-direction: column; justify-content: center;
                        align-items: flex-start; align-self: stretch; margin-left:-50px; margin-top: -35px;"
                        vertical
                        class="q-pl-xl"
                    >
                    
                        <!-- Old values: 14px / 12px -->
                        <div>
                            <div class="text-bold q-pt-lg" style="font-size: 1.45vh">
                                <i class="bi bi-bricks" /> Materiale de construcție
                            </div>
                            <div style="font-size: 1.45vh">Materiale durabile pentru zeci de ani</div>
                            <div style="font-size: 1.22vh">Lemn, feronerie, construcții, unelte ...</div>
                        </div>

                        <div>
                            <div class="text-bold q-pt-lg" style="font-size: 1.45vh">
                                <i class="bi bi-house" /> Casă
                            </div>
                            <div style="font-size: 1.45vh">Soluții complete pentru casa ta</div>
                            <div style="font-size: 1.22vh">Electrocasnice, baie, decorațiuni ...</div>
                        </div>

                        <div>
                            <div class="text-bold q-pt-lg" style="font-size: 1.45vh">
                                <i class="bi bi-tree" /> Grădină și exterior
                            </div>
                            <div style="font-size: 1.45vh">Tot ce ai nevoie pentru exterior</div>
                            <div style="font-size: 1.22vh">Grătare, terase, echipamente, mobilier ...</div>
                        </div>

                        <div>
                            <div class="text-bold q-pt-lg" style="font-size: 1.45vh">
                                <i class="bi bi-lightning-charge" /> Electrice și iluminat
                            </div>
                            <div style="font-size: 1.45vh">Eficiență energetică și iluminat modern</div>
                            <div style="font-size: 1.22vh">Electrocasnice, baie, decorațiuni ...</div>
                        </div>

                        <div>
                            <div class="text-bold q-pt-lg" style="font-size: 1.45vh">
                                <i class="bi bi-thermometer-sun" /> Instalații termice și sanitare
                            </div>
                            <div style="font-size: 1.45vh">Soluții pentru confortul tău zilnic</div>
                            <div style="font-size: 1.22vh">Încălzire, răcire, instalații sanitare ...</div>
                        </div>

                        <div>
                            <div class="text-bold q-pt-lg" style="font-size: 1.45vh">
                                <i class="bi bi-brush" /> Vopsea și finisaje
                            </div>
                            <div style="font-size: 1.45vh">Finisaje profesionale pentru orice</div>
                            <div style="font-size: 1.22vh">Vopseluri, lacuri, jaluzele, finisaje ...</div>
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
                style="height: 62.2vh; align-self: stretch;
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
            <q-card style="display: flex; align-items: center; gap: 10px;margin-top: 20px;">
                <q-icon size="sm">
                    <q-img style="display: flex; align-items: center;gap: 10px;" src="@/assets/tag.svg" />
                </q-icon>
                <div
                    style="color: var(--blue1, #2563EB); text-align: center;  font-family: Inter; font-size: 12px; font-style: normal; font-weight: 500; line-height: 16px; /* 133.333% */"
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
                style="display: flex; align-items: center; gap: 25px; margin-top: 2vh;"
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
    
                <q-scroll-area 
                    :visible="false"
                    style="height: 403px; max-width: 100vw; display: flex; align-items: flex-start; gap: 16px; flex: 1 0 0; box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);" ref="scrollAreaRef"
                >
                    <div class="row no-wrap" style="display: flex; gap: 25px;">
                        <!-- <div v-for="index in 15" :key="index" class="product-item"> -->
                            <!-- Caramida -->
                            <q-card
                                bordered
                                style="width:100%; display: flex; padding: 18px 16px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); border: 1px solid var(--color-border-info-muted, #60A5FA);background: #FFF; text-align: left;"
                                >
                                    
                                <div class="text-h6" @click="() => router.push('/product')">Caramida interior / exterior, rosii, 10 tone. </div>
                                <q-card-section
                                    horizontal
                                    syle="display: flex; width: 334px;padding: 12px; align-items: center; justify-content: space-between; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px);"
                                >
                                    <q-img
                                        src="https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/caramida_Bg.png?alt=media&token=23f0f3f0-1169-4c8c-bcfb-8007a5774945"
                                        style="width: 17vh; height: 20vh;"
                                        fit="contain"
                                        @click="() => router.push('/product')"
                                    />
                                    <q-card-section
                                        vertical
                                        style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; flex: 1 0 0; height:auto;"
                                    >
                                        <div style="align-self: stretch; color: rgba(238, 13, 80, 0.80); font-family: Inter; font-size: 2vh; font-style: normal; font-weight: 400; line-height: 38px;  text-decoration-line: strikethrough; text-decoration:line-through; text-align: center;"
                                        >
                                            32.99 Lei
                                        </div>
        
                                        <div
                                            style="width: 150px; height: 96px; color: var(--green, #0CD496); font-family: Inter; font-size: 36px; font-style: normal; font-weight: 800; line-height: 48px; text-align: center;"
                                        >
                                            28.99 LEI
                                        </div>
                                        <div
                                            style="width: 150px; color: var(--blue1, #2563EB); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px; text-align: center;"
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
                            <!-- Copper cable -->
                            <q-card
                                bordered
                                style="width:100%; display: flex; padding: 18px 16px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); border: 1px solid var(--color-border-info-muted, #60A5FA);background: #FFF; text-align: left;"
                            >
                                
                            <div class="text-h6" @click="() => router.push('/product')"> Cablu electric litat MYF (1.5MM-100M./rola)  </div>
                            <q-card-section
                                horizontal
                                syle="display: flex; width: 334px; padding: 12px; align-items: center; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); background: rgba(255, 255, 255, 0.00);"
                            >
                                <q-img
                                    src="https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/cablu_cupru-removebg-preview.png?alt=media&token=5c30e3f7-5330-4236-9171-06b478367824"
                                    style="width: 150px; height: 200px;"
                                    fit="contain"
                                    @click="() => router.push('/product')"
                                />
                                <q-card-section
                                    vertical
                                    style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; flex: 1 0 0; height:auto;"
                                >
                                    <div style="align-self: stretch; color: rgba(238, 13, 80, 0.80); font-family: Inter; font-size: 24px; font-style: normal; font-weight: 400; line-height: 38px;  text-decoration-line: strikethrough; text-decoration:line-through;
                                    text-align: center;"
                                    >
                                        32.99 Lei
                                    </div>
    
                                    <div
                                        style="width: 150px; height: 96px; color: var(--green, #0CD496); font-family: Inter; font-size: 36px; font-style: normal; font-weight: 800; line-height: 48px; text-align: center;"
                                    >
                                        28.99 LEI
                                    </div>
                                    <div
                                        style="width: 150px; color: var(--blue1, #2563EB); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px; text-align: center;"
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
                            <!-- Wood -->
                            <q-card
                            bordered
                            style="width:100%; display: flex; padding: 18px 16px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); border: 1px solid var(--color-border-info-muted, #60A5FA);background: #FFF; text-align: left;"
                            >
                                
                            <div class="text-h6" @click="() => router.push('/product')"> Lemne de foc paletizate, 0.8 mc, fag, 1.2 m x 1.45 m  </div>
                            <q-card-section
                                horizontal
                                syle="display: flex; width: 334px; padding: 12px; align-items: center; justify-content: space-between; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); background: rgba(255, 255, 255, 0.00);"
                            >
                                <q-img
                                    src="https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/paleti_lemn-removebg-preview.png?alt=media&token=09faa330-6682-42f6-a79c-51bba2f01ef1"
                                    style="width: 150px; height: 200px;"
                                    fit="contain"
                                    @click="() => router.push('/product')"
                                />
                                <q-card-section
                                    vertical
                                    style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; flex: 1 0 0; height:auto;"
                                >
                                    <div style="align-self: stretch; color: rgba(238, 13, 80, 0.80); font-family: Inter; font-size: 24px; font-style: normal; font-weight: 400; line-height: 38px;  text-decoration-line: strikethrough; text-decoration:line-through; text-align: center;"
                                    >
                                        32.99 Lei
                                    </div>
    
                                    <div
                                        style="width: 150px; height: 96px; color: var(--green, #0CD496); font-family: Inter; font-size: 36px; font-style: normal; font-weight: 800; line-height: 48px; text-align: center;"
                                    >
                                        28.99 LEI
                                    </div>
                                    <div
                                        style="width: 150px; color: var(--blue1, #2563EB); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px; text-align: center;"
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
                            <!-- BCA -->
                            <q-card
                                bordered
                                style="width:100%; display: flex; padding: 18px 16px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); border: 1px solid var(--color-border-info-muted, #60A5FA);background: #FFF; text-align: left;"
                                >
                                    
                                <div class="text-h6" @click="() => router.push('/product')">BCA Ytong Design, 599 x 75 x 199 mm (LxGxH)</div> 
                                <q-card-section
                                    horizontal
                                    syle="display: flex; width: 334px; padding: 12px; align-items: center; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px);"
                                >
                                    <q-img
                                        src="https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/BCA-removebg-preview.png?alt=media&token=5ec49478-ce72-4177-87e5-6be5e5ce2b4f"
                                        style="width: 150px; height: 200px;"
                                        fit="contain"
                                        @click="() => router.push('/product')"
                                    />
                                    <q-card-section
                                        vertical
                                        style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; flex: 1 0 0; height:auto;"
                                    >
                                        <div style="align-self: stretch; color: rgba(238, 13, 80, 0.80); font-family: Inter; font-size: 24px; font-style: normal; font-weight: 400; line-height: 38px;  text-decoration-line: strikethrough; text-decoration:line-through; text-align: center;"
                                        >
                                            32.99 Lei
                                        </div>
        
                                        <div
                                            style="width: 150px; height: 96px; color: var(--green, #0CD496); font-family: Inter; font-size: 36px; font-style: normal; font-weight: 800; line-height: 48px; text-align: center;"
                                        >
                                            28.99 LEI
                                        </div>
                                        <div
                                            style="width: 150px; color: var(--blue1, #2563EB); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px; text-align: center;"
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
                            <!-- Ciment -->
                            <q-card
                                bordered
                                style="width:100%; display: flex; padding: 18px 16px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); border: 1px solid var(--color-border-info-muted, #60A5FA);background: #FFF; text-align: left;"
                                >
                                    
                                <div class="text-h6" @click="() => router.push('/product')">Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg</div>
                                <q-card-section
                                    horizontal
                                    syle="display: flex; width: 334px; padding: 12px; align-items: center; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px);"
                                >
                                    <q-img
                                        src="https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/sac_ciment.png?alt=media&token=fca04947-f2f5-433c-ace0-ad3b216c9465"
                                        style="width: 150px; height: 200px;"
                                        fit="contain"
                                        @click="() => router.push('/product')"
                                    />
                                    <q-card-section
                                        vertical
                                        style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; flex: 1 0 0; height:auto;"
                                    >
                                        <div style="align-self: stretch; color: rgba(238, 13, 80, 0.80); font-family: Inter; font-size: 24px; font-style: normal; font-weight: 400; line-height: 38px;  text-decoration-line: strikethrough; text-decoration:line-through; text-align: center;"
                                        >
                                            32.99 Lei
                                        </div>
        
                                        <div
                                            style="width: 150px; height: 96px; color: var(--green, #0CD496); font-family: Inter; font-size: 36px; font-style: normal; font-weight: 800; line-height: 48px; text-align: center;"
                                        >
                                            28.99 LEI
                                        </div>
                                        <div
                                            style="width: 150px; color: var(--blue1, #2563EB); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px; text-align: center;"
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
                        
                    <!-- </div> -->
                </q-scroll-area>
                <q-btn icon="chevron_right" @click="scrollRight" flat />
            </q-card-section>

            <q-card-section
                vertical
                style="display: flex; flex-direction: column; align-items: flex-start; gap: 25px; align-self: stretch; margin-top: 20px"
            >
                <div
                    style="color: var(--color-icon, #18181B); font-family: Inter; font-size: 48px; font-style: normal; font-weight: 600; line-height: 58px;"
                >
                    Cele mai noi oferte!
                </div>

                <q-card-section
                    horizontal
                    style="display: flex; height: 179px; align-items: flex-start; gap: 18px; align-self: stretch;"
                >
                    <q-img 
                        style="border-radius: 12px; background: url(https://s3-alpha-sig.figma.com/img/fe12/e799/6abe41e3c7ba5875257da4409c2d86e9?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Qnihks~Q4puxrvoZt8K2RXluw1StvuqZ6l5jwbuslhjIDHIgdWxdL5Af5~NhkhpD1ypI-MJAarddfxB0ZrRgqM2WMRbjgqOGvE6vHUI5XLr5DbdhU2Z6QQwWIhvR9vzuW-Ak8FzC34ZX86EpWmwGoyImVxs6RFpMLprj9aj-~-hE5LLBbCWAgF7dlKX89s-wZK47DsmSuVJ9vMX29LFIORlL5aDFIShl9alLax03~iUbpcDCzAryPq9HRNiOHpsuJmGYzjXW4o9tiwd35~L6GJO0m9F-h7ser7PCE6vONryl0ncJWggAHGOq~hVOi1MqpvrbsOnN-3P23qlS5tyKqA__) lightgray 0px 0.504px / 141.955% 100.078% no-repeat; box-shadow: 0px 4px 6px -4px rgba(16, 24, 40, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10); flex: 1 0 0; align-self: stretch; height: 130%;"
                        fit="contain"
                    />

                    <q-img
                        style="border-radius: 12px; background: url(https://s3-alpha-sig.figma.com/img/94ba/210c/303a0fd9aab220e6b269a967c1ad8295?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HG~i7bXImAyAxpSsrG1NnXky8H0qfX4JFTeqRCj29fIy19DALFJLv5SrBjF9a~rRSPvZBvPcBzEkjLbrjYF~1DHWlpbjURVgzKLifQi~H0sgfkhLYnV1J0YCXjTaVp17gS4lNE-ONaCYBcj2p0GIpURNBqIP7ZZCwLUfihMnx16jMuzaMGRWs29OS7zykyW5yOPSUXF4j26M1B-slEtZkDQhL~bh74Y0f~NB~va08H3u2xzYSqYO01-aNsFX2Ue~2PqAkeLo1AQfJbU0JkgXtyFAHhNQO6pX00~rTFQmnGVZlyKw2JfK9S33m7eX7TJiey-LUe4AZZjjRIdqrsYDjQ__) lightgray 0px -0.688px / 171.875% 102.412% no-repeat; box-shadow: 0px 4px 6px -4px rgba(16, 24, 40, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10); flex: 1 0 0; align-self: stretch; height: 130%;"
                        fit="contain"/>
                    
                    <q-img
                        style="border-radius: 12px; background: url(https://s3-alpha-sig.figma.com/img/4c25/2a18/5c0a41b2e711af6b442077dd4171386c?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aQBsYsyVnDdpwchxzzuu8TJcUXR1P~ixdiNhmitxAsAloMhdHMQSe9lxLqxl69IKGMasfmnmJdJPhZvAkGF7f2~NRESy4cPy0BvbP5s3z6NRfWKBlB28JoYCD2uuWFlKXBNkcqMi4bvTNxGis2vn0aQp84IGJQTD0DJpGcSF2dkX3DGl4Ri2QGo6j1N1RTSEMFYTWyXc1epTG8~hufqSDzOWC4Lu29NYKcOpZC0TWNI6jqhLrt5XKt4d6J4Xa0UIscLbAe4C14cybSqnHuTCGg0VA5tdugwawcyBeLYZxRDdOsM5zKOliiW3ObEIKjmkpx9Hl3JXrAZRaGto4IZCcQ__) lightgray -11.296px -6.63px / 205.268% 111.613% no-repeat; box-shadow: 0px 4px 6px -4px rgba(16, 24, 40, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10); flex: 1 0 0; align-self: stretch; height: 130%;"
                        fit="contain"
                    />


                </q-card-section>

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
    const scrollDistance = 200; // Smaller scroll distance
    const scrollDuration = 500; // Slower scroll speed (500ms)
        
    // Calculate the new position by subtracting the scroll distance
    if(position.value > 0) {
        position.value -= scrollDistance;
        scrollAreaRef.value.setScrollPosition('horizontal', position.value, scrollDuration);
    }

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
