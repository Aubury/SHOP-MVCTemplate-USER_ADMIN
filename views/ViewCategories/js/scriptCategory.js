let rex = {
    form  : document.forms['formCategories'],
    table : document.querySelector('.tableCategories'),
    massCtg  : [],
    arrIcDelCtg: [],
    arrIcEdCtg : []
}
//-----------------------------------------------------------------------------------------------------------------
function massInputsFormCtg() {

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
            setTimeout(()=>{
                rex.form.nextElementSibling.innerHTML = '';
            },10000);

        })
})
//-----------------------------------------------------------------
function getAllCategories()
{
    fetch('/inf/Categories')
        .then( data => data.json())
        // .then( arr => console.log(arr));
        .then(arr => {
            rex.massCtg = arr;
            createTable(arr, rex.table, table_Category(arr));
        })
        .then(data => {
            rex.arrIcDelCtg = rex.table.querySelectorAll(".iconsDel");
            rex.arrIcEdCtg = rex.table.querySelectorAll(".iconsEd");
            addListenerDeleteCtg(rex.arrIcDelCtg);
            addListenerEditCtg(rex.arrIcEdCtg);
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
//-----------------------------------------------------------------

//---------------------------------------------------------------------------------------------------
function addListenerDeleteCtg(arr){
    for (let i = 0; i < arr.length; i++ ){
        arr[i].addEventListener('click',(ev)=>{
            Delete(ev,'/reg/delCategories');
        } );
    }
}
//----------------------------------------------------------------------------------------------------
function addListenerEditCtg(arr){
    for (let i = 0; i < arr.length; i++ ){
        arr[i].addEventListener('click', (ev)=>{
            getMassIndexById(ev, rex.massCtg, massInputsFormCtg());
        });
    }
}
//----------------------------------------------------------------------------------------------------

getAllCategories();

