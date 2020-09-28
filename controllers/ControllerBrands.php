<?php


class ControllerBrands
{
    private $v, $m;

    public function __construct()
    {
        include_once ROOT . "/views/ViewCategories/ViewCategories.php";
        include_once ROOT . "/models/ModelBrands.php";
        $this->v = new ViewCategories();
        $this->m = new ModelBrands();
    }

    public function actionShowBrands()
    {
        $this->v->showCategories();
    }
    public function actionAddBrands()
    {
        $obj = [
            "id"   => $_POST['id'],
            'name' => $_POST['name']
        ];

        $this->m->AddBrands($obj);

    }
    public function actionDeleteBrands()
    {
        $obj = ['name' => $_POST['name']];

        $this->m->DeleteBrands($obj);
    }
    public function actionTotalBrands()
    {
        $this->m->TotalBrands();
    }
}