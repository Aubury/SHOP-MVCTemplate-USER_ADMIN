let obj = {
    selectCategory : document.querySelector('#inputCategory'),
    selectBrand    : document.querySelector('#inputBrand'),
    form            : document.forms['formProduct'],
    form_main_photo : document.forms['main_photo'],
    form_photo_1: document.forms['photo_1'],
    form_photo_2: document.forms['photo_2'],
    form_photo_3: document.forms['photo_3'],
    inp_img   : document.forms['formProduct'].querySelectorAll('.arr_img'),
    p_short_description : document.querySelector('#short_description'),
    p_full_description : document.querySelector('#full_description'),
    arrInp    : document.querySelectorAll(".form-control"),
    table     : document.querySelector('.tableProducts'),
    arr_photos: [],
    massProducts : [],
    // arrIcDel: [],
    // arrIcEd : []
};
//-----------------------------------------------------------------------------------------------------------------
function massInputsForm() {

    let form = obj.form;
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
            inp: form['category'],
            name: 'category',
        },
        {
            inp: form['brand'],
            name: 'brand',
        },
        {
            inp: form['main_img'],
            name: 'main_img',
        },
        {
            inp: form['img_0'],
            name: 'img_0',
        },
        {
            inp: form['img_1'],
            name: 'img_1',
        },
        {
            inp: form['img_2'],
            name: 'img_2',
        },
        {
            inp: form['price'],
            name: 'price',
        },
        {
            inp: form['amount'],
            name: 'amount',
        },
        {
            inp: obj.p_short_description.querySelector('.ck-content'),
            name: 'short_description',
        },
        {
            inp: obj.p_full_description.querySelector('.ck-content'),
            name: 'full_description',
        }
    ];

    return inpArr;
}
//--------------------------------------------------------------------------------------------------
function addOptions(arr, select, str) {

    while(select.hasChildNodes()){
        select.removeChild(select.firstChild);
    }
    let op = new Option(str);
    select.append(op);
    arr.forEach( el => {

        let option = new Option(el.name, el.name);
        select.append(option);
    })
}
//--------------------------------------------------------------------------------------------------
function getNamesCategories() {

    const url = '/inf/Categories';

    fetch(url).then(response => response.json())
        .then(arr => addOptions(arr, obj.selectCategory, 'Выберите категорию'));
}
//--------------------------------------------------------------------------------------------------
function getNamesBrands() {

    const url = '/inf/brands';

    fetch(url).then(response => response.json())
        .then(arr => addOptions(arr, obj.selectBrand, 'Выберите бренд'));
}
//--------------------------------------------------------------------------------------------------
function choice_photo(form, input){

    const url = '/reg/addPhoto',
        fD  = new FormData(),
        fileField = form.querySelector('input[type="file"]');
    fD.append('file', fileField.files[0]);

    fetch(url, {
        method: "POST",
        body: fD
    }).then(data => data.json())
        .then(data => {
            input.value = data[0];
            form.querySelector('.mini_img').innerHTML = `<img src='${data[4]}${data[1]}'>`;
            fileField.value ='';

        })
}
//----------------------------------------------------------------------------------------------
obj.form_main_photo.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    choice_photo(obj.form_main_photo, obj.form['main_img']);
})
obj.form_photo_1.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    choice_photo(obj.form_photo_1, obj.form['img_0']);
})
obj.form_photo_2.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    choice_photo(obj.form_photo_2, obj.form['img_1']);
})
obj.form_photo_3.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    choice_photo(obj.form_photo_3, obj.form['img_2']);
})


//--------------------------------------------------------------------------------------------------
obj.form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    let url = '/reg/addProducts',
        id = obj.form['id'].value || 'null',
        name = obj.form['name'].value,
        category = obj.form['category'].value,
        brand = obj.form['brand'].value,
        main_img = obj.form['main_img'].value,
        img_0 = obj.form['img_0'].value,
        img_1 = obj.form['img_1'].value,
        img_2 = obj.form['img_2'].value,
        price = obj.form['price'].value,
        amount = obj.form['amount'].value,
        short_description = obj.p_short_description.querySelector('.ck-content').innerHTML,
        full_description  = obj.p_full_description.querySelector('.ck-content').innerHTML,
        fD = new FormData();

    fD.append('id', id)
    fD.append('name', name);
    fD.append('category', category);
    fD.append('brand', brand);
    fD.append('main_img', main_img);
    fD.append('img_0', img_0);
    fD.append('img_1', img_1);
    fD.append('img_2', img_2);
    fD.append('price', price);
    fD.append('amount', amount);
    fD.append('short_description', short_description);
    fD.append('full_description', full_description);


    fetch(url,{
        method: "POST",
        body  : fD
    }).then( data => data.text())
        .then( data => {
            console.log(data);
            // getAllCategories();
            // rex.form.name.id.value = '';
            // rex.form.name.value = '';
            // rex.form.nextElementSibling.innerHTML = data;

        })
})
//------------------------------------------------------------------------------------------------
function table_Products(arr) {
    //Формирую строки
    let trs = "<tr><th>Delete</th><th>Edit</th><th>ID</th><th>Name</th></tr>";
    arr.forEach(el=>{
        trs = `${trs}<tr><td class="iconsDel"><i class="material-icons" id="del_${el.id}">delete</i></td>   
                         <td class="iconsEd"><i class="material-icons" id="ed_${el.id}">create</i></td>   
                         <td>${el.id}</td><td>${el.name}</td>`;
    });
    return trs;
}
//--------------------------------------------------------------------------------------------------

function getAllProducts()
{
    fetch('/inf/products')
        .then( data => data.json())
        // .then( arr => console.log(arr));
        .then(arr => {
            createTable(arr, table_Products(arr));
            obj.massProducts = arr;
        })

}

// //-----------------------------------------------------------------
// function createTable(arr, table_str){
//
//     const table = obj.table;
//     //   Удаляю всех детей!!!
//     while(table.hasChildNodes()){
//         table.removeChild(table.firstChild);
//     }
//     // //Формирую строки
//     // let trs = "<tr><th>Delete</th><th>Edit</th><th>ID</th><th>Name</th></tr>";
//     // arr.forEach(el=>{
//     //     trs = `${trs}<tr><td class="iconsDel"><i class="material-icons" id="del_${el.id}">delete</i></td>
//     //                      <td class="iconsEd"><i class="material-icons" id="ed_${el.id}">create</i></td>
//     //                      <td>${el.id}</td><td>${el.name}</td>`;
//     // });
//
//     table.innerHTML = table_str(arr);
//
//     obj.arrIcDel.push(document.querySelectorAll(".iconsDel"));
//     obj.arrIcEd.push(document.querySelectorAll(".iconsEd"));
//     addListenerDelete(obj.arrIcDel[0]);
//     addListenerEdit(obj.arrIcEd[0]);
//
// }
//-------------------------------------------------------------------
// function Delete(ev, url){
//
//     let  data = '',
//         fD = new FormData();
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
//     let arr = obj.massProducts,
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
// //----------------------------------------------------------------------------------------------------
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
            Delete( ev, '/reg/delProduct');
        })
    }
}
// //----------------------------------------------------------------------------------------------------
// function addListenerEdit(arr){
//     for (let i = 0; i < arr.length; i++ ){
//         arr[i].addEventListener('click', getMassIndexById);
//     }
// }
getNamesCategories();
getNamesBrands();
