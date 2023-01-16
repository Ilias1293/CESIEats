<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <h1>Home</h1>
        <!-- <ion-grid>
          <ion-row v-for="restaurant in Restaurants" :key="restaurant.id">
            <ion-col v-for="item in restaurant.menu.items" :key="item.name">
              <ion-card>
                <ion-card-header>
                  <ion-card-title>{{ item.name }}</ion-card-title>
                  <ion-card-subtitle>{{ item.item_category }}</ion-card-subtitle>
                </ion-card-header>
  
                <ion-card-content>
                  <img :src="item.picture" alt="item picture">
                  <p>{{ item.description }}</p>
                  <p>Price: {{ item.price }}</p>
                  <ion-button :data-restaurant-id="restaurant.id">Add to cart</ion-button>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid> -->
  
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
        </ion-tabs> -->
      </ion-content>
    </ion-page>
  </template>
  
<script lang="ts">
    import { defineComponent, onMounted, ref } from 'vue'
    import RestaurantCard from './RestaurantCard.vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import { 
        IonIcon, 
        IonLabel, 
        IonPage,
        IonRouterOutlet,
        IonTabBar, 
        IonTabButton, 
        IonTabs
    } from '@ionic/vue';
    import { 
        personCircle, 
        search,
        home,
        basket,
        settings
    } from 'ionicons/icons';

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
        components: { IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs },
        setup() {
            const router = useRouter();
            const beforeTabChange = () => {
                // do something before tab change
            }
            const afterTabChange = () => {
                // do something after tab change
            }

            const Restaurants = ref({
                restaurants: [] as Restaurant[]
            })

            const fetchRestaurants = async() : Promise<void> => {

                axios.get('http://localhost:8888/restaurants')
                .then(response => {
                    if (response.status === 200) {
                    console.log('Fetch réussie');
                    Restaurants.value.restaurants = response.data;
                    console.log(Restaurants.value.restaurants);
                    //router.push({ path: '/home', force: true });
                    //isLoginTrue = true;
                    }
                    else {

                    console.log('Erreur')
                    }
                })
                .catch(error => {
                    console.log("Erreur du fetch", error)
                })
            }
            onMounted(() => {
                fetchRestaurants();
            });
        return {search,
            basket,
            home,
            personCircle,
            settings,
            beforeTabChange,
            afterTabChange, 
            Restaurants, 
            fetchRestaurants}
        },
    })
</script>