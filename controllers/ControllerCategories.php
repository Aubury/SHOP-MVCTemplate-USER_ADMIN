<?php


class ControllerCategories
{
    private $v, $m;

    public function __construct()
    {
        include_once ROOT . "/views/ViewCategories/ViewCategories.php";
        include_once ROOT . "/models/ModelCategories.php";
        $this->v = new ViewCategories();
        $this->m = new ModelCategories();
    }

    public function actionShowCategories()
    {
        $this->v->showCategories();
    }
    public function actionAddCategories()
    {
        $obj = [
            "id"   => $_POST['id'],
            'name' => $_POST['name']
        ];

        $this->m->AddCategories($obj);
    }
    public function actionDeleteCategories()
    {
        $obj = ['id' => $_POST['id']];

        $this->m->DeleteCategories($obj);
    }
    public function actionTotalCategories()
    {
        $this->m->TotalCategories();
    }
}