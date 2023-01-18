<template>
    <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Création de compte
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <form @submit.prevent="register">
        <div class="imgcontainer">
          <img src="assets/img/login.webp" alt="LoginImg" class="avatar" style="width: 10%;">
          <h4>Connectez-vous pour accéder à toutes les fonctionnalités</h4>
          <div v-if="!isPasswordsMatch"><h4 style="color:red">Les mots de passe ne concordent pas.</h4></div>
        </div>
        <br><br>
        <ion-item>
          <ion-label position="floating">Nom</ion-label>
          <ion-input @ionInput="formData.name = $event.target.value;" type="string"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input @ionInput="formData.email = $event.target.value;" type="string"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Numéro de téléphone</ion-label>
          <ion-input @ionInput="formData.phone_number = $event.target.value;" type="phone"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Mot de passe</ion-label>
          <ion-input @ionInput="formData.password = $event.target.value;" type="password"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Confirmer Mot de passe</ion-label>
          <ion-input @ionInput="formData.passwordConfirmation = $event.target.value;" type="password"></ion-input>
        </ion-item>
        <ion-button type="submit" expand="block">S'inscrire</ion-button>
      </form>
      <!-- <p>Mon email : {{ formData.email  }}</p>
      <p>Mon password : {{ formData.password  }}</p>
      <p>Mon password : {{ formData.passwordConfirmation  }}</p> -->
    </ion-content>
  </ion-page>
</template>
  
<script lang="ts">
  import axios from 'axios';
  import { IonLabel,
  IonItem,
  IonInput } from '@ionic/vue';
  import { useRouter } from 'vue-router';
  import { defineComponent, ref, computed } from 'vue';

  axios.defaults.withCredentials = true;

  export default defineComponent({
  setup() {
    const formData = ref({
        email: '',
        password: '',
        passwordConfirmation: '',
        name: '',
        phone_number: ''
    })

    const router = useRouter();

    const isPasswordsMatch = computed(() => formData.value.password === formData.value.passwordConfirmation);
    
    const register = async() : Promise<void> => {
          
          const name = formData.value.name;
          const phone_number = formData.value.phone_number;
          const email = formData.value.email;
          const password = formData.value.password;
          const passwordConfirmation = formData.value.passwordConfirmation;

          if(isPasswordsMatch.value) {
            axios.post('http://localhost:8888/api/V1/register/client', {name, phone_number, email, password})
            .then(response => {
              if (response.status === 200) {
                console.log('Inscription réussie');
                console.log(formData.value.name);
                console.log(formData.value.phone_number);
                console.log(formData.value.email);
                console.log(formData.value.password);
                console.log(formData.value.passwordConfirmation);
                router.push({ path: '/login', force: true });
              }
              else {
                console.log(formData.value.name);
                console.log(formData.value.phone_number);
                console.log(formData.value.email);
                console.log(formData.value.password);
                console.log(formData.value.passwordConfirmation);
                console.log('Erreur')
              }
            })
            .catch(error => {
              console.log("Erreur d'authentification", error)
              router.push({ path: '/login', force: true });
            })
          }
        }
      return { formData, isPasswordsMatch, register }
    }
  });

  </script>