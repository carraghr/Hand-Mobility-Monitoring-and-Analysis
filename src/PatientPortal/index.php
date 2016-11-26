<?php
    session_start();

    if(!isset($_SESSION['user_id'])){
        require('./assests/php/loginFunctions.php');
        redirectUser('../index.html');
    }

    $PageTitle = "Portal";
    $patientName = $_SESSION['name'];
    $consultantName = $_SESSION['consultant'];

    include('./assests/html/header.html');
    include('./assests/html/content.html');
    include('./assests/html/footer.html');
