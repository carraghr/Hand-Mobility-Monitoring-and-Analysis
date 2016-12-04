<?php
    session_start();
    if((!isset($_SESSION['user_id'])) || (strcasecmp($_SESSION['type'],'patient') != 0)){
        require('../assets/php/redirect.php');
        redirectUser('../../../index.php');
    }

    $PageTitle = "Portal";
    $patientName = $_SESSION['name'];
    $consultantName = $_SESSION['consultant'];

    include('./assests/html/header.html');
    include('./assests/html/content.html');
    include('./assests/html/footer.html');
