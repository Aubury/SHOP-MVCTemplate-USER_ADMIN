<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style><?php include_once ROOT . "/views/css/reset.css" ?></style>


    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Compiled and minified CSS -->
<!--    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">-->
    <!--Import materialize.css-->
<!--    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>-->


    <style><?php include_once ROOT . "/views/css/fonts.css" ?></style>
    <style><?php include_once ROOT . "/views/css/main.css" ?></style>
    <style><?php include_once ROOT . "/views/css/style.css" ?></style>
    <style><?php include_once ROOT . "/views/css/navigation.css" ?></style>
    <style><?php include_once ROOT . "/views/ViewProducts/css/products_style.css" ?></style>


    <title>Товары</title>
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
                    <a href="/show/Orders">Заказы</a>
                </li>
                <li class="nav-item">
                    <a  href="/show/Categories">Категории</a>
                </li>
                <li class="nav-item">
                    <a  href="/show/Brands">Бренды</a>
                </li>
                <li class="nav-item">
                    <a class="active" href="/show/Products">Товары</a>
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
            <h2>Создать или изменить товар</h2>
        </div>
        <div class="f-row justify-between align-center">
            <a href="#product_modal"><button class="btn f-row justify-between align-center  p-2"><i class="medium material-icons">add</i>Добавить товар&nbsp;</button></a>
            <div class="col-4 p-2">
                <input onkeyup="tableSearch()" class="form-control mr-sm-3" id="searchProduct" type="search" placeholder="Поиск по таблице" aria-label="Search">
            </div>
        </div>

        <div class="col-9 border-warning">
            <table class="tableProducts w_100"></table>
        </div>


        <!-----------------------Modal------------------------------------->
        <div class="product_modal" id="product_modal">
            <div class="product_modalForm">
                <header>
                    <h3>Добавление или редактировать Товара</h3><
                </header>
                <!----------------Add Product------------------------>
                <div class="padding-horizontal">
                <div class="f-row justify-around padding-vertical">
                    <div class="w_45 f-col">
                        <div class="w_100">
                            <form name="main_photo" action="#" method="post" enctype="multipart/form-data">
                                <h6>Добавить главное фото</h6>
                                <div class="file-field input-field">
                                    <div class="btn">
                                        <span>File</span>
                                        <input type="file">
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input  name="img_url" class="input-file file-path validate" type="text" placeholder="Загрузите файл">
                                    </div>
                                </div>
                                <div class="f-row justify-between">
                                    <p class="w_45 left">
                                        <button class="btn btn-block btn-success" type="submit">Добавить</button>
                                    </p>
                                    <p class="w_45 mini_img"></p>
                                </div>
                            </form>
                        </div>
                        <hr>
                        <div class="w_100">
                            <form name="photo_1" action="#" method="post" enctype="multipart/form-data">
                                <h6>Добавить фото 1</h6>
                                <div class="file-field input-field">
                                    <div class="btn">
                                        <span>File</span>
                                        <input type="file">
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input  name="img_url" class="input-file file-path validate" type="text" placeholder="Загрузите файл">
                                    </div>
                                </div>
                                <div class="f-row justify-between">
                                    <p class="w_45 left">
                                        <button class="btn btn-block btn-success" type="submit">Добавить</button>
                                    </p>
                                    <p class="w_45 mini_img"></p>
                                </div>
                            </form>
                        </div>
                        <hr>
                        <div class="w_100">
                            <form name="photo_2" action="#" method="post" enctype="multipart/form-data">
                                <h6>Добавить фото 2</h6>
                                <div class="file-field input-field">
                                    <div class="btn">
                                        <span>File</span>
                                        <input type="file">
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input  name="img_url" class="input-file file-path validate" type="text" placeholder="Загрузите файл">
                                    </div>
                                </div>
                                <div class="f-row justify-between">
                                    <p class="w_45 left">
                                        <button class="btn btn-block btn-success" type="submit">Добавить</button>
                                    </p>
                                    <p class="w_45 mini_img"></p>
                                </div>
                            </form>
                        </div>
                        <hr>
                        <div class="w_100">
                            <form name="photo_3" action="#" method="post" enctype="multipart/form-data">
                                <h6>Добавить фото 3</h6>
                                <div class="file-field input-field">
                                    <div class="btn">
                                        <span>File</span>
                                        <input type="file">
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input  name="img_url" class="input-file file-path validate" type="text" placeholder="Загрузите файл">
                                    </div>
                                </div>
                                <div class="f-row justify-between">
                                    <p class="w_45 left">
                                        <button class="btn btn-block btn-success" type="submit">Добавить</button>
                                    </p>
                                    <p class="w_45 mini_img"></p>
                                </div>
                            </form>
                        </div>

                    </div>
                    <div class="w_45">
                        <form name="formProduct" action="#">
                            <p><input type="text" class="form-control"  name="name" placeholder="Название товара"></p>
                            <p><input type="text" class="form-control"  name="id" placeholder="ID" readonly></p>
                            <p><select name="category" id="inputCategory" class="form-control">
                                    <option>Выберите Категорию</option>
                                </select></p>
                            <p><select name="brand" id="inputBrand" class="form-control">
                                    <option>Выберите Бренд</option>
                                </select></p>
                            <p><input type="text" class="form-control" id="main_img"  name="main_img" placeholder="ID Главное фото" readonly></p>
                            <p><input type="text" class="form-control arr_img" id="img_0"  name="img_0" placeholder="ID фото 1" readonly></p>
                            <p><input type="text" class="form-control arr_img" id="img_1"  name="img_1" placeholder="ID фото 2" readonly></p>
                            <p><input type="text" class="form-control arr_img" id="img_2"  name="img_2" placeholder="ID фото 3" readonly></p>
                            <p><input type="text" class="form-control"  name="price" placeholder="Цена"></p>
                            <p><input type="text" class="form-control"  name="amount" placeholder="Количество"></p>

                    </div>
                </div>
                <div class="f-col">
                    <h6>Короткое описание</h6>
                    <p id="short_description"><textarea id="editor_1" name="short_description" class="form-control"></textarea></p>
                    <hr>
                    <h6>Полное описание</h6>
                    <p id="full_description"><textarea id="editor_2" name="full_description" class="form-control"></textarea></p>
                </div>
                <p class="col-12 col-xl-12"> <button class="btn btn-block btn-success" type="submit">Добавить / Редактировать</button></p>
                </form>
                <span class="italic"></span>
                </div>
                <footer class="footer">
                    <a href="#" class="f-row justify-center align-center"><i class="material-icons">close</i>Закрыть</a>
                </footer>
             </div>
        </div>


     </main>
    <!---------------------------------->
    <footer></footer>
</div>
<script><?php include_once ROOT . "/views/app/main.js" ?></script>
<script><?php include_once ROOT . "/views/ViewProducts/js/scriptProduct.js" ?></script>

<!-- Compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script src="https://cdn.ckeditor.com/ckeditor5/22.0.0/classic/ckeditor.js"></script>

<script>
    ClassicEditor
        .create( document.querySelector( '#editor_1' ) )
        .catch( error => {
            console.error( error );
        } );

    ClassicEditor
        .create( document.querySelector( '#editor_2' ) )
        .catch( error => {
            console.error( error );
        } );
</script>
</body>
</html><?php
