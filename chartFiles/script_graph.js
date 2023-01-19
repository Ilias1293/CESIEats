const url_serv = 'http://127.0.0.1:8888/api/V1/'

const id_client_1 = localStorage.getItem("id_client");
const id_restaurant_1 = localStorage.getItem("id_restaurant");
console.log(id_client_1);
console.log(id_restaurant_1);

//Graph Commercial
axios.get(url_serv+'commandes/stats/graph/OrdersLast7d')
.then(response => {
    const commandesByDay = response.data;

    //Chart Last 7d
    var ctx = document.getElementById('chartLast7d').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(commandesByDay),
            datasets: [{
                label: 'Nombre de commandes',
                data: Object.values(commandesByDay),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive:true,
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
                        var max = Math.max.apply(null, Object.values(commandesByDay));
                        return max + (max * 0.3);
                    })()
                }
            }],
        }
    }
  });
})

axios.get(url_serv+'commandes/stats/graph/OrdersLastM')
.then(response => {
    const commandesByDay = response.data;
    //Chart Last M
    var ctx = document.getElementById('chartLastM').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(commandesByDay),
            datasets: [{
                label: 'Nombre de commandes',
                data: Object.values(commandesByDay),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive:true,
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
                        var max = Math.max.apply(null, Object.values(commandesByDay));
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
    }
  });
})

axios.get(url_serv+'commandes/stats/graph/OrdersLastY')
.then(response => {
    const commandesByDay = response.data;

    //Chart Last Y
    var ctx = document.getElementById('chartLastY').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(commandesByDay),
            datasets: [{
                label: 'Nombre de commandes',
                data: Object.values(commandesByDay),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive:true,
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
                        var max = Math.max.apply(null, Object.values(commandesByDay));
                        return max + (max * 0.4);
                    })()
                }
            }],
        }
    }
  });
})

axios.get(url_serv+'commandes/stats/graph/ordersLastYSortByQuarter')
.then(response => {
    const commandesByDay = response.data;

    //Chart Last Y
    var ctx = document.getElementById('chartLastYSortByQuarter').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(commandesByDay),
            datasets: [{
                label: 'Nombre de commandes',
                data: Object.values(commandesByDay),
                backgroundColor: ["green","blue","orange","purple","pink","red","gray","black","yellow","indigo"],
            }]
        },
    options: {
        responsive:true,
        maintainAspectRatio: true,
        title: {
            display: true,
            text: 'Répartition du nombre de commandes par trimestre sur l\'année en cours',
            fontSize: 24
        }
    }
  });
})



/////////
//Graph client
axios.get(url_serv+'client/'+ id_client_1 +'/stats/graph/OrdersLast7d')
.then(response => {
    const commandesByDay = response.data;

    //Chart Last 7d
    var ctx = document.getElementById('clientChartLast7d').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(commandesByDay),
            datasets: [{
                label: 'Nombre de commandes',
                data: Object.values(commandesByDay),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive:true,
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
                        var max = Math.max.apply(null, Object.values(commandesByDay));
                        return max + (max * 0.3);
                    })()
                }
            }],
        }
    }
  });
})

axios.get(url_serv+'client/'+ id_client_1 +'/stats/graph/OrdersLastM')
.then(response => {
    const commandesByDay = response.data;
    //Chart Last M
    var ctx = document.getElementById('clientChartLastM').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(commandesByDay),
            datasets: [{
                label: 'Nombre de commandes',
                data: Object.values(commandesByDay),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive:true,
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
                        var max = Math.max.apply(null, Object.values(commandesByDay));
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
    }
  });
})

axios.get(url_serv+'client/'+ id_client_1 +'/stats/graph/OrdersLastY')
.then(response => {
    const commandesByDay = response.data;

    //Chart Last Y
    var ctx = document.getElementById('clientChartLastY').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(commandesByDay),
            datasets: [{
                label: 'Nombre de commandes',
                data: Object.values(commandesByDay),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive:true,
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
                        var max = Math.max.apply(null, Object.values(commandesByDay));
                        return max + (max * 0.4);
                    })()
                }
            }],
        }
    }
  });
})

axios.get(url_serv+'client/'+ id_client_1 +'/stats/graph/ordersLastYSortByQuarter')
.then(response => {
    const commandesByDay = response.data;

    //Chart Last Y
    var ctx = document.getElementById('clientChartLastYSortByQuarter').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(commandesByDay),
            datasets: [{
                label: 'Nombre de commandes',
                data: Object.values(commandesByDay),
                backgroundColor: ["green","blue","orange","purple","pink","red","gray","black","yellow","indigo"],
            }]
        },
    options: {
        responsive:true,
        maintainAspectRatio: true,
        title: {
            display: true,
            text: 'Répartition du nombre de commandes par trimestre sur l\'année en cours',
            fontSize: 24
        }
    }
  });
})



/////////
//Graph restaurants
axios.get(url_serv+'restaurant/'+id_restaurant_1+'/stats/graph/OrdersLast7d')
.then(response => {
    const commandesByDay = response.data;

    //Chart Last 7d
    var ctx = document.getElementById('restaurantChartLast7d').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(commandesByDay),
            datasets: [{
                label: 'Nombre de commandes',
                data: Object.values(commandesByDay),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive:true,
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
                        var max = Math.max.apply(null, Object.values(commandesByDay));
                        return max + (max * 0.3);
                    })()
                }
            }],
        }
    }
  });
})

