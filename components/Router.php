<?php



class Router
{
    private $routes;

    public function __construct()
    {
        include_once ROOT . "/controllers/ControllerIsAuth.php";
        $this->routes = include_once(ROOT . "/config/routes.php");
    }

    public function start()
    {
        $del = "/";
        $controllerName = "Controller";
        $methodName = "action";
        $contr = $controllerName . "MainPage";
        $met = $methodName . "ShowMainPage";


        $uri = trim($_SERVER['REQUEST_URI'], "/");
        $auth = new  ControllerIsAuth();

       foreach ($this->routes as $key => $val)
        {
            if(preg_match("~^$key~", $uri) == 1) {

                $clMet = explode($del, $val);
                
                if($clMet[2] == 'none' || $auth->IsAuth($clMet)){
                    $contr = $controllerName . $clMet[0];
                    $met = $methodName . $clMet[1];
                }
                
                break;
            }

       }

        include_once(ROOT . "/controllers/" . $contr . ".php");
        $obj = new $contr();
        $obj->$met();
    }

}