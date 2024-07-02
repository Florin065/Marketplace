<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <q-btn @click="count++" label="Increment" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
