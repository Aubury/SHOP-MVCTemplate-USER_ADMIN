<?php


class ModelProducts
{
    private $db;

    public  function __construct()
    {
        include_once ROOT . "/components/Db.php";
        $this->db = new Db();
    }
//---------------------------------------------------------------------------------------------------------------------------------
    public function dbSelect($obj, $name, $table)
    {

        $prep = $this->db->con->prepare("SELECT * FROM  `$table` WHERE `$name` = '{$obj[$name]}'");
        $prep->execute();
        return  $prep->fetchAll();

    }
//--------------------------------------------------------------------------------------------------------------------
   public function AddProduct($arr){

       if($arr['id'] == 'null') {

           $prp = $this->db->con->prepare("INSERT INTO `products`(`name`, `category`, `brand`, `main_img`, `img_0`, `img_1`, `img_2`, `price`, `short_description`, `full_description`, `amount`)
                   VALUES ('{$arr['name']}', '{$arr['category']}', '{$arr['brand']}', '{$arr['main_img']}', '{$arr['img_0']}', '{$arr['img_1']}', '{$arr['img_2']}', '{$arr['price']}', '{$arr['amount']}', '{$arr['short_description']}', '{$arr['full_description']}')");
           $prp->execute();

           echo "Товар создан!";

       }else{

           $prp = $this->db->con->prepare("UPDATE `products` SET `name`='{$arr['name']}',`category`='{$arr['category']}',`brand`='{$arr['brand']}'],`main_img`='{$arr['main_img']}',`img_0`='{$arr['img_0']}',`img_1`='{$arr['img_1']}',`img_2`='{$arr['img_2']}',`price`='{$arr['price']}',`short_description`='{$arr['short_description']}',`full_description`='{$arr['full_description']}',`amount`='{$arr['amount']}'  WHERE `id`='{$arr['id']}'");
           $prp->execute();

           echo "Данные изменены!";

       }
   }
    //-----------------------------------------------------------------------------------------------------------------
    public function DeleteProduct($arr)
    {
        $categories = $this->dbSelect($arr, 'id', 'products');

        if(count($categories) > 0){
            $prp = $this->db->con->prepare("DELETE FROM `products` WHERE `id`='{$arr['id']}')");
            $prp->execute();
        }
    }
//-------------------------------------------------------------------------------------------------------------------
    public  function TotalProduct()
    {
        $prp = $this->db->con->prepare("SELECT * FROM `products`");
        $prp->execute();
        $arr = $prp->fetchAll();

        $categories = [];
        foreach ($arr as $value){
            array_push($categories,[
                'id'    => $value['id'],
                'name'  => $value['name'],
                'category' => $_POST['category'],
                'brand'    => $value['brand'],
                'main_img' => $value['main_img'],
                'img_0'    => $value['img_0'],
                'img_1'    => $value['img_1'],
                'img_2'    => $value['img_2'],
                'price'    => $value['price'],
                'amount'   => $value['amount'],
                'short_description' => $value['short_description'],
                'full_description'  => $value['full_description']
            ]);
        }

        echo json_encode($categories);
    }
}