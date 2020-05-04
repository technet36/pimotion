<html>
<script type="text/javascript" src="date-picker.js"></script>
<script type="text/javascript" src="main.js"></script>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

<div class="container-fluid">
    <div id="header" class="row">
        <h1>PIMOTION</h1>
    </div>
    <div class="row">
        <div class="col-md-8 col-sm-12 border-dark">

        </div>
        <div class="col-md-4 col-sm-12 border-info">

        </div>
    </div>
</div>
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
