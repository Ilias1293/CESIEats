<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title slot="end">Restaurant</ion-title>
        <ion-button @click="goBack" fill="clear">
          <ion-icon :icon="chevronBack" slot="start"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="!etapeCommande" class="ion-padding">
      <h1>{{ name_restaurant }} - Compose ton menu !</h1>
      <!-- <p>Restaurant ID: {{ id_restaurant }}</p> -->
      <!-- <p>Menu ID: {{ leMenu.idRestaurant }}</p> -->
      <ion-card v-for="item in leMenu.menu.items" :key="item.name">
        <ion-card-header>
          <ion-item name="choix">
            <ion-checkbox v-model="item.checked" slot="start"></ion-checkbox>
            <ion-label>{{ item.name }} - {{ item.description }}</ion-label>
            <ion-label>Tarif : {{ item.price }}€</ion-label>
          </ion-item>
          <ion-input v-model="item.quantity" type="number" min="1"></ion-input>
        </ion-card-header>
      </ion-card>
      <ion-fab>
        <ion-fab-button @click="submitFormCommande" style=" position: fixed; bottom: 50px; right: 50px; z-index: 999; width: 250px;">
          <ion-label>Ajouter au panier</ion-label>
          <ion-icon :icon="basket"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
    <ion-content v-if="etapeCommande && !etapePaiement" class="ion-padding">
      <h1> Paiement </h1>
      <ion-item>
        <ion-label position="floating">Numéro de carte bancaire</ion-label>
        <ion-input type="string"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Expiration (MM/YY)</ion-label>
        <ion-input type="string"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Cryptogramme</ion-label>
        <ion-input type="string"></ion-input>
      </ion-item>
      <ion-button @click="envoyerPaiement" expand="block">Procéder au paiement</ion-button>
      
      
    </ion-content>
    <ion-content v-if="etapeCommande && etapePaiement && !etapeEnvoie" class="ion-padding">
      <ion-progress-bar type="indeterminate"></ion-progress-bar>
      <h1> Merci de votre commande, commande en cours d'envoi chez le restaurateur. </h1>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    IonIcon,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonCheckbox,
    IonInput,
    IonCard,
    IonCardHeader,
    IonItem,
    IonLabel
  } from '@ionic/vue';
import axios from 'axios';
import { 
    personCircle, 
    search,
    home,
    basket,
    settings,
    chevronBack
} from 'ionicons/icons';

interface ItemMenu {
  name: string;
  item_category: string;
  description: string;
  price: number;
  checked: boolean;
  quantity: number;
}

interface ItemMenuToSend {
  name: string;
  price: number;
  qty: number;
}

interface MenuRestaurant {
  idRestaurant: number;
  menu: {
    items: ItemMenu[]
  };
}

export default defineComponent({
  components: { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab,
    IonFabButton, IonCheckbox, IonInput, IonCard,
    IonCardHeader,
    IonItem,
    IonLabel },

  data() {
    return {
      commande: {
        idCommande: 0,
        date: new Date(),
        client: 0,
        restaurant: 0,
        items: [] as ItemMenuToSend[],
        total: 0,
        deliverer: 0,
        status: ""
      },
      etapeCommande: false,
      etapePaiement: false,
      etapeEnvoie: false
    }
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const id_restaurant = ref(""); 
    const name_restaurant = ref("");

    const fetchRestaurant = async() => {
      axios.get('http://localhost:8888/api/V1/restaurant/name/'+ id_restaurant.value)
      .then(response => {
        if (response.status === 200) {
          console.log('Récupération du nom de restau réussi.');
          const responseJSON = response.data;
          name_restaurant.value = responseJSON.restaurant_name;
          console.log(name_restaurant)
          }

          else {
            console.log('Erreur')
          }
      })
      .catch(error => {
        console.log("Erreur de récuperation du nom du restau.", error)
        //router.push({ path: '/login', force: true });
      })
    }

    const leMenu: MenuRestaurant = {
      idRestaurant: 0,
      menu: {
        items: []
      }
    };
    
    const fetchMenu = async() => {
      axios.get('http://localhost:8888/api/V1/menu/'+ id_restaurant.value)
      .then(response => {
        if (response.status === 200) {
          console.log('Récupération des menus réussis.');
          console.log(id_restaurant);
          const restaurants = response.data;
          console.log(restaurants)
          leMenu.idRestaurant = restaurants.idRestaurant;
          for(const item of restaurants.menu.items){
            const itemMenu: ItemMenu = {
              name: item.name,
              item_category: item.id_restaurant,
              description: item.item_category,
              price: item.price,
              checked: false,
              quantity: 1
            }
            leMenu.menu.items.push(itemMenu);
            console.log
            
          }
          console.log(leMenu)
        }
        else {
          console.log('Erreur')
        }
      })
      .catch(error => {
        console.log("Erreur de récuperation des menus.", error)
        //router.push({ path: '/login', force: true });
      })
    }

    const goBack = () => {
        router.go(-1);
      }

    onMounted(async () => {

      //console.log('Before Router Preparation', route.name);
      await router.isReady();
      //console.log('After Router Preparation', route.name);
      console.log(id_restaurant)
      id_restaurant.value = route.params.id as string;
      console.log(id_restaurant)
      fetchRestaurant();
      fetchMenu();
      
    });

    return {
      basket,
      leMenu,
      id_restaurant,
      onMounted, 
      fetchRestaurant,
      fetchMenu,
      name_restaurant,
      chevronBack,
      goBack
    }
  },
  
  computed: {
    itemsToSend() {
      return this.leMenu.menu.items.filter(item => item.checked).map(item => {
        return {
          name: item.name,
          price: item.price,
          qty: item.quantity
        }
      })
    }
  },
  methods: {
    submitFormCommande() {
      const itemsToSend = this.itemsToSend.map(item => {
        return { name: item.name, price: item.price, quantity: item.qty }
      })
      console.log(itemsToSend)
      //const itemsToSendGenerale = ref(itemsToSend);
      this.etapeCommande = true;
    },

    envoyerPaiement() {
      this.etapePaiement = true;
      this.commande.items = this.itemsToSend;
      this.commande.total = this.itemsToSend.reduce((total, item) => total + (item.price * item.qty), 0);
      this.commande.restaurant = this.leMenu.idRestaurant;
      this.commande.status = "En attente d'acceptation restaurateur.";
      axios.post('http://localhost:8888/api/V1/commande', this.commande)
              .then(response => {
                if (response.status === 201) {
                  console.log('Commande envoyée avec succès');
                  setTimeout(() => 
                  {
                      window.location.href = "/home";
                  },
                  5000);

                }
                else {
                  console.log(response.data);
                  console.log('Erreur lors de l\'envoi de la commande')
                }
              })
              .catch(error => {
                console.log("Erreur lors de l'envoi de la commande", error)
              })
    }
  }
});
</script>