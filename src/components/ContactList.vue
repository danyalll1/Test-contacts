<script setup lang="ts">
import {ref} from "vue";
import {IContact} from "../interfaces";
import ContactItem from "./ContactItem.vue";

defineProps<{
  contacts: IContact[];
}>()

const emits = defineEmits(["updateContact", "add:contact", 'delete:item']);

const isActive = ref(true)

function addContact(){
emits("add:contact")
}

function deleteItem(id:number){
  emits('delete:item', id)
}

function updateItem(id:number, contact:IContact){
  emits('updateContact',id , contact)
}


</script>

<template>
  <div :class="{ hidden: isActive }" class="list__container">
    <div class="list">
      <transition-group name="list">
        <ContactItem
            class="list__item"
            v-for="item in contacts"
            :contact="item"
            @updateContact="updateItem"
            @delete-item="deleteItem"
            :key="item.id"
        />
      </transition-group>
      <div
          @click="addContact"
          class="addContact"
      >
        <v-icon
            icon="mdi-plus-box"
            size="80"
        />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>

  .list
    display: grid
    grid-template-columns: repeat( 3, minmax(400px, 1fr) )
    grid-gap: 24px

    &__item
      transition: ease-in 0.1s
      &:hover
        cursor: pointer
        background-color: greenyellow

  .addContact
    cursor: pointer
    display: flex
    align-items: center
    justify-content: center
    padding: 0px 48px
    border-radius: 10px
    background-color: #caf8bb

.list-move,
.list-enter-active,
.list-leave-active
  transition: all 0.5s ease

.list-enter-from,
.list-leave-to
  opacity: 0
  transform: translateX(30px)

.list-leave-active
  position: absolute
</style>