// style="display: flex; justify-content: center; align-items: center; height: 100vh;"
<template>
    <q-page class="page-style">
        <!-- <q-header 
        style="height: 150px; padding: 25px"
        :style="{'background-image': 'url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0c6ec95f-8f08-4a35-a31b-d62cfad09fda/deqfsfp-e54416a6-a133-44fc-9bb1-63c8b0748969.png/v1/fill/w_1280,h_160/humble_beginnings___btd_6_banner_competition_entry_by_wherethighs_deqfsfp-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTYwIiwicGF0aCI6IlwvZlwvMGM2ZWM5NWYtOGYwOC00YTM1LWEzMWItZDYyY2ZhZDA5ZmRhXC9kZXFmc2ZwLWU1NDQxNmE2LWExMzMtNDRmYy05YmIxLTYzYzhiMDc0ODk2OS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.ab7sFiorTIIcgIIoMkTuxTH4o2rEbh8cQLr7s288mlM)'}"
        >
            
            <q-toolbar>
                <q-img 
                src="~/src/assets/logo.png" 
                alt="Quasar logo"
                style="width: 90px; height: 90px;"
                fit="contain"
                />
                
            </q-toolbar>
        </q-header> --> 
        
        <q-page-container>
            <q-card-section horizontal style="display: flex; justify-content: center; align-items: center; gap: 32px;">
                <q-card-section vertical class="logo-auth">
                    <q-img 
                    src="~/src/assets/logo.png" 
                    style="width: 100px; height: 80px;"
                    fit="contain"
                    ratio="16/9"
                    @click="() => router.push('/')"
                    />
                    <q-card class="auth-top-text" :flat="true">Autentificare</q-card>
                </q-card-section>
                <q-card-actions vertical class="face-google">
                    <q-btn 
                    class="fb-top-btn"
                    >
                        <q-icon size="sm">
                            <img src="@/assets/facebook.svg" />
                        </q-icon>
                        <q-card-section class="text-fb">Continua cu Facebook</q-card-section>
                    </q-btn>

                    <q-btn 
                    class="google-top-btn"
                    >
                        <q-icon size="sm">
                            <img src="@/assets/google.svg" />
                        </q-icon>
                        <q-card-section class="text-ggl">Continua cu Google</q-card-section>
                    </q-btn>
                </q-card-actions>
            </q-card-section>

        
            <q-form ref="form" @submit="submitLogIn" class="container-style">
                <div class="formular-forgor">
                    <div class="input-label">
                        <q-item-label class="input-label">Email</q-item-label>
                        <q-input
                        v-model="user.email"
                        class="item-input text-input"
                        placeholder="exemplu@gmail.com"
                        standout
                        outlined
                        :dense="true"
                        />
                    </div>
                    <div class="input-label">
                        <q-item-label class="input-label">Parola</q-item-label>
                        <q-input
                        v-model="user.password"
                        class="item-input text-input"
                        placeholder="Introdu parola ta"
                        type="password"
                        standout
                        outlined
                        :dense="true"
                        />
                    </div>

                    <div class="">
                        <router-link to="/forgot-password" class="forgot-paswd">Am uitat parola</router-link>
                    </div>
                </div>
                <q-btn 
                    class = "big-auth"
                    label="Autentificare"
                    style="color: #ffff"
                    :ripple="true"
                    :disable="!isOn()"
                    type="submit"
                />
                <q-card-actions class="no-acc">
                    <q-card class="no-acc-text" style="font-size: 15px;" :flat="true">Nu ai cont inca?</q-card>
                    <q-btn
                    class="create-btn"
                    label="Creeaza cont"
                    text-color="blue"
                    to="/register"
                    >

                    </q-btn>
                </q-card-actions>
            </q-form>
        </q-page-container>
    </q-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import login from '../../firebase/firebase-login'
import { Notify } from 'quasar';
import { useRouter } from 'vue-router'

const user = reactive({
    email: '',
    password: ''
})

function isOn() {
    return user.email.length > 0 && user.password.length > 0
}

interface FormType {
    validate: () => boolean
}

const form = ref<FormType | null>(null)
const router = useRouter()

async function submitLogIn() {
    if (form.value?.validate()) {
        try {
            await login(user)
            router.push('/')
        } catch (error) {
            console.error(error)
            Notify.create({
                message: error.message,
                color: 'negative',
                position: 'top'
            })
        }
    }
}


</script>

<style scoped>

.auth-top-text {
    align-self: stretch;
    color: var(--green, #0CD496);
    text-align: center;

    /* text-4xl/font-semiBold */
    font-family: Inter;
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
    line-height: 48px; /* 133.333% */
}

.item-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--Spacing-spacing-2xs, 4px);
    align-self: stretch;
    width: 536px;
}

.input-label{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--Spacing-spacing-2xs, 4px);
    align-self: stretch;
}

.text-input {
    flex: 1 0 0;
    color: var(--color-text-disabled, #A1A1AA);

    /* text-sm/font-regular */
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
}

.page-style {
    display: flex;
    width: auto;
    height: auto;
    padding: var(--Spacing-spacing-xl, 24px) 0px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--Spacing-spacing-2xl, 32px);
}

.card-style {
    text-transform: none;
    max-width: 800px;
    padding: 50px;
    border-radius: 10px;
    transform: translateY(-25%);
    height: 325px;
    position: relative; /* Add this line */
}

.logo-auth{
    display: flex;
    width: 227px;
    flex-direction: column;
    align-items: center;
    gap: 32px;
}

.face-google {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
}

.formular-forgor {
    display: flex;
    padding: 14px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--Spacing-spacing-md, 12px);
    align-self: stretch;
}

.fb-top-btn {
    display: flex;
    width: 270px;
    height: 50px;
    padding: 0px 16px 16px;
    align-items: flex-start;
    gap: 10px;

    border-radius: 10px;
    background: #1877F2;
    
    /* Shadows/md */
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.10);
}

.text-fb {
    color: #FFF;
    font-family: Quicksand;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: none;
}

.google-top-btn {
    display: flex;
    width: 270px;
    height: 50px;
    padding: 0px 16px 16px;
    align-items: flex-start;
    gap: 22px;

    border-radius: 10px;
    background: #FFF;
    
    /* Shadows/md */
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.10);
}

.text-ggl{
    color: rgba(0, 0, 0, 0.54);
    font-family: Quicksand;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: none;
}

.container-style {
    display: flex;
    justify-content: center;;
    width: 600px;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    background: var(--White, #FFF);
}

.big-auth {
    display: flex;
    padding: var(--Spacing-spacing-lg, 16px);
    justify-content: center;
    align-items: center;
    gap: var(--Spacing-spacing-sm, 8px);
    align-self: stretch;

    border-radius: var(--Radii-radius-button, 6px);
    background: var(--green, #0CD496);
    
    /* Shadows/sm-strong */
    box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(16, 24, 40, 0.10);
}

.no-acc{
    display: flex;
    align-items: center;
    gap: 16px;
}

.create-btn {
    display: flex;
    width: 200px;
    padding: var(--Spacing-spacing-lg, 16px);
    justify-content: center;
    align-items: center;
    gap: var(--Spacing-spacing-sm, 8px);

    border-radius: var(--Radii-radius-button, 6px);
    border: 1.5px solid var(--blue1, #2563EB);
    background: var(--color-bg, #FFF);
    
    /* Shadows/sm */
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}

.no-acc-text {
    color: var(--color-text, #09090B);
    /* text-sm/font-medium */
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */ 
}

.forgot-paswd{
    color: var(--color-icon-info, #2563EB);

    /* text-sm/font-semiBold */
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
}

</style>
