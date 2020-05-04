function updateVideo(filename){
    var player = document.getElementById("player");
    console.log(player);
    player.setAttribute("src", "./videos/2020/05/04/"+filename);
}