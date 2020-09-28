<?php


class ModelLogin
{
    private $db;

    public  function __construct()
    {
        include_once ROOT . "/components/Db.php";
        $this->db = new Db();

    }
//---------------------------------------------------------------------------------------------------------------------------------
    public function dbSelect($obj, $name, $table){

        $prep = $this->db->con->prepare("SELECT * FROM  `$table` WHERE `$name` = '{$obj[$name]}'");
        $prep->execute();
        return  $prep->fetchAll();

    }
//-----------------------------------------------------------------------------------------------------------------------------
     public  function getInAdm($arr){

         $admin = $this->dbSelect($arr,'email', 'admins');

         if(count($admin)>0){
             if(password_verify($arr['password'], $admin[0]['password'])) {

//                    echo "<pre>";
//                    var_dump($admin);
//                    echo "</pre>";
//
                 $str = $this->db->con->prepare("UPDATE `admins` SET `last_visit`= NOW() WHERE `email`='{$arr['email']}'");
                 $str->execute();

                 echo json_encode([
                     SITE . "/show/Orders",
                     $this->addUserLog($admin[0], 'adm'),
                     $admin[0]]);

             }else{

                 echo json_encode("Проверьте введенные данные");
             }

         } else {

                echo json_encode("Такого пользователя нет");
          }



}

//------------------------------------------------------------------------------------------------------------------------------
    public function getInUser($arr)
    {

        $user  = $this->dbSelect($arr,'email', 'users');

        if(count($user)>0){

            if(password_verify($arr['password'], $user[0]['password'])) {

                    $str = $this->db->con->prepare("UPDATE `users` SET `last_visit`= NOW() WHERE `email`='{$arr['email']}'");
                    $str->execute();
                    $this->addUserLog($user[0], 'usr');//TODO: same as admin!!!
                    echo json_encode([SITE . "/show/User",
                        $this->addUserLog($user[0], 'usr'),
                        $user[0]]);


                }else{

                    echo json_encode("Проверьте введенные данные");

                }


        }else{

            echo json_encode("Такого пользователя нет");

        }

    }
//----------------------------------------------------------------------------------------------------------------------
    private function addUserLog($user, $tab){

        $log = $this->db->con->prepare("SELECT * FROM `login` WHERE `user_id` = '${user['id']}'");
        $log->execute();
        $arr = $log->fetchAll();

        if(count($arr) == 0){

            $uPd = password_hash(time() . $user['email'], PASSWORD_BCRYPT);
            $this->db->con->exec("INSERT INTO `login`(`user_id`, `uPd`, `table`)
                                           VALUES ( '{$user['id']}', '${uPd}',  '{$tab}')");
            return [$uPd, $user['id'], $tab];


        }else{
            return [$arr[0]['uPd'], $arr[0]['user_id'], $arr[0]['table']];   

        }
    }
 //-------------------------------------------------------------------------------------
    public function ExitSite($arr)
    {
        if($arr['table'] != 'usr'){
            $prp = $this->db->con->prepare("UPDATE `admins` SET `last_out`=NOW()  WHERE `id`={$arr['id']}");
            $prp->execute();

        }

        echo json_encode([SITE]);

    }
    public function Registration($arr){

        $prp = $this->db->con->prepare("SELECT `email` FROM `users` WHERE `email`='{$arr['email']}'");
        $prp->execute();
        $usr = $prp->fetchAll();

        if(count($usr) == 0) {

            $passH = password_hash($arr['password'], PASSWORD_BCRYPT);

            $sqlStr = "INSERT INTO `users`(`name`, `patronymic`, `surname`, `telephone`, `city`, `street`, `building`, `apartment`, `email`, `password`)
                  VALUES ('{$arr['name']}', '{$arr['patronymic']}', '{$arr['surname']}', '{$arr['telephone']}', '{$arr['city']}', '{$arr['street']}', '{$arr['building']}',
                     '{$arr['apartment']}', '{$arr['email']}', '{$passH}')";

            $this->db->con->exec($sqlStr);
            $user = $this->dbSelect($arr, 'email', 'users');

            $regD = [
                'email' => $arr['email'],
                'password' => $arr['password']
            ];

            $this->addUserLog($user[0], 'usr');//TODO: same as admin!!!
            echo json_encode([SITE . "/show/User",
                $this->addUserLog($user[0], 'usr')]);

             $this->sendRegistrationInfo($regD);
        }
        else{
            echo json_encode(["Такой пользователь уже зарегистрирован в системе!"]);
        }
    }
//----------------------------------------------------------------------------------------------------------------------
    private function sendRegistrationInfo($user)
    {
        $msg     = "<h3>Вы успешно зарегистрировались на сайте " . SITE . "</h3> Для авторизации используйте логин: ${user['email']} пароль: ${user['password']}";
        $to      = $user['email'];
        $subject = "Регистрация на сервере " . SITE;
        $headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\nFrom: aubury@vinash.netxi.in\r\n";
        mail($to, $subject, $msg, $headers);
    }
//----------------------------------------------------------------------------------------------------------------------
    public function redirect($url) {

        header('Location: https://'.$_SERVER['HTTP_HOST']. $url);
        exit();
    }

}