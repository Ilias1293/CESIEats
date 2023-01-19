<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title slot="end">Statistics Restaurateur</ion-title>
        <ion-button @click="redirectProfile()" fill="clear">
          <ion-icon :icon="chevronBack" slot="start"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <h1>Statistics Restaurateur</h1>

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
  
    components: { 
      // IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs 
    },
    setup() {
      
      const router = useRouter();
      function redirectProfile() {
      window.location.href = "/profile";
      }
      const beforeTabChange = () => {
        // do something before tab change
      }
      const afterTabChange = () => {
        // do something after tab change
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
          goBack,
          chevronBack,
          items: [],
          redirectProfile
      }
      
    },
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