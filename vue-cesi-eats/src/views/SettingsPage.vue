<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title slot="end">Settings</ion-title>
        <ion-button @click="goBack" fill="clear">
          <ion-icon :icon="chevronBack" slot="start"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <h1>Settings</h1>
      <ion-grid>
        <ion-row v-for="restaurant in restaurants" :key="restaurant._id">
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
      </ion-grid>

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

<script>
import axios from 'axios';
import { defineComponent } from 'vue';
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
    settings,
    chevronBack
} from 'ionicons/icons';
import { useRouter } from 'vue-router';

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
      const navigateToSettings = () => {
        router.push({ name: 'settings' });
      }
      const goBack = () => {
        router.go(-1);
      }
      return {
          search,
          basket,
          home,
          personCircle,
          settings,
          beforeTabChange,
          afterTabChange,
          navigateToSettings,
          goBack,
          chevronBack,
          items: []
      }
      
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get('http://localhost:8888/restaurants');
                this.items = response.data;
                console.log(this.items)
            } catch (error) {
                console.error(error);
            }
        }
    }
});
</script>
<!-- 
<style>
.settings-button {
  --background: #00bcd4;
  --color: white;
  padding: 10px 15px;
  font-size: 18px;
  border-radius: 10px;
}
</style> -->