<?php


class ModelCategories
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
    public function AddCategories($arr)
    {
        if($arr['id'] == 'null'){

            $prp = $this->db->con->prepare("INSERT INTO `categories`(`name`) VALUES ('{$arr['name']}')");
            $prp->execute();
            echo "Катогория создана";

        }else{

            $prp = $this->db->con->prepare("UPDATE `categories` SET `name`='{$arr['name']}' WHERE `id`='{$arr['id']}'");
            $prp->execute();
            echo "Данные изменены!";
        }
    }
//-----------------------------------------------------------------------------------------------------------------
   public function DeleteCategories($arr)
  {
      $categories = $this->dbSelect($arr, 'id', 'categories');

//      var_dump($categories);

      if(count($categories) > 0){
//          echo $categories[0]['id'];
          $prp = $this->db->con->prepare("DELETE FROM `categories` WHERE `id`='{$categories[0]['id']}'");
          $prp->execute();

      }
  }
//-------------------------------------------------------------------------------------------------------------------
    public  function TotalCategories()
    {
        $prp = $this->db->con->prepare("SELECT * FROM `categories`");
        $prp->execute();
        $arr = $prp->fetchAll();

        $categories = [];
        foreach ($arr as $value){
            array_push($categories,[
                'id'    => $value['id'],
                'name'  => $value['name']
            ]);
        }

        echo json_encode($categories);
    }

}
