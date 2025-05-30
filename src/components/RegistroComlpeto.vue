<template>
  <div>
    <RegisterComponent @persona-registrada="guardarIdPersona" />
    <UsuarioComponent v-if="idPersona" :id-persona="idPersona" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RegisterComponent from './RegisterComponent.vue'
import UsuarioComponent from './UsuarioComponent.vue'

const idPersona = ref(null)

function guardarIdPersona(id) {
  idPersona.value = id
}
</script>