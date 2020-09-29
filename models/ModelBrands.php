<?php


class ModelBrands
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
    public function AddBrands($arr)
    {
        if($arr['id'] == 'null'){

            $prp = $this->db->con->prepare("INSERT INTO `brands`(`name`) VALUES ('{$arr['name']}')");
            $prp->execute();
            echo "Бренд добавлен!";

        }else{

            $prp = $this->db->con->prepare("UPDATE `brands` SET `name`='{$arr['name']}' WHERE `id`='{$arr['id']}'");
            $prp->execute();
            echo "Данные изменены!";
        }
    }
//-----------------------------------------------------------------------------------------------------------------
    public function DeleteBrands($arr)
    {

        $brand = $this->dbSelect($arr, 'id', 'brands');

//        var_dump($brand);

        if(count($brand) > 0){
            $prp = $this->db->con->prepare("DELETE FROM `brands` WHERE `id`='{$arr['id']}'");
            $prp->execute();
        }
    }
//-------------------------------------------------------------------------------------------------------------------
    public  function TotalBrands()
    {
        $prp = $this->db->con->prepare("SELECT * FROM `brands`");
        $prp->execute();
        $arr = $prp->fetchAll();

        $brands = [];
        foreach ($arr as $value){
            array_push($brands,[
                'id'    => $value['id'],
                'name'  => $value['name']
            ]);
        }

        echo json_encode($brands);
    }

}