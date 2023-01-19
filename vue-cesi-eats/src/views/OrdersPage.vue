<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-title class="ion-text-center">Vos commandes - UwU Eats</ion-title>
          <img alt="UWU Eats Icon" src="../img/iconUwu.png" style="width:100px; padding: 20px;" slot="start"/>
        </ion-toolbar>
      </ion-header>

    <!-- <ion-content>
      <ion-list>
        <ion-item v-for="item in basket" :key="item.id">
          {{ item.name }} - {{ item.price }}
        </ion-item>
      </ion-list>
    </ion-content> -->
    
    <ion-content class="ion-padding">Orders</ion-content>

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
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
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
    basket
  } from 'ionicons/icons';

  interface Basket {
        id: number;
        _id: string;
        name: string;
        logo: string;
        menu: {
            items: [{
                name: string;
                numberofitems : number;
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

      const Basket = ref({
        basket: [] as Basket[]
      })

    const displayBasket = async() : Promise<void> => {
    axios.get('http://localhost:8888/basket')
    .then(response => {
                    if (response.status === 200) {
                    console.log('Affichage du panier réussi');
                    Basket.value.basket = response.data;
                    console.log(Basket.value.basket);
                    }
                    else {

                    console.log('Erreur')
                    }
                })
                .catch(error => {
                    console.log("Erreur du display Basket", error)
                })
            }

      return {
        search,
        basket,
        home,
        personCircle,
        beforeTabChange,
        Basket,
        displayBasket,
        afterTabChange
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