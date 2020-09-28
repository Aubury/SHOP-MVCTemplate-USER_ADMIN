let rexBrd = {
    form  : document.forms['formBrands'],
    table : document.querySelector('.tableBrands'),
    massCtg  : [],
    // arrIcDel: [],
    // arrIcEd : []
}
//-----------------------------------------------------------------------------------------------------------------
function massInputsForm() {

    let form = rexBrd.form;
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
rexBrd.form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    let url = '/reg/addBrands',
        id = rexBrd.form.id.value || 'null',
        name = rexBrd.form.name.value,

        fD = new FormData();

    fD.append('id', id)
    fD.append('name', name);
    fetch(url,{
        method: "POST",
        body  : fD
    }).then( data => data.text())
        .then( data => {
            getAllBrands();
            rexBrd.form.name.id.value = '';
            rexBrd.form.name.value = '';
            rexBrd.form.nextElementSibling.innerHTML = data;

        })
})
//-----------------------------------------------------------------
function getAllBrands()
{
    fetch('/inf/brands')
        .then( data => data.json())
        // .then( arr => console.log(arr));
        .then(arr => {
            createTable(arr, table_Brands(arr));
            rexBrd.massCtg = arr;
        })

}
//-------------------------------------------------------------------
function table_Brands(arr) {
    //Формирую строки
    let trs = "<tr><th>Delete</th><th>Edit</th><th>ID</th><th>Name</th></tr>";
    arr.forEach(el=>{
        trs = `${trs}<tr><td class="iconsDel"><i class="material-icons" id="del_${el.id}">delete</i></td>   
                         <td class="iconsEd"><i class="material-icons" id="ed_${el.id}">create</i></td>   
                         <td>${el.id}</td><td>${el.name}</td>`;
    });
    return trs;
}

//-----------------------------------------------------------------
// function createTableBrd(arr){
//
//     const table = rexBrd.table;
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
//     rexBrd.arrIcDel.push(document.querySelectorAll(".iconsDel"));
//     rexBrd.arrIcEd.push(document.querySelectorAll(".iconsEd"));
//     addListenerDelete(rexBrd.arrIcDel[0]);
//     addListenerEdit(rexBrd.arrIcEd[0]);
//
// }
//------------------------------------------------------------------------------------------------------
// function DeleteBrands(ev){
//
//     const url = '/reg/delBrands',
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
// //--------------------------------------------------------------------------------------------------
// function getMassIndexById(ev)
// {
//     let arr = rexBrd.massCtg,
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
        arr[i].addEventListener('click', (ev)=>{
            Delete(ev,'/reg/delBrands');
        });
    }
}
//----------------------------------------------------------------------------------------------------
// function addListenerEdit(arr){
//     for (let i = 0; i < arr.length; i++ ){
//         arr[i].addEventListener('click', getMassIndexById);
//     }
// }
//----------------------------------------------------------------------------------------------------
getAllBrands();

