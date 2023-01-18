<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Authentification
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <form @submit.prevent="login">
        <div class="imgcontainer">
          <img src="assets/img/login.webp" alt="LoginImg" class="avatar" style="width: 10%;">
          <h4>Connectez-vous pour accéder à toutes les fonctionnalités</h4>
          <div v-if="isLoginTrue"><h4 style="color:red">Mauvais identifiants.</h4></div>
        <div v-if="isLoading"><ion-spinner name="cresent"></ion-spinner></div>
        </div>
        <br><br>
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input @ionInput="formData.email = $event.target.value;" type="string"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Mot de passe</ion-label>
          <ion-input @ionInput="formData.password = $event.target.value;" type="password"></ion-input>
        </ion-item>
        <ion-button type="submit" expand="block">Se connecter</ion-button>
      </form>
      <!-- <p>Mon email : {{ formData.email  }}</p>
      <p>Mon password : {{ formData.password  }}</p> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import axios from 'axios';
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
    IonSpinner,
IonHeader } from '@ionic/vue';

import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Vue from 'vue';

axios.defaults.withCredentials = true;

export default defineComponent({

  components: {     
    IonLabel, 
    IonPage,
    IonInput,
    IonItem,
    IonContent,
    IonButton,
    IonTitle,
    IonToolbar },

  setup() {
    const formData = ref({
        email: '',
        password: ''
    })
    const router = useRouter();

    const isLoginTrue = ref(false);
    const isLoading = ref(false);

    function redirect(page : string) {
      window.location.href = page;
    }

    const login = async() : Promise<void> => {
          const email = formData.value.email;
          const password = formData.value.password;
          console.log(email);
          console.log(password);
          axios.post('http://localhost:8888/login/client', {email, password})
            .then(response => {
              if (response.status === 200) {
                console.log('Authentification réussie');
                console.log(formData.value.email);
                console.log(formData.value.password);
                //router.push({ path: '/home', force: true });
                redirect('/home');
                isLoginTrue.value = false;
              }
              else {
                console.log(formData.value.email);
                console.log(formData.value.password);
                console.log('Erreur')
                isLoginTrue.value = false;
              }
              isLoading.value = false;
            })
            .catch(error => {
              isLoginTrue.value = true;
              isLoading.value = true;
              console.log("Erreur d'authentification", error)
              
            })
        }
      return { formData, isLoginTrue, isLoading,login }
    } 
  });
</script>