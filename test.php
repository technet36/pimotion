<!doctype html>
<html lang="fr">
<?php
function customScanDir($tree){
    $files = scandir($tree["path"]);
    //echo "<br/>";
    if(!$files) return null;
    foreach($files as $file){
        if (is_dir($tree["path"].$file) && $file != "." && $file != "..") /* si dossier */{
            //echo "<br/>dossier ".$tree["path"].$file."/<br/>";
            $newTree = ["videoSum"=>0, "path"=>$tree["path"].$file."/","list"=>[]];
            $tempTree = customScanDir($newTree);
            $tree["videoSum"] +=$tempTree["videoSum"];
            $tree["list"][$file] = $tempTree;
        }else if (!is_dir($tree["path"].$file)) /* si video */{
            //echo "<br/>video ".$tree["path"].$file;
            $tree["videoSum"]++;
            array_push($tree["list"],$file);
        }
    }
    return $tree;
}
//echo "<button onclick=updateVideo(\"".$file."\") type='button'>".$file."</button>";
$tree = ["videoSum"=>0, "path"=>"./videos/","list"=>[]];
$output = json_encode(customScanDir($tree));
?>
<script type="application/javascript">
    console.log(<?php echo $output ?>);
    let videoTree = <?php echo $output ?>;
    console.log(JSON.stringify(<?php echo $output ?>, undefined, 4));
</script>
<head>
    <meta charset="utf-8">
    <title>PIMOTION</title>
    <script src="https://code.jquery.com/jquery-3.5.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"></script>

    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="date-picker.css">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

</head>
<body>
<div class="container-fluid">
    <div id="header" class="row">
        <h1>PIMOTION</h1>
    </div>
    <div class="row">
        <div id="screen" class="col-md-12 col-lg-8">
            <div class="row">
                <video id="video_player" controls width="640">
                    <source id="player" src="" type="video/mp4">
                    erreur
                </video>
            </div>
            <div class="row">
                <canvas id="myChart" width="400" height="200"></canvas>
            </div>
        </div>
        <div id="selector" class="col-lg-4 col-md-12">
            <div id="tabs">
                <ul>
                    <li><a href="#tabs-1" onclick="goToDirect()" >Direct</a></li>
                    <li><a href="#tabs-2" onclick="goToArchives()">Archives</a></li>
                    <li><a href="#tabs-3" onclick="goToDate()">Date</a></li>
                </ul>
                <div id="tabs-1">
                    <h3>LIVE</h3>
                    <ul>
                        <li>Camera name :</li>
                        <li>Resolution :</li>
                        <li>IPS</li>
                    </ul>
                    Mouvement camera:<br/>
                    <button type="button">&larr;</button>
                    <button type="button">&uarr;</button>
                    <button type="button">&darr;</button>
                    <button type="button">&rarr;</button>
                </div>
                <div id="tabs-2">
                    Liste des vidéos enregistrées.
                    <br/>
                    <p id="archives_def">Les vidéos non enregistrées sont detruites après 1 mois</p>
                    <ul>
                        <li><button type="button" onclick="updateVideo('vidéos_test0')">vidéos_test0</button></li>
                        <li><button type="button" onclick="updateVideo('vidéos_test1')">vidéos_test1</button></li>
                        <li><button type="button" onclick="updateVideo('vidéos_test2')">vidéos_test2</button></li>
                        <li><button type="button" onclick="updateVideo('vidéos_test3')">vidéos_test3</button></li>
                        <li><button type="button" onclick="updateVideo('vidéos_test4')">vidéos_test4</button></li>
                        <li><button type="button" onclick="updateVideo('vidéos_test5')">vidéos_test5</button></li>
                    </ul>
                </div>
                <div id="tabs-3">
                    <div class="wrapper">
                        <div class="container-calendar">
                            <div class="button-container-calendar">
                                <button id="previous">&#8249;</button>
                                <button id="next">&#8250;</button>
                                <h3 id="monthHeader"></h3>
                                <div></div>
                                <p id="yearHeader"></p>
                            </div>

                            <table class="table-calendar" id="calendar">
                                <thead id="thead-month"></thead>
                                <tbody id="calendar-body"></tbody>
                            </table>

                            <div class="footer-container-calendar">
                                <label for="month">Jump To: </label>
                                <select id="month">
                                    <option value=0>Jan</option>
                                    <option value=1>Fev</option>
                                    <option value=2>Mars</option>
                                    <option value=3>Avr</option>
                                    <option value=4>Mai</option>
                                    <option value=5>Juin</option>
                                    <option value=6>Juil</option>
                                    <option value=7>Août</option>
                                    <option value=8>Sept</option>
                                    <option value=9>Oct</option>
                                    <option value=10>Nov</option>
                                    <option value=11>Dec</option>
                                </select>
                                <select id="year"></select>
                            </div>
                            <p id="date-picked"></p>
                        </div>
                    </div>
                    <div>
                        <a href="https://stackoverflow.com/questions/4847752/how-to-get-video-duration-dimension-and-size-in-php">video duration php</a>
                        <table id="video_table">
                            <thead>
                            <tr>
                                <th>fichier</th>
                            </tr>
                            </thead>
                            <tbody id="video_tbody">
                            <tr><td onclick="updateVideo('./2020/05/05/07H51.mp4')">test</td></tr>
                            <tr>
                                <td>gdf</td>
                            </tr>
                            <tr>
                                <td>gdf</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<br/>
<br/>
<iframe src = "localhost:8081" width = "555" height = "200">
    Sorry your browser does not support inline frames.
</iframe>
<iframe src = "localhost:8080" width = "555" height = "200">
    Sorry your browser does not support inline frames.
</iframe>
<script type="text/javascript" src="date-picker.js"></script>
<script type="text/javascript" src="main.js"></script>
</body>
</html>
