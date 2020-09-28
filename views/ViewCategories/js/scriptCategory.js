let rex = {
    form  : document.forms['formCategories'],
    table : document.querySelector('.tableCategories'),
    massCtg  : [],
    // arrIcDel: [],
    // arrIcEd : []
}
//-----------------------------------------------------------------------------------------------------------------
function massInputsForm() {

    let form = rex.form;
    const inpArr = [
        {
            inp: form['id'],
            name: 'id',
        },
        {
            inp: form['name'],
            name: 'name',
        }
    ];

    return inpArr;
}
//---------------------------------------------------------------
rex.form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    let url = '/reg/addCategories',
        id = rex.form.id.value || 'null',
        name = rex.form.name.value,

        fD = new FormData();

    fD.append('id', id)
    fD.append('name', name);
    fetch(url,{
        method: "POST",
        body  : fD
    }).then( data => data.text())
        .then( data => {
            getAllCategories();
            rex.form.name.id.value = '';
            rex.form.name.value = '';
            rex.form.nextElementSibling.innerHTML = data;

        })
})
//-----------------------------------------------------------------
function getAllCategories()
{
    fetch('/inf/Categories')
        .then( data => data.json())
        // .then( arr => console.log(arr));
        .then(arr => {
            createTable(arr, table_Category(arr));
            rex.massCtg = arr;
        })

}
//-------------------------------------------------------------------
function table_Category(arr) {
    //Формирую строки
    let trs = "<tr><th>Delete</th><th>Edit</th><th>ID</th><th>Name</th></tr>";
    arr.forEach(el=>{
        trs = `${trs}<tr><td class="iconsDel"><i class="material-icons" id="del_${el.id}">delete</i></td>   
                         <td class="iconsEd"><i class="material-icons" id="ed_${el.id}">create</i></td>   
                         <td>${el.id}</td><td>${el.name}</td>`;
    });
    return trs;
}
// //-----------------------------------------------------------------
// function createTable(arr){
//
//     const table = rex.table;
//     //   Удаляю всех детей!!!
//     while(table.hasChildNodes()){
//         table.removeChild(table.firstChild);
//     }
//     //Формирую строки
//     let trs = "<tr><th>Delete</th><th>Edit</th><th>ID</th><th>Name</th></tr>";
//     arr.forEach(el=>{
//         trs = `${trs}<tr><td class="iconsDel"><i class="material-icons" id="del_${el.id}">delete</i></td>
//                          <td class="iconsEd"><i class="material-icons" id="ed_${el.id}">create</i></td>
//                          <td>${el.id}</td><td>${el.name}</td>`;
//     });
//
//     table.innerHTML = trs;
//
//     rex.arrIcDel.push(document.querySelectorAll(".iconsDel"));
//     rex.arrIcEd.push(document.querySelectorAll(".iconsEd"));
//     addListenerDelete(rex.arrIcDel[0]);
//     addListenerEdit(rex.arrIcEd[0]);
//
// }
//------------------------------------------------------------------------------------------------------
// function DeleteCategories(ev){
//
//     const url = '/reg/delCategories',
//         fD = new FormData();
//     let  data = '';
//
//     if(ev.target.hasAttribute('id'))
//     {
//         data = ev.target.id.slice(ev.target.id.indexOf('_')+1);
//     }
//
//     fD.append('id', data);
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
//--------------------------------------------------------------------------------------------------
// function getMassIndexById(ev)
// {
//     let arr = rex.massCtg,
//         data = '';
//     if(ev.target.hasAttribute('id')){
//
//         data = ev.target.id.slice(ev.target.id.indexOf('_')+1);
//         arr.forEach( el => {
//             if(el.id === data){
//                 fillInputsForm(el);
//             }
//
//         });
//     }
// }
//----------------------------------------------------------------------------------------------------
// function fillInputsForm(arr){
//
//     const inpArr = massInputsForm();
//
//     for(let i = 0; i < inpArr.length; i++){
//         for (let key in arr) {
//             if(inpArr[i].name === key){
//                 inpArr[i].inp.value = arr[key];
//             }
//         }
//     }
// }
//---------------------------------------------------------------------------------------------------
function addListenerDelete(arr){
    for (let i = 0; i < arr.length; i++ ){
        arr[i].addEventListener('click',(ev)=>{
            Delete(ev,'/reg/delCategories');
        } );
    }
}
//----------------------------------------------------------------------------------------------------
// function addListenerEdit(arr){
//     for (let i = 0; i < arr.length; i++ ){
//         arr[i].addEventListener('click', getMassIndexById);
//     }
// }
//----------------------------------------------------------------------------------------------------
function section_body() {
    let item = event.target,
        parent = item.parentNode,
        body = parent.nextElementSibling;

    body.classList.remove('absolute');
    body.style.display = 'block';
}
getAllCategories();

