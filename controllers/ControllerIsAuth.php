<?php


class ControllerIsAuth
{
    private $v, $m;

    public function __construct()
    {
        include_once ROOT . "/models/ModelIsAuth.php";
        $this->m = new ModelIsAuth();
    }

    public function IsAuth($arr)
    {
        if(array_key_exists('user_id', $_COOKIE))
        {
            if($this->checkRole($arr, $_COOKIE['table']))
            {
                return  $this->m->checkLog($_COOKIE['user_id'], $_COOKIE['uPd'], $_COOKIE['table']);
            }
        }
        if(array_key_exists('admin_id', $_COOKIE))
        {
            if($this->checkRole($arr, $_COOKIE['table']))
            {
                return  $this->m->checkLog($_COOKIE['admin_id'], $_COOKIE['uPd'], $_COOKIE['table']);
            }
        }

     return false;
    }
    
    private function checkRole($ar, $val2)
    {
        foreach(array_splice($ar, 2) as $val)
        {
            if($val == $val2)
            {
                return true;
            }
        }
        return false;
    }

}