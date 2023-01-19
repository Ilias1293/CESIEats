<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-title class="ion-text-center">Vos commandes - UwU Eats</ion-title>
          <img alt="UWU Eats Icon" src="../img/iconUwu.png" style="width:100px; padding: 20px;" slot="start"/>
        </ion-toolbar>
      </ion-header>

    <!-- <ion-content>
      <ion-list>
        <ion-item v-for="item in basket" :key="item.id">
          {{ item.name }} - {{ item.price }}
        </ion-item>
      </ion-list>
    </ion-content> -->


    <!-- ORDERS CLIENT -->
    <ion-content v-if="profileData.role == '1'" class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size="1" class="ion-text-center">Identifiant de la commande</ion-col>
          <ion-col size="2" class="ion-text-center">Date de la commande</ion-col>
          <ion-col size="1" class="ion-text-center">Identifiant du restaurant</ion-col>
          <ion-col size="2" class="ion-text-center">Détails de la commande</ion-col>
          <ion-col size="2" class="ion-text-center">Montant de la commande</ion-col>
          <ion-col size="2" class="ion-text-center">Statut de la commande</ion-col>
          <ion-col size="2" class="ion-text-center">Actions</ion-col>
        </ion-row>
        <ion-row v-for="commande in listeCommandes.listeCommandes" :key="commande.idCommande">
          <ion-col size="1" class="ion-text-center">{{ commande.idCommande }}</ion-col>
          <ion-col size="2" class="ion-text-center">{{ formatDate(commande.date) }}</ion-col>
          <ion-col size="1" class="ion-text-center">{{ commande.restaurant }}</ion-col>
          <ion-col size="2" class="ion-text-center" @mouseover="displayOrderDetails(commande.idCommande)" @mouseleave="hideOrderDetails">
            <ion-icon :icon="restaurant" aria-hidden="true" style="width: 1.5em;"/>
            <div class="order-details-popup" v-if="displayPopup && String(commande.idCommande) === currentOrderId">
              <ion-list>
                <ion-item v-for="item in commande.items" :key="item.name">
                  <ion-title>{{ item.name }}</ion-title>
                  <ion-title>Prix : {{ item.price }}€</ion-title>
                  <ion-title>Qté : {{ item.qty }}</ion-title>
                </ion-item>
              </ion-list>
            </div>
          </ion-col>
          <ion-col size="2" class="ion-text-center">{{ commande.total }}€</ion-col>
          <ion-col size="2" class="ion-text-center">{{ commande.status }}</ion-col>
          <ion-col size="2" class="ion-text-center" v-if="commande.status == livréEnAttenteClient">
            <ion-button @click='updateStatus(String(commande.idCommande), terminé)' expand="block" >Commande prête</ion-button>
          </ion-col>
        </ion-row>
        
      </ion-grid>
    </ion-content>

    <!-- ORDERS RESTAURANT -->
    <ion-content :key="listeCommandes" v-if="profileData.role == '2'" class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size="1" class="ion-text-center">Identifiant de la commande</ion-col>
          <ion-col size="2" class="ion-text-center">Date de la commande</ion-col>
          <ion-col size="1" class="ion-text-center">Identifiant du client</ion-col>
          <ion-col size="1" class="ion-text-center">Identifiant du livreur</ion-col>
          <ion-col size="1" class="ion-text-center">Détails de la commande</ion-col>
          <ion-col size="2" class="ion-text-center">Montant de la commande</ion-col>
          <ion-col size="2" class="ion-text-center">Statut de la commande</ion-col>
          <ion-col size="2" class="ion-text-center">Actions</ion-col>
        </ion-row>
        <ion-row v-for="commande in listeCommandes.listeCommandes" :key="commande.idCommande">
          <ion-col size="1" class="ion-text-center">{{ commande.idCommande }}</ion-col>
          <ion-col size="2" class="ion-text-center">{{ formatDate(commande.date) }}</ion-col>
          <ion-col size="1" class="ion-text-center">{{ commande.client }}</ion-col>
          <ion-col size="1" class="ion-text-center">{{ commande.deliverer }}</ion-col>
          <ion-col size="1" class="ion-text-center" @mouseover="displayOrderDetails(commande.idCommande)" @mouseleave="hideOrderDetails">
            <ion-icon :icon="restaurant" aria-hidden="true" style="width: 1.5em;"/>
            <div class="order-details-popup" v-if="displayPopup && String(commande.idCommande) === currentOrderId">
              <ion-list>
                <ion-item v-for="item in commande.items" :key="item.name">
                  <ion-title>{{ item.name }}</ion-title>
                  <ion-title>Prix : {{ item.price }}€</ion-title>
                  <ion-title>Qté : {{ item.qty }}</ion-title>
                </ion-item>
              </ion-list>
            </div>
          </ion-col>
          <ion-col size="2" class="ion-text-center">{{ commande.total }}€</ion-col>
          <ion-col size="2" class="ion-text-center">{{ commande.status }}</ion-col>
          <ion-col size="2" class="ion-text-center" v-if="commande.status == enAttente">
            <ion-button @click="updateStatus(String(commande.idCommande), accepté)" expand="block" >Accepter commande</ion-button>
          </ion-col>
          <ion-col size="2" class="ion-text-center" v-if="commande.status == accepté">
            <ion-button @click='updateStatus(String(commande.idCommande), prêteEnAttenteLivreur)' expand="block" >Commande prête</ion-button>
          </ion-col>
        </ion-row>
        
      </ion-grid>
    </ion-content>

    <!-- ORDERS LIVREUR -->
    <ion-content v-if="profileData.role == '3'" class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size="1" class="ion-text-center">Identifiant de la commande</ion-col>
          <ion-col size="2" class="ion-text-center">Date de la commande</ion-col>
          <ion-col size="1" class="ion-text-center">Identifiant du restaurant</ion-col>
          <ion-col size="2" class="ion-text-center">Détails de la commande</ion-col>
          <ion-col size="2" class="ion-text-center">Statut de la commande</ion-col>
          <ion-col size="2" class="ion-text-center">Actions</ion-col>
        </ion-row>
        <ion-row v-for="commande in listeCommandes.listeCommandes" :key="commande.idCommande">
          <ion-col size="1" class="ion-text-center">{{ commande.idCommande }}</ion-col>
          <ion-col size="2" class="ion-text-center">{{ formatDate(commande.date) }}</ion-col>
          <ion-col size="1" class="ion-text-center">{{ commande.restaurant }}</ion-col>
          <ion-col size="2" class="ion-text-center" @mouseover="displayOrderDetails(commande.idCommande)" @mouseleave="hideOrderDetails">
            <ion-icon :icon="restaurant" aria-hidden="true" style="width: 1.5em;"/>
            <div class="order-details-popup" v-if="displayPopup && String(commande.idCommande) === currentOrderId">
              <ion-list>
                <ion-item v-for="item in commande.items" :key="item.name">
                  <ion-title>{{ item.name }}</ion-title>
                  <ion-title>Prix : {{ item.price }}</ion-title>
                  <ion-title>Qté : {{ item.qty }}</ion-title>
                </ion-item>
              </ion-list>
            </div>
          </ion-col>
          <ion-col size="2" class="ion-text-center">{{ commande.status }}</ion-col>
          <ion-col size="2" class="ion-text-center" v-if="commande.status == prêteEnAttenteLivreur">
            <ion-button @click="updateStatus(String(commande.idCommande), enLivraison)" expand="block" >Accepter commande</ion-button>
          </ion-col>
          <ion-col size="2" class="ion-text-center" v-if="commande.status == enLivraison">
            <ion-button @click='updateStatus(String(commande.idCommande), livréEnAttenteClient)' expand="block" >Commande prête</ion-button>
          </ion-col>
        </ion-row>
        
      </ion-grid>
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
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { 
    IonIcon, 
    IonLabel, 
    IonPage,
    IonRouterOutlet,
    IonTabBar, 
    IonTabButton, 
    IonTabs,
    IonCol,
    IonGrid,
    IonRow,
    IonHeader,
    IonList,
    IonItem,
    IonTitle

  } from '@ionic/vue';
  import { 
    personCircle, 
    search,
    home,
    basket,
    restaurant
  } from 'ionicons/icons';


  interface Basket {
        id: number;
        _id: string;
        name: string;
        logo: string;
        menu: {
            items: [{
                name: string;
                numberofitems : number;
                picture: string;
                description: string;
                price: number;
            }]
        }
    }

    interface ItemMenuToSend {
      name: string;
      price: number;
      qty: number;
    }

    interface Commande {
      idCommande: number;
      date: Date;
      client: number;
      restaurant: number;
      items: ItemMenuToSend[];
      total: number;
      deliverer: number;
      status: string;
    }


  export default defineComponent({
    components: {IonIcon, 
    IonLabel, 
    IonPage,
    IonRouterOutlet,
    IonTabBar, 
    IonTabButton, 
    IonTabs,
    IonCol,
    IonGrid,
    IonRow,
    IonHeader,
    IonItem,
    IonTitle,
    IonList },
    setup() {


      const enAttente = "En attente d'acceptation restaurateur.";
      const accepté = "Acceptée - En cours de preparation.";
      const prêteEnAttenteLivreur = "Commande prête - En attente du livreur.";
      const enLivraison = "Acceptée - En cours de livraison.";
      const livréEnAttenteClient = "Commande livrée - En attente confirmation client.";
      const terminé = "Commande terminée.";

      const displayPopup = ref(false);
      const profileData = ref({
          id_person:'',
          surname: '',
          name: '',
          birth: '',
          phone_number: '',
          role: ''
        })

      const commande: Commande = {
        idCommande: 0,
        date: new Date(),
        client: 0,
        restaurant: 0,
        items: [] as ItemMenuToSend[],
        total: 0,
        deliverer: 0,
        status: ""
      }

      const currentOrderId = ref('');


      const router = useRouter();
      const beforeTabChange = () => {
        // do something before tab change
      }
      const afterTabChange = () => {
        // do something after tab change
      }

      const displayOrderDetails = (orderId : number) => {
        displayPopup.value = true;
        currentOrderId.value = String(orderId);

      }
      const hideOrderDetails = () => {
        displayPopup.value = false;
        currentOrderId.value = 'null';
      }

      function formatDate(date : string) {
        const laDate = new Date(date);
        const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false,
          timeZone: 'UTC',
          timeZoneName: 'short',
          locale: 'fr'
        };
        const frenchDate = laDate.toLocaleString('fr-FR');
        return frenchDate;
      }

      const listeCommandes = {
        listeCommandes: [] as Commande[]
      }
      

      const getProfile = async() : Promise<void> => {
          
          axios.get('http://localhost:8888/api/V1/user')
          .then(response => {
            if (response.status === 200) {
              console.log('Récupération de l\'utilisateur réussie.');
              
              const tabJson = response.data;
              //console.log(tabJson);
              profileData.value.surname = tabJson.surname;
              profileData.value.name = tabJson.name;
              profileData.value.birth = tabJson.birth;
              profileData.value.phone_number = tabJson.phone_number;
              profileData.value.role = tabJson.role;
              profileData.value.id_person = tabJson.id_person;
              //console.log(profileData.value.id_person);
              //email.value = tabJson.email;
              console.log(profileData);

              if(profileData.value.role == "1") {
                axios.get('http://localhost:8888/api/V1/commande/client/'+ profileData.value.id_person)
                  .then(response => {
                    if (response.status === 200) {
                      console.log('Récupération des commandes clients réussie.');
                      
                      const tabJson = response.data;
                      //console.log(tabJson);
                      console.log(tabJson.commandes);

                      for(const item of tabJson.commandes){
                        const commandeBoucle: Commande = {
                          client: item.client,
                          date: item.date,
                          deliverer: item.deliverer,
                          idCommande: item.idCommande,
                          items: item.items,
                          restaurant: item.restaurant,
                          status: item.status,
                          total: item.total
                        }
                        listeCommandes.listeCommandes.push(commandeBoucle);
                        console.log(commandeBoucle);
                      }
                      console.log(listeCommandes);
                      //email.value = tabJson.email;
                      //keys = Object.keys(data[0]);
                      
                    }
                    else {
                      console.log('Erreur')
                    }
                  })
                  .catch(error => {
                    console.log("Récupération des commandes clients ratée.", error)
                    //router.push({ path: '/login', force: true });
                  })
              }
              else if(profileData.value.role == "2") {

                axios.get('http://localhost:8888/api/V1/commande/restaurateur/'+ profileData.value.id_person)
                  .then(response => {
                    if (response.status === 200) {
                      console.log('Récupération des commandes restaurateur réussie.');
                      
                      const tabJson = response.data;
                      //console.log(tabJson);
                      console.log(tabJson.commandes);

                      for(const item of tabJson.commandes){
                        const commandeBoucle: Commande = {
                          client: item.client,
                          date: item.date,
                          deliverer: item.deliverer,
                          idCommande: item.idCommande,
                          items: item.items,
                          restaurant: item.restaurant,
                          status: item.status,
                          total: item.total
                        }
                        listeCommandes.listeCommandes.push(commandeBoucle);
                        console.log(commandeBoucle);
                      }
                      console.log(listeCommandes);
                      
                    }
                    else {
                      console.log('Erreur')
                    }
                  })
                  .catch(error => {
                    console.log("Récupération des commandes restaurateur ratée.", error)
                    //router.push({ path: '/login', force: true });
                  })

              }
              else if(profileData.value.role == "3") {

                axios.get('http://localhost:8888/api/V1/commande/livreur/'+ profileData.value.id_person)
                  .then(response => {
                    if (response.status === 200) {
                      console.log('Récupération des commandes livreurs réussie.');
                      
                      const tabJson = response.data;
                      //console.log(tabJson);
                      console.log(tabJson.commandes);

                      for(const item of tabJson.commandes){
                        const commandeBoucle: Commande = {
                          client: item.client,
                          date: item.date,
                          deliverer: item.deliverer,
                          idCommande: item.idCommande,
                          items: item.items,
                          restaurant: item.restaurant,
                          status: item.status,
                          total: item.total
                        }
                        listeCommandes.listeCommandes.push(commandeBoucle);
                        console.log(commandeBoucle);
                      }
                      console.log(listeCommandes);
                      
                    }
                    else {
                      console.log('Erreur')
                    }
                  })
                  .catch(error => {
                    console.log("Récupération des commandes livreurs ratée.", error)
                    //router.push({ path: '/login', force: true });
                  })

              }
              else {
                console.log("Statut inconnu ou non défini.")
              }
              
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
        
      const updateStatus = async(idCommande: string, status : string) : Promise<void> => {

        axios.put('http://localhost:8888/api/V1/commande/'+ idCommande +'/status', {status})
        .then(response => {
          if (response.status === 200) {
            console.log('Mise à jour réussie');
            console.log(profileData);
            location.reload();
          }
          else {
            console.log('Erreur')
          }
        })
        .catch(error => {
          console.log("Erreur de mise à jour", error)
        })
        
    }

        onMounted(async () => {

          getProfile();

        });

          

      return {
        currentOrderId,
        displayPopup,
        search,
        basket,
        home,
        personCircle,
        beforeTabChange,
        listeCommandes,
        afterTabChange,
        displayOrderDetails,
        hideOrderDetails,
        restaurant,
        formatDate,
        profileData,
        updateStatus,
        enAttente,
      accepté,
      prêteEnAttenteLivreur,
      enLivraison,
      livréEnAttenteClient,
      terminé,

      }
    },
    
  })
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
.order-details-popup {
position: absolute;
background-color: white;
padding: 5px;
border: 1px solid gray;
border-radius: 5px;
z-index: 1;
}

ion-grid {
  background-color: #2e2e2e;
  padding: 20px;
  border-radius: 10px;
}

ion-row {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}


</style>