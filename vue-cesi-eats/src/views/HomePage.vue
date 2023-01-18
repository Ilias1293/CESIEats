<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <!-- <h1>Home</h1> -->
        
          <ion-card @click="goToRestaurant(restaurantDesc.id_restaurant)" v-for="restaurantDesc in listeRestaurants.restaurantsDesc" :key="restaurantDesc.id_restaurant">
              <ion-card-header>
                <ion-card-title>{{ restaurantDesc.restaurant_name }}</ion-card-title>
                <!-- <ion-card-subtitle>{{ restaurantDesc.id_restaurant }}</ion-card-subtitle> -->
              </ion-card-header>
          </ion-card>
        
  
      </ion-content>
      <ion-content>
        <ion-tabs @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange">
          <!-- https://ionicframework.com/docs/vue/navigation#working-with-tabs -->
          <ion-router-outlet></ion-router-outlet>
          <ion-tab-bar slot="bottom">
  
            <ion-tab-button tab="home" href="/home">
              <ion-icon :icon="home" aria-hidden="true"></ion-icon>
              <ion-label>Home</ion-label>
              <!-- <ion-badge>6</ion-badge> -->
            </ion-tab-button>
      
            <ion-tab-button tab="search" href="/search">
              <ion-icon :icon="search" aria-hidden="true"></ion-icon>
              <ion-label>Recherche</ion-label>
            </ion-tab-button>
  
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
      </ion-content>
    </ion-page>
  </template>
  
<script lang="ts">
    import { defineComponent, onMounted, ref } from 'vue'
    import RestaurantCard from './RestaurantCard.vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import RestaurantPage from './RestaurantPage.vue'

    import { 
        IonIcon, 
        IonLabel, 
        IonPage,
        IonRouterOutlet,
        IonTabBar, 
        IonTabButton, 
        IonTabs,
        IonCard
    } from '@ionic/vue';
    import { 
        personCircle, 
        search,
        home,
        basket,
        settings,
restaurant,
link
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
        components: { IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonCard },
        setup() {
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
          
          const fetchRestaurants = async() : Promise<void> => {
            axios.get('http://localhost:8888/api/V1/restaurants/name')
            .then(response => {
              if (response.status === 200) {
                console.log('Récupération des restaurants réussis.');
                const restaurants = response.data;
                for(const restaurant of restaurants){
                    const restaurantDesc: RestaurantDesc = {
                        restaurant_name: restaurant.restaurant_name,
                        id_restaurant: restaurant.id_restaurant
                    }
                
                listeRestaurants.value.restaurantsDesc.push(restaurantDesc);
                console.log(restaurantDesc)
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
                path: '/restaurant/:id',
                component: RestaurantPage,
                name: 'restaurant'
              }
          )

          onMounted(() => {
              fetchRestaurants();
          });

          return {search,
              goToRestaurant,
              basket,
              home,
              personCircle,
              settings,
              beforeTabChange,
              afterTabChange, 
              listeRestaurants,
              // fetchRestaurants
          }
        },
    })
</script>