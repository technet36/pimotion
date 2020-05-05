let myChart = new Chart('myChart', {
    type: 'bar',
    data: {
        labels:[],
        datasets:[{
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
    myChart.data = {
        labels: [],
        datasets: [{
            label: '# of Votes',
            data: [12, 5, 6, 32, 14, 12, 2, 19, 3, 5, 2, 3]
        }]
    };
    myChart.data.labels = monthsArr;
   // generateChart(dataset);
    //jump(2020, 7, 12);
}
function selectDateMonth(month, year) {
    console.log("graph for "+month+"/"+year );
    myChart.data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3]
        }]
    };
    //generateChart(dataset);
}
function selectDateDay(day, month, year) {
    console.log("graph for "+day+"/"+month+"/"+year );
    myChart.data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3]
        }]
    };
    //generateChart(dataset);
}
function generateChart(dataset) {
    //myChart
}