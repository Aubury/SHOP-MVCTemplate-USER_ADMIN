<?php


class ModelOrders
{
    private $db;

    public  function __construct()
    {
        include_once ROOT . "/components/Db.php";
        $this->db = new Db();

    }
    public function CreateOrder()
    {

    }
    public function GetProduct($id)
    {
        $prp = $this->db->con->prepare("SELECT * FROM `products` WHERE `id` = '{$id}'");
        $prp->execute();
        $order = $prp->fetchAll();

        $arr = [];

        foreach ($order as $value){
            array_push($arr,[
                'id'   => $value['id'],
                'name' => $value['name'],
                'price'=> $value['price']
            ]);
        }
        return $arr;
    }
    public function GetTotalOrders()
    {
       $prp = $this->db->con->prepare("SELECT * FROM `orders`");
       $prp->execute();
       $arr = $prp->fetchAll();

       $orders = [];
       foreach ($arr as $value){
           array_push($orders,[
               'product' => $this->GetProduct($value['id']),
               'amount'  => $value['amount'],
               'data'    => $value['order_data'],
               'surname' => $value['surname'],
               'name'    => $value['name'],
               'patronymic'=> $value['patronymic'],
               'email'     => $value['email'],
               'telephone' => $value['telephone']

           ]);
       }
    }

}