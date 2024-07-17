<template>
  <div>
    <q-header
      bordered
      reveal
      class="bg-grey-3 text-primary"
      style="padding: 20px; height: 150px; width: 100%;"
      src="~/src/assets/banner.jpeg"
    >
      <q-toolbar>
        <q-img src="~/src/assets/logo.png"
          style="height: 120px; width: 120px; margin-left: 100px;"
          fit="contain" @click="() => router.push('/')"/>
      </q-toolbar>
    </q-header>
    <q-page class="flex-center">
      <div>
        <h4 class="text-h4 text-bold" style="color:#0CD496; margin-bottom: 10px;">Formular de înregistrare</h4>
      </div>

      <q-tabs dense class="text-bold text-primary">
        <q-tab style="width:500px" name="persoana_fizica" label="Persoană fizică" @click="helper.tab = 'persoana_fizica'; formData.isPersoanaFizica = true; clearFormData()" />
        <q-tab style="width:500px" name="persoana_juridica" label="Persoană Juridică" @click="helper.tab = 'persoana_juridica'; formData.isPersoanaFizica = false; clearFormData()" />
      </q-tabs>

      <q-card style="width: 1000px; height: fit; border-radius: 16px">
        <q-card-section>
          <q-form @submit="submitForm">
            <q-tab-panels v-model="helper.tab">
              <q-tab-panel name="persoana_fizica">
                <div style="text-align: left; color:#2563EB; margin-top: -20px">Date persoană fizică</div>
                <q-separator />
                <div class="row">
                  <div class="col">
                    <div style="text-align: left; margin-left: -4px; margin-top:1em">Nume <span style="color:red">*</span></div>
                    <q-input v-model="formData.nume"
                      outlined dense class="q-pa-sm" required style="margin-left: -15px;"
                    />
                  </div>
                  
                  <div class="col">
                    <div style="text-align: left; margin-left: 10px; margin-top:1em">Prenume <span style="color:red">*</span></div>
                    <q-input v-model="formData.prenume"
                      outlined dense class="q-pa-sm" required style="margin-right: -15px;"
                    />
                  </div>
                </div>
              </q-tab-panel>

            <q-tab-panel name="persoana_juridica">
              <div style="text-align: left; color:#2563EB; margin-top: -20px">Date persoană juridică</div>
              <q-separator />
              <div class="col">
                <div style="text-align: left; margin-left: -5px; margin-top:1em">Nume Companie <span style="color:red">*</span></div>
                <q-input v-model="formData.denumire_companie"
                  outlined dense class="q-pa-sm" required style="margin-left: -15px; margin-right: -15px;"
                />
              </div>

            <div class="row">
              <div class="col">
                <div style="text-align: left; margin-left: -5px;">CIF/CUI  <span style="color:red">* <span v-if="!isCuiValid" style="color:red">CUI invalid</span></span></div>
                <q-input v-model="formData.cui"
                  outlined dense class="q-pa-sm" required style="margin-left: -15px;"
                />
              </div>

              <div class="col">
                <div style="text-align: left; margin-left: 10px;">Număr de înregistrare la registrul comerțului (J/F) <span style="color:red">*</span></div>
                <q-input v-model="formData.numar_inregistrare"
                  outlined dense class="q-pa-sm" required style="margin-right: -15px;"
                />
              </div>
            </div>

            <div style="text-align: left">
              <q-checkbox size="sm" v-model="formData.platitorTVA" label="Companie plătitoare de TVA" color="primary" style="margin-left:-15px" />
              <span style="color:red; margin-left:3px">*</span>
            </div>
            </q-tab-panel>
          </q-tab-panels>

            <div class="row">
              <div class="col">
                <div style="text-align: left; margin-left: 10px;">Țară <span style="color:red">*</span></div>
                <q-select v-model="formData.tara" :options="locationData.optionsCountries" option-value="iso2" option-label="country" @filter="filterCountries"
                  use-input fill-input input-debounce="0" hide-selected dense outlined class="q-pa-sm"
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
                <q-select v-model="formData.judet" :options="locationData.optionsStates" option-value="state" option-label="name" @filter="filterCounties"
                  use-input fill-input input-debounce="0" hide-selected dense outlined class="q-pa-sm"
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
            </div>

            <div class="row">
              <div class="col">
                <div style="text-align: left; margin-left: 10px;">Localitate <span style="color: red;">*</span></div>
                <q-select v-model="formData.localitate" :options="locationData.optionsCities" option-value="city" option-label="name" @filter="filterCities"
                  use-input fill-input input-debounce="0" hide-selected dense outlined class="q-pa-sm"
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
                <div style="text-align: left; margin-left: 10px;">Adresă <span style="color:red">*</span></div>
                <q-input v-model="formData.adresa"
                  outlined dense class="q-pa-sm" required
                />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div style="text-align: left; margin-left: 10px;">Email <span style="color:red">*</span></div>
                <q-input v-model="formData.email"
                  outlined dense class="q-pa-sm" required
                />
              </div>

              <div class="col">
                <div style="text-align: left; margin-left: 10px;">Număr de telefon <span style="color:red">*</span></div>
                <q-input v-model="helper.numar_telefon"
                  outlined dense class="q-pa-sm" required
                >
                  <template v-slot:prepend>
                    <q-select v-model="helper.prefix_tara" :options="countryCodes"
                      dense style="width:55px; margin-left:-12px" />
                  </template>
                </q-input>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div style="text-align: left; margin-left: 10px;">Parolă <span style="color:red">*</span></div>
                <q-input v-model="formData.parola" :type="helper.showPassword ? 'text' : 'password'"
                  outlined dense class="q-pa-sm" required
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                  <template v-slot:append>
                    <q-icon :name="helper.showPassword ? 'visibility_off' : 'visibility'" @click="togglePasswordVisibility(helper.showPassword)" />
                  </template>
                </q-input>
              </div>
                
              <div class="col">
                <div style="text-align: left; margin-left: 10px;">Confirmare parolă <span style="color:red">
                  *
                  <span v-if="!passwordsMatch" style="color:red">Parolele nu se potrivesc</span>
                </span></div>
                <q-input v-model="formData.confirmare_parola" :type="helper.showConfirmPassword ? 'text' : 'password'"
                  outlined dense class="q-pa-sm" required
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                  <template v-slot:append>
                    <q-icon :name="helper.showConfirmPassword ? 'visibility_off' : 'visibility'" @click="togglePasswordVisibility(helper.showConfirmPassword, 'confirm')" />
                  </template>
                </q-input>
                
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>

      <div style="text-align: left">
        <q-checkbox size="sm" v-model="helper.terms" label="Sunt de acord cu termenii și condițiile" color="primary" />
        <span style="color:red; margin-left:3px">*</span>
      </div>

      <div class="q-mt-md text-center">
        <q-btn :disabled="!passwordsMatch || !isFormValid"
        label="Creează cont"
        text-color="white"
        style="background: #0CD496; width: 1000px; height: 50px"
        unelevated
        @click="submitForm" />
      </div>

      <div class="q-mt-lg text-center">
        <span>Ai deja cont?</span>
        <q-btn flat label="Autentificare" color="primary" @click="navigateToLogin" />
      </div>
    </q-page>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { fetchCountries, fetchStates,
  watchCountryChanges, watchStateChanges,
  filterCountries, filterCounties, filterCities,
  locationData } from './components/countries';
