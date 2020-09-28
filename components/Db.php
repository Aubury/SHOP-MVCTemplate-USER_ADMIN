<?php


class Db
{
    private $servername, $username, $password, $dbname;
    public $con;
    public function __construct()
    {
        $this->servername = "localhost";
        $this->username = "qvhklqzo";
        $this->password = "18_Viky76";
        $this->dbname = "qvhklqzo_shop";


     try{
        $this->con = new PDO("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password );
        $this->con->query("SET NAMES 'utf8';");
         $this->con->query("SET CHARACTER SET 'utf8';");
         $this->con->query("SET SESSION collation_connection = 'utf8_general_ci';");
//        // set the PDO error mode to exception
       $this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     }

      catch(PDOException $e)
      {

        echo($e->getMessage());
        file_put_contents('DBErrors.txt', $e->getMessage(), FILE_APPEND);
      }


    }
}