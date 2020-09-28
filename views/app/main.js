const objMain = {
    logo : document.querySelector('.logo'),
    welcome : document.querySelector('#welcome'),
    exit : document.querySelector('#exit'),
    nav  : document.querySelectorAll('li'),
    form : document.forms,
    arr  : [],
    arrIcDel: [],
    arrIcEd : []

}
//---------------------------------------------------------------------------
function Welcome() {

    let user = localStorage.getItem('user');
    objMain.welcome.innerHTML = `<h5>Добро пожаловать,</h5> <h3>${user}</h3>`;

}

//--------------------------------------------------------------------------------
objMain.exit.addEventListener('click', function () {

    const fD = new FormData();
    let id = getCookie('user_id') || getCookie('admin_id');
          fD.append('id', id);
          fD.append('table', getCookie('table'));


    fetch('/log/exit',{
        method: "POST",
        body: fD
    }).then( text => text.json())
        .then( data => {
            setCookie('admin_id','',0);
            setCookie('user_id','',0);
            setCookie('uPd','',0);
            setCookie('table','',0);
            setCookie('SameSite','None',365);
            localStorage.removeItem('user');
            window.location.href = `${data[0]}`;
        })
})
//--------------------------------------------------------------------------------
function setCookie(cname, cvalue, exMins) {
    var d = new Date();
    d.setTime(d.getTime() + (exMins*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//--------------------------------------------------------------------------------
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//--------------title-------------------------------------------------------
const  title = function TitleInput(ev){
    lostFocus();
    let target = ev.target,
        title = target.parentElement.lastElementChild;

    if(title != null && title.classList.contains('title')){

        let coords = target.getBoundingClientRect();
        title.style.width = coords.width;

        title.classList.remove('none');

        let top =  0 - (title.offsetHeight + 10);
        title.style.top = top + 'px';

    }else{

        return;
    }
}
//--------------------------------------------------------------------------------------------------
const lostFocus = function InputBlur() {

    // const form = objMain.form;
    //       arr = form.elements;
    for (let i = 0; i < objMain.arr.length; i++) {
        if(objMain.arr[i].parentElement.lastElementChild != null && objMain.arr[i].parentElement.lastElementChild.classList.contains('title')){
            objMain.arr[i].parentElement.lastElementChild.classList.add('none');
        }
    }
}

//---------------------------------------------------------------------------------------------------
const inpFocus = function addListenerInput(){

    let form = objMain.form;

    for (let i = 0; i < form.length; i++){
        for (let j = 0; j < form[i].length; j++){
           objMain.arr.push(form[i][j]);
        }
    }
          // arr = form.elements;
    for (let i = 0; i < objMain.arr.length; i++){
        objMain.arr[i].addEventListener('focus', title);
        objMain.arr[i].addEventListener('blur', lostFocus);
    }
}

//---------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------
function Delete(ev, url){

    let  data = '',
        fD = new FormData();

    if(ev.target.hasAttribute('id'))
    {
        data = ev.target.id.slice(ev.target.id.indexOf('_')+1);
    }

    fD.append('id', data);

    fetch(url,{
        method: "POST",
        body: fD
    }).then( response => response.text())
        .then( text => {
            window.location.reload();
        });

}

//-----------------------------------------------------------------
function createTable(arr, table_str){

    const table = obj.table;
    //   Удаляю всех детей!!!
    while(table.hasChildNodes()){
        table.removeChild(table.firstChild);
    }
    // //Формирую строки
    // let trs = "<tr><th>Delete</th><th>Edit</th><th>ID</th><th>Name</th></tr>";
    // arr.forEach(el=>{
    //     trs = `${trs}<tr><td class="iconsDel"><i class="material-icons" id="del_${el.id}">delete</i></td>
    //                      <td class="iconsEd"><i class="material-icons" id="ed_${el.id}">create</i></td>
    //                      <td>${el.id}</td><td>${el.name}</td>`;
    // });

    table.innerHTML = table_str(arr);

    objMain.arrIcDel.push(document.querySelectorAll(".iconsDel"));
    objMain.arrIcEd.push(document.querySelectorAll(".iconsEd"));
    addListenerDelete(obj.arrIcDel[0]);
    addListenerEdit(obj.arrIcEd[0]);

}
//--------------------------------------------------------------------------------------------------
function getMassIndexById(ev)
{
    let arr = obj.massProducts,
        data = '';
    if(ev.target.hasAttribute('id')){

        data = ev.target.id.slice(ev.target.id.indexOf('_')+1);
        arr.forEach( el => {
            if(el.id === data){
                fillInputsForm(el);
            }

        });
    }
}
//----------------------------------------------------------------------------------------------------
function fillInputsForm(arr){

    const inpArr = massInputsForm();

    for(let i = 0; i < inpArr.length; i++){
        for (let key in arr) {
            if(inpArr[i].name === key){
                inpArr[i].inp.value = arr[key] || inpArr[i].inp.innerHTML;
            }
        }
    }
}
//----------------------------------------------------------------------------------------------------
function addListenerEdit(arr){
    for (let i = 0; i < arr.length; i++ ){
        arr[i].addEventListener('click', getMassIndexById);
    }
}
//-----------------------------------------------------------------------

Welcome();
inpFocus();
