<?php
    session_start();

    if(!isset($_SESSION['user_id'])){
        require ('./php/loginFunctions.php');
        redirectUser('../index.html');
    }else{
        echo "</br>";
        echo '<a href="./php/logout.php"> logout </a>';
    }
?>