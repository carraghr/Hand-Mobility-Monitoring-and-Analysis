<?php

    if ($_SERVER['REQUEST_METHOD']=='POST'){
        include('databaseConnection.php');

        //Username and password sent from a form need to check which one.
        $typeOfUser = $_POST['login'];
        $userName = $_POST['userName'];
        $password = $_POST['password'];

        if(strcasecmp($typeOfUser,'patient') == 0){
            require_once('./assets/php/patientLogin.php');

            list($check, $data) = validateLoginDetails($databaseConnection,$userName,$password);

            //check if login details are right
            if ($check){
                session_start();
                //Set session data
                $PID = $data['PatientID'];
                $_SESSION['user_id'] = $PID;
                $_SESSION['name'] = $data['NameFirst']. " ". $data['NameLast'];
                $_SESSION['type'] = $typeOfUser;

                $careProviderInfo = "Select CareProvider.NameFirst, CareProvider.NameLast 
                      from CareProvider
                      INNER JOIN Patient
                      where Patient.CPID = CareProvider.StaffID and '$PID' = Patient.PatientID";

                $careProviderInfoResult = @mysqli_query($databaseConnection, $careProviderInfo) OR trigger_error($databaseConnection->error."[ $careProviderInfo]");
                mysqli_close($databaseConnection);
                if ($careProviderInfoResult){
                    if (mysqli_num_rows($careProviderInfoResult) == 1){
                        //get record
                        $row = mysqli_fetch_array($careProviderInfoResult, MYSQLI_ASSOC);

                        //return true and result
                        $_SESSION['consultant'] = $row['NameFirst'] . " " . $row['NameLast'];
                    }
                }


                $url = 'http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']);

                //Because of \\ and // difference in OS need to remove
                $url = rtrim($url,'/\\');

                $url .= '/PatientPortal';

                //redirect happens here
                header("location: $url");
            }

        }
        else{
            require_once('./assets/php/careProviderLogin.php');
            list($check, $data) = validateLoginDetails($databaseConnection,$userName,$password);
            mysqli_close($databaseConnection);

            //check if login details are right
            if ($check){
                session_start();
                $_SESSION['type'] = $typeOfUser;
                $_SESSION['user_id'] = $data['StaffID'];
                $_SESSION['name'] = $data['NameFirst']. " ". $data['NameLast'];
                $_SESSION['Level'] = $data['Level'];
                if(strcmp($data['Level'], 'pro') !== 0){
                    $_SESSION['SupID'] = $data['SupID'];
                }
                $url = 'http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']);

                //Because of \\ and // difference in OS need to remove
                $url = rtrim($url,'/\\');

                $url .= '/CareProviderPortal';

                //redirect happens here
                header("location: $url");

            }

        }
    }

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Home</title>
    <link rel="stylesheet" type="text/css" href="./homePage.css">
    <link rel="stylesheet" type="text/css" href="./assets/libs/bootstrap.min.css">
</head>
<body>
<div class = "container-fluid">

    <div class="col-md-12 header">
    </div>

    <div class="col-md-6">
        <div class = "col-md-5 col-md-offset-2  loginBox">
            <div class = "LogIn_message">
                <h3>Login to Patient Portal</h3>
            </div>
            <div class="error">
                <p><?php if(isset($typeOfUser)){ if(strcasecmp($typeOfUser,'patient') == 0){$errors = $data; foreach($errors as $error){echo $error;}}}?></p>
            </div>
            <form id = "patientLogin" action = "" accept-charset="utf-8" method="POST">
                <div class="form-group">
                    <label for="userName">Username</label>
                    <input type="text" name="userName" placeholder="Username" value="<?php if(isset($typeOfUser)){ if(strcasecmp($typeOfUser,'patient') == 0){echo $userName;}}?>" required autofocus/>
                    <br/>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" placeholder="Password" required/>
                </div>
                <br/>
                <button type="submit" class="btn btn-lg btn-primary btn-block" name = "login" value ="patient" >Sign In</button>
            </form>
        </div>
    </div>

    <div class="col-md-6">
        <div class = "col-md-5 col-md-offset-2 loginBox">
            <div class = "LogIn_message">
                <h3>Login to Care Provider Portal</h3>
            </div>
            <div class="error">
                <p><?php if(isset($typeOfUser)){ if(strcasecmp($typeOfUser,'careProvider') == 0){$errors = $data; foreach($errors as $error){echo $error;}}}?></p>
            </div>
            <form id = "careProviderLogin" action = "" accept-charset="utf-8" method="POST">
                <div class="form-group">
                    <label for="userName">Username</label>
                    <input type="text" name="userName" placeholder="Username" value="<?php if(isset($typeOfUser)){ if(strcasecmp($typeOfUser,'careProvider') == 0){echo $userName;}}?>" required autofocus/>
                    <br/>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" placeholder="Password" required/>
                    <br/>
                </div>
                <button type="submit" class="btn btn-lg btn-primary btn-block" name = "login" value ="careProvider" >Sign In</button>
            </form>
        </div>
    </div>
    <div class="footer">
    </div>
</div>
</body>
</html>
