<html>
<script type="text/javascript">
  function updateVideo(filename){
	var player = document.getElementById("player");
	console.log(player);
	player.setAttribute("src", "./videos/2020/05/04/"+filename);
	}
</script>

archives:
<?php
	$files = scandir('./videos/2020/05/04/');
	foreach($files as $file){
		echo "<button onclick=updateVideo(\"".$file."\") type='button'>".$file."</button>";
	}

?>


<div>
	 <video controls width="640">
		 <source id="player" src="./videos/2020/05/04/16:05.mp4"
        	    	type="video/mp4">
		erreur
	</video>
</div>

</html>
