<?php
    function redirectUser($page = '../index.php'){

        $url = 'http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']);

        //Because of \\ and // difference in OS need to remove
        $url = rtrim($url, '/\\');

        $url .= '/' . $page;

        //redirect happens here
        header("location: $url");
    }