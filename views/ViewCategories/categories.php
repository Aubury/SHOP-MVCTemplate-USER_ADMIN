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
    <!-- CSS only -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <!-- JS, Popper.js, and jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <title>Категории</title>
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
                    <a href="/show/Orders">Заказы</a>
                </li>
                <li class="nav-item">
                    <a class="active" href="/show/Categories">Категории</a>
                </li>
                <li class="nav-item">
                    <a href="/show/Products">Товары</a>
                </li>
                <li class="nav-item">
                    <a  href="/show/Admins">Управление администраторами</a>
                </li>
            </ul>
        </div>
    </header>
    <!---------------------------------->
    <main class="container-fluid f-col">
        <div class="f-row justify-center">
            <h2>Создать или изменить категориЙ</h2>
        </div>

        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <a class="nav-link active" id="category-tab" data-toggle="tab" href="#category" role="tab" aria-controls="category" aria-selected="true">Категории</a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link" id="brand-tab" data-toggle="tab" href="#brand" role="tab" aria-controls="brand" aria-selected="false">Производители</a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
            </li>
        </ul>
<!--================================================================-->
        <div class="tab-content" id="myTabContent">
<!------------------------------------>
            <div class="tab-pane fade show active" id="category" role="tabpanel" aria-labelledby="category-tab">
                <div class="f-row p-2">
                    <div class="col-4 col-md-3 offset-md-9 p-2">
                        <input onkeyup="tableSearchCtg()" class="form-control mr-sm-3" id="searchCategories" type="search" placeholder="Поиск по таблице" aria-label="Search">
                    </div>
                </div>
                <div class="f-row justify-around">
                   <div class="col-3">
                       <div class="card border-info  mb-3">
                          <div class="card-header"><h3>Добавление или редактировать Категорий</h3></div>
                          <div class="card-body">
                              <form name="formCategories" action="#">
                               <p><input type="text" class="form-control"  name="id" placeholder="ID" readonly>
                               <p><input type="text" class="form-control"  name="name" placeholder="Имя Категории">
                               <p class="col-12 col-xl-12"> <button class="btn btn-block btn-success" type="submit">Добавить / Редактировать</button></p>
                               </form>
                              <span class="italic"></span>
                           </div>
                       </div>
                   </div>
                    <div class="col-9 border-warning">
                        <table class="tableCategories w_100"></table>
                    </div>
                </div>
            </div>
<!----------------------------------------------------->

            <div class="tab-pane fade" id="brand" role="tabpanel" aria-labelledby="brand-tab">
                <div class="f-row p-2">
                    <div class="col-4 col-md-3 offset-md-9 p-2">
                        <input onkeyup="tableSearchBnd()" class="form-control mr-sm-3" id="searchBrands" type="search" placeholder="Поиск по таблице" aria-label="Search">
                    </div>
                </div>
                <div class="f-row justify-around">
                    <div class="col-3">
                        <div class="card border-info  mb-3">
                            <div class="card-header"><h3>Добавление или редактировать бренда</h3></div>
                            <div class="card-body">
                                <form name="formBrands" action="#">
                                    <p><input type="text" class="form-control"  name="id" placeholder="ID" readonly>
                                    <p><input type="text" class="form-control"  name="name" placeholder="Имя Бренда">
                                    <p class="col-12 col-xl-12"> <button class="btn btn-block btn-success" type="submit">Добавить / Редактировать</button></p>
                                </form>
                                <span class="italic"></span>
                            </div>
                        </div>
                    </div>

                    <div class="col-9 border-warning">
                        <table class="tableBrands w_100"></table>
                    </div>
                </div>
            </div>

<!---------------------------------------------->
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
        </div>
    </main>
    <!---------------------------------->
    <footer></footer>
</div>
<script><?php include_once ROOT . "/views/app/main.js" ?></script>
<script><?php include_once ROOT . "/views/ViewCategories/js/scriptCategory.js" ?></script>
<script><?php include_once ROOT . "/views/ViewCategories/js/scriptBrands.js" ?></script>
<script><?php include_once ROOT . "/views/ViewCategories/js/searchCategory.js" ?></script>
<script><?php include_once ROOT . "/views/ViewCategories/js/searchBrand.js" ?></script>



</body>
</html><?php
