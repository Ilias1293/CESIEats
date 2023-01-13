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
          <img src="assets/img/login.webp" alt="LoginImg" class="avatar">
          <h4>Connectez-vous pour accéder à toutes les fonctionnalités</h4>
        </div>
        <br><br>
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="formData.email" type="string"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Mot de passe</ion-label>
          <ion-input v-model="formData.password" type="string"></ion-input>
        </ion-item>
        <ion-button type="submit" expand="block">Se connecter</ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import axios from 'axios';
export default {
  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      axios.post('/login', this.formData)
        .then(response => {
          if (response.status === 200) {
            console.log('Authentification réussie')
          }
        })
        .catch(error => {
          console.log("Erreur d'authentification", error)
        })
    },
  },
};
</script>