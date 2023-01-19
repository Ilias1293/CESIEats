<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Rechercher - UwU Eats</ion-title>
          <img alt="UWU Eats Icon" src="../img/iconUwu.png" style="width:5%; padding: 20px;" slot="start"/>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">Rechercher</ion-content>

    <ion-footer class="ion-padding">
        <ion-tabs @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange">
          <ion-router-outlet></ion-router-outlet>
          <ion-tab-bar slot="bottom">
            <ion-tab-button tab="home" href="/home">
              <ion-icon :icon="home" aria-hidden="true"></ion-icon>
              <ion-label>Home</ion-label>
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
      </ion-footer>
  </ion-page>
</template>

<script>
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
    basket
  } from 'ionicons/icons';

  export default defineComponent({
    components: { IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs },
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
    }
  });
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