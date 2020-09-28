<?php


class ControllerOrders
{
    private $v, $m;

    public function __construct()
    {
        include_once ROOT . "/views/ViewOrders/ViewOrders.php";
        include_once ROOT . "/models/ModelOrders.php";
        $this->v = new ViewOrders();
        $this->m = new ModelOrders();
    }

    public function actionShowOrders()
    {
        $this->v->showOrdersPage();
    }
    public function actionTotalOrders()
    {
        $this->m->GetTotalOrders();
    }
}