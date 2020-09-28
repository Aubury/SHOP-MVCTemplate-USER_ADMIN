<?php


class ControllerPersonalPage
{
    private $v, $m;

    public function __construct()
    {
        include_once ROOT . "/views/ViewPersonalPage/ViewPersonalPage.php";
        $this->v = new ViewPersonalPage();
    }

    public function actionShowPersonalPage()
    {
        $this->v->showPersonalPage();
    }

}