import register from '@/firebase/firebase-register';
import { UserForm } from '../../types/UserTypes';

const router = useRouter();

const countryCodes = ref([
  { label: '+39', value: '+39' },
  { label: '+40', value: '+40' },
]);

const helper = ref({
  prefix_tara: '+40',
  numar_telefon: '',

  showPassword: false,
  showConfirmPassword: false,

  terms: false,
  tab: 'persoana_fizica',
});

const formData = ref<UserForm>({
  nume: '', // persoana fizica
  prenume: '', // persoana fizica
  denumire_companie: '', // persoana juridica
  cui: '', // persoana juridica
  numar_inregistrare: '', // persoana juridica
  tara: { country: 'Romania'}, // required
  judet: { name: ''}, // required
  localitate: { name: ''}, // required
  adresa: '', // required
  email: '', // required
  numar_telefon: '', // required
  parola: '', // required
  confirmare_parola: '', // required
  isPersoanaFizica: true,
  platitorTVA: false
});

const clearFormData = () => {
  formData.value = {
    nume: '',
    prenume: '',
    denumire_companie: '',
    cui: '',
    numar_inregistrare: '',
    tara: { country: 'Romania'},
    judet: { name: ''},
    localitate: { name: ''},
    adresa: '',
    email: '',
    numar_telefon: '',
    parola: '',
    confirmare_parola: '',
    isPersoanaFizica: helper.value.tab === 'persoana_fizica',
    platitorTVA: false
  };

  helper.value.prefix_tara = '+40';
  helper.value.numar_telefon = '';

  helper.value.showPassword = false;
  helper.value.showConfirmPassword = false;

  helper.value.terms = false;
};

