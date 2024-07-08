<template>
  <div>
    <q-header
      bordered
      class="bg-grey-3 text-primary"
      style="padding: 20px; height: 150px; width: 100%;"
      src="~/src/assets/banner.jpeg"
    >
      <q-toolbar>
        <q-img src="~/src/assets/logo.png" style="height: 120px; width: 120px; margin-left: 100px;" fit="contain" @click="() => router.push('/')"/>
      </q-toolbar>
    </q-header>
    <q-page class="flex-center">
      <div>
        <h4 class="text-h4 text-bold" style="color:#0CD496; margin-bottom: 10px;">Formular de înregistrare</h4>
      </div>

      <q-tabs dense class="text-bold text-primary">
        <q-tab style="width:500px" name="persoana_fizica" label="Persoană fizică" @click="tab = 'persoana_fizica'" />
        <q-tab style="width:500px" name="persoana_juridica" label="Persoană Juridică" @click="tab = 'persoana_juridica'" />
      </q-tabs>

      <q-card style="width: 1000px; height: fit; border-radius: 16px">
        <q-card-section>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="persoana_fizica">
              <div style="text-align: left; color:#2563EB; margin-top: -20px">Date persoană fizică</div>
              <q-separator />
              <q-form @submit="submitForm">
                <div class="row">
                  <div class="col">
                    <div style="text-align: left; margin-left: 10px; margin-top:1em">Nume <span style="color:red">*</span></div>
                    <q-input v-model="formDataFizica.nume"
                      outlined dense class="q-pa-sm" required
                    />
                  </div>
                  <div class="col">
                    <div style="text-align: left; margin-left: 10px; margin-top:1em">Prenume <span style="color:red">*</span></div>
                    <q-input v-model="formDataFizica.prenume"
                      outlined dense class="q-pa-sm" required
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div style="text-align: left; margin-left: 10px;">Țară <span style="color:red">*</span></div>
                    <q-select v-model="formDataFizica.tara" :options="optionsCountries" option-value="iso2" option-label="country" @filter="filterCountries"
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
                    <q-select v-model="formDataFizica.judet" :options="optionsStates" option-value="state" option-label="name"
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
                    <q-select v-model="formDataFizica.localitate" :options="optionsCities" option-value="city" option-label="name"
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
                    <q-input v-model="formDataFizica.adresa"
                      outlined dense class="q-pa-sm" required
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div style="text-align: left; margin-left: 10px;">Email <span style="color:red">*</span></div>
                    <q-input v-model="formDataFizica.email"
                      outlined dense class="q-pa-sm" required
                    />
                  </div>
                  <div class="col">
                      <div style="text-align: left; margin-left: 10px;">Număr de telefon <span style="color:red">*</span></div>
                      <q-input v-model="numar_telefon_pers_fizica"
                      outlined dense class="q-pa-sm" required
                      >
                        <template v-slot:prepend>
                          <q-select v-model="cod_tara_pers_fizica" :options="countryCodes"
                          dense style="width:55px; margin-left:-12px" />
                        </template>
                      </q-input>
                    </div>
                </div>

                <div class="row">
                  <div class="col">
                      <div style="text-align: left; margin-left: 10px;">Parolă <span style="color:red">*</span></div>
                      <q-input v-model="formDataFizica.parola" :type="showPassword ? 'text' : 'password'"
                        outlined dense class="q-pa-sm" required
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
                      <q-input v-model="formDataFizica.confirmare_parola" :type="showConfirmPassword ? 'text' : 'password'"
                        outlined dense class="q-pa-sm" required
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
                    <q-input v-model="formDataJuridica.denumire_companie"
                      outlined dense class="q-pa-sm" required
                    />
                  </div>

                <div class="row">
                  <div class="col">
                    <div style="text-align: left; margin-left: 10px;">CIF/CUI  <span style="color:red">* <span v-if="!isCuiValid" style="color:red">CUI invalid</span></span></div>
                    <q-input v-model="formDataJuridica.cui"
                      outlined dense class="q-pa-sm" required
                    />
                  </div>
    
                  <div class="col">
                    <div style="text-align: left; margin-left: 10px;">Număr de înregistrare la registrul comerțului (J/F) <span style="color:red">*</span></div>
                    <q-input v-model="formDataJuridica.numar_inregistrare"
                      outlined dense class="q-pa-sm" required
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
                    <q-select v-model="formDataJuridica.tara" :options="optionsCountries" option-value="iso2" option-label="country"
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
                    <q-select v-model="formDataJuridica.judet" :options="optionsStates" option-value="state" option-label="name"
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
                    <q-select v-model="formDataJuridica.localitate" :options="optionsCities" option-value="city" option-label="name"
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
                    <q-input v-model="formDataJuridica.adresa"
                      outlined dense class="q-pa-sm" required
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div style="text-align: left; margin-left: 10px;">Email <span style="color:red">*</span></div>
                    <q-input v-model="formDataJuridica.email"
                      outlined dense class="q-pa-sm" required
                    />
                  </div>
                  <div class="col">
                      <div style="text-align: left; margin-left: 10px;">Număr de telefon <span style="color:red">*</span></div>
                      <q-input v-model="numar_telefon_pers_juridica"
                        outlined dense class="q-pa-sm" required
                      >
                        <template v-slot:prepend>
                          <q-select v-model="cod_tara_pers_juridica" :options="countryCodes"
                          dense style="width:55px; margin-left:-12px;" />
                        </template>
                      </q-input>
                    </div>
                </div>

                <div class="row">
                  <div class="col">
                      <div style="text-align: left; margin-left: 10px;">Parolă <span style="color:red">*</span></div>
                      <q-input v-model="formDataJuridica.parola" :type="showPassword ? 'text' : 'password'"
                        outlined dense class="q-pa-sm" required
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
                      <q-input v-model="formDataJuridica.confirmare_parola" :type="showConfirmPassword ? 'text' : 'password'"
                        outlined dense class="q-pa-sm" required
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
        <q-btn label="Creează cont" text-color="white" style="background: #0CD496; width: 1000px; height: 50px" @click="submitForm"
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
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

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
  tara: { country: 'Romania'},
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
  tara: { country: 'Romania'},
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

