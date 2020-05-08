let lastBarHover = [];
let videoList = [];
let tbody = $("#video_tbody");
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
$( function() {
    $( "#tabs" ).tabs();
} );



function removeHover() {
    lastBarHover.forEach((a)=>{
        a[0]._model.backgroundColor = "rgba(0, 0, 0, 0.1)";
    });
}
function updateVideo(filename){
    var player = document.getElementById("player");
    console.log(player);
    player.setAttribute("src", filename);
    document.getElementById('video_player').load();
}
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
   // console.log("graph for "+year );
    let labels = monthsArr;
    let label= '# of videos per month';
    let data= [];
//video_tbody
    for (let i=0; i<12; i++){
        if (videoTree.list[year] && videoTree.list[year].list[twoDigits(i+1)]) {
            data[i] = videoTree.list[year].list[twoDigits(i+1)].videoSum;
        } else {
            data[i] = 0;
        }

    }

    generateChart(labels, data, label);
    generateRows(year, null, null);
    //jump(2020, 7, 12);
}
function selectDateMonth(month, year) {
    let nbDays = daysInMonth(month, year);
    month = twoDigits(+month+1);
    //console.log("graph for "+(month)+"/"+year );
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
    generateRows(year, month, null);
}
function selectDateDay(day, month, year) {
    month = twoDigits(+month+1);
    day = twoDigits(+day);
    //console.log("graph for "+day+"/"+month+"/"+year );
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
    generateRows(year, month, day);
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

function generateRows(year, month, day) {
    console.log(day);
    videoList = [];
    if (day && videoTree.list[year].list[month].list[day]) {
        searchVideo(videoTree.list[year].list[month].list[day]);
    }else if (!day && month && videoTree.list[year].list[month]){
        searchVideo(videoTree.list[year].list[month]);
    }else if (!month && year && videoTree.list[year]) {
        searchVideo(videoTree.list[year]);
    }
    tbody.empty();
    videoList.sort();
    videoList.forEach(path=>{
        tbody.append("<tr><td onclick=\"updateVideo('"+path+"')\">"+path+"</td></tr>");
    });

}

function searchVideo(tree) {
    if (Array.isArray(tree.list)) {
        tree.list.forEach((elt) => {
            videoList.push(tree.path + "" + elt);
        });
    } else {
        Object.keys(tree.list).forEach((elt) => {
            searchVideo(tree.list[elt]);
        });
    }

}
function removeData() {
    chart.data.labels= [];
    chart.data.datasets.forEach((dataset,index) => {
        dataset.data = [];
    });
    chart.update();
}