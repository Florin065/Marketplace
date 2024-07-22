<template>
    <q-page class="page-layout">
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

        <!-- TODO: Stuff above will be the layout for all pages. Below will be the content of the page. -->
        <q-card-section
            horizontal
            style="display: flex; height: 832px; padding: 10px 0px; align-items: center; gap: 10px; flex-shrink: 0; align-self: stretch;"
        >
            <!-- Photos on the left -->
            <q-card-section
                vertical
                style="display: flex; width: 700px; flex-direction: column; align-items: flex-start; gap: 10px; align-self: stretch; border-radius: 28px 0px 0px 28px;"
            >
                <q-img
                    :src="product.images[imgTab]"
                    style="width: 700px; height: 700px; border-radius: 28px 0px 0px 28px;"
                    fit="contain"
                />

                <q-card-section
                    horizontal
                    style="display: flex; height: 200px; justify-content: center; align-items: center; gap: 30px; align-self: stretch;"
                >

                    <q-tabs v-model="imgTab">
                        <q-tab v-for="(img, index) in product.images" :key="index" :name="index">
                            <q-img :src="img" style="width: 100px; height: 100px; border-radius: 6px; background: url(<path-to-image>) lightgray 50% / cover no-repeat;"/>
                        </q-tab>
                    </q-tabs>
                    
                </q-card-section>

                
            </q-card-section>
            
            <!-- Details on the right -->
            <q-card-section
                vertical
                style="display: flex; padding: 0px 30px; flex-direction: column; align-items: flex-start; gap: 24px; flex: 1 0 0; align-self: stretch;"
            >
                
                <!-- Name -->
                <div
                    class="text-left" 
                    style="color: var(--color-text, #09090B); font-family: Inter; font-size: 30px; font-style: normal; font-weight: 700; line-height: 42px; align-self: stretch;">
                    {{ product.name }}
                </div>
                
                <!-- Description -->
                <q-card-section
                    horizontal
                    style="display: flex; align-items: center; gap: 30px; align-self: stretch;"
                >
                    <q-card-section
                        vertical
                        styl="display: flex; width: 324px; flex-direction: column; align-items: flex-start; gap: 24px; align-self: stretch;"
                    >
                
                        <!-- Dimension -->
                        <q-card-section
                            vertical
                            style="display: flex; flex-direction: column; align-items: center; gap: 12px; align-self: stretch;"
                        >
                        
                            <div style="color: var(--color-text, #09090B); font-family: Inter; font-size: 24px; font-style: normal; font-weight: 500; line-height: 38px; "> Dimensiune </div>
                        
                            <q-card-section
                                horizontal
                                style="display: flex; justify-content: center; align-items: center; align-content: center; gap: 12px; align-self: stretch; flex-wrap: wrap; max-width: 324px;"
                                >
                                
                                <q-btn
                                    v-for="dimension in product.dimensions"
                                    :label="dimension"
                                    style="display: flex; height: var(--Size-size-input-lg, 44px);
                                      width: 72px;
                                      padding: var(--Spacing-spacing-sm, 8px) var (--Spacing-spacing-lg, 16px);
                                      align-items: center; gap: var(--Spacing-spacing-sm, 8px); border-radius: var(--Radii-radius-input, 6px);
                                      border: 1px solid var(--color-border-info-muted, #60A5FA); background: var(--color-bg, #FFF);
                                      box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);"
                                />

                            </q-card-section>
                        </q-card-section>

                        <!-- Quantity -->
                        <q-card-section
                            vertical
                            style="display: flex; height: 88px; flex-direction: column; align-items: center; gap: var(--Spacing-spacing-md, 12px); align-self: stretch;"
                        >

                            <div
                                style="width: 115px; color: var(--color-text, #09090B); font-family: Inter; font-size: 20px; font-style: normal; font-weight: 600; line-height: 32px;"
                            >
                                Cantitate
                            </div>

                            <q-card-section
                                horizontal
                                style = "display: flex; align-items: flex-start; gap: 12px; align-self: stretch; max-width: 324px;"
                            >
                        
                                <q-btn 
                                    label="-"
                                    style="display: flex; height: var(--Size-size-input-lg, 44px); padding: var(--Spacing-spacing-sm, 8px) var(--Spacing-spacing-lg, 16px); align-items: center; gap: var(--Spacing-spacing-sm, 8px); border-radius: var(--Radii-radius-input, 6px); border: 1px solid var(--color-border, #E4E4E7); background: var(--color-bg, #FFF); box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);" @click="() => decreaseQuantity()"/>
                                
                                <div
                                    style="display: flex; height: var(--Size-size-input-lg, 44px); padding: var(--Spacing-spacing-sm, 8px) var(--Spacing-spacing-xl, 24px); justify-content: center; align-items: center; gap: var(--Spacing-spacing-sm, 8px); flex: 1 0 0;border-radius: var(--Radii-radius-input, 6px); border: 1px solid var(--color-border, #E4E4E7); background: var(--color-bg, #FFF); box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);"
                                    
                                >
                                    <q-input
                                        v-model="quantity"
                                        style="display: flex; align-items: center; overflow: hidden; color: var(--color-icon-muted, #71717A); text-overflow: ellipsis; font-family: Inter; font-size: 20px; font-style: normal; font-weight: 500; line-height: 32px; max-width: 80px"
                                        outlined
                                        dense
                                    />

                                    <div
                                        style="overflow: hidden; color: var(--color-text-disabled, #A1A1AA); text-overflow: ellipsis; font-family: Inter; font-size: 14px; font-style: normal; font-weight: 400; line-height: 20px;"
                                    >
                                        sac
                                    </div>

                                </div>

                                <q-btn 
                                    label="+"
                                    style="display: flex; height: var(--Size-size-input-lg, 44px); padding: var(--Spacing-spacing-sm, 8px) var(--Spacing-spacing-lg, 16px); align-items: center; gap: var(--Spacing-spacing-sm, 8px); border-radius: var(--Radii-radius-input, 6px); border: 1px solid var(--color-border, #E4E4E7); background: var(--color-bg, #FFF); box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);" @click="() => increaseQuantity()"/>
                                
                            </q-card-section>

                        </q-card-section>

                    </q-card-section>

                    <!-- Delivery and Return-->
                    <q-card-section
                        vertical
                        style="display: flex; padding: var(--Spacing-spacing-md, 12px) 0px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 12px; align-self: stretch;"
                    >
                        <!-- Delivery -->
                        <q-card-section
                            horizontal
                            style="display: flex; align-items: center; gap: 30px; align-self: stretch;"
                        >

                            <div
                                style="display: flex; align-items: center; gap: 12px; align-self: stretch;"
                            >
                                <q-card style="display: flex; padding: 6px; align-items: center; gap: 10px; align-self: stretch; border-radius: 6px; background: var(--blue1, #2563EB);">
                                    <q-icon size="sm">
                                        <q-img src="@/assets/truck.svg"/>
                                    </q-icon>
                                </q-card>

                                <q-card-section
                                    vertical
                                    style="display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 6px;"
                                >
                                    <div
                                        style="color: var(--color-icon-muted, #71717A); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px; /* 142.857% */"
                                    >
                                        Livrat de Firma S.R.L.
                                    </div>

                                    <q-card-section
                                        horizontal
                                        style="display: flex; align-items: center; gap: 6px;"
                                    >

                                        <div style="color: var(--color-icon-muted, #71717A); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px; /* 142.857% */">

                                            pana la data de
                                        </div>

                                        <div
                                            style="color: var(--color-icon-interactive, #2563EB); font-family: Inter; font-size: 16px; font-style: normal; font-weight: 600; line-height: 24px; /* 150% */"
                                        >
                                            08 iulie.
                                        </div>

                                    </q-card-section>

                                </q-card-section>
                            </div>
                            </q-card-section>


                            <!-- Return -->
                            <q-card-section
                                horizontal
                                style="display: flex; align-items: center; gap: 12px; align-self: stretch;"
                            >
                                <q-card
                                    style="display: flex; padding: 6px; align-items: center; gap: 10px; align-self: stretch; border-radius: 6px; background: var(--blue1, #2563EB);"
                                >
                                    <q-icon size="sm">
                                        <q-img src="@/assets/star.svg"/>
                                    </q-icon>
                                </q-card>

                                <q-card-section
                                    vertical
                                    style="display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 6px;"
                                >
                                    <div 
                                        style = "color: var(--color-icon-muted, #71717A); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px; /* 142.857% */"
                                    >
                                        Retur Gratuit în <span style="color: var(--color-icon, #18181B); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px;">30 zile.</span> <q-icon size="sm"><q-img src="@/assets/document.svg"/></q-icon>
                                    </div>

                                    <div 
                                        style = "color: var(--color-icon-muted, #71717A); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px; /* 142.857% */"
                                    >
                                        Garantie inclusa  <span style="color: var(--color-icon, #18181B); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px;">12 luni.</span> <q-icon size="sm"><q-img src="@/assets/document.svg"/></q-icon>
                                    </div>
                                </q-card-section>

                        </q-card-section>
                    </q-card-section>

                    <!-- Price -->
                    <q-card-section
                        vertical
                        style="display: flex; flex-direction: column; align-items: center; gap: 12px; flex: 1 0 0; align-self: stretch;"
                    >
                        <!-- Discount -->
                        <q-card-section
                            vertical
                            style="display: flex; justify-content: center; align-items: center; align-content: center; gap: 0px 10px; align-self: stretch;flex-wrap: wrap;"
                        >

                            <div
                                style="color: rgba(238, 13, 80, 0.80); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 600; line-height: 20px;"
                            >
                                {{ product.oldPrice}}
                            </div>

                            <div
                                style="color: var(--color-icon, #18181B); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px;"
                            >
                                Economisește {{ product.discount }}%
                            </div>
                            
                            <div
                                style="color: var(--color-text-disabled, #A1A1AA); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 400; line-height: 20px;"
                            >
                            0,72 LEI/kg TVA inclus
                            </div>
                        
                        </q-card-section>

                        <!-- Price -->
                        <q-card-section
                            vertical
                            style="display: flex; justify-content: center; align-items: center; align-content: center; gap: 0px 12px; align-self: stretch; flex-wrap: wrap;;"
                        >
                            <div
                                style="color: var(--green, #0CD496); font-family: Inter; font-size: 36px; font-style: normal; font-weight: 800; line-height: 48px;"
                            >
                                {{ product.price }}
                            </div>

                            <div
                                style="color: var(--green, #0CD496); font-family: Inter; font-size: 20px; font-style: normal; font-weight: 600; line-height: 32px;"
                            >
                                {{ product.currency }}/sac
                            </div>
                        </q-card-section>

                        <q-btn
                            style="display: flex; padding: var(--Spacing-spacing-sm, 8px) var(--Spacing-spacing-lg, 16px); justify-content: center; align-items: center; gap: var(--Spacing-spacing-sm, 8px); flex: 1 0 0; align-self: stretch; border-radius: var(--Spacing-spacing-sm, 8px); border: 1px solid var(--color-text-onColor, #FFF); background: var(--green, #0CD496);"
                        > 
                        
                            <div
                                style="color: var(--color-text-onColor, #FFF); font-family: Inter; font-size: 16px; font-style: normal; font-weight: 600; line-height: 24px;"
                                @click = "() => addedToCart()"
                            >
                                Adaugă în coș
                            </div>
                            <q-icon size="md">
                                <q-img src="@/assets/shopping-cart.svg"></q-img>
                            </q-icon>

                        </q-btn>

                    </q-card-section>

                </q-card-section>

                <!-- Product details -->
                <q-card
                    vertical
                    style="display: flex; padding: 20px; flex-direction: column; align-items: flex-start; gap: 24px; flex: 1 0 0; align-self: stretch; border-radius: 28px; background: var(--color-bg, #FFF); box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);"
                >
                    <q-tabs
                        v-model="productTabs"
                        inline-label
                        :breakpoint="0"
                        align="justify"
                        style="display: flex; padding: var(--Spacing-spacing-2xs, 4px); justify-content: space-between; align-items: center; align-self: stretch; border-radius: var(--Radii-radius, 6px); background: var(--color-bg-subtle, #FAFAFA);"
                    >
                        <q-tab name="1" label="Recenzii" />
                        <q-tab name="2" label="Descriere" />
                        <q-tab v-if="$q.screen.gt.sm" name="3" label="Ghiduri" />
                        <q-tab v-if="$q.screen.gt.sm" name="4" label="Specificatii Tehnice" />
                    </q-tabs>
                    <q-tab-panels animated v-model="productTabs">

                        <q-tab-panel
                            name="1"
                            style="display: flex; flex-direction: column; align-items: flex-start; gap: 12px; flex: 1 0 0;"
                        >
                        
                            <div
                                style="align-self: stretch; color: var(--color-text, #09090B); font-family: Inter; font-size: 20px; font-style: normal; font-weight: 600; line-height: 32px;"
                            >
                                Recenzii
                            </div>
                        
                        </q-tab-panel>

                        <q-tab-panel
                            name="2"
                            style="display:flex; flex-direction: column; align-items: flex-start; gap: 12px; flex: 1 0 0;"
                        >
                            <div
                                style="align-self: stretch; color: var(--color-text, #09090B); font-family: Inter; font-size: 20px; font-style: normal; font-weight: 600; line-height: 32px;"
                            >
                                Descriere produs
                            </div>

                            <!-- Descrierea produsului, luata din DB -->
                             <!-- TODO: Add description into product -->
                            <q-scroll-area style="height: 178px; align-self: stretch; overflow-y: auto; width: 55vw;">
                                <div
                                    style="align-self: stretch; color: var(--color-text, #09090B); font-family: Inter; font-size: 16px; font-style: normal; font-weight: 600; line-height: 24px; text-align: left;"
                                >
                                    Cimentul Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild este recomandat pentru betoane simple si armate, rezistent la inghet-dezghet, avand domenii de utilizare precum:
                                    <br/>
                                    <br/>
                                    - constructii civile si industriale: fundatii, stalpi, grinzi, diafragme, pereti interiori si exteriori, plansee, scari, camasuieli, estacade si canale pentru conducte, centuri, subzidiri, egalizari, etc.
                                    <br/>
                                    <br/>
                                    - lucrari de arta: culei, pile, predale, suprabetonari, chesoane, fundatii etc.;
                                    <br/>
                                    <br/>
                                    - prefabricate: elemente de fundatii, stalpi, grinzi, stalpi centrifugati si vibrati pentru LEA 0.4KV, dale, pavele, borduri, elemente de planseu, chesoane, tuburi de canalizare, boltari, placi si stalpi de gard, elemente de peroane CF, elemente spatiale tip camera, elemente de atic, ornamente arhitecturale etc.
                                </div>

                            </q-scroll-area>

                        </q-tab-panel>

                        <q-tab-panel
                            name="3"
                            style="display: flex; flex-direction: column; align-items: flex-start; gap: 12px; flex: 1 0 0;"
                        >
                    
                            <div
                                style="align-self: stretch; color: var(--color-text, #09090B); font-family: Inter; font-size: 20px; font-style: normal; font-weight: 600; line-height: 32px;"
                            >
                                Ghiduri
                            </div>

                            <div>
                                Cimentul Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild este recomandat pentru betoane simple si armate, rezistent la inghet-dezghet, avand domenii de utilizare precum:

                                constructii civile si industriale: fundatii, stalpi, grinzi, diafragme, pereti interiori si exteriori, plansee, scari, camasuieli, estacade si canale pentru conducte, centuri, subzidiri, egalizari, etc.

                                lucrari de arta: culei, pile, predale, suprabetonari, chesoane, fundatii etc.;

                                prefabricate: elemente de fundatii, stalpi, grinzi, stalpi centrifugati si vibrati pentru LEA 0.4KV, dale, pavele, borduri, elemente de planseu, chesoane, tuburi de canalizare, boltari, placi si stalpi de gard, elemente de peroane CF, elemente spatiale tip camera, elemente de atic, ornamente arhitecturale etc.

                            </div>

                        </q-tab-panel>

                        <q-tab-panel
                            name="4"
                            style="display: flex; flex-direction: column; align-items: flex-start; gap: 12px; flex: 1 0 0;"
                        >

                            <div
                                style="align-self: stretch; color: var(--color-text, #09090B); font-family: Inter; font-size: 20px; font-style: normal; font-weight: 600; line-height: 32px;"
                            >
                                Descriere produs
                            </div>

                        </q-tab-panel>
                    </q-tab-panels>
                    
                </q-card> 
                <q-card-section
                    horizontal
                    style="display: flex; justify-content: center; align-items: center; gap: 12px; align-self: stretch;"
                >
                    <q-btn
                        label="Adauga la favorite"
                        icon="favorite"
                        style="display: inline-flex; align-items: center; gap: 4px;"
                        @click="() => addedToFav()"
                    />
 
                    <q-btn
                        label="Alerta pret"
                        icon="notifications"
                        style="display: inline-flex; align-items: center; gap: 4px;"
                        @click="() => Alerta()"
                    />
 
                    <q-btn
                        label="Distribuie"
                        icon="share"
                        style="display: inline-flex; align-items: center; gap: 4px;"
                        @click="() => Share()"
                    />
                </q-card-section>
            
        </q-card-section>
    </q-card-section>

    <!-- Bought together -->
    <q-card-section
        vertical
        style="display: flex; flex-direction: column; align-items: flex-start; gap: 25px; align-self: stretch;"
    >
        <q-card-section
            vertical
            style="display: flex; flex-direction: column; align-items: flex-start; gap: 12px;"
        >
        
            <q-card-section
                horizontal
                style="display: flex; align-items: center; gap: 25px; align-self: stretch;"
            >
            
                <div style="color: var(--color-icon, #18181B); font-family: Inter; font-size: 30px; font-style: normal; font-weight: 600; line-height: 42px;">Cumpărate des împreună</div>
        
                <q-btn
                    style="display: flex; align-items: center; gap: 6px; align-self: stretch;"
                    flat
                    @click="() => hiddenBoughtTogether = !hiddenBoughtTogether"
                >

                    <q-icon :class="hiddenBoughtTogether ? 'bi bi-eye' : 'bi bi-eye-slash'" size="12px"/>
                    <div v-if="hiddenBoughtTogether" style="margin-left: 6px;color: var(--color-text-disabled, #A1A1AA); font-family: Inter; font-size: 12px; font-style: normal; font-weight: 400; line-height: 16px;"> Afiseaza</div>
                    <div v-else style="margin-left: 6px;color: var(--color-text-disabled, #A1A1AA); font-family: Inter; font-size: 12px; font-style: normal; font-weight: 400; line-height: 16px;"> Ascunde</div>

                </q-btn>
                
            </q-card-section>

            <q-card-section
                horizontal
                style="display: flex; height: 42px; align-items: flex-start; gap: 12px;"
            >
        
                <q-btn
                    v-for="prod in product.together"
                    style="display: flex; padding: var(--Spacing-spacing-2xs, 4px) var(--Spacing-spacing-sm, 8px); justify-content: center; align-items: center; gap: var(--Spacing-spacing-2xs, 4px); align-self: stretch; border-radius: var(--Radii-radius, 6px); border: 1px solid var(--blue-light, rgba(37, 99, 235, 0.30)); background: var(--color-bg, #FFF);"
                    :label="prod"
                />
        
            </q-card-section>
        </q-card-section>
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
                    
                        <q-card
                            v-for="prod in product.boughtTogether"
                            bordered
                            style="width:100%; display: flex; padding: 18px 16px; flex-direction: column; justify-content: center; align-items: flex-start; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px); border: 1px solid var(--color-border-info-muted, #60A5FA);background: #FFF; text-align: left;"
                        >
                    
                            <div class="text-h6" @click="prod.func"> {{ prod.label }} </div>
                            <q-card-section
                                horizontal
                                syle="display: flex; width: 334px; padding: 12px; align-items: center; gap: 10px; border-radius: var(--Spacing-spacing-2xl, 32px);"
                            >

                                <q-img
                                    :src="prod.image.src"
                                    :style="prod.image.style"
                                    :fit="prod.image.fit"
                                    @click="prod.func"
                                />

                                <q-card-section
                                    vertical
                                    style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; flex: 1 0 0; height:auto;"
                                >
                                    <div style="align-self: stretch; color: rgba(238, 13, 80, 0.80); font-family: Inter; font-size: 2vh; font-style: normal; font-weight: 400; line-height: 38px;  text-decoration-line: strikethrough; text-decoration:line-through; text-align: center;"
                                    > {{ prod.price }} </div>

                                    <div
                                            style="width: 150px; height: 96px; color: var(--green, #0CD496); font-family: Inter; font-size: 36px; font-style: normal; font-weight: 800; line-height: 48px; text-align: center;"
                                        > {{ prod.discount }} {{ prod.currency }} </div>

                                </q-card-section>
                            </q-card-section>

                            <q-btn
                                class="add-to-cart-btn"
                                label="Adauga in cos"
                                @click="() => addedToCart()"
                            />
                        </q-card>
                    
                    </div>
                </q-scroll-area>
                <q-btn icon="chevron_right" @click="scrollRight" flat />
            </q-card-section>

    </q-card-section>

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

