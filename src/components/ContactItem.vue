<script setup lang="ts">
import {ref} from "vue";
import { vMaska } from "maska/vue"
import {email, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {IContact} from "../interfaces";

const props = defineProps<{
  contact: IContact
}>()
const emits = defineEmits(['deleteItem', 'updateContact'])
const maska ={mask: '+7 (###) ### ## ##'}
const thisContact = ref<IContact>(props.contact)
const rules = {
  id: {required},
  name: {required},
  surName: {required},
  phone: {required},
  email: {required , email}
}
const v$ = useVuelidate( rules, thisContact)

function deleteItem(){
  emits('deleteItem', props.contact.id)
}

async function updateContact(){
  const validate = await v$.value.$validate()
  if(validate){
    emits('updateContact', props.contact.id, thisContact.value)
    }
}

</script>

<template>
  <div class="contact">
    <v-text-field
      :error="v$.name.$error"
      v-model="thisContact.name"
      hide-details
      @input="updateContact"
    />
    <v-text-field
      :error="v$.surName.$error"
      v-model="thisContact.surName"
      hide-details
      @input="updateContact"
    />
    <v-text-field
      :error="v$.email.$error"
      v-model="thisContact.email"
      hide-details
      @input="updateContact"
    />
    <v-text-field
      :error="v$.phone.$error"
      v-model="thisContact.phone"
      hide-details
      v-maska=maska
      @input="updateContact"
    />
    <v-icon
        class="contact__close"
        icon="mdi-close"
        @click="deleteItem"
    />
  </div>
</template>

<style lang="sass" scoped>
  .contact
    position: relative
    padding: 32px 48px
    border-radius: 10px
    background-color: #caf8bb
    display: grid
    gap: 8px
    grid-template-columns: repeat(2, minmax(200px, 1fr))

    &__name,
    &__phone,
    &__surName,
    &__email
      max-width: 180px
      overflow: hidden
      text-overflow: ellipsis

    &__close
      cursor: pointer
      position: absolute
      right: 16px
      top: 16px
      transition: color ease-in 0.1s
      &:hover
        color: white

</style>