axios.get(url_serv+'restaurant/'+id_restaurant_1+'/stats/graph/OrdersLastM')
.then(response => {
    const commandesByDay = response.data;
    //Chart Last M
    var ctx = document.getElementById('restaurantChartLastM').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(commandesByDay),
            datasets: [{
                label: 'Nombre de commandes',
                data: Object.values(commandesByDay),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive:true,
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
                        var max = Math.max.apply(null, Object.values(commandesByDay));
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
    }
  });
})

axios.get(url_serv+'restaurant/'+id_restaurant_1+'/stats/graph/OrdersLastY')
.then(response => {
    const commandesByDay = response.data;

    //Chart Last Y
    var ctx = document.getElementById('restaurantChartLastY').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(commandesByDay),
            datasets: [{
                label: 'Nombre de commandes',
                data: Object.values(commandesByDay),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive:true,
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
                        var max = Math.max.apply(null, Object.values(commandesByDay));
                        return max + (max * 0.4);
                    })()
                }
            }],
        }
    }
  });
})

axios.get(url_serv+'restaurant/'+id_restaurant_1+'/stats/graph/ordersLastYSortByQuarter')
.then(response => {
    const commandesByDay = response.data;

    //Chart Last Y
    var ctx = document.getElementById('restaurantChartLastYSortByQuarter').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(commandesByDay),
            datasets: [{
                label: 'Nombre de commandes',
                data: Object.values(commandesByDay),
                backgroundColor: ["green","blue","orange","purple","pink","red","gray","black","yellow","indigo"],
            }]
        },
    options: {
        responsive:true,
        maintainAspectRatio: true,
        title: {
            display: true,
            text: 'Répartition du nombre de commandes par trimestre sur l\'année en cours',
            fontSize: 24
        }
    }
  });
})

/////////
//Graph speed perfs Last 7 days
axios.get(url_serv+'performances/stats/graph/PerfsSpeedLast7d')
.then(response => {
    const commandesByDay = response.data;

    //Chart Last 7d
    var ctx = document.getElementById('perfsSpeedChartLast7d').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(commandesByDay),
            datasets: [{
                label: 'Vitesse moyenne de connexion en ms',
                data: Object.values(commandesByDay),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive:true,
        maintainAspectRatio: true,
        title: {
            display: true,
            text: 'Evolution des performances de vitesse pendant les 7 derniers jours',
            fontSize: 24
        },
        scales: {
            y: {
                beginAtZero: true
            },
            yAxes : [{
                ticks: {
                    max: (function() {
                        var max = Math.max.apply(null, Object.values(commandesByDay));
                        return max + (max * 0.3);
                    })()
                }
            }],
        }
    }
  });
})

//Graph speed perfs Last Month
axios.get(url_serv+'performances/stats/graph/PerfsSpeedLastM')
.then(response => {
    const commandesByDay = response.data;

    //Chart Last 7d
    var ctx = document.getElementById('perfsSpeedChartLastM').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(commandesByDay),
            datasets: [{
                label: 'Vitesse moyenne de connexion en ms',
                data: Object.values(commandesByDay),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive:true,
        maintainAspectRatio: true,
        title: {
            display: true,
            text: 'Evolution des performances de vitesse pendant le mois en cours',
            fontSize: 24
        },
        scales: {
            y: {
                beginAtZero: true
            },
            yAxes : [{
                ticks: {
                    max: (function() {
                        var max = Math.max.apply(null, Object.values(commandesByDay));
                        if(max == 0)
                        {
                            return max + 1
                        }
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
    }
  });
})

//Graph logs success login
axios.get(url_serv+'performances/stats/graph/SuccessLoginLastM')
.then(response => {
    const commandesByDay = response.data;
    //Chart Last M
    var ctx = document.getElementById('successLoginChartLastM').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(commandesByDay),
            datasets: [{
                label: 'Nombre de logs',
                data: Object.values(commandesByDay),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive:true,
        maintainAspectRatio: true,
        title: {
            display: true,
            text: 'Evolution du nombre de connexions réussies sur les 30 derniers jours',
            fontSize: 24
        },
        scales: {
            y: {
                beginAtZero: true
            },
            yAxes : [{
                ticks: {
                    max: (function() {
                        var max = Math.max.apply(null, Object.values(commandesByDay));
                        if(max == 0)
                        {
                            return max + 1
                        }
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
    }
  });
})

//Graph logs Failed login
axios.get(url_serv+'performances/stats/graph/FailedLoginLastM')
.then(response => {
    const commandesByDay = response.data;
    //Chart Last M
    var ctx = document.getElementById('failedLoginChartLastM').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(commandesByDay),
            datasets: [{
                label: 'Nombre de logs',
                data: Object.values(commandesByDay),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive:true,
        maintainAspectRatio: true,
        title: {
            display: true,
            text: 'Evolution du nombre d\'échecs de connexion sur les 30 derniers jours',
            fontSize: 24
        },
        scales: {
            y: {
                beginAtZero: true
            },
            yAxes : [{
                ticks: {
                    max: (function() {
                        var max = Math.max.apply(null, Object.values(commandesByDay));
                        if(max == 0)
                        {
                            return max + 1
                        }
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
    }
  });
})
