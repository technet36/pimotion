let chart = new Chart('myChart', {
    type: 'bar',
    data: {
        labels:[],
        datasets:[{
            label:"",
            data:[]
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
function updateVideo(filename){
    var player = document.getElementById("player");
    console.log(player);
    player.setAttribute("src", "./videos/2020/05/04/"+filename);
}
$( function() {
    $( "#tabs" ).tabs();
} );
function goToDirect() {
    console.log("OMW to live");
}
function goToArchives() {
    console.log("OMW to archives");
}
function goToDate() {
    console.log("OMW to date");
}
function selectDateYear(year) {
    console.log("graph for "+year );
    let data = {
        labels: [],
        datasets: {
            label: '# of video per month',
            data: [12, 5, 6, 32, 14, 12, 2, 19, 3, 5, 2, 3]
        }
    };
    let labels = monthsArr;
    generateChart(labels, data.datasets.data, data.datasets.label);
    //jump(2020, 7, 12);
}
function selectDateMonth(month, year) {
    console.log("graph for "+month+"/"+year );
    let data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: {
            label: '# of videos per day',
            data: [12, 19, 3, 5, 2, 3]
        }
    };
    generateChart(data.labels, data.datasets.data, data.datasets.label);
}
function selectDateDay(day, month, year) {
    console.log("graph for "+day+"/"+month+"/"+year );
    let data = {
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        datasets: {
            label: '# of videos by hour',
            data: [1, 0, 0, 2, 1, 3, 1, 9, 12, 7, 3, 3, 4, 7, 9, 13, 9, 7, 12, 2, 2, 3, 2, 1]
        }
    };
    generateChart(data.labels, data.datasets.data, data.datasets.label);
}
function generateChart(labels, dataset, title) {
    removeData();

    dataset.forEach((data,i)=> {
        chart.data.labels.push(labels[i]);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
            dataset.label = title;
        });
    })
    chart.update();
}


function removeData() {
    chart.data.labels= [];
    chart.data.datasets.forEach((dataset,index) => {
        dataset.data = [];
    });
    chart.update();
}