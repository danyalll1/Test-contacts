<script setup lang="ts">
import {reactive} from "vue";
import { vMaska } from "maska/vue"
import useVuelidate from "@vuelidate/core";
import {required, email} from "@vuelidate/validators";
import {IContact} from "../interfaces";

const emits = defineEmits(['closeForm', 'addNewContact'])

let newContact = reactive<IContact>({
  id: 0,
  name: '',
  surName:'',
  phone:'',
  email:'',
})

const maska ={mask: '+7 (###) ### ## ##'}

const rules = {
  id: {required},
  name: {required},
  surName: {required},
  phone: {required},
  email: {required , email}
}

const v$ = useVuelidate( rules, newContact)

async function addNewContact(){
  newContact.id = Date.now()
  const validate = await v$.value.$validate()
  if(validate){
    emits("addNewContact", newContact)
    newContact = {
      id: 0,
      name: '',
      surName:'',
      phone:'',
      email:'',
    }
    emits('closeForm')
  }
}

</script>

<template>
    <div class="form__wrapper">
      <form class="form" action="">
        <v-text-field
            :error="v$.name.$error"
            v-model="newContact.name"
            aria-required="true"
            label="name"
            prepend-icon="mdi-account-outline"
        />
        <v-text-field
            :error="v$.surName.$error"
            v-model="newContact.surName"
            aria-required="true"
            label="surname"
            prepend-icon="mdi-card-account-details-outline"
        />
        <v-text-field
            :error="v$.email.$error"
            v-model="newContact.email"
            aria-required="true"
            label="email"
            prepend-icon="mdi-email"
        />
        <v-text-field
            :error="v$.phone.$error"
            v-model="newContact.phone"
            aria-required="true"
            label="phone"
            prepend-icon="mdi-phone"
            v-maska=maska
        />
        <v-icon
            @click="$emit('closeForm')"
            class="form__close"
            icon="mdi-close"
        />
        <v-btn
            style="width: 100%"
            @click="addNewContact"
        >
          Add
        </v-btn>
      </form>
    </div>
</template>

<style lang="sass" scoped>
  .form__wrapper
    left: 0
    right: 0
    top: 0
    bottom: 0
    position: fixed
    display: flex
    justify-content: center
    align-items: center
    background-color: rgba(0, 0, 0, 0.6)

  .form
    border-radius: 12px
    position: relative
    background-color: white
    width: 600px
    padding: 32px 64px

    &__close
      cursor: pointer
      position: absolute
      top: 16px
      right: 16px

</style>