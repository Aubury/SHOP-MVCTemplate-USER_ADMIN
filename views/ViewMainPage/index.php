<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style><?php include_once ROOT . "/views/css/reset.css"?></style>
    <style><?php include_once ROOT . "/views/css/fonts.css"?></style>
    <style><?php include_once ROOT . "/views/css/main.css"?></style>
    <style><?php include_once ROOT . "/views/css/style.css"?></style>
    <style><?php include_once ROOT . "/views/css/modal.css" ?></style>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/6c7f1b339a.js" crossorigin="anonymous"></script>
    <title>Shop</title>
</head>
<body>
<div class="full_container">
    <header class="f-row no_wrap justify-evenly align-center">
          <h1>Shop</h1>
         <div id="exchange"></div>
         <div>
            <a href="#modal"><button class="btn btn-primary">Войти/Регистрация</button></a>
         </div>
    </header>
    <main></main>
    <footer></footer>
</div>
<!-----------------------Modal------------------------------------->
<div class="modal" id="modal">-->
    <div class="modalForm">
        <header>
            <h2>Введите данные</h2>
        </header>
        <!----------------Registration------------------------>
        <form name="register" action="#" method="post">
            <p class="f-col">
            <p><input type="text" class="inpText form-control"  name="name" placeholder="Имя">
                <span class="span italic"></span></p>
            <p><input type="text" class="inpText form-control"  name="patronymic" placeholder="Отчество">
                <span class="italic"></span></p>
            <p><input type="text"  class="inpText form-control" name="surname" placeholder="Фамилия">
                <span class="italic"></span></p>
            <p><input type="tel" class="inpText form-control" name="telephone" id="phone"
                      placeholder="+38 (123) 456-78-90" minlength="12" maxlength="18">
                <span class="italic"></span></p>
            <p><input type="text" class="inpText form-control" name="city" placeholder="Город">
                <span class="italic"></span></p>
            <p><input type="text" class="inpText form-control" name="street" placeholder="Улица">
                <span class="italic"></span></p>
            <div class="f-row justify-between no_wrap">
                <p class="w_45">
                    <input type="text" class="inpText form-control" name="building" placeholder="Дом">
                    <span class="italic"></span></p>
                <p class="w_45">
                    <input type="text" class="inpText form-control" name="apartment" placeholder="Квартира">
                    <span class="italic"></span></p>
            </div>
            <p>
                <input type="email" class="inpText form-control" name="email" placeholder="E-mail">
                <span class="italic"></span></p>
            <p class="relative">
                <span class="password-control" onclick="show_password()"><i class="fa fa-eye-slash" aria-hidden="true"></i></span>
                <input type="password" id="password"  class="inpText form-control" name="password"  placeholder="Пароль">
                <span class="italic"></span></p>
            <p class="relative">
                <span class="password-control" onclick="show_password()"><i class="fa fa-eye-slash" aria-hidden="true"></i></span>
                <input type="password" id="repeat-password"  class="inpText form-control" name="repeat-password"  placeholder="Повторите пароль">
                <span class="italic"></span></p>
            <p> <input type="submit" value="Регистрация" class="inpText"></p>
            <div>Уже зарегистрирован? <span id="log_In">Sign in</span></div>
        </form>
        <span class="italic"></span>
        <!--------------Login-------------------------------->
        <form name="logIn" action="#" method="post" class="hide">
            <p><input type="email" class="inpText form-control" name="email" placeholder="E-mail"></p>
            <p class="relative">
                <span class="password-control" onclick="show_password()"><i class="fa fa-eye-slash" aria-hidden="true"></i></span>
                <input type="password" class="inpText form-control" name="password"  placeholder="Пароль"></p>
            <p> <input type="submit" value="Войти" class="inpText"></p>
        </form>
        <span class="italic"></span>
        <footer class="footer">
            <a href="#" class="btn">Закрыть</a>
        </footer>
    </div>
</div>
<!---->
<!--<header class="hederContainer">-->
<!--    <button class="top topHide">&lt;</button>-->
<!--    <div class="userHeader">-->
<!---->
<!--        <div class="headerItem">-->
<!--            <div>-->
<!--                <img src="/views/img/smiley-eating.png" alt="logo__company">-->
<!--            </div>-->
<!--            <div class="slogan">-->
<!--                <p>Главное</p>-->
<!--                <p>иметь</p>-->
<!--                <p>мечту</p>-->
<!--            </div>-->
<!--        </div>-->
<!---->
<!--        <div class="headerItem">-->
<!--            <div class="navigation_group_mobile">-->
<!--                <div class="menu">-->
<!--                    <input type="checkbox" class="hide" id="menu_logo">-->
<!--                    <div class="logo_menu">-->
<!--                        <label for="menu_logo">-->
<!--                            <p></p>-->
<!--                            <p></p>-->
<!--                            <p></p>-->
<!--                        </label>-->
<!--                        <p>МЕНЮ</p>-->
<!--                    </div>-->
<!--                    <div class="elements_menu">-->
<!--                        <ul>-->
<!--                            <li class="countPeoples">Нас уже: <span class="users"></span></li>-->
<!--                            <li>О нас</li>-->
<!--                            <li><a href="#progects">Наши проекты</a></li>-->
<!--                            <li><a href="#contacts">Контакты</a></li>-->
<!--                        </ul>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            ++-->
<!--            <div class="nav">-->
<!--                <ul class="navigation">-->
<!--                    <li class="countPeoples">Нас уже: <span class="users"></span></li>-->
<!--                    <li>О нас</li>-->
<!--                    <li><a href="#progects">Наши проекты</a></li>-->
<!--                    <li><a href="#contacts">Контакты</a></li>-->
<!--                </ul>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</header>-->
<!--<main>-->
<!--    <div class="_container">-->
<!--        <div id="exchange"></div>-->
<!---->
<!--        <div id="progects"></div>-->
<!--    </div>-->
<!--</main>-->
<!---->
<!--<footer class="footer">-->
<!--    <div class="_container">-->
<!--        <div class="map"></div>-->
<!--        <div class="contacts" id="contacts">-->
<!--            <div class="address"></div>-->
<!--            <div class="phone"></div>-->
<!--        </div>-->
<!--    </div>-->
<!--</footer>-->
<!----------------------------------------------------------------->
<!--<div class="section modal__certificate none">-->
<!--    <div class="modal__content__certificate">-->
<!--        <img src="/views/img/page.jpg" alt="свидетельство">-->
<!--        <input type="button" class="closeModalCertificate" value="X">-->
<!--    </div>-->
<!--</div>-->

<!--<script>--><?php //include_once ROOT . "/views/ViewMainPage/app/app.js"?><!--</script>-->
<!--<script>--><?php //include_once ROOT . "/views/ViewMainPage/app/modal_certificate.js"?><!--</script>-->
<script><?php include_once ROOT . "/views/ViewMainPage/app/modalApp.js"?></script>
<script><?php include_once ROOT . "/views/ViewMainPage/app/exchange.js"?></script>
</body>
</html>