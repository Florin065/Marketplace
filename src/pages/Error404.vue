<template>
    <div>
        <h1>404</h1>
        <p>Page not found</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Error404',
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
</style>