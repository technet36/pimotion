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
}
function selectDateMonth(month, year) {
    console.log("graph for "+month+"/"+year );
}
function selectDateDay(day, month, year) {
    console.log("graph for "+day+"/"+month+"/"+year );
}
function generateChart(dataset) {

}