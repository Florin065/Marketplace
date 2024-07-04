<template>
    <div>
      <q-header
        bordered
        class="bg-grey-3 text-primary"
        style="padding: 20px; height: 150px; width: 100%;"
        src="~/src/assets/banner.jpeg"
      >
        <q-toolbar>
          <q-img src="~/src/assets/logo.png" style="height: 120px; width: 120px; margin-left: 100px;" fit="contain"/>
        </q-toolbar>
      </q-header>
      <q-page class="flex-center">
        <div>
          <h4 class="text-h4 text-bold" style="color:#0CD496; margin-bottom: 30px; margin-top: -20px">Formular de înregistrare</h4>
        </div>
  
        <q-tabs dense class="text-bold text-primary">
          <q-tab style="width:1000px" name="persoana_fizica" label="Persoană fizică" @click="tab = 'persoana_fizica'" />
          <q-tab style="width:1000px" name="persoana_juridica" label="Persoană Juridică" @click="tab = 'persoana_juridica'" />
        </q-tabs>
  
        <q-card style="width: fit; height: fit; border-radius: 16px">
          <q-card-section>
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="persoana_fizica">
                <div style="text-align: left; color:#2563EB; margin-top: -20px">Date persoană fizică</div>
                <q-separator />
                <q-form @submit="submitForm">
                  <div class="row">
                    <div class="col">
                      <div style="text-align: left; margin-left: 10px; margin-top:1em">Nume <span style="color:red">*</span></div>
                      <q-input
                        v-model="formDataFizica.nume"
                        label="Nume"
                        outlined
                        dense
                        class="q-pa-sm"
                        required
                      />
                    </div>
                    <div class="col">
                      <div style="text-align: left; margin-left: 10px; margin-top:1em">Prenume <span style="color:red">*</span></div>
                      <q-input
                        v-model="formDataFizica.prenume"
                        label="Prenume"
                        outlined
                        dense
                        class="q-pa-sm"
                        required
                      />
                    </div>
                  </div>
  
                  <div class="row">
                    <div class="col">
                      <div style="text-align: left; margin-left: 10px;">Țară <span style="color:red">*</span></div>
                      <q-select
                      :model-value="model"
                      use-input
                      hide-selected
                      dense
                      outlined
                      fill-input
                      input-debounce="0"
                      :options="options"
                      option-value="code"
                      option-label="name"
                      class="q-pa-sm"
                      @filter="filterFn"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                    </div>
  
                    <div class="col">
                      <div style="text-align: left; margin-left: 10px;">Județ <span style="color:red">*</span></div>
                      <q-input
                        v-model="formDataFizica.judet"
                        label="Selectează județul"
                        outlined
                        dense
                        class="q-pa-sm"
                        required
                       />
                    </div>
                  </div>
  
                  <div class="row">
                    <div class="col">
                      <div style="text-align: left; margin-left: 10px;">Localitate <span style="color: red;">*</span></div>
                        <q-input
                            v-model="formDataFizica.localitate"
                            label="Localitate"
                            outlined
                            dense
                            class="q-pa-sm"
                            required
                        />
                    </div>
                    <div class="col">
                      <div style="text-align: left; margin-left: 10px;">Adresă <span style="color:red">*</span></div>
                      <q-input
                        v-model="formDataFizica.adresa"
                        label="Adresă"
                        outlined
                        dense
                        class="q-pa-sm"
                        required
                      />
                    </div>
                  </div>
  
                  <div class="row">
                    <div class="col">
                      <div style="text-align: left; margin-left: 10px;">Email <span style="color:red">*</span></div>
                      <q-input
                        v-model="formDataFizica.email"
                        label="Mail"
                        outlined
                        dense
                        class="q-pa-sm"
                        required
                      />
                    </div>
                    <div class="col">
                        <div style="text-align: left; margin-left: 10px;">Număr de telefon <span style="color:red">*</span></div>
                        <q-input v-model="numar_telefon_pers_fizica"
                        outlined
                        dense
                        class="q-pa-sm"
                        required
                        >
                          <template v-slot:prepend>
                            <q-select v-model="cod_tara_pers_fizica" :options="countryCodes"
                            dense
                            style="width:55px; margin-left:-12px" />
                          </template>
                        </q-input>
                      </div>
                  </div>
  
                  <div class="row">
                    <div class="col">
                        <div style="text-align: left; margin-left: 10px;">Parolă <span style="color:red">*</span></div>
                        <q-input
                          v-model="formDataFizica.parola"
                          :type="showPassword ? 'text' : 'password'"
                          label="Parolă"
                          outlined
                          dense
                          class="q-pa-sm"
                          required
                        >
                          <template v-slot:prepend>
                            <q-icon name="lock" />
                          </template>
                          <template v-slot:append>
                            <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" @click="togglePasswordVisibility(showPassword)" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col">
                        <div style="text-align: left; margin-left: 10px;">Confirmare parolă <span style="color:red">*</span></div>
                        <q-input
                          v-model="formDataFizica.confirmare_parola"
                          :type="showConfirmPassword ? 'text' : 'password'"
                          label="Confirmare parolă"
                          outlined
                          dense
                          class="q-pa-sm"
                          required
                        >
                          <template v-slot:prepend>
                            <q-icon name="lock" />
                          </template>
                          <template v-slot:append>
                            <q-icon :name="showConfirmPassword ? 'visibility_off' : 'visibility'" @click="togglePasswordVisibility(showConfirmPassword, 'confirm')" />
                          </template>
                        </q-input>
                      </div>
                  </div>
                </q-form>
              </q-tab-panel>
              <q-tab-panel name="persoana_juridica">
                <div style="text-align: left; color:#2563EB; margin-top: -20px">Date persoană juridică</div>
                <q-separator />
                <q-form @submit="submitForm">
                    <div class="col">
                      <div style="text-align: left; margin-left: 10px; margin-top:1em">Nume Companie <span style="color:red">*</span></div>
                      <q-input
                        v-model="formDataJuridica.denumire_companie"
                        label="Firma S.R.L"
                        outlined
                        dense
                        class="q-pa-sm"
                        required
                      />
                    </div>

                  <div class="row">
                    <div class="col">
                      <div style="text-align: left; margin-left: 10px;">CIF/CUI <span style="color:red">*</span></div>
                      <q-input
                        v-model="formDataJuridica.cui"
                        label="Introdu CUI sau CIF companie"
                        outlined
                        dense
                        class="q-pa-sm"
                        required
                      />
                    </div>
      
                    <div class="col">
                      <div style="text-align: left; margin-left: 10px;">Număr de înregistrare la registrul comerțului (J/F) <span style="color:red">*</span></div>
                      <q-input
                        v-model="formDataJuridica.numar_inregistrare"
                        label="Format: J05/1225/2011"
                        outlined
                        dense
                        class="q-pa-sm"
                        required
                      />
                    </div>
                  </div>

                  <div style="text-align: left">
                    <q-checkbox size="sm" v-model="platitor_tva" label="Companie plătitoare de TVA" color="primary" />
                    <span style="color:red; margin-left:3px">*</span>
                  </div>

                  <div class="row">
                    <div class="col">
                      <div style="text-align: left; margin-left: 10px;">Țară <span style="color:red">*</span></div>
                      <q-select
                        :model-value="model"
                        use-input
                        hide-selected
                        dense
                        outlined
                        fill-input
                        input-debounce="0"
                        :options="options"
                        option-value="code"
                        option-label="name"
                        class="q-pa-sm"
                        @filter="filterFn"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
  
                    <div class="col">
                      <div style="text-align: left; margin-left: 10px;">Județ <span style="color:red">*</span></div>
                      <q-input
                        v-model="formDataJuridica.judet"
                        label="Selectează județul"
                        outlined
                        dense
                        class="q-pa-sm"
                        required
                       />
                    </div>
                  </div>
  
                  <div class="row">
                    <div class="col">
                      <div style="text-align: left; margin-left: 10px;">Localitate <span style="color: red;">*</span></div>
                        <q-input
                            v-model="formDataJuridica.localitate"
                            label="Localitate"
                            outlined
                            dense
                            class="q-pa-sm"
                            required
                        />
                    </div>
                    <div class="col">
                      <div style="text-align: left; margin-left: 10px;">Adresă <span style="color:red">*</span></div>
                      <q-input
                        v-model="formDataJuridica.adresa"
                        label="Adresă"
                        outlined
                        dense
                        class="q-pa-sm"
                        required
                      />
                    </div>
                  </div>
  
                  <div class="row">
                    <div class="col">
                      <div style="text-align: left; margin-left: 10px;">Email <span style="color:red">*</span></div>
                      <q-input
                        v-model="formDataJuridica.email"
                        label="Mail"
                        outlined
                        dense
                        class="q-pa-sm"
                        required
                      />
                    </div>
                    <div class="col">
                        <div style="text-align: left; margin-left: 10px;">Număr de telefon <span style="color:red">*</span></div>
                        <q-input v-model="numar_telefon_pers_juridica
                "
                        outlined
                        dense
                        class="q-pa-sm"
                        required
                        >
                          <template v-slot:prepend>
                            <q-select v-model="cod_tara_pers_juridica" :options="countryCodes"
                            dense
                            style="width:55px; margin-left:-12px;" />
                          </template>
                        </q-input>
                      </div>
                  </div>
  
                  <div class="row">
                    <div class="col">
                        <div style="text-align: left; margin-left: 10px;">Parolă <span style="color:red">*</span></div>
                        <q-input
                          v-model="formDataJuridica.parola"
                          :type="showPassword ? 'text' : 'password'"
                          label="Parolă"
                          outlined
                          dense
                          class="q-pa-sm"
                          required
                        >
                          <template v-slot:prepend>
                            <q-icon name="lock" />
                          </template>
                          <template v-slot:append>
                            <q-icon :name="showPassword ? 'visibility_off' : 'visibility'"
                            @click="togglePasswordVisibility(showPassword)" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col">
                        <div style="text-align: left; margin-left: 10px;">Confirmare parolă <span style="color:red">*</span></div>
                        <q-input
                          v-model="formDataJuridica.confirmare_parola"
                          :type="showConfirmPassword ? 'text' : 'password'"
                          label="Confirmare parolă"
                          outlined
                          dense
                          class="q-pa-sm"
                          required
                        >
                          <template v-slot:prepend>
                            <q-icon name="lock" />
                          </template>
                          <template v-slot:append>
                            <q-icon :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
                            @click="togglePasswordVisibility(showConfirmPassword, 'confirm')" />
                          </template>
                        </q-input>
                      </div>
                  </div>
                </q-form>
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </q-card>
  
        <div style="text-align: left">
          <q-checkbox size="sm" v-model="terms" label="Sunt de acord cu termenii și condițiile" color="primary" />
          <span style="color:red; margin-left:3px">*</span>
        </div>
  
        <div class="q-mt-md text-center">
          <q-btn
            label="Creează cont"
            text-color="white"
            style="background: #0CD496; width: 1000px; height: 50px"
            @click="submitForm"
          />
        </div>
  
        <div class="q-mt-lg text-center">
          <span>Ai deja cont?</span>
          <q-btn flat label="Autentificare" color="primary" @click="navigateToLogin" />
        </div>
      </q-page>
    </div>
  </template>
  
  <script setup lang="ts">
  import { getAsset } from 'src/lib/assets';
  import { onMounted, ref, computed, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import countries from './components/countries.json';
  
  const router = useRouter();
  
  const countryCodes = ref([
  { label: '+39', value: '+39' },
  { label: '+40', value: '+40' },
  ]);
  
  const cod_tara_pers_fizica = ref('+40');
  const numar_telefon_pers_fizica = ref('');
  
  const cod_tara_pers_juridica = ref('+40');
  const numar_telefon_pers_juridica = ref('');
  
  const showPassword = ref(false);
  const showConfirmPassword = ref(false);
  
  const formDataFizica = ref({
    nume: '',
    prenume: '',
    tara: 'Romania',
    judet: '',
    localitate: '',
    adresa: '',
    email: '',
    numar_telefon: '',
    parola: '',
    confirmare_parola: '',
  });
  
  const formDataJuridica = ref({
    denumire_companie: '',
    cui: '',
    numar_inregistrare: '',
    tara: 'Romania',
    judet: '',
    localitate: '',
    adresa: '',
    email: '',
    numar_telefon: '',
    parola: '',
    confirmare_parola: '',
  });

  const platitor_tva = ref(false);
  
  watch([cod_tara_pers_fizica, numar_telefon_pers_fizica], () => {
    formDataFizica.value.numar_telefon = cod_tara_pers_fizica.value + numar_telefon_pers_fizica.value;
  });
  
  watch([cod_tara_pers_juridica, numar_telefon_pers_juridica
  ], () => {
    formDataJuridica.value.numar_telefon = cod_tara_pers_juridica.value + numar_telefon_pers_juridica.value;
  });
  
  const togglePasswordVisibility = (currentState: boolean, type: 'password' | 'confirm' = 'password') => {
   if (type === 'password') {
    showPassword.value = !currentState;
   } else if (type === 'confirm') {
    showConfirmPassword.value = !currentState;
   }
  };
  
  const terms = ref(false);
  const tab = ref('persoana_fizica');
  
  const submitForm = () => {
    if (tab.value === 'persoana_fizica') {
      console.log(formDataFizica.value);
    } else {
      console.log(formDataJuridica.value);
    }
  };
  
  const navigateToLogin = () => {
    router.push('/login');
  };

  const options = ref(countries);
  const model = ref('Romania');

  const filterFn = (val, update, abort) => {
    update(() => {
      const needle = val.toLowerCase();
      options.value = countries.filter(v => v.name.toLowerCase().indexOf(needle) > -1);
    });
  };

  const setModel = (val) => {
    model.value = val;
  };

  </script>
  
  <style scoped>
  </style>
  