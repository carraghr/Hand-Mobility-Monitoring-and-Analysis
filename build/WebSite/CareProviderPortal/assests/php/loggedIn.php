<?php
    session_start();

    if(!isset($_SESSION['user_id'])){
        require('../../../assets/php/redirect.php');
        redirectUser();
    }
    else{
        echo "</br>";
        echo '<a href="logout.php"> logout </a>';
    }
