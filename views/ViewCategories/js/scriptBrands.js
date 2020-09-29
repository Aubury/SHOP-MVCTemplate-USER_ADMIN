let rexBrd = {
    form  : document.forms['formBrands'],
    table : document.querySelector('.tableBrands'),
    massBrd  : [],
    arrIcDelBrd: [],
    arrIcEdBrd : []
}
//-----------------------------------------------------------------------------------------------------------------
function massInputsFormBtd() {

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
            setTimeout(()=>{
                rexBrd.form.nextElementSibling.innerHTML = '';
            }, 500);

        })
})
//-----------------------------------------------------------------
function getAllBrands()
{
    fetch('/inf/brands')
        .then( data => data.json())
        // .then( arr => console.log(arr));
        .then(arr => {
            rexBrd.massBrd = arr;
            createTable(arr, rexBrd.table, table_Brands(arr), rexBrd.arrIcDel, rexBrd.arrIcEd);
        })
        .then(data => {
            rexBrd.arrIcDelBrd = rexBrd.table.querySelectorAll(".iconsDel");
            rexBrd.arrIcEdBrd = rexBrd.table.querySelectorAll(".iconsEd");
            console.log(rexBrd.arrIcDelBrd);
            console.log(rexBrd.arrIcEdBrd);
            addListenerDeleteBrd(rexBrd.arrIcDelBrd);
            addListenerEditBrd(rexBrd.arrIcEdBrd);
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

//---------------------------------------------------------------------------------------------------
function addListenerDeleteBrd(arr){
    for (let i = 0; i < arr.length; i++ ){
        arr[i].addEventListener('click', (ev)=>{
            Delete(ev,'/reg/delBrands');
        });
    }
}
//----------------------------------------------------------------------------------------------------
function addListenerEditBrd(arr){
    for (let i = 0; i < arr.length; i++ ){
        arr[i].addEventListener('click', (ev)=>{
            getMassIndexById(ev, rexBrd.massBrd, massInputsFormBtd())
        });
    }
}
//----------------------------------------------------------------------------------------------------
getAllBrands();

