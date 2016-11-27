<?php
    session_start();

    if((!isset($_SESSION['user_id'])) || (strcasecmp($_SESSION['type'],'careProvider') != 0)){
        require('../assets/php/redirect.php');
        redirectUser('../../../index.php');
    }else{
        echo "</br>";
        echo '<a href="./assests/php/logout.php"> logout </a>';
    }
?>
