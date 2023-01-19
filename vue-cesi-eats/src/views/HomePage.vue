<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title class="ion-text-center">Accueil - UwU Eats</ion-title>
          <img alt="UWU Eats Icon" src="../img/iconUwu.png" style="width:100px; padding: 20px;" slot="start"/>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-progress-bar type="indeterminate" v-if="isLoaded"></ion-progress-bar>
        <!-- <h1>Home</h1> -->
        <ion-cards>
          <ion-card @click="goToRestaurant(restaurantDesc.id_restaurant)" v-for="restaurantDesc in listeRestaurants.restaurantsDesc" :key="restaurantDesc.id_restaurant" style=" display: flex;">
            <img class="center" alt="genera" v-bind:src="require('@/img/'+getRandomIcon())" style=" width: 30%; order: -1;"/>
            <ion-card-header class="ion-text-center" style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 70%;">
              <ion-card-title>{{ restaurantDesc.restaurant_name }}</ion-card-title>
              <ion-card-subtitle>{{ restaurantDesc.id_restaurant }}</ion-card-subtitle>
            </ion-card-header>
          </ion-card>
        </ion-cards>
      
      </ion-content>

      <ion-footer class="ion-padding">
        <ion-tabs @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange">
          <ion-router-outlet></ion-router-outlet>
          <ion-tab-bar slot="bottom">
            <ion-tab-button tab="home" href="/home">
              <ion-icon :icon="home" aria-hidden="true"></ion-icon>
              <ion-label>Home</ion-label>
            </ion-tab-button>
      
            <!-- <ion-tab-button tab="search" href="/search">
              <ion-icon :icon="search" aria-hidden="true"></ion-icon>
              <ion-label>Recherche</ion-label>
            </ion-tab-button> -->
  
            <ion-tab-button tab="profile" href="/profile">
              <ion-icon :icon="personCircle" aria-hidden="true"></ion-icon>
              <ion-label>Profil</ion-label>
            </ion-tab-button>
  
            <ion-tab-button tab="orders" href="/orders">
              <ion-icon :icon="basket" aria-hidden="true"></ion-icon>
              <ion-label>Mes commandes</ion-label>
            </ion-tab-button>
  
          </ion-tab-bar>
        </ion-tabs>
      </ion-footer>


        
    </ion-page>
  </template>
  
<script lang="ts">
    import { defineComponent, onMounted, ref} from 'vue'
    import RestaurantCard from './RestaurantCard.vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import RestaurantPage from './RestaurantPage.vue'
    import { 
        IonContent,
        IonIcon, 
        IonLabel, 
        IonPage,
        IonRouterOutlet,
        IonTabBar, 
        IonTabButton, 
        IonTabs,
        IonCard,
        IonFooter
    } from '@ionic/vue';
    import { 
        personCircle, 
        search,
        home,
        basket,
        settings,
        restaurant,
        link,
        beer,
        fastFood,
        pizza,
    } from 'ionicons/icons';
    import Vue from 'vue';

    interface Restaurant {
        id: number;
        _id: string;
        name: string;
        logo: string;
        rating: number;
        deliveryFee: string;
        menu: {
            items: [{
                name: string;
                item_category: string;
                picture: string;
                description: string;
                price: number;
            }]
        }
    }

    export default defineComponent({
        components: { 
          IonIcon, IonLabel, 
          IonPage, 
          IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, 
          IonCard, IonContent,
        IonFooter},
        setup() {
          let isLoaded = false;
          const router = useRouter();
          const beforeTabChange = () => {
              // do something before tab change
          }
          const afterTabChange = () => {
              // do something after tab change
          }

          function goToRestaurant(id : number) {
            router.push({ path: `/restaurant/${id}` })
          } 

          interface RestaurantDesc {
              restaurant_name : string;
              id_restaurant : number;
          }

          const listeRestaurants = ref({
              restaurantsDesc: [] as RestaurantDesc[]
          })

          function getRandomIcon() {
            const icons = ["restaurant1.jpg", "restaurant2.jpg", 'restaurant3.jpg', 'restaurant4.jpg',
          'restaurant5.jpg','restaurant6.jpg','restaurant7.jpg','restaurant8.jpg','restaurant9.jpg'];
            const randomIndex = Math.floor(Math.random() * icons.length);
            return icons[randomIndex];
          }
          
          const fetchRestaurants = async() : Promise<void> => {
            axios.get('http://localhost:8888/api/V1/restaurants/name')
            .then(response => {
              if (response.status === 200) {
                console.log('Récupération des restaurants réussis.');
                const restaurants = response.data;
                //console.log(restaurants);
                for(const restaurant of restaurants){
                    const restaurantDesc: RestaurantDesc = {
                        restaurant_name: restaurant.restaurant_name,
                        id_restaurant: restaurant.id_restaurant
                    }
                
                listeRestaurants.value.restaurantsDesc.push(restaurantDesc);
                isLoaded = true;
                //console.log(restaurantDesc)
                }
                
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

          router.addRoute(
              {
                path: '/restaurant/:id_restaurant',
                component: RestaurantPage,
                name: 'restaurant'
              }
          )

          onMounted(() => {
              fetchRestaurants();
          });

          return {search,
            getRandomIcon,
            isLoaded,
            goToRestaurant,
            basket,
            home,
            personCircle,
            settings,
            beforeTabChange,
            afterTabChange, 
            listeRestaurants,
            restaurant,
            beer,
            fastFood,
            pizza,
            // fetchRestaurants
          }
        },
    })
</script>

<style>
ion-footer {
  height: 10%;
}
ion-tab-bar {
  bottom: 20px;
  position: relative;
  border-radius: 16px;
  width: 92%;
  margin: 0 auto;
}


</style>