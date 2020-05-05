let lastBarHover = [];
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
        },
        onClick: (e, a)=>{
            if(a.length>0) {
                jump((a[0]._index));
            }

        },
        onHover: (e,a)=>{
            removeHover();
            if(a.length>0){
                a[0]._model.backgroundColor = "rgba(0, 0, 0, 0.5)";
                lastBarHover.push(a);
            }
        }
    }
});
function removeHover() {
    lastBarHover.forEach((a)=>{
        a[0]._model.backgroundColor = "rgba(0, 0, 0, 0.1)";
    });
}
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
function twoDigits(month) {
    return month<10?"0"+month:month;
}
function selectDateYear(year) {
    console.log("graph for "+year );
    let labels = monthsArr;
    let label= '# of videos per month';
    let data= [];

    for (let i=0; i<12; i++){
        if (videoTree.list[year] && videoTree.list[year].list[twoDigits(i+1)]) {
            data[i] = videoTree.list[year].list[twoDigits(i+1)].videoSum;
        } else {
            data[i] = 0;
        }

    }

    generateChart(labels, data, label);
    //jump(2020, 7, 12);
}
function selectDateMonth(month, year) {
    let nbDays = daysInMonth(month, year);
    month = twoDigits(+month+1);
    console.log("graph for "+(month)+"/"+year );
    let labels = [];
    let label= '# of videos per day';
    let data= [];

    for (let i=1; i<=nbDays; i++){
        labels.push(i);
        if (videoTree.list[year] && videoTree.list[year].list[month] && videoTree.list[year].list[month].list[twoDigits(i)]) {
            data[i-1] = videoTree.list[year].list[month].list[twoDigits(i)].videoSum;
        } else {
            data[i-1] = 0;
        }

    }
    generateChart(labels, data, label);
}
function selectDateDay(day, month, year) {
    month = twoDigits(+month+1);
    day = twoDigits(+day+1);
    console.log("graph for "+day+"/"+month+"/"+year );
    let labels = [];
    let label= '# of videos per hour';
    let data= [];

    for (let i=0; i<=23; i++){
        labels.push(i);
        data.push(0);
    }

       if (videoTree.list[year] &&
           videoTree.list[year].list[month] &&
           videoTree.list[year].list[month].list[day]) {
           videoTree.list[year].list[month].list[day].list.forEach((video)=>{
               data[+video.slice(0, 2)]++;
           });
        }

    generateChart(labels, data, label);
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

function searchVideo(year, month, day) {

}
function removeData() {
    chart.data.labels= [];
    chart.data.datasets.forEach((dataset,index) => {
        dataset.data = [];
    });
    chart.update();
}