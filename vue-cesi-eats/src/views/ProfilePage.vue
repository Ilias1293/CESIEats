<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile</ion-title>
        <ion-button v-if="profileData.role=='1'" fill="clear" @click="redirect('/statistics/client')" slot="end">
          <ion-icon :icon="statsChart" aria-hidden="true"></ion-icon>
          <!-- Statistics Client -->
        </ion-button>
        <ion-button v-if="profileData.role=='2'" fill="clear" @click="redirect('/statistics/restaurateur')" slot="end">
          <ion-icon :icon="statsChart" aria-hidden="true"></ion-icon>
          <!-- Statistics Restaurateur -->
        </ion-button>
        <ion-button v-if="profileData.role=='3'" fill="clear" @click="redirect('/statistics/livreur')" slot="end">
          <ion-icon :icon="statsChart" aria-hidden="true"></ion-icon>
          <!-- Statistics Livreur -->
        </ion-button>
      </ion-toolbar>
    </ion-header>
    
    <ion-content v-if="profileData.name" class="ion-padding">
        <ion-item>
          <ion-avatar slot="start">
            <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
          </ion-avatar>
          <ion-label>{{profileData.name}} {{ profileData.surname }} ! Prêt à prendre du poids ?</ion-label>
          <ion-label slot="end">Votre sponsorship code => {{ sponsorshipCodeClient }}</ion-label>
        </ion-item>
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
          <ion-label position="floating">Statut (Rôle)</ion-label>
          <ion-input v-if="profileData.role=='1'" value="Client" disabled></ion-input>
          <ion-input v-if="profileData.role=='2'" value="Restaurateur" disabled></ion-input>
          <ion-input v-if="profileData.role=='3'" value="Livreur" disabled></ion-input>
        </ion-item>
        <ion-button @click="updateProfile" expand="block">Mettre à jour</ion-button>
        <ion-button @click="deleteProfile" expand="block">Supprimer</ion-button>
        <ion-button @click="deconnect" expand="block" >Se déconnecter</ion-button>

    </ion-content>
    <ion-content v-if="!profileData.name" class="ion-padding" >
      <img alt="genera" v-bind:src="require('@/img/pasDeCompte.jpg')" style="display: flex; justify-content: center;"/>
      <ion-button @click="redirect('/login')" expand="block" >Se connecter</ion-button>
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
    IonHeader,
    IonAvatar } from '@ionic/vue';
  import { 
    personCircle, 
    search,
    home,
    basket,
    settings,
    statsChart
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
    IonToolbar,
    IonAvatar },

    

    computed: {

    },

  setup() {
    
    //let keys = ref([])
    const profileData = ref({
          surname: '',
          name: '',
          birth: '',
          phone_number: '',
          role: '',
        })
    const email = ref('')

    const sponsorshipCodeClient = ref("")

    const beforeTabChange = () => {
        // do something before tab change
    }
    const afterTabChange = () => {
      // do something after tab change
    }

    function redirect(page : string) {
      window.location.href = page;
    }

    const router = useRouter();
    const getProfile = async() : Promise<void> => {
          

      axios.get('http://localhost:8888/api/V1/user')
      .then(response => {
        if (response.status === 200) {
          console.log('Récupération de l\'utilisateur réussie.');
          
          const tabJson = response.data;
          console.log(tabJson);
          profileData.value.surname = tabJson.surname;
          profileData.value.name = tabJson.name;
          profileData.value.birth = tabJson.birth;
          profileData.value.phone_number = tabJson.phone_number;
          profileData.value.role = tabJson.role;
          email.value = tabJson.email;
          console.log(profileData);
          //keys = Object.keys(data[0]);
          
        }
        else {
          console.log('Erreur')
        }
      })
      .catch(error => {
        console.log("Récupération de l'utilisateur ratée.", error)
        //router.push({ path: '/login', force: true });
      })
    }

    const deconnect = async() : Promise<void> => {
          

          axios.post('http://localhost:8888/api/V1/logout')
          .then(response => {
            if (response.status === 200) {
              
              console.log("Déconnexion avec succès.");
              redirect("/home");
              
            }
            else {
              console.log('Erreur')
            }
          })
          .catch(error => {
            console.log("Déconnexion echoué.", error)
            
          })
        }

    const getSponsorshipCode = async() : Promise<void> => {
          

          axios.get('http://localhost:8888/api/V1/sponsorship')
          .then(response => {
            if (response.status === 200) {
              console.log('Récupération du sponsorship code réussie.');
              
              const tabJson = response.data;
              sponsorshipCodeClient.value = tabJson.sponsorship;
              console.log(sponsorshipCodeClient.value);
              //keys = Object.keys(data[0]);
              
            }
            else {
              console.log('Erreur')
            }
          })
          .catch(error => {
            console.log("Récupération du sponsorship code ratée.", error)
            //router.push({ path: '/login', force: true });
          })
        }

    const surname = profileData.value.surname;
    const name = profileData.value.name;
    const birth = profileData.value.birth;
    const phone_number = profileData.value.phone_number;

    const updateProfile = async() : Promise<void> => {
      axios.put('http://localhost:8888/api/V1/user', {surname,name,birth,phone_number})
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
      axios.delete('http://localhost:8888/api/V1/user')
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
      getSponsorshipCode();
    });

    return { 
      sponsorshipCodeClient,
      profileData,
      email,
      search,
      basket,
      home,
      personCircle,
      settings,
      statsChart,
      getProfile,
      updateProfile,
      deleteProfile,
      beforeTabChange,
      afterTabChange,
      redirect,
      deconnect }
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