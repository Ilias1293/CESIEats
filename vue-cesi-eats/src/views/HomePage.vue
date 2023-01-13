<template>
  <ion-page>
    <ion-card>
      <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
      <ion-card-header>
        <ion-card-title>Card Title</ion-card-title>
        <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        Here's a small text description for the card content. Nothing more, nothing less.
      </ion-card-content>

    </ion-card>

    
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
  </ion-page>
</template>

<script>
  import { axios } from 'axios';
  import { defineComponent } from 'vue';
  import { 
    IonIcon, 
    IonLabel, 
    IonPage,
    IonRouterOutlet,
    IonTabBar, 
    IonTabButton, 
    IonTabs,
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle
  } from '@ionic/vue';
  import { 
    personCircle, 
    search,
    home,
    basket
  } from 'ionicons/icons';

  
  export default defineComponent({
    components: { IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle },
    setup() {
      const beforeTabChange = () => {
        // do something before tab change
      }
      const afterTabChange = () => {
        // do something after tab change
      }
      return {
        search,
        basket,
        home,
        personCircle,
        beforeTabChange,
        afterTabChange
      }
    },
    data() {
      return {
        items: []
      }
    },
    created() {
      axios.get('http://localhost:8888/restaurants')
        .then(response => {
          this.items = response.data;
        });
    }
  });

  
</script>

<style scoped>
  /* iOS places the subtitle above the title */
  ion-card-header.ios {
    display: flex;
    flex-flow: column-reverse;
  }
</style>