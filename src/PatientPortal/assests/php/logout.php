<?php
    session_start();
    require('../../../assets/php/redirect.php');
    if(!isset($_SESSION['user_id'])){

        redirectUser('../../../index.php');

    }else{
        $_SESSION = array();
        session_destroy();
        setcookie('PHPSESSID','',time()-3600,'/','',0,0);
    }

    redirectUser('../../../index.php');
