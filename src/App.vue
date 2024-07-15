<script setup lang="ts">
import 'vuetify/styles'
import {ref, onMounted} from "vue";
import ContactList from "./components/ContactList.vue";
import ContactForm from "./components/ContactForm.vue";
import {IContact} from "./interfaces";
import SearchBar from "./components/SearchBar.vue";

let contactsList = ref<IContact[]>([])

const filteredContacts = ref<IContact[] | null>([])
const formVivsibility = ref<boolean>(false)

function addNewContact(contact: IContact) {
  contactsList.value.push(contact)
  setToLocalStorage()
}

function deleteContact(id: number) {
  let index = contactsList.value.findIndex(el => el.id === id)
  contactsList.value.splice(index, 1)
  setToLocalStorage()
}

function toggleForm() {
  formVivsibility.value = !formVivsibility.value
}

function setToLocalStorage() {
  localStorage.setItem('contacts', JSON.stringify(contactsList.value))
}

function updateContact(id: number, contact: IContact) {
  let index = contactsList.value.findIndex(el => el.id === id)
  contactsList.value[index] = contact
  setToLocalStorage()
}

onMounted(async () => {
  if (localStorage.getItem('contacts')) {
    contactsList.value = JSON.parse(localStorage.getItem('contacts') || '[]') as IContact[]; // Парсим и типизируем
  } else {
    fetch('src/assets/data.json')
        .then((response) => response.json())
        .then((json) => {
              contactsList.value = json
              localStorage.setItem('contacts', JSON.stringify(json))
            }
        )
  }
})

</script>

<template>
  <section class="contacts">
    <SearchBar
        v-model:="filteredContacts"
        class="search"
        :contacts="contactsList"
    />
    <div class="container">
      <ContactList
          :contacts="filteredContacts ? filteredContacts : contactsList"
          @updateContact="updateContact"
          @add:contact="toggleForm"
          @delete:item="deleteContact"
      />
    </div>
    <transition name="fade">
      <ContactForm
          class="contact-form"
          v-if="formVivsibility"
          @add-new-contact="addNewContact"
          @close-form="toggleForm"
      />
    </transition>
  </section>
</template>

<style lang="sass" scoped>
.container
  margin: 100px auto 0
  height: 100vh

.fade-enter-active,
.fade-leave-active
  transition: opacity 0.5s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>
