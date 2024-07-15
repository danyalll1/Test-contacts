<script lang="ts" setup>
import {IContact} from "../interfaces";
import {computed, ref, watch} from "vue";

const props = defineProps<{
  contacts: IContact[]
}>()

const emits = defineEmits(['update:modelValue'])

const searchQuery = ref<string|null>(null)

const filteredContacts = computed(()=>{
  if(searchQuery.value){
    return props.contacts.filter((el:IContact)=>{
      if(searchQuery.value){
        return el.name.includes(searchQuery.value) || el.phone.includes(searchQuery.value) || el.email.includes(searchQuery.value) || el.surName.includes(searchQuery.value)
      }
    })
  }else{
    return props.contacts
  }
})

function sendArray(){
  emits('update:modelValue', filteredContacts.value)
}

watch(filteredContacts,(newValue) =>{
  emits('update:modelValue' , newValue)
})

</script>

<template>
  <div class="searchBar">
    <v-text-field
        @input="sendArray"
        v-model="searchQuery"
        hide-details
        class="bg-white"
        label="Search"
    />
  </div>
</template>

<style lang="sass" scoped>
  .searchBar
    max-width: 600px
    padding: 16px 32px
    background-color: #caf8bc
    margin: 0 auto
    border-radius: 0 0 10px 10px

</style>