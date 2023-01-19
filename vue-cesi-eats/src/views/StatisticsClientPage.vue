<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title slot="end">Statistics Client</ion-title>
        <ion-button @click="redirectProfile" fill="clear">
          <ion-icon :icon="chevronBack" slot="start"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <h1>Statistics Client</h1>

      <div class="chart-container">
        <canvas id="clientChartLast7d"></canvas>
      </div>

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
import { Chart } from 'chart.js';

export default defineComponent({
  
    components: { 
      // IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs 
    },
    /*data() {
      return {
        
        url_serv: 'http://127.0.0.1:8888/',
        chartData7d: {
          labels: [],
          datasets: [{
            label: 'Nombre de commandes',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        chartOptions7d: {
          responsive: true,
          maintainAspectRatio: true,
          title: {
            display: true,
            text: 'Evolution du nombre commandes pendant les 7 derniers jours',
            fontSize: 24
          },
          scales: {
            y: {
              beginAtZero: true
            },
            yAxes : [{
              ticks: {
                max: (function() {
                  const max = Math.max.apply(null, Object.values(commandesByDay));
                  return max + (max * 0.3);
                })()
              }
            }],
          }
        },
        chartDataM: {
          labels: [],
          datasets: [{
            label: 'Nombre de commandes',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        chartOptionsM: {
          responsive: true,
          maintainAspectRatio: true,
          title: {
            display: true,
            text: 'Evolution du nombre commandes pendant le mois en cours',
            fontSize: 24
          },
          scales: {
            y: {
              beginAtZero: true
            },
            yAxes : [{
              ticks: {
                max: (function() {
                  const max = Math.max.apply(null, Object.values(commandesByDay));
                  return max + (max * 0.2);
                })()
              }
            }],
            x: {
            },
            xAxes: [{
              ticks: {
                callback: function(label, index, labels) {
                  return index % 2 === 0 ? label : null;
                },
              }
            }]
          }
        },
        chartDataY: {
          labels: [],
          datasets: [{
            label: 'Nombre de commandes',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        chartOptionsY: {
          responsive: true,
          maintainAspectRatio: true,
          title: {
            display: true,
            text: 'Evolution du nombre commandes pendant l\'année en cours',
            fontSize: 24
          },
          scales: {
            y: {
              beginAtZero: true
            },
            yAxes : [{
              ticks: {
                max: (function() {
                  const max = Math.max.apply(null, Object.values(commandesByDay));
                  return max + (max * 0.2);
                })()
              }
            }],
            x: {
            }
          }
        }
      }
    },
    mounted(){
      axios.get(`${this.url_serv}commandes/stats/graph/OrdersLast7d`)
    .then(response => {
      this.chartData7d.labels = Object.keys(response.data);
      this.chartData7d.datasets[0].data = Object.values(response.data);
    });

    axios.get(`${this.url_serv}commandes/stats/graph/OrdersLastM`)
    .then(response => {
      this.chartDataM.labels = Object.keys(response.data);
      this.chartDataM.datasets[0].data = Object.values(response.data);
    });

    axios.get(`${this.url_serv}commandes/stats/graph/OrdersLastY`)
    .then(response => {
      this.chartDataY.labels = Object.keys(response.data);
      this.chartDataY.datasets[0].data = Object.values(response.data);
    });
    },*/
    setup() {

      const router = useRouter();
      const beforeTabChange = () => {
        // do something before tab change
      }
      const afterTabChange = () => {
        // do something after tab change
      }
      function redirectProfile() {
      window.location.href = "/profile";
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
          redirectProfile,
          goBack,
          chevronBack,
          items: []
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