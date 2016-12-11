<?php
    /*session_start();

    if(!isset($_SESSION['user_id'])){
        require('../../../../assets/php/redirect.php');
        redirectUser('../../../../index.php');
    }
*/
    $PageTitle = 'Tip To Tip';
    $SelectedHand = "leftHand";
    $Exercise = str_replace("%20", " ",$PageTitle);



    include_once('../../Common/php/exerciseInformation.php');

    include('../../Common/html/header.html');
    include('./html/instructions.html');
    include('../../Common/html/gameStage.html');

    echo "<script type='text/javascript'>";
    echo "var targets = ".json_encode($results).";\n\r";
    echo "var repsToDo = ". $reps.";\n\r";
    echo "var seqsToDo = ". $seq.";\n\r";
    echo "var selectedHand = '".$SelectedHand."';\n\r";
    echo "</script>";

    include('../html/resourcesToLoad.html');

    include('../../Common/html/footer.html');
