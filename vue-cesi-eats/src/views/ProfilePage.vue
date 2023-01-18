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

        <ion-item>
          <ion-label position="floating">Nom</ion-label>
          <ion-input v-model="profileData.name" ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Prénom</ion-label>
          <ion-input v-model="profileData.surname"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Date de naissance</ion-label>
          <ion-input v-model="profileData.birth" type="birth"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Numéro de téléphone</ion-label>
          <ion-input v-model="profileData.phone_number" type="string"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="email" disabled></ion-input>
        </ion-item>
        <ion-button @click="updateProfile" expand="block">Mettre à jour</ion-button>
        <ion-button @click="deleteProfile" expand="block">Supprimer</ion-button>

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
  import { defineComponent, ref, onMounted } from 'vue';
  import { 
    IonIcon, 
    IonLabel, 
    IonPage,
    IonRouterOutlet,
    IonTabBar, 
    IonTabButton, 
    IonTabs,
    IonInput,
    IonItem,
    IonContent,
    IonButton,
    IonTitle,
    IonToolbar,
    IonHeader } from '@ionic/vue';
  import { 
    personCircle, 
    search,
    home,
    basket,
    settings
  } from 'ionicons/icons';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import Vue from 'vue';

  axios.defaults.withCredentials = true;

  export default defineComponent({

    components: {     
    IonIcon, 
    IonLabel, 
    IonPage,
    IonRouterOutlet,
    IonTabBar, 
    IonTabButton, 
    IonTabs,
    IonInput,
    IonItem,
    IonContent,
    IonButton,
    IonTitle,
    IonToolbar },

  setup() {
    
    //let keys = ref([])
    const profileData = ref({
          surname: '',
          name: '',
          birth: '',
          phone_number: ''
        })
    const email = ref('')

    const beforeTabChange = () => {
        // do something before tab change
    }
    const afterTabChange = () => {
      // do something after tab change
    }

    const navigateToSettings = () => {
        router.push({ path: '/settings' })
    }

    const router = useRouter();

    function redirect(page : string) {
      window.location.href = page;
    }
    
    const getProfile = async() : Promise<void> => {
          

      axios.get('http://localhost:8888/user')
      .then(response => {
        if (response.status === 200) {
          console.log('Récupération de l\'utilisateur réussie.');
          
          const tabJson = response.data;
          console.log(tabJson);
          profileData.value.surname = tabJson.surname;
          profileData.value.name = tabJson.name;
          profileData.value.birth = tabJson.birth;
          profileData.value.phone_number = tabJson.phone_number;
          email.value = tabJson.email;
          console.log(profileData);
          //keys = Object.keys(data[0]);
          
        }
        else {
          console.log('Erreur')
        }
      })
      .catch(error => {
        console.log("Erreur d'authentification", error)
        //router.push({ path: '/login', force: true });
      })
    }

    const surname = profileData.value.surname;
    const name = profileData.value.name;
    const birth = profileData.value.birth;
    const phone_number = profileData.value.phone_number;

    const updateProfile = async() : Promise<void> => {
      axios.put('http://localhost:8888/user', {surname,name,birth,phone_number})
        .then(response => {
          if (response.status === 200) {
            console.log('Mise à jour réussie');
            console.log(profileData);
          }
          else {
            console.log('Erreur')
          }
        })
        .catch(error => {
          console.log("Erreur de mise à jour", error)
        })
    }

    const deleteProfile = async() : Promise<void> =>  {
      axios.delete('http://localhost:8888/user')
        .then(response => {
          if (response.status === 200) {
          console.log('Profil supprimé');
          redirect('/home');
          }
          else {
          console.log('Erreur')
          }
          })
          .catch(error => {
          console.log("Erreur de suppression", error)
          })
    }

    onMounted(() => {
      getProfile();
    });

    return { 
      profileData,
      email,
      search,
      basket,
      home,
      personCircle,
      settings,
      getProfile,
      updateProfile,
      deleteProfile,
      beforeTabChange,
      afterTabChange,
      navigateToSettings }
    }

  });
</script>