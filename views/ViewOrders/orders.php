<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style><?php include_once ROOT . "/views/css/reset.css" ?></style>
    <style><?php include_once ROOT . "/views/css/fonts.css" ?></style>
    <style><?php include_once ROOT . "/views/css/main.css" ?></style>
    <style><?php include_once ROOT . "/views/css/style.css" ?></style>
    <style><?php include_once ROOT . "/views/css/navigation.css" ?></style>


    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <title>Заказы</title>
</head>
<body>
<div class="full_container">
    <header class="f-col no_wrap justify-evenly align-center w_100">
        <div class="f-row justify-between align-center welcome w_100">
            <div id="welcome" class="welcome"></div>
            <a href="http://shop-template.vinash.netxi.in"><h2 class="black">Shop</h2></a>
            <button class="btn btn-success" id="exit">Выйти</button>
        </div>
        <div class="navigation f-row justify-center align-center w_100">
            <ul class="f-row">
                <li class="nav-item">
                    <a class="active" href="/show/Orders">Заказы</a>
                </li>
                <li class="nav-item">
                    <a href="/show/Categories">Категории</a>
                </li>
                <li class="nav-item">
                    <a href="/show/Products">Товары</a>
                </li>
                </li>
                <li class="nav-item">
                    <a  href="/show/Admins">Управление администраторами</a>
                </li>
            </ul>
        </div>
    </header>
<!---------------------------------->
    <main class="container-fluid">
        <div class="f-row justify-center">
            <h2>Заказы</h2>
        </div>
        <div class="f-row">
            <div class="col-4 col-md-3 offset-md-9 p-2">
                <input onkeyup="tableSearch()" class="form-control mr-sm-3" id="searchAdmins" type="search" placeholder="Поиск по таблице" aria-label="Search">
            </div>
        </div>
        <div class="row justify-content-around">
            <div class="container border-warning">
                <table id="tableOrders" class="w_100"></table>
            </div>
        </div>
    </main>
<!---------------------------------->
    <footer></footer>
</div>

<script><?php include_once ROOT . "/views/ViewOrders/js/scriptOrders.js" ?></script>
<script><?php include_once ROOT . "/views/app/main.js" ?></script>

</body>
</html>