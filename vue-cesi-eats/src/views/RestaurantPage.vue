<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Restaurant</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Restaurant ID: {{ id }}</p>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  } from '@ionic/vue';
  import axios from 'axios';

export default defineComponent({
    components: { IonContent, IonHeader, IonPage, IonTitle, IonToolbar },

    mounted() {
      this.id = this.$route.params.id;
    },

    setup() {
      const id = '';
      const name_restaurant = ref('');

      const fetchRestaurant = async() => {
        console.log('http://localhost:8888/api/V1/restaurant/name/'+id)
        axios.get('http://localhost:8888/api/V1/restaurant/name/'+id)
        .then(response => {
          if (response.status === 200) {
            console.log('Récupération du nom de restau réussi.');
            name_restaurant.value = response.data;
            console.log(name_restaurant)
            }

            else {
              console.log('Erreur')
            }
        })
        .catch(error => {
          console.log("Erreur de récuperation du nom du restau.", error)
          //router.push({ path: '/login', force: true });
        })
      }

      const fetchMenu = async() => {
        axios.get('http://localhost:8888/api/V1/restaurant/name')
        .then(response => {
          if (response.status === 200) {
            console.log('Récupération des restaurants réussis.');
            const restaurants = response.data;
            console.log(restaurants)
            }

          else {
            console.log('Erreur')
          }
        })
        .catch(error => {
          console.log("Erreur de récuperation des restaurants.", error)
          //router.push({ path: '/login', force: true });
        })
      }

      onMounted(() => {

        fetchRestaurant();
        fetchMenu();
        
      });

      return { 
        id,
        onMounted, 
        fetchRestaurant,
        fetchMenu,
        name_restaurant
      }
    }
    
    
    
});
</script>