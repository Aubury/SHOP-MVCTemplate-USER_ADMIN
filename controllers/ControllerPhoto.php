<?php


class ControllerPhoto
{
    private $v, $m;

    public function __construct()
    {
        include_once ROOT . "/views/ViewProducts/ViewProducts.php";
        include_once ROOT . "/models/ModelPhoto.php";
        $this->m = new ModelPhoto();
        $this->v = new ViewProducts();
    }

    public function actionShowPhotoPage()
    {
        $this->v->showPhotoPage();
    }
    public function actionAddPhoto()
    {

        // если была произведена отправка формы
        if(isset($_FILES['file'])) {
            // проверяем, можно ли загружать изображение
            $check = $this->m->Can_upload($_FILES['file']);

            if ($check === true) {
                $img_url = $_FILES['file']['name'];
                $tmp_name_img= $_FILES['file']['tmp_name'];
                $size_img = $_FILES['file']['size'];
                $image_info = getimagesize($_FILES["file"]["tmp_name"]);
                $width_height = $image_info[0]." x ".$image_info[1];

                $this->m->DownloadImg($img_url, $tmp_name_img, $size_img, $width_height);

            } else {
                // выводим сообщение об ошибке
                echo "<strong>$check</strong>";
            }
        }

    }
    public function actionUpload()
    {

        // если была произведена отправка формы
        if(isset($_FILES['file'])) {
            // проверяем, можно ли загружать изображение
            $check = $this->m->Can_upload($_FILES['file']);

            if ($check === true) {
                $img_url = $_FILES['file']['name'];
                $tmp_name_img= $_FILES['file']['tmp_name'];
                $size_img = $_FILES['file']['size'];
                $image_info = getimagesize($_FILES["file"]["tmp_name"]);
                $width_height = $image_info[0]." x ".$image_info[1];

                $this->m->upload($img_url, $tmp_name_img, $size_img, $width_height);

            } else {
                // выводим сообщение об ошибке
                echo "<strong>$check</strong>";
            }
        }

    }
    public function actionDelPhoto()
    {
        $this->m->DelPhoto($_POST['id']);
    }

    public function actionTotalPhoto()
    {
        $this->m->TotalPhoto();
    }
}