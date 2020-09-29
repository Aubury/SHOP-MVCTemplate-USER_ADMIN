let rex = {
    formAdd : document.forms['formAddAdmins'],
    formDel : document.forms['formDelAdmin'],
    arrInp  : document.forms['formAddAdmins'].querySelectorAll('.form-control'),
    table   : document.querySelector('.tableAdmins'),
    massAdm : [],
    arrIcDelAdm: [],
    arrIcEdAdm : []
};
//-----------------------------------------------------------------------------------------------------------------
function massInputsFormAdm() {

    let form = rex.formAdd;
    const inpArr = [
        {
            inp: form['id'],
            name: 'id',
        },
        {
            inp: form['name'],
            name: 'name',
        },
        {
            inp: form['patronymic'],
            name: 'patronymic',
        },
        {
            inp: form['surname'],
            name: 'surname',

        },
        {
            inp: form['email'],
            name: 'email',

        },
    ];

    return inpArr;
}
//-----------------------------------------------------------------------------------------------------------------
rex.formAdd.addEventListener('submit', function (ev) {

    ev.preventDefault();

    let inpArr = massInputsFormAdm(),
            answ = {};

    inpArr.forEach((el) => {
           answ[el.name] = el.inp.value;

    });
    sendObj(answ);
});
//-----------------------------------------------------------------------------------------------------
function sendObj(answ) {

    let str = encodeURIComponent(JSON.stringify(answ)),
        url = `/reg/addAdmin?value=${str}`;


    fetch(url).then((response)=> {  return response.text();})
        .then((text)=>{rex.formAdd.nextElementSibling.innerHTML = text;
            for(let i=0; i<rex.arrInp.length; i++){

                rex.arrInp[i].value = '';
                getAllAdmins();
                setTimeout(()=> {
                    rex.formAdd.nextElementSibling.innerHTML = '';
                    }, 10000);

            }
        });
}
//------------------------------------------------------------------------------------------------------
// function DeleteAdmin(ev){
//
//     const url = '/reg/delAdmin',
//         fD = new FormData();
//     let  data = '';
//
//     if(ev.target.hasAttribute('id'))
//     {
//         data = ev.target.id.slice(ev.target.id.indexOf('_')+1);
//     }
//
//     fD.append('email', data);
//
//     fetch(url,{
//         method: "POST",
//         body: fD
//     }).then( response => response.text())
//         .then( text => {
//             window.location.reload();
//         });
//
// }
//-------------------------------------------------------------------------------------------------------
function getAllAdmins()
{
    fetch('/inf/admins')
        .then( data => data.json())
        // .then( arr => console.log(arr));
        .then(arr=>{
            rex.massAdm = arr;
            createTable(arr, rex.table, table_Admin(arr));
        }).then( data =>{
            rex.arrIcDelAdm = rex.table.querySelectorAll(".iconsDel");
            rex.arrIcEdAdm = rex.table.querySelectorAll(".iconsEd");
            addListenerDeleteAdm(rex.arrIcDelAdm);
            addListenerEditAdm(rex.arrIcEdAdm);
    })

}
//-----------------------------------------------------------------------------------------------------
function table_Admin(arr) {
    //Формирую строки
    let trs = "<tr><th>Delete</th><th>Edit</th><th>ФИО</th><th>Email</th><th>Последний визит</th></tr>";
    arr.forEach(el=>{
        trs = `${trs}<tr><td class="iconsDel"><i class="material-icons" id="del_${el.id}">delete</i></td>   
                         <td class="iconsEd"><i class="material-icons" id="ed_${el.id}">create</i></td>   
                         <td>${el.surname}<br>${el.name}<br>${el.patronymic}<br></td>
                         <td>${el.email}</td>
                          <td>${el.last_visit}<br></td></tr>`;
    });
   return trs;
}
 //-------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------
function addListenerDeleteAdm(arr){
    for (let i = 0; i < arr.length; i++ ){
        arr[i].addEventListener('click', (ev)=>{
            Delete(ev, '/reg/delAdmin');
        });
    }
}
//----------------------------------------------------------------------------------------------------
function addListenerEditAdm(arr){
    for (let i = 0; i < arr.length; i++ ){
        arr[i].addEventListener('click',(ev)=>{
            getMassIndexById(ev, rex.massAdm, massInputsFormAdm());
        });
    }
}
//-------------------------------------------------------------------------------------------------

getAllAdmins();