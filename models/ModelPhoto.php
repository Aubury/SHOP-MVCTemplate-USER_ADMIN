<?php


class ModelPhoto
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
    public function Can_upload($file){
        // если имя пустое, значит файл не выбран
        if($file['name'] == ''){
            echo 'Вы не выбрали файл.';
        }
        /* если размер файла 0, значит его не пропустили настройки
        сервера из-за того, что он слишком большой */
        if($file['size'] == 0){
            echo 'Файл слишком большой.';
        }
        // разбиваем имя файла по точке и получаем массив
        $getMime = explode('.', $file['name']);
        // нас интересует последний элемент массива - расширение
        $mime = strtolower(end($getMime));
        // объявим массив допустимых расширений
        $types = array('jpg', 'png', 'gif', 'bmp', 'jpeg');

        // если расширение не входит в список допустимых - return
        if(!in_array($mime, $types)){
            echo 'Недопустимый тип файла.';
        }

        return true;
    }

    public function DownloadImg($img_url, $tmp_name_img, $size_img, $width_height){

        $img_url_2= $this->TranslitPhp($img_url);
        $path = '/views/img/gallery/'; // Путь к папке

        $file_type = substr($img_url_2, strrpos($img_url_2, '.')+1); // Получаем Расширение файла
        $pos = strpos($img_url_2, ".");
        $fn = substr($img_url_2, 0, $pos);
        $file_name = $fn;
        $img_url_2 = $file_name.mt_rand(0, 10000).".".$file_type;

        if(!copy($tmp_name_img, $img_url_2)){

            echo json_encode("failed to copy $tmp_name_img");

        }else{

            rename( ROOT ."/".$img_url_2,ROOT ."/".$path.$img_url_2);

            $prp = $this->db->con->prepare("INSERT INTO `photos`(`name`, `size`, `width_height`, `direction`)
                                                   VALUES ('{$img_url_2}', '{$size_img}', '{$width_height}', '{$path}')");
            $prp->execute();

            $str = $this->db->con->prepare("SELECT * FROM `photos` WHERE `name`='{$img_url_2}'");
            $str->execute();
            $photo = $str->fetchAll();


            echo json_encode($photo[0]);

        }

    }
    public function TranslitPhp($url){
        $rus = array('А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я', 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я');
        $lat = array('A', 'B', 'V', 'G', 'D', 'E', 'E', 'Gh', 'Z', 'I', 'Y', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F', 'H', 'C', 'Ch', 'Sh', 'Sch', 'Y', 'Y', 'Y', 'E', 'Yu', 'Ya', 'a', 'b', 'v', 'g', 'd', 'e', 'e', 'gh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'c', 'ch', 'sh', 'sch', 'y', 'y', 'y', 'e', 'yu', 'ya');
        $url= str_replace($rus, $lat, $url);
        return $url;
    }

    public function TotalPhoto()
    {
        $prp = $this->db->con->prepare("SELECT * FROM `photos`");
        $prp->execute();
        $mass = $prp->fetchAll();

        echo json_encode($mass);
    }
    public function DelPhoto($id)
    {
        $prp = $this->db->con->prepare("DELETE FROM `photos` WHERE `id` = '{$id}'");
        $prp->execute();

        $admin = $_COOKIE['user_id'];
        $action = "Удалил(а) фотографию из сервер";
        $sql = $this->db->con->prepare("INSERT INTO `weWatchingYou`(`id_admin`, `actions`) VALUES ('{$admin}', '{$action}')");
        $sql->execute();

        echo "Файл удален успешно!";
    }

}