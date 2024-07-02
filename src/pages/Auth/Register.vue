<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="register">
        <input type="text" v-model="form.name" placeholder="Name" />
        <input type="email" v-model="form.email" placeholder="Email" />
        <input type="password" v-model="form.password" placeholder="Password" />
        <button type="submit">Register</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Register',
    setup() {
        const form = ref({
            name: '',
            email: '',
            password: '',
        });

        const register = () => {
            console.log(form.value);
        };

        return {
            form,
            register,
        };
    },
});
</script>

<style scoped>
h1 {
    font-size: 100px;
    margin: 0;
    padding: 0;
    line-height: 1;
    font-weight: 100;
    color: #333;
}

input {
    display: block;
    margin-bottom: 10px;
    padding: 10px;
    width: 100%;
}

button {
    background-color: #333;
    color: white;
    padding: 10px;
    width: 100%;
    border: none;
}

button:hover {
    background-color: #555;
}

button:active {
    background-color: #777;
}

button:focus {
    outline: none;
}

button:disabled {
    background-color: #999;
}

button:disabled:hover {
    background-color: #999;
}

button:disabled:active {
    background-color: #999;
}

button:disabled:focus {
    outline: none;
}

button:disabled {
    cursor: not-allowed;
}

button:disabled:hover {
    cursor: not-allowed;
}

button:disabled:active {
    cursor: not-allowed;
}

button:disabled:focus {
    cursor: not-allowed;
}

button:disabled {
    opacity: 0.5;
}

button:disabled:hover {
    opacity: 0.5;
}

button:disabled:active {
    opacity: 0.5;
}

button:disabled:focus {
    opacity: 0.5;
}

</style>