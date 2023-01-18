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
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  } from '@ionic/vue';

export default defineComponent({
    components: { IonContent, IonHeader, IonPage, IonTitle, IonToolbar },

    mounted() {
      this.id = this.$route.params.id;
    },

    setup() {
      const id = '';

      // const fetchRestaurant = async() : Promise<void> => {
      //   axios.get('http://localhost:8888/restaurant/name')
      //   .then(response => {
      //     if (response.status === 200) {
      //       console.log('Récupération des restaurants réussis.');
      //       const restaurants = response.data;
      //       for(const restaurant of restaurants){
      //           const restaurantDesc: RestaurantDesc = {
      //               restaurant_name: restaurant.restaurant_name,
      //               id_restaurant: restaurant.id_restaurant
      //           }
            
      //       listeRestaurants.value.restaurantsDesc.push(restaurantDesc);
      //       console.log(restaurantDesc)
      //       }
            
      //     }
      //     else {
      //       console.log('Erreur')
      //     }
      //   })
      //   .catch(error => {
      //     console.log("Erreur de récuperation des restaurants.", error)
      //     //router.push({ path: '/login', force: true });
      //   })
      // },

      // const fetchMenu = async() : Promise<void> => {
      //   axios.get('http://localhost:8888/restaurant/name')
      //   .then(response => {
      //     if (response.status === 200) {
      //       console.log('Récupération des restaurants réussis.');
      //       const restaurants = response.data;
      //       for(const restaurant of restaurants){
      //           const restaurantDesc: RestaurantDesc = {
      //               restaurant_name: restaurant.restaurant_name,
      //               id_restaurant: restaurant.id_restaurant
      //           }
            
      //       listeRestaurants.value.restaurantsDesc.push(restaurantDesc);
      //       console.log(restaurantDesc)
      //       }
            
      //     }
      //     else {
      //       console.log('Erreur')
      //     }
      //   })
      //   .catch(error => {
      //     console.log("Erreur de récuperation des restaurants.", error)
      //     //router.push({ path: '/login', force: true });
      //   })
      // },

      // onMounted(() => {

      //   fetchRestaurant();
      //   fetchMenu();
        
      // });

      return { 
        id,
        onMounted, 
      }
    }
    
    
    
});
</script>