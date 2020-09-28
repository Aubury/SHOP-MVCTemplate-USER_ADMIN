<?php


class ControllerLogin
{
    private $v, $m, $vadm;

    public function __construct()
    {
        include_once ROOT . "/views/ViewMainPage/ViewMainPage.php";
        include_once ROOT . "/views/ViewLogin/ViewLogin.php";
        include_once ROOT . "/models/ModelLogin.php";
        $this->v = new ViewMainPage();
        $this->vadm = new  ViewLogin();
        $this->m = new ModelLogin();
    }
    public function actionShowLogInAdmin()
    {
        $this->vadm->showLogInAdmin();
    }

    public function actionLogInUser()
    {
        $obj = [
            'email'   => $_POST['email'],
            'password'=> $_POST['password']
        ];

        $this->m->getInUser($obj);
    }
    public  function  actionLogInAdm()
    {
        $obj = [
            'email'   => $_POST['email'],
            'password'=> $_POST['password']
        ];

        $this->m->getInAdm($obj);

    }
    public function actionExit()
    {
        $obj = [
            'id'    => $_POST['id'],
            'table' => $_POST['table']
        ];

        $this->m->ExitSite($obj);
    }
    public function actionRegistration(){


        $arr = array();
        if (isset($_POST)){
            foreach ($_POST as $key=>$value){
                $arr[$key]=$value;
            }
        }

        $this->m->Registration($arr);
    }


}