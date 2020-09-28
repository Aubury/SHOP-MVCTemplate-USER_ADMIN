<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style><?php include_once ROOT . "/views/css/reset.css"?></style>
    <style><?php include_once ROOT . "/views/css/main.css"?></style>
    <style><?php include_once ROOT . "/views/css/forms.css"?></style>
    <style><?php include_once ROOT . "/views/css/style.css" ?></style>
    <style><?php include_once ROOT . "/views/ViewLogin/login.css" ?></style>

    <!-- CSS only -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <!-- JS, Popper.js, and jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
    <title>Login</title>
</head>
<body class="f-col">
<header></header>
<main class="container f-col justify-center align-center vh100">
    <div class="f-col">
        <h1 class="center">Login</h1>
        <div class="card-body">
            <form name="LogIn" action="#" class="formLogIn" method="">
                <p><input type="text" class="inpText form-control"  name="email" placeholder="Login" required>
                <p><input type="password" class="inpText form-control"  name="password" placeholder="Password" required>
                <p class="col-12 col-xl-12"> <button class="btn btn-block btn-success" type="submit">Log In</button></p>
            </form>
            <span class="italic"></span>
        </div>
    </div>

</main>
<footer></footer>
<script><?php include_once ROOT . "/views/app/main.js"?></script>
<script><?php include_once ROOT . "/views/ViewLogin/app/scripLog.js"?></script>
</body>
</html>