watch(
  () => [helper.value.prefix_tara, helper.value.numar_telefon], 
  ([newPrefix, newNumarTelefon]) => {
    formData.value.numar_telefon = newPrefix + newNumarTelefon;
  }
);

console.log(formData.value);

const togglePasswordVisibility = (currentState: boolean, type: 'password' | 'confirm' = 'password') => {
  if (type === 'password') {
    helper.value.showPassword = !currentState;
  } else if (type === 'confirm') {
    helper.value.showConfirmPassword = !currentState;
  }
};

const passwordsMatch = computed(() => {
  return formData.value.parola === formData.value.confirmare_parola;
});

const allFieldsFilled = computed(() => {
  // Always required fields
  const requiredFields = formData.value.isPersoanaFizica
    ? ['nume', 'prenume', 'tara', 'judet', 'localitate', 'adresa', 'email', 'numar_telefon', 'parola', 'confirmare_parola']
    : ['denumire_companie', 'cui', 'numar_inregistrare', 'tara', 'judet', 'localitate', 'adresa', 'email', 'numar_telefon', 'parola', 'confirmare_parola'];

  return requiredFields.every((field) => !!formData.value[field]);
});

const isFormValid = computed(() => {
  return allFieldsFilled && helper.value.terms;
});

const submitForm = async () => {
  if (!isFormValid.value) {
    console.log('Form is not valid');
    return;
  }
  console.log('Form is valid');
  await register(formData.value);
  navigateToHome();
};

onMounted(async () => {
  locationData.value.optionsCountries = await fetchCountries();
  locationData.value.allCountries = [...locationData.value.optionsCountries];

  locationData.value.optionsStates = await fetchStates('Romania');
  locationData.value.allStates = [...locationData.value.optionsStates];
});

watchCountryChanges(formData);
watchStateChanges(formData);

const infoCuiAPI = "https://infocui.ro/system/api/data" 
const getCompanyData = async () => {
  try {
    var json = {
      "key": "3af785b54590b6979a2dbe7ca17882cbfd8b0364",
      "cui": formData.value.cui,
    }

    let queryParams = new URLSearchParams(json).toString();
    let urlWithParams = `${infoCuiAPI}?${queryParams}`;

    const response = fetch(urlWithParams, {
    method: 'GET'});
    
    if ((await response).ok) {
      var data= await (await response).json();

      console.log("AAAAAAAAAAAAAAAAAAA DATA")
      console.log(data)

      formData.value.adresa = data.data.adresa_strada + ", NR." + data.data.adresa_nr_strada;
      formData.value.denumire_companie = data.data.nume;
      formData.value.numar_inregistrare = data.data.cod_inmatriculare;
      formData.value.localitate = { 'name': data.data.adresa_localitate};
      formData.value.judet = { 'name': data.data.adresa_judet };
      console.log(formData.value)
    } else {
      console.log(`API returned an error status: ${(await response).status}`);
    }
    
  } catch (error) {
    console.log("Failed to connect to the API:", error.message);
  }
};

const validateCUI = () => {
  // remove spaces
  // formDataJuridica.value.cui = formDataJuridica.value.cui.replace(/\s/g, '');

  var cui: number = +formData.value.cui;

  if(cui.toString().length < 2 && cui.toString().length > 10) {
    return false;
  }
  
  var testKey = 753217532;
  var controlNumber = cui % 10;
  cui = Math.floor(cui / 10);

  var sum = 0;
  while(cui > 0) {
    sum += (cui % 10) * (testKey % 10);
    cui = Math.floor(cui / 10);
    testKey = Math.floor(testKey / 10);
  }

  var rest = sum * 10 % 11;
  if(rest == 10) {
    rest = 0;
  } 
  return rest == controlNumber;

}

const isCuiValid = ref(false);
watch(() => formData.value.cui, () => {
  isCuiValid.value = validateCUI();
  if(isCuiValid.value) {
    getCompanyData();
  }
});

const navigateToLogin = () => {
  router.push('/auth/login');
};

const navigateToHome = () => {
  router.push('/');
};

</script>

<style scoped>
</style>
