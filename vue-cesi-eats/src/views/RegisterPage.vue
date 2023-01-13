<template>
    <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Création de compte
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form @submit.prevent="handleSubmit">
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="form.email" type="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="form.password" type="password"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Confirm Password</ion-label>
          <ion-input v-model="form.passwordConfirmation" type="password"></ion-input>
        </ion-item>
        <ion-button type="submit">Register</ion-button>
      </form>
    </ion-content>
</ion-page>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import { IonLabel,
  IonItem,
  IonInput } from '@ionic/vue';

  import { defineComponent } from 'vue';
  
  interface Form {
    email: string;
    password: string;
    passwordConfirmation: string;
  }
  
  interface Data {
    form: Form;
    errors: any;
  }
  
  export default class RegisterPage {
    form: Form = {
      email: '',
      password: '',
      passwordConfirmation: ''
    };
  
    errors: any = {};
  
    async handleSubmit() : Promise<void> {
        axios.post('/register', this.form)
        // handle success
        .then(response => {
          if (response.status === 200) {
            console.log('Compte crée avec succès')
          }
        })
        .catch(error => {
          console.log("Erreur lors de la création du compte", error)
        })
    }    }
  </script>