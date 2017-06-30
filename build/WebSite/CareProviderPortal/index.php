<?php

    session_start();

    if((!isset($_SESSION['user_id'])) || (strcasecmp($_SESSION['type'],'careProvider') != 0)){
        require('../assets/php/redirect.php');
        redirectUser('../../../index.php');
    }

    $PageTitle = "Portal";
    $careProviderName = $_SESSION['name'];
    $level = $_SESSION['Level'];

    include('./assests/html/header.html');
    include('./assests/html/content.html');
    include('./assests/html/footer.html');
