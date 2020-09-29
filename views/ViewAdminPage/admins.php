<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style><?php include_once ROOT . "/views/css/reset.css"?></style>
    <style><?php include_once ROOT . "/views/css/fonts.css"?></style>
    <style><?php include_once ROOT . "/views/css/main.css"?></style>
    <style><?php include_once ROOT . "/views/css/style.css" ?></style>
    <style><?php include_once ROOT . "/views/css/navigation.css" ?></style>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <title>Admin</title>
</head>
<body>
<div class="full_container">
    <header class="f-col no_wrap justify-evenly align-center w_100">
        <div class="f-row justify-between align-center welcome w_100">
            <div id="welcome" class="welcome"></div>
            <h2 class="black">Shop</h2>
            <button class="btn btn-success" id="exit">Выйти</button>
        </div>
        <div class="navigation f-row justify-center align-center w_100">
            <ul class="f-row">
                <li class="nav-item">
                    <a  href="/show/Orders">Заказы</a>
                </li>
                <li class="nav-item">
                    <a href="/show/Categories">Категории</a>
                </li>
                <li class="nav-item">
                    <a href="/show/Products">Товары</a>
                </li>
                </li>
                <li class="nav-item">
                    <a class="active"  href="/show/Admins">Управление администраторами</a>
                </li>
            </ul>
        </div>
    </header>
    <!---------------------------------->

    <main class="container-fluid">
        <div class="f-row justify-center">
            <h2>Управление администраторами</h2>
        </div>
        <div class="f-row">
            <div class="col-4 col-md-3 offset-md-9 p-2">
                <input onkeyup="tableSearch()" class="form-control mr-sm-3" id="searchAdmins" type="search" placeholder="Поиск по таблице" aria-label="Search">
            </div>
        </div>
        <div class="f-row justify-around">
            <div class="col-3">
                <div class="card border-info  mb-3">
                    <div class="card-header"><h3>Добавление или редактировать администратора</h3></div>
                    <div class="card-body">
                        <form name="formAddAdmins" action="#" method="get">
                            <p><input type="text" class="form-control"  name="id" placeholder="ID" readonly>
                            <p><input type="text" class="form-control"  name="name" placeholder="Имя">
                            <p><input type="text" class="form-control"  name="patronymic" placeholder="Отчество">
                            <p><input type="text"  class="form-control" name="surname" placeholder="Фамилия">
                            <p><input type="email" class="form-control" name="email" placeholder="Email">
                            <p class="col-12 col-xl-12"> <button class="btn btn-block btn-success" type="submit">Добавить / Редактировать</button></p>
                        </form>
                        <span class="italic"></span>
                    </div>
                </div>
            </div>

            <div class="col-9 border-warning">
                <table class="tableAdmins w_100"></table>
            </div>
        </div>

    </main>
    <!---------------------------------->

    <footer></footer>
</div>
<script><?php include_once ROOT . "/views/app/main.js"?></script>
<script><?php include_once ROOT . "/views/ViewAdminPage/js/scriptAdmin.js"?></script>
<script><?php include_once ROOT . "/views/ViewAdminPage/js/searchAdmins.js"?></script>



</body>
</html>