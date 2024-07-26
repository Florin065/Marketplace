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
        <q-card>
          <q-card-section>
            <div class="text-h6"
                style="color: var(--green, #0CD496); text-align: center; font-family: Inter; font-size: 36px; font-style: normal; font-weight: 600; line-height: 48px;"
            >Formular de înregistrare</div>
          </q-card-section>
          <q-tabs v-model="tab" class="bg-white text-black" align="center" shrink>
            <q-tab name="general" label="Informații generale" style="flex: 1; border: 1px solid #ccc; border-radius: 4px;" />
            <q-tab name="payment" label="Detalii Plată" style="flex: 1; border: 1px solid #ccc; border-radius: 4px;" />
            <q-tab name="documents" label="Documente" style="flex: 1; border: 1px solid #ccc; border-radius: 4px;" />
            <q-tab name="products" label="Gamă de produse" style="flex: 1; border: 1px solid #ccc; border-radius: 4px;" />
            <q-tab name="operational" label="Informații operaționale" style="flex: 1" />
          </q-tabs>
          <q-tab-panels v-model="tab" animated >
            <q-tab-panel name="general">
              <q-form @submit="submit">
                <div class="row q-col-gutter-md">
                    <q-card class="col-12 col-md-6 q-pa-md">
                      <q-card-section>
                        <q-card-section align="left" style="color: var(--color-icon-info, #2563EB); font-family: Inter; font-size: 16px; font-style: normal; font-weight: 600; line-height: 24px;">
                            <div align="left" style="color: var(--color-icon-info, #2563EB); font-family: Inter; font-size: 16px; font-style: normal; font-weight: 600; line-height: 24px;">
                                Date companie
                            </div>
                        </q-card-section>

                        <q-separator />

                        <q-card-section>
                            <div align="left">
                                <div>
                                    Țara sediului social al companiei <span style="color: red;">*</span>
                                    <q-select v-model="form.company.country" placeholder="Țara sediului social al companiei" :options="countries" outlined dense />
                                </div>
                                <div>
                                    Nume Companie <span style="color: red;">*</span>
                                    <q-input v-model="form.company.name" placeholder="Nume Companie" outlined dense />
                                </div>
                                <div>
                                    Tip Companie <span style="color: red;">*</span>
                                    <q-select v-model="form.company.type" placeholder="Tip Companie" :options="companyTypes" outlined dense />
                                </div>
                                <div>
                                    CIF/CUI <span style="color: red;">*</span>
                                    <q-input v-model="form.company.cif" placeholder="CIF/CUI" outlined dense />
                                </div>
                                <div>
                                    Companie cu cod unic de înregistrare <span style="color: red;">*</span>
                                    <q-radio v-model="form.company.uniqueRegistrationCode" val="DA" label="DA" />
                                    <q-radio v-model="form.company.uniqueRegistrationCode" val="NU" label="NU" />
                                </div>
                                <div v-if="form.company.uniqueRegistrationCode === 'DA'">
                                    Cod unic de înregistrare <span style="color: red;">*</span>
                                    <q-input v-model="form.company.uniqueCode" placeholder="Cod unic de înregistrare" outlined dense />
                                </div>
                                <div>
                                    Companie plătitoare de TVA <span style="color: red;">*</span>
                                    <q-radio v-model="form.company.isVatPayer" val="DA" label="DA" />
                                    <q-radio v-model="form.company.isVatPayer" val="NU" label="NU" />
                                </div>
                                <div v-if="form.company.isVatPayer === 'DA'">
                                    Număr TVA <span style="color: red;">*</span>
                                    <q-input v-model="form.company.vatNumber" placeholder="Număr TVA" outlined dense />
                                </div>
                                <div>
                                    Număr de înregistrare la registrul comerțului (J/F) <span style="color: red;">*</span>
                                    <q-input v-model="form.company.registrationNumber" placeholder="Număr de înregistrare la registrul comerțului (J/F)" outlined dense />
                                </div>
                                <div>
                                    Identificator european unic <span style="color: red;">*</span>
                                    <q-input v-model="form.company.europeanIdentifier" placeholder="Identificator european unic" outlined dense />
                                </div>
                                
                            </div>
                        </q-card-section>
                      </q-card-section>
                    </q-card>
                    <q-card class="col-12 col-md-6 q-pa-md">
                      <q-card-section>
                        <q-select v-model="form.address.county" :options="counties" outlined dense />
                        <q-select v-model="form.address.city" :options="cities" outlined dense />
                        <q-input v-model="form.address.street" placeholder="Adresă" outlined dense />
                        <q-input v-model="form.address.postalCode" placeholder="Cod poștal" outlined dense />
                        <q-input v-model="form.contact.firstName" placeholder="Prenume" outlined dense />
                        <q-input v-model="form.contact.lastName" placeholder="Nume" outlined dense />
                        <q-input v-model="form.contact.phone" placeholder="Număr de telefon" outlined dense />
                        <q-input v-model="form.contact.email" placeholder="Email" outlined dense />
                        <q-toggle v-model="form.contact.hasOtherVatNumbers" label="Nu sunt înregistrat cu alte numere TVA pre teritoriul UE" />
                        <q-btn flat icon="add" label="Adaugă număr TVA" @click="addVatNumber" />
                      </q-card-section>
                    </q-card>
                  </div>
                <q-card-actions align="right">
                  <q-btn color="primary" label="Următorul pas" type="submit" />
                </q-card-actions>
              </q-form>
            </q-tab-panel>
            <!-- Other tab panels go here -->
          </q-tab-panels>
        </q-card>
      </q-page>
    </template>
    
    <script setup lang="ts">
    import { ref } from 'vue';
    
    const tab = ref('general');
    
    const form = ref({
      company: {
        country: 'România',
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
      address: {
        county: '',
        city: '',
        street: '',
        postalCode: '',
      },
      contact: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        hasOtherVatNumbers: false,
      },
    });
    
    const countries = ['România', 'Other Country'];
    const companyTypes = ['SRL', 'SA'];
    const counties = ['București', 'Other County'];
    const cities = ['City1', 'City2'];
    
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