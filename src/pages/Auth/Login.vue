<template>
    <q-page class=" flex-center" style="display: flex; justify-content: center; align-items: center; height: 100vh;">
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
        <q-page-container class="container-style">
            <q-card-section horizontal style="display: flex; justify-content: space-between">
                <q-card-section vertical>
                <q-toolbar style="margin-bottom: 30px">
                    <q-img 
                    src="~/src/assets/logo.png" 
                    alt="Quasar logo"
                    style="width: 100px; height: 100px; margin-left: 40px"
                    fit="contain"
                    ratio="16/9"
                    />
                </q-toolbar>
                <q-card class="text-h6" style="color: #01ff9c; font-size: 40px;" :flat="true">Autentificare</q-card>
            </q-card-section>
                <q-card-actions vertical >
                    <q-btn 
                        class="button-style top-btn"
                        icon="F" 
                        size="lg"
                        style="margin-bottom: 30px; margin-top:30px;" 
                        color="blue"
                    >
                        Continua cu Facebook
                    </q-btn>
                    <q-btn 
                        class="button-style top-btn"
                        text-color="blue-grey"
                        size="lg"
                        icon="G"
                    >  
                        Continua cu Google
                    </q-btn>
                </q-card-actions>
            </q-card-section>

            <q-form ref="form" @submit="submitLogIn">
                <q-card class="text-h6" align="left" style="font-size: 17px; margin-top: 20px" :flat="true">Email</q-card>
                <q-input
                v-model="user.email"
                class="label-style"
                placeholder="exemplu@gmail.com"
                style="margin-bottom: 0px; height: 60px"
                standout
                outlined
                :dense="true"
                />
                <q-card class="text-h6" align="left" style="font-size: 17px" :flat="true">Parola</q-card>
                <q-input
                v-model="user.password"
                class="label-style"
                placeholder="Introdu parola ta"
                type="password"
                style="margin-bottom: -10px; height: 60px"
                standout
                outlined
                :dense="true"
                />

                <div class="q-gutter-x-sm text-left" style="margin-left: 10px">
                    <router-link to="/forgot-password" class="text-h6" style="font-size: 14px;">Am uitat parola</router-link>
                </div>

                <q-card-actions vertical class="q-px-md action-style" flat bordered style="margin-top: 20px">
                    <q-btn 
                        class = "button-style atn"
                        label="Autentificare"
                        style="height: 50px; width: 100%; background-color: #01ff9c; color: #ffff"
                        :ripple="true"
                        :disable="!isOn()"
                        type="submit"
                    />
                </q-card-actions>
                <q-card-actions class="q-px-md" align="center">
                    <q-card class="text-h6" style="font-size: 15px; margin-right: 20px;" :flat="true">Nu ai cont inca?</q-card>
                    <q-btn
                    class="button-style"
                    label="Creeaza cont"
                    bordered
                    text-color="blue"
                    to="/register"
                    style="height: 40px; width: 150px"
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

.card-style {
    max-width: 800px;
    padding: 50px;
    border-radius: 10px;
    transform: translateY(-25%);
    height: 325px;
    position: relative; /* Add this line */
}

.label-style {
    font-size: 12px;
}

.container-style {
    min-width: 60vh;

}

.action-style {
    width: 111.25%;
    transform: translateX(-5%)
    
}

.button-style {
    border-radius: 10px;
    text-transform: none;
}

.top-btn {
    height: 15%;
}

.atn {
    height: 5vh;
}

</style>
