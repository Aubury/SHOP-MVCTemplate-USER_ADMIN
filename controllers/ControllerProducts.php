<?php


class ControllerProducts
{
    private $v, $m;

    public function __construct()
    {
        include_once ROOT . "/views/ViewProducts/ViewProducts.php";
        include_once ROOT . "/models/ModelProducts.php";
        $this->v = new ViewProducts();
        $this->m = new ModelProducts();
    }

    public function actionShowProducts()
    {
        $this->v->showProducts();
    }
    public function actionAddProduct()
    {
        $obj = [
            "id"   => $_POST['id'],
            'name' => $_POST['name'],
            'category' => $_POST['category'],
            'brand'    => $_POST['brand'],
            'main_img' => $_POST['main_img'],
            'img_0'    => $_POST['img_0'],
            'img_1'    => $_POST['img_1'],
            'img_2'    => $_POST['img_2'],
            'price'    => $_POST['price'],
            'amount'   => $_POST['amount'],
            'short_description' => $_POST['short_description'],
            'full_description'  => $_POST['full_description']
        ];

        $this->m->AddProduct($obj);
    }
    public function actionDeleteProduct()
    {
        $obj = ['id' => $_POST['id']];

        $this->m->DeleteCategories($obj);
    }
    public function actionTotalProducts()
    {
        $this->m->TotalProducts();
    }
}