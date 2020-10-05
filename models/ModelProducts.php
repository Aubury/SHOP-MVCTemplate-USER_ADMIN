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

        $ctg = $this->dbSelect($arr, 'name', 'categories');
        $bnd = $this->dbSelect($arr, 'name', 'brands');

       if($arr['id'] == 'null') {

           $prp = $this->db->con->prepare("INSERT INTO `products`(`name`, `category`, `brand`, `main_img`, `img_0`, `img_1`, `img_2`, `price`, `short_description`, `full_description`, `amount`)
VALUES ('{$arr['name']}', '{$ctg['id']}', '{$bnd['id']}', '{$arr['main_img']}', '{$arr['img_0']}', '{$arr['img_1']}', '{$arr['img_2']}', '{$arr['price']}', '{$arr['short_description']}', '{$arr['full_description']}', '{$arr['amount']}')");
           $prp->execute();

           echo "Товар создан!";

       }else{

           $prp = $this->db->con->prepare("UPDATE `products` SET `name`='{$arr['name']}',`category`='{$ctg['id']}',`brand`='{$bnd['id']}'],`main_img`='{$arr['main_img']}',`img_0`='{$arr['img_0']}',`img_1`='{$arr['img_1']}',`img_2`='{$arr['img_2']}',`price`='{$arr['price']}',`short_description`='{$arr['short_description']}',`full_description`='{$arr['full_description']}',`amount`='{$arr['amount']}'  WHERE `id`='{$arr['id']}'");
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
function get_img_by_id($id){
    $prp = $this->db->con->prepare("SELECT * FROM `photos` WHERE `id`='{$id}'");
    $prp->execute();
    $img = $prp->fetchAll();
    $str = "{$img[0]['direction']}{$img[0]['name']}";

    return $str;
}
//-------------------------------------------------------------------------------------------------------------------
    function get_info_by_id($id, $table){

        $prp = $this->db->con->prepare("SELECT * FROM `$table` WHERE `id`='{$id}'");
        $prp->execute();
        $info = $prp->fetchAll();
        $str = "{$info[0]['name']}";

        return $str;
    }
//-------------------------------------------------------------------------------------------------------------------
    public  function TotalProducts()
    {
        $prp = $this->db->con->prepare("SELECT * FROM `products`");
        $prp->execute();
        $arr = $prp->fetchAll();

//        var_dump($arr);

        $product = [];
        foreach ($arr as $value){
            array_push($product,[
                'id'    => $value['id'],
                'name'  => $value['name'],
                'category' => $this->get_info_by_id($value['category'], 'categories'),
                'brand'    => $this->get_info_by_id($value['brand'], 'brands'),
                'main_img' => $value['main_img'],
                'main_img_url' => $this->get_img_by_id($value['main_img']),
                'img_0'    => $value['img_0'],
                'img_0_url'    => $this->get_img_by_id($value['img_0']),
                'img_1'    => $value['img_1'],
                'img_1_url'    => $this->get_img_by_id($value['img_1']),
                'img_2'    => $value['img_2'],
                'img_2_url'    => $this->get_img_by_id($value['img_2']),
                'price'    => $value['price'],
                'amount'   => $value['amount'],
                'short_description' => $value['short_description'],
                'full_description'  => $value['full_description']
            ]);
        }
        $mass_photos = [];
        foreach ($arr as $value){
            array_push($mass_photos,[
                'main_img_id' => $value['main_img'],
                'main_img_url' => $this->get_img_by_id($value['main_img']),
                'img_0_id'    => $value['img_0'],
                'img_0_url'    => $this->get_img_by_id($value['img_0']),
                'img_1_id'    => $value['img_1'],
                'img_1_url'    => $this->get_img_by_id($value['img_1']),
                'img_2_id'    => $value['img_2'],
                'img_2_url'    => $this->get_img_by_id($value['img_2']),
            ]);
        }
        $product_form = [];
        foreach ($arr as $value){
            array_push($product_form,[
                'id'    => $value['id'],
                'name'  => $value['name'],
                'category' => $this->get_info_by_id($value['category'], 'categories'),
                'brand'    => $this->get_info_by_id($value['brand'], 'brands'),
                'main_img_id' => $value['main_img'],
                'img_0_id'    => $value['img_0'],
                'img_1_id'    => $value['img_1'],
                'img_2_id'    => $value['img_2'],
                'price'    => $value['price'],
                'amount'   => $value['amount'],
            ]);
        }
        $mass_text_edits = [];
        foreach ($product as $value){
            array_push($mass_text_edits,[
                'short_description' => $value['short_description'],
                'full_description'  => $value['full_description']
            ]);
        }

        echo json_encode([$product, $mass_photos, $product_form, $mass_text_edits]);
//        var_dump($product);
    }
}