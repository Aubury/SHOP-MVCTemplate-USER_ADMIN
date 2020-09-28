<?php

class ControllerMainPage
{
    private $v, $m;

    public function __construct()
    {
        include_once ROOT . "/views/ViewMainPage/ViewMainPage.php";
        $this->v = new ViewMainPage();
    }

    public function actionShowMainPage()
    {
        $this->v->showMainPage();
    }


}