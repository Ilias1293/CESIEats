<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile</ion-title>
        <ion-button fill="clear" @click="navigateToSettings" slot="end">
          <ion-icon :icon="settings" aria-hidden="true"></ion-icon>
          <!-- Settings -->
        </ion-button>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">

      

    </ion-content>

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

<script lang="ts">
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
    settings
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
          router.push({ path: '/settings' })
      }
      return {
        search,
        basket,
        home,
        personCircle,
        settings,
        beforeTabChange,
        afterTabChange,
        navigateToSettings
      }
    }
  });
</script>