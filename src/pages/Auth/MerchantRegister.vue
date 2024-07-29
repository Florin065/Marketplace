<template>
  <q-header
    bordered
    class="bg-grey-3 text-primary"
    style="padding: 20px; height: 150px; width: 100%;"
    src="~/src/assets/banner.jpeg"
  >
    <q-toolbar>
      <q-img
        src="~/src/assets/logo.png"
        style="height: 120px; width: 120px; margin-left: 100px;"
        fit="contain"
        @click="() => $router.push('/')"
      />
    </q-toolbar>
  </q-header>

  <q-page class="q-pa-md">
    <q-card-section>
      <div class="text-h6"
        style="color: var(--green, #0CD496); text-align: center; font-family: Inter; font-size: 36px; font-style: normal; font-weight: 600; line-height: 48px;"
      >Formular de înregistrare</div>
    </q-card-section>
    <q-tabs v-model="tab" class="bg-white text-black" align="center" shrink>
      <q-tab v-for="(tabLabel, index) in tabLabels" :key="index" :name="tabLabel.name" :label="tabLabel.label" style="flex: 1; border: 1px solid #ccc; border-radius: 4px;" />
    </q-tabs>
    <q-card>
      <q-form @submit="submit">
        <q-tab-panels v-model="tab" animated style="width: 1020px; margin-bottom: 20px">
          <q-tab-panel name="general">
            <div class="row">
              <q-card class="col-12 col-md-6" style="width: 488px; margin-left: -15px; margin-right: 42.5px; margin-bottom: -15px; border-radius: 20px">
                <q-card-section>
                  <q-card-section align="left" style="color: var(--color-icon-info, #2563EB); font-family: Inter; font-size: 16px; font-style: normal; font-weight: 600; line-height: 24px;">
                    <div align="left" style="color: var(--color-icon-info, #2563EB); font-family: Inter; font-size: 16px; font-style: normal; font-weight: 600; line-height: 24px;">
                      Date companie
                    </div>
                  </q-card-section>

                  <q-separator />

                  <q-card-section>
                    <div align="left">
                      <div v-for="(field, index) in generalFields" :key="index">
                        <div v-if="field.type === 'select'">
                          {{ field.label }} <span style="color: red;">*</span>
                          <q-select v-model="form.general.company[field.model]" :placeholder="field.placeholder" :options="field.options" outlined dense />
                        </div>
                        <div v-else-if="field.type === 'input'">
                          {{ field.label }} <span style="color: red;">*</span>
                          <q-input v-model="form.general.company[field.model]" :placeholder="field.placeholder" outlined dense />
                        </div>
                        <div v-else-if="field.type === 'radio'">
                          {{ field.label }} <span style="color: red;">*</span>
                          <q-radio v-for="(option, i) in field.options" :key="i" v-model="form.general.company[field.model]" :val="option.value" :label="option.label" />
                        </div>
                      </div>
                      <div v-if="form.general.company.uniqueRegistrationCode === 'DA'" style="margin-bottom: -10px">
                        Cod unic de înregistrare <span style="color: red;">*</span>
                        <q-input v-model="form.general.company.uniqueCode" placeholder="Cod unic de înregistrare" outlined dense />
                      </div>
                      <div v-if="form.general.company.isVatPayer === 'DA'" style="margin-top: -5px">
                        Număr TVA <span style="color: red;">*</span>
                        <q-input v-model="form.general.company.vatNumber" placeholder="Număr TVA" outlined dense />
                      </div>
                      <div style="margin-left: -10px">
                        <q-checkbox v-model="form.general.company.hasSecondaryEntities"/>
                        Compania nu deține alte entități secundare în spațiul UE <span style="color: red;">*</span>
                      </div>
                      <div v-if="!form.general.company.hasSecondaryEntities" style="margin-top: 10px">
                        <div style="color: var(--color-icon-interactive, #2563EB); font-family: Inter; font-size: 16px; font-style: normal; font-weight: 600; line-height: 24px">
                          Entități secundare de companie
                        </div>
                        <div style="margin-top: 10px; color: var(--color-icon-interactive, #2563EB); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px;">
                          <q-btn icon="add" label="Adaugă sedii secundare" @click="addSecondaryEntity" />
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card-section>
              </q-card>
              <q-card class="col-12 col-md-6" style="width: 488px; margin-right: -20px; margin-bottom: -15px; border-radius: 20px">
                <q-card-section>
                  <q-card-section align="left" style="color: var(--color-icon-info, #2563EB); font-family: Inter; font-size: 16px; font-style: normal; font-weight: 600; line-height: 24px;">
                    <div align="left" style="color: var(--color-icon-info, #2563EB); font-family: Inter; font-size: 16px; font-style: normal; font-weight: 600; line-height: 24px;">
                      Adresă sediu social
                    </div>
                  </q-card-section>

                  <q-separator />

                  <q-card-section>
                    <div align="left">
                      <div v-for="(field, index) in addressFields" :key="index">
                        <div v-if="field.type === 'select'">
                          {{ field.label }} <span style="color: red;">*</span>
                          <q-select v-model="form.general.social_address[field.model]" :placeholder="field.placeholder" :options="field.options" outlined dense />
                        </div>
                        <div v-else-if="field.type === 'input'">
                          {{ field.label }} <span style="color: red;">*</span>
                          <q-input v-model="form.general.social_address[field.model]" :placeholder="field.placeholder" outlined dense />
                        </div>
                      </div>
                      <div style="color: var(--color-icon-interactive, #2563EB); font-family: Inter; font-size: 16px; font-style: normal; font-weight: 600; line-height: 24px; margin-top: 25px; margin-bottom: 10px">
                        Contact
                      </div>
                      <div v-for="(field, index) in contactFields" :key="index">
                        <div v-if="field.type === 'input'">
                          {{ field.label }} <span style="color: red;">*</span>
                          <q-input v-model="form.general.contact[field.model]" :placeholder="field.placeholder" outlined dense />
                        </div>
                      </div>
                      <div style="margin-left: -10px">
                        <q-checkbox v-model="form.general.contact.hasOtherVatNumbers"/>
                        Nu sunt înregistrat cu alte numere TVA pre teritoriul UE <span style="color: red;">*</span>
                      </div>
                      <div v-if="!form.general.contact.hasOtherVatNumbers" style="margin-top: 10px">
                        <div style="color: var(--color-icon-interactive, #2563EB); font-family: Inter; font-size: 16px; font-style: normal; font-weight: 600; line-height: 24px">
                          Alte numere TVA înregistrate
                        </div>
                        <div style="margin-top: 10px; color: var(--color-icon-interactive, #2563EB); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px;">
                          <q-btn icon="add" label="Adaugă număr TVA" @click="addVatNumber" />
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </div>
          </q-tab-panel>
          <q-tab-panel name="payment">
            <div align="left" style="color: var(--color-icon-info, #2563EB); font-family: Inter; font-size: 16px; font-style: normal; font-weight: 600; line-height: 24px; margin-bottom: 15px">
              Plata în RON
              <q-card-section style="width: 48%; border-radius: var(--Radii-radius, 6px); border: 1px solid var(--color-border-info, #2563EB);
                background: var(--color-bg-info-muted, #EFF6FF); box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);">
                <div style="color: var(--color-icon-interactive, #2563EB); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px;">
                  Toate plățile vor fi făcute în RON
                </div>
              </q-card-section>
            </div>

            <div class="row" style="margin-top: 20px">
              <q-card class="col-12 col-md-6" style="width: 490px;">
                <q-card-section align="left">
                  <div v-for="(field, index) in paymentFields" :key="index">
                    <div v-if="field.type === 'input'">
                      {{ field.label }} <span style="color: red;">*</span>
                      <q-input v-model="form.payment[field.model]" :placeholder="field.placeholder" outlined dense />
                    </div>
                    <div v-else-if="field.type === 'checkbox'">
                      <q-checkbox v-model="form.payment[field.model]"/>
                      {{ field.label }}
                    </div>
                    <div v-else-if="field.type === 'radio'">
                      {{ field.label }} <span style="color: red;">*</span>
                      <q-radio v-for="(option, i) in field.options" :key="i" v-model="form.payment[field.model]" :val="option.value" :label="option.label" />
                    </div>
                    <div v-else-if="field.type === 'select'">
                      {{ field.label }} <span style="color: red;">*</span>
                      <q-select v-model="form.payment[field.model]" :placeholder="field.placeholder" :options="field.options" outlined dense />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
              <q-card class="col-12 col-md-6" style="width: 490px;">
                <q-card-section align="left">
                  <div>
                    Descriere scurtă a companiei <span style="color: red;">*</span>
                    <q-editor v-model="form.payment.short_company_description" placeholder="Descriere scurtă a companiei" outlined dense style="height: 425px" />
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-tab-panel>
          <q-tab-panel name="documents">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6" align="left" style="color: var(--color-icon-info, #2563EB); font-family: Inter; font-size: 16px; font-style: normal; font-weight: 600; line-height: 24px; margin-bottom: 15px">
                Documente
                <q-card-section style="border-radius: var(--Radii-radius, 6px); border: 1px solid var(--color-border-info, #2563EB);
                  background: var(--color-bg-info-muted, #EFF6FF); box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);">
                  <div style="color: var(--color-icon-interactive, #2563EB); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px;">
                    Formatele fișierelor acceptate sunt: PDF, JPEG, PNG. Dimensiunea maximă per fișier e 2MB.
                  </div>
                </q-card-section>
              </div>
              <div class="col-12 col-md-6" align="left" style="color: var(--color-icon-info, #2563EB); font-family: Inter; font-size: 16px; font-style: normal; font-weight: 600; line-height: 24px; margin-bottom: 15px">
                Reprezentant legal
                <q-card-section style="border-radius: var(--Radii-radius, 6px); border: 1px solid var(--color-border-info, #2563EB);
                  background: var(--color-bg-info-muted, #EFF6FF); box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);">
                  <div style="color: var(--color-icon-interactive, #2563EB); font-family: Inter; font-size: 14px; font-style: normal; font-weight: 500; line-height: 20px;">
                    Se completează cu datele persoanei care a semnat actul constitutiv al firmei.
                  </div>
                </q-card-section>
              </div>
            </div>

            <q-separator />

            <div class="row">
              <div class="col-12 col-md-6" style="width: 490px;">
                <q-card-section align="left">
                  <q-card v-for="doc in documents" :key="doc.name" style="margin-top: 10px; border-radius: 10px">
                    <q-card-section>
                      <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                          <div style="font-weight: bold;">
                            {{ doc.label }} <span style="color: red;">*</span>
                          </div>
                          <div style="font-size: smaller; color: gray; max-width: 300px; word-wrap: break-word;">
                            {{ doc.description }}
                          </div>
                        </div>
                        <q-btn
                          style="padding: 4px 8px; border-radius: var(--Radii-radius-button, 6px);
                            background: var(--color-bg-info-strong, #2563EB); color: var(--white, #FFFFFF);"
                          label="Încarcă" type="submit" icon="cloud_upload" />
                      </div>
                    </q-card-section>
                  </q-card>
                </q-card-section>
              </div>
              
              <q-separator vertical />
              
              <div class="col-12 col-md-6" style="width: 490px;">
                <q-card-section align="left">
                  <div v-for="(field, index) in representativeFields" :key="index">
                    <div v-if="field.type === 'input'">
                      {{ field.label }} <span style="color: red;">*</span>
                      <q-input v-model="form.documents[field.model]" :placeholder="field.placeholder" outlined dense />
                    </div>
                  </div>
                </q-card-section>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-form>
    </q-card>

    <div v-if="tab !== 'operational' && tab === 'general'">
      <q-btn style="width: 1020px; display: flex; padding: var(--Spacing-spacing-lg, 16px); justify-content: center;
        align-items: center; gap: var(--Spacing-spacing-sm, 8px); align-self: stretch; border-radius: var(--Radii-radius-button, 6px);
        background: var(--green, #0CD496); box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10); color: var(--white, #FFFFFF);"
        label="Următorul pas" type="submit" @click="() => tab = tabs[tabs.indexOf(tab) + 1]" />
    </div>
    <div v-if="tab !== 'operational' && tab !== 'general'">
      <div style="display: flex; flex-grow: 1">
        <q-btn style="display: flex; padding: var(--Spacing-spacing-lg, 16px); justify-content: center; flex: 1;
          align-items: center; gap: var(--Spacing-spacing-sm, 8px); align-self: stretch; border-radius: var(--Radii-radius-button, 6px);
          background: transparent; box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10); color: var(--grey-1, #333333);"
          label="Pasul Precedent" type="submit" @click="() => tab = tabs[tabs.indexOf(tab) - 1]" />
        <q-btn style="display: flex; padding: var(--Spacing-spacing-lg, 16px); justify-content: center; flex: 1;
          align-items: center; gap: var(--Spacing-spacing-sm, 8px); align-self: stretch; border-radius: var(--Radii-radius-button, 6px);
          background: var(--green, #0CD496); box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10); color: var(--white, #FFFFFF);"
          label="Următorul pas" type="submit" @click="() => tab = tabs[tabs.indexOf(tab) + 1]" />
      </div>
    </div>
    <div v-if="tab === 'operational'">
      <div style="display: flex; flex-grow: 1">
        <q-btn style="display: flex; padding: var(--Spacing-spacing-lg, 16px); justify-content: center; flex: 1;
          align-items: center; gap: var(--Spacing-spacing-sm, 8px); align-self: stretch; border-radius: var(--Radii-radius-button, 6px);
          background: transparent; box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10); color: var(--grey-1, #333333);"
          label="Pasul Precedent" type="submit" @click="() => tab = tabs[tabs.indexOf(tab) - 1]" />
        <q-btn style="display: flex; padding: var(--Spacing-spacing-lg, 16px); justify-content: center; flex: 1;
          align-items: center; gap: var(--Spacing-spacing-sm, 8px); align-self: stretch; border-radius: var(--Radii-radius-button, 6px);
          background: var(--green, #0CD496); box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10); color: var(--white, #FFFFFF);"
          label="Finalizează" type="submit" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('general');
const tabs = ['general', 'payment', 'documents', 'products', 'operational'];

const form = ref({
  general: {
    company: {
      country: '',
      name: '',
      type: '',
      cif: '',
      uniqueRegistrationCode: '',
      uniqueCode: '',
      isVatPayer: '',
      vatNumber: '',
      registrationNumber: '',
      europeanIdentifier: '',
      hasSecondaryEntities: false,
    },
    social_address: {
      county: '',
      city: '',
      address: '',
      postalCode: '',
    },
    contact: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      hasOtherVatNumbers: false,
    },
  },
  payment: {
    iban: '',
    legal_company: false,
    card_holder: '',
    bank_name: '',
    swift: '',
    currency: 'RON',
    romanian_producer: 'DA',
    short_company_description: '',
  },
  documents: {
    vat_certificate: File,
    registration_certificate: File,
    identification_document: File,
    bank_statement: File,
    constitutive_act: File,
    legal_representative_surname: '',
    legal_representative_name: '',
    legal_representative_function: '',
    legal_representative_email: '',
    legal_representative_confirm_email: '',
  }
});

const documents = [
  { name: 'vat_certificate', label: 'Încarcă certificatul TVA/Non-TVA', description: 'Te rog încarcă certificatul TVA corespunzător.' },
  { name: 'registration_certificate', label: 'Certificat de înregistrare', description: 'Certificatul de înregistrare de la Registrul comerțului.' },
  { name: 'identification_document', label: 'Carte de identitate reprezentant', description: 'Este necesară verificarea acestui document din motive legale și de securitate. Documentul este șters din arhiva noastră în 30 de zile!' },
  { name: 'bank_statement', label: 'Extras de cont', description: 'Document generat de către banca în care se poate observa numele societății sau CUI-ul. Se accepta și o captură din aplicația bancară unde sunt vizibile datele companiei.' },
  { name: 'constitutive_act', label: 'Act constitutiv', description: 'Actul Constitutiv sau Statutul societății.' },
]

const countries = ['România', 'Other Country'];
const companyTypes = ['SRL', 'SA'];
const counties = ['București', 'Other County'];
const cities = ['City1', 'City2'];
const currencies = ['RON', 'EUR', 'USD'];

const tabLabels = [
  { name: 'general', label: 'Informații generale' },
  { name: 'payment', label: 'Detalii Plată' },
  { name: 'documents', label: 'Documente' },
  { name: 'products', label: 'Gamă de produse' },
  { name: 'operational', label: 'Informații operaționale' }
];

const generalFields = [
  { label: 'Țara sediului social al companiei', type: 'select', model: 'country', placeholder: 'Țara sediului social al companiei', options: countries },
  { label: 'Nume Companie', type: 'input', model: 'name', placeholder: 'Nume Companie' },
  { label: 'Tip Companie', type: 'select', model: 'type', placeholder: 'Tip Companie', options: companyTypes },
  { label: 'CIF/CUI', type: 'input', model: 'cif', placeholder: 'CIF/CUI' },
  { label: 'Companie cu cod unic de înregistrare', type: 'radio', model: 'uniqueRegistrationCode', options: [{ value: 'DA', label: 'DA' }, { value: 'NU', label: 'NU' }] },
  { label: 'Companie plătitoare de TVA', type: 'radio', model: 'isVatPayer', options: [{ value: 'DA', label: 'DA' }, { value: 'NU', label: 'NU' }] },
  { label: 'Număr de înregistrare la registrul comerțului (J/F)', type: 'input', model: 'registrationNumber', placeholder: 'Număr de înregistrare la registrul comerțului (J/F)' },
  { label: 'Identificator european unic', type: 'input', model: 'europeanIdentifier', placeholder: 'Identificator european unic' },
];

const addressFields = [
  { label: 'Județ', type: 'select', model: 'county', placeholder: 'Județ', options: counties },
  { label: 'Oraș', type: 'select', model: 'city', placeholder: 'Oraș', options: cities },
  { label: 'Adresă', type: 'input', model: 'address', placeholder: 'Stradă' },
  { label: 'Cod poștal', type: 'input', model: 'postalCode', placeholder: 'Cod poștal' },
];

const contactFields = [
  { label: 'Prenume', type: 'input', model: 'firstName', placeholder: 'Prenume' },
  { label: 'Nume', type: 'input', model: 'lastName', placeholder: 'Nume' },
  { label: 'Număr de telefon', type: 'input', model: 'phone', placeholder: 'Telefon' },
  { label: 'Email', type: 'input', model: 'email', placeholder: 'Email' },
];

const paymentFields = [
  { label: 'IBAN', type: 'input', model: 'iban', placeholder: 'IBAN' },
  { label: 'Titularul contului bancar este compania legală', type: 'checkbox', model: 'legal_company' },
  { label: 'Titular cont bancar', type: 'input', model: 'card_holder', placeholder: 'Titular cont bancar' },
  { label: 'Banca', type: 'input', model: 'bank_name', placeholder: 'Banca' },
  { label: 'SWIFT', type: 'input', model: 'swift', placeholder: 'SWIFT' },
  { label: 'Moneda', type: 'select', model: 'currency', placeholder: 'Moneda', options: currencies },
  { label: 'Producător român', type: 'radio', model: 'romanian_producer', options: [{ value: 'DA', label: 'DA' }, { value: 'NU', label: 'NU' }] },
];

const representativeFields = [
  { label: 'Prenume', type: 'input', model: 'legal_representative_name', placeholder: 'Prenume' },
  { label: 'Nume', type: 'input', model: 'legal_representative_surname', placeholder: 'Nume' },
  { label: 'Funcție', type: 'input', model: 'legal_representative_function', placeholder: 'Funcție' },
  { label: 'Email reprezentant legal', type: 'input', model: 'legal_representative_email', placeholder: 'Email' },
  { label: 'Confirmare email reprezentant legal', type: 'input', model: 'legal_representative_confirm_email', placeholder: 'Confirmare email' },
];

const submit = () => {
  console.log(form.value);
};

const addSecondaryEntity = () => {
  // Handle adding secondary entities
};

const addVatNumber = () => {
  // Handle adding VAT numbers
};
</script>

<style scoped>
.q-form .q-field__label {
  font-size: 14px;
  font-weight: bold;
}

.q-form .q-input,
.q-form .q-select,
.q-form .q-radio-group {
  margin-bottom: 16px;
}
</style>