watch([cod_tara_pers_juridica, numar_telefon_pers_juridica], () => {
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

const optionsCountries = ref([]);
const optionsStates = ref([]);
const optionsCities = ref([]);
const allCountries = ref([]);

onMounted(() => {
  fetch('https://countriesnow.space/api/v0.1/countries',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      optionsCountries.value = data.data.map((country) => ({
        country: country.country,
      }));
      allCountries.value = [...optionsCountries.value];
    });

  fetch('https://countriesnow.space/api/v0.1/countries/states', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "country": "Romania" }),
  })
  .then((response) => response.json())
  .then((data) => {
    optionsStates.value = data.data.states.map((state) => ({
      name: state.name,
    }));
  })
  .catch((error) => console.error('Error fetching states:', error));
});

  watch(() => formDataFizica.value.tara, (newVal) => {
  if (!newVal) return; // Exit if the new value is falsy

  fetch('https://countriesnow.space/api/v0.1/countries/states', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "country": newVal.country }),
  })
  .then((response) => response.json())
  .then((data) => {
    optionsStates.value = data.data.states.map((state) => ({
      name: state.name,
    }));
    console.log(optionsStates);
  })
  .catch((error) => console.error('Error fetching states:', error));
}, { immediate: false, deep: true });

  watch(() => formDataFizica.value.judet, (newVal) => {
  if (!newVal) return; // Exit if the new value is falsy

  fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "country": formDataFizica.value.tara.country, "state": newVal.name }),
  })
  .then((response) => response.json())
  .then((data) => {
    optionsCities.value = data.data.map((city) => ({
      name: city,
    }));
  })
  .catch((error) => console.error('Error fetching cities:', error));
}, { immediate: false, deep: true });


const filterCountries = (val, update, abort) => {
  update(() => {
    if (val.trim() === '') {
      // Reset to all countries if input is empty
      optionsCountries.value = [...allCountries.value];
    } else {
      const needle = val.toLowerCase();
      optionsCountries.value = allCountries.value.filter((country) =>
        country.country.toLowerCase().includes(needle)
      );
    }
  });
}

const infoCuiAPI = "https://infocui.ro/system/api/data" 
const getCompanyData = async () => {
  try {
    var json = {
      "key": "3af785b54590b6979a2dbe7ca17882cbfd8b0364",
      "cui": formDataJuridica.value.cui,
    }
    let queryParams = new URLSearchParams(json).toString();
    let urlWithParams = `${infoCuiAPI}?${queryParams}`;

    const response = fetch(urlWithParams, {
    method: 'GET'});
    
    if ((await response).ok) {
      var data= await (await response).json();

      console.log("AAAAAAAAAAAAAAAAAAA DATA")
      console.log(data)

      formDataJuridica.value.adresa = data.data.adresa;
      formDataJuridica.value.denumire_companie = data.data.nume;
      formDataJuridica.value.numar_inregistrare = data.data.cod_inmatriculare;
      formDataJuridica.value.localitate = data.data.adresa_localitate;
      formDataJuridica.value.judet = data.data.adresa_judet;
      console.log(formDataJuridica.value)
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

    var cui: number = +formDataJuridica.value.cui;

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
  watch(() => formDataJuridica.value.cui, () => {
    isCuiValid.value = validateCUI();
    if(isCuiValid.value) {
      getCompanyData();
    }
  });

</script>

<style scoped>
</style>