const isLogged = ref<boolean>(false);
isLogged.value = auth.currentUser !== null;

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

const addedToCart = () => {
    Notify.create({
        message: 'Produsul a fost adaugat in cos!',
        color: 'positive',
        position: 'top',
        timeout: 2000
    });
}

const addedToFav = () => {
    Notify.create({
        message: 'Produsul a fost adaugat la favorite!',
        color: 'yellow',
        textColor: 'black',
        position: 'top',
        timeout: 2000
    });
}

const Alerta = () => {
    Notify.create({
        message: 'Alerta de pret a fost setata!',
        color: 'primary',
        position: 'top',
        timeout: 2000
    });
}

const Share = () => {
    Notify.create({
        message: 'Produsul a fost distribuit!',
        color: 'positive',
        position: 'top',
        timeout: 2000
    });
}

const increaseQuantity = () => {
    quantity.value++;
}

const decreaseQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
}

const quantity = ref<number>(1);

const tab = ref<string>('1');
const productTabs = ref<string>('2');

const hiddenBoughtTogether = ref<boolean>(false);


const product = {
    SKU: 1,
    name: "Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40 kg",
    images: ["https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/ciment2.png?alt=media&token=5394417a-2fc2-4eb6-ab64-5fe63cb4a48e", "https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/cablu_cupru-removebg-preview.png?alt=media&token=5c30e3f7-5330-4236-9171-06b478367824", "https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/sac_ciment.png?alt=media&token=fca04947-f2f5-433c-ace0-ad3b216c9465", "https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/paleti_lemn-removebg-preview.png?alt=media&token=09faa330-6682-42f6-a79c-51bba2f01ef1"],
    price: 28.99,
    oldPrice: 32.99,
    discount: 12.5,
    currency: "LEI",
    dimensions: ["20 kg", "30 kg","40 kg", "50 kg"],
    together: ["Produse complementare", "Betoniere", "Unelte si accesorii"],
    boughtTogether : [
    {
        SKU: 1,
        label: "Caramida interior / exterior, rosii, 10 tone.",
        price: 32.99,
        discount: 28.99,
        currency: "LEI",
        image: {
            src: "https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/caramida_Bg.png?alt=media&token=23f0f3f0-1169-4c8c-bcfb-8007a5774945",
            style: "width: 9vw; height: 20vh;",
            fit: "contain"
        },
        func: () => router.push('/product/1'),
    },
    {
        SKU: 2,
        label: "Cablu electric litat MYF (1.5MM-100M./rola)",
        price: 32.99,
        discount: 28.99,
        image: {
            src: "https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/cablu_cupru-removebg-preview.png?alt=media&token=5c30e3f7-5330-4236-9171-06b478367824",
            style: "width: 9vw; height: 20vh;",
            fit: "contain"
        },
        func: () => router.push('/product/2'),
    },
    {
        SKU: 3,
        label: "Lemne de foc paletizate, 0.8 mc, fag, 1.2 m x 1.45 m",
        price: 32.99,
        discount: 28.99,
        currency: "LEI",
        image: {
            src: "https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/paleti_lemn-removebg-preview.png?alt=media&token=09faa330-6682-42f6-a79c-51bba2f01ef1",
            style: "width: 9vw; height: 20vh;",
            fit: "contain"
        },
        func: () => router.push('/product/3')
    },
    {
        SKU: 4,
        label: "BCA Ytong Design, 599 x 75 x 199 mm (LxGxH)",
        price: 32.99,
        discount: 28.99,
        currency: "LEI",
        image: {
            src: "https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/BCA-removebg-preview.png?alt=media&token=5ec49478-ce72-4177-87e5-6be5e5ce2b4f",
            style: "width: 9vw; height: 20vh;",
            fit: "contain"
        },
        func: () => router.push('/product/4')
    },
    {
        SKU: 5,
        label: 'Ciment Portland Heidelberg Materials CEM II B-M (S-LL) 42.5 R, EvoBuild, 40kg',
        price: 32.99,
        discount: 28.99,
        currency: "LEI",
        image: {
            src: "https://firebasestorage.googleapis.com/v0/b/marketplace-ee3bf.appspot.com/o/sac_ciment.png?alt=media&token=fca04947-f2f5-433c-ace0-ad3b216c9465",
            style: "width: 9vw; height: 20vh;",
            fit: "contain"
        },
        func: () => router.push('/product/5')
    }

]
}

const imgTab = ref<string>('1');

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

.add-to-cart-btn {
    display: flex;
    height: var(--Size-size-button-xl, 48px); 
    padding: var(--Spacing-spacing-sm, 8px) var(--Spacing-spacing-lg, 16px);
    justify-content: center;
    align-items: center; 
    gap: var(--Spacing-spacing-sm, 8px); 
    align-self: stretch; 
    border-radius: var(--Spacing-spacing-lg, 16px); 
    background: var(--blue1, #2563EB); 
    box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10);
}
</style>
