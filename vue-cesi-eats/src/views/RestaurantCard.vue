<template>
    <ion-card>
      <ion-img :src="restaurant.logo" />
      <ion-card-header>
        <ion-card-title>{{ restaurant.name }}</ion-card-title>
      </ion-card-header>
    </ion-card>
  </template>

<script lang="ts">
import { defineComponent, Prop } from 'vue'

interface Restaurant {
  name: string;
  logo: string;
  rating: number;
  deliveryFee: string;
}

export default defineComponent({
  props: {
    restaurant: {
      type: Object as () => Restaurant,
      required: true
    }
  },
  template: `
    <ion-card>
      <ion-img :src="restaurant.logo" />
      <ion-card-header>
        <ion-card-title>{{ restaurant.name }}</ion-card-title>
      </ion-card-header>
    </ion-card>
  `
})
</script>