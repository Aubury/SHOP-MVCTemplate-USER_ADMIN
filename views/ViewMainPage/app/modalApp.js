const obj = {
    nameRex    : /^[а-яa-z]{2,50}$/i,
    emailRex   : /^[a-z0-9\._-]+@[a-z0-9\.-]+\.[a-z]{2,10}$/i,
    addressRex : /[a-zа-я0-9]{0,}[\s\,\.\"№\/\\n\\r]{0,}/gi,
    telRex     : /[\d+\s\(\)-\+]/g,
    taxRex     : /[\d+]{10}/,
    numRex     : /^\d+$/,
    passwordRex: /[a-zа-я0-9]{0,}[\s\,\.\!\?\"№\_\-]{0,}/gi,
    formLOgIn  : document.forms['logIn'],
    formReg    : document.forms['register'],
    users    : document.querySelectorAll('.users'),
    map      : document.querySelector('.map'),
    address  : document.querySelector('.address'),
    phone    : document.querySelector('.phone'),
    log_In   : document.querySelector('#log_In'),
    modal    : document.querySelector('#modal'),
    password : document.querySelector('#password'),
    repeat_password: document.querySelector('#repeat-password'),
    password_control : document.querySelector('.view')

};
//------------------------------------------------------------------------------
function show_password(e) {
    let ev = window.event.srcElement,
        item = ev.parentElement,
        input = item.nextElementSibling;
   if(input)
    if (input.type === "password") {
        input.type = "text";
        item.innerHTML = '<i class="far fa-eye" aria-hidden="true">';
    } else {
        input.type = "password";
        item.innerHTML = '<i class="fa fa-eye-slash" aria-hidden="true">';
    }
}
// ------------------------------------------------------------------------------
 obj.repeat_password.addEventListener('keyup', function (e) {

        this.value != obj.password.value ? this.style.borderColor = 'red' : this.style.borderColor = 'green';
 })
//----------------------------------------------------------------------------
function check_passwords(){
     let password = obj.password,
         repeat_password = obj.repeat_password,
         flag = true;

     repeat_password.value === password.value ? flag = true : flag = false;
     return flag;
}

// ------------------------------------------------------------------------------
obj.log_In.addEventListener('click', (ev)=>{
    obj.formReg.classList.add('hide');
    obj.formLOgIn.classList.remove('hide');
})
//-------------------------------------------------------------------------------
//Обработчик отправки.
obj.formLOgIn.addEventListener('submit', function (ev) {

    ev.preventDefault();

    let form = obj.formLOgIn;
    const inpArr = [
        {
            inp     : form['email'],
            name    : 'email',

        },
        {
            inp     : form['password'],
            name    : 'password',

        },
    ];

    let answ = {};

    inpArr.forEach((el) => {
        answ[el.name] = el.inp.value;

    });

    sendObj(form, answ, '/log/login');

});
// -------------------------------------------------------------------------
const massInp = function massInputsForm(){

    let form = obj.formReg;
    const inpArr = [
        {
            inp     : form['name'],
            info    : form['name'].nextElementSibling,
            reg     : obj.nameRex,
            msgError: '*Ввод только кириллицы или латиницы!',
            name    : 'name',
        },
        {
            inp     : form['patronymic'],
            info    : form['patronymic'].nextElementSibling,
            reg     : obj.nameRex,
            msgError: '*Ввод только кириллицы или латиницы!',
            name    : 'patronymic',
        },
        {
            inp     : form['surname'],
            info    : form['surname'].nextElementSibling,
            reg     : obj.nameRex,
            msgError: '*Ввод только кириллицы или латиницы!',
            name    : 'surname',

        },
        {
            inp     : form['telephone'],
            info    : form['telephone'].nextElementSibling,
            reg     : obj.telRex,
            msgError: '*Ввод только цифр!',
            name    : 'telephone',

        },
        {
            inp     : form['city'],
            info    : form['city'].nextElementSibling,
            reg     : obj.nameRex,
            msgError: '*Ввод только кириллицы или латиницы!',
            name    : 'city',

        },
        {
            inp     : form['street'],
            info    : form['street'].nextElementSibling,
            reg     : obj.nameRex,
            msgError: '*Ввод только кириллицы или латиницы!',
            name    : 'street',

        },
        {
            inp     : form['building'],
            info    : form['building'].nextElementSibling,
            reg     : obj.numRex,
            name    : 'building',

        },
        {
            inp     : form['apartment'],
            info    : form['apartment'].nextElementSibling,
            reg     : obj.numRex,
            name    : 'apartment',

        },
        {
            inp     : form['email'],
            info    : form['email'].nextElementSibling,
            reg     : obj.emailRex,
            name    : 'email',

        },
        {
            inp     : form['password'],
            info    : form['email'].nextElementSibling,
            reg     : obj.passwordRex,
            name    : 'password',

        },
    ];

    return inpArr;
    // let answ = {};

    // inpArr.forEach((el) => {
    //     answ[el.name] = el.inp.value;
    //
    // });
    //
    // sendObj(answ, 'log/reg');

};
//----------------------------------------------------------------------------------------------------
function validate(inpArr, form){

    let allISRight = true,
        answ = {},
        passW = obj.password,
        rpt_passW = obj.repeat_password;


    inpArr.forEach((el) => {
        allISRight = checkInput(el) && allISRight;
        answ[el.name] = el.inp.value;

    });

    if(allISRight){
        if(check_passwords()){
            sendObj(obj.formReg, answ, '/log/register');
        }
        else {
            rpt_passW.nextElementSibling.innerHTML = "Пароли не совпадают!"
        }
    }
}
//-----------------------------------------------------------------------------------------------------
function checkInput(check){
    check.msgError = check.msgError || "Данные введены не корректно";


    if(!check.reg.test(check.inp.value)){
        check.info.innerHTML = check.msgError;
        return false;
    }

    check.info.innerHTML = '';
    return true;
}
//-----------------------------------------------------------------------------------------------------
function sendObj(_form, answ, _url) {

    const url = _url,
        fD = new FormData();

    for(let key in answ){
        fD.append( key, answ[key]);
    }

    fetch(url, {
        method: "POST",
        body: fD,
        mode: 'no-cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
    })
        .then(e => e.json())
         .then(data => {
             if(data.length == 2){
                 //set cookie with data[1]
                 setCookie('user_id', data[1][1], 1);
                 setCookie('uPd', data[1][0], 1);
                 setCookie('table', data[1][2], 1);
                 window.location.href = `${data[0]}`;
             }else {
                // console.log(data);
                 _form.nextElementSibling.innerHTML = data;
             }
         });
}
// --------------------------------------------------------------------------
obj.formReg.addEventListener('submit', function (ev) {

    ev.preventDefault();
    validate(massInp(), obj.formReg);
});
//----------------------------------------------------------------------------
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  const expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
// //-----------------------------------------------------------------------------
// const getUsers = function getAmountUsers() {
//
//     fetch('/inf/amtUsers',{
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, cors, *same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json',
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//         }
//     }).then( data => data.json())
//         .then( data => {obj.users.forEach(el=> el.innerHTML = data)});
// }
//----------------------------------------------------------------------------
const splitStr = function StringToMass(str) {

    let comma = ',';
    let mass = str.split(comma);
    return mass;
}
//---------------------------------------------------------------------------
// const fillFooter = function FillFooter(arr){
//     let map = arr.link,
//         phone = splitStr(arr.phone),
//         address = splitStr(arr.address);
//
//     obj.map.innerHTML = map;
//
//     phone.forEach(el=> {
//         let p = document.createElement('p');
//         p.innerHTML = el.trim();
//         obj.phone.appendChild(p);
//     });
//
//     address.forEach(el=> {
//         let p =document.createElement('p');
//         p.innerHTML = el.trim();
//         obj.address.appendChild(p);
//     })
//
//
// }

// //-----------------------------------------------------------------------------
// const getAddress = function getAddress(){
//
//     fetch('/inf/contacts',{
//         method:'POST',
//         credentials: 'same-origin', // include, *same-origin, omit
//         header:('Set-Cookie: cross-site-cookie=name; SameSite=None; Secure')
//     }).then( mass => mass.json())
//         .then(mass => fillFooter(mass));
//     // .then(mass => console.log(mass));
// }
//-----------------------------------------------------------------------------
// const creatProject = function creatProject(arr) {
//
//     arr.forEach( el => {
//         if(el.published == '1'){
//
//             let div = projectCard(el);
//             obj.project.appendChild(div);
//
//         }
//     });
//
// }
// //-----------------------------------------------------------------------------
// const getProgects = function getMassProjects(){
//
//     fetch('/inf/project',{
//         method:"POST",
//         header:('Set-Cookie: cross-site-cookie=name; SameSite=None; Secure')
//     }).then( data => data.json())
//         .then(arr => creatProject(arr[1]));
// }

//-----------------------------------------------------------------------------
// const projectCard = function createProjectCart(arr) {
//
//     let answ = '',
//         projectCart = document.createElement('div');
//        projectCart.classList.add("section", "progect");
//
//     answ += `<div class="progect__left__content colHeight">
//                     <div class="img__progect">
//                         <img src="${arr.photo_1}" alt="">
//                     </div>
//                     <p>${arr.text_1}</p>
//                 </div>
//                 <div class="progect__right__content colHeight">
//                     <div>
//                         <h2>Проект \"${arr.name}\"</h2>
//                         <p>${arr.text_2}</p>
//                    </div>
//
//                     <div class="galery">
//                         <img src="${arr.photo_2}" alt="">
//                         <img src="${arr.photo_3}" alt="">
//                         <img src="${arr.photo_4}" alt="">
//                         <img src="${arr.photo_5}" alt="">
//                     </div>
//                 </div>
//                 <div class="video">
//                     <p>${arr.video_1}</p>
//                     <p>${arr.video_2}</p>
//                 </div>`;
//
//     projectCart.innerHTML = answ;
//
//     return projectCart;
// }
//-----------------------------------------------------------------------------
// getAddress();
// getUsers();
// getProgects();
