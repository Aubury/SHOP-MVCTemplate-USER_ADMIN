let obj = {
    selectCategory : document.querySelector('#inputCategory'),
    selectBrand    : document.querySelector('#inputBrand'),
    modal_windows  : document.querySelector('#product_modal'),
    form            : document.forms['formProduct'],
    form_main_photo : document.forms['main_img'],
    form_photo_1: document.forms['img_0'],
    form_photo_2: document.forms['img_1'],
    form_photo_3: document.forms['img_2'],
    inp_img   : document.forms['formProduct'].querySelectorAll('.arr_img'),
    short_description : document.querySelector('#short_description'),
    full_description : document.querySelector('#full_description'),
    arrInp    : document.querySelectorAll(".form-control"),
    table     : document.querySelector('.tableProducts'),
    arr_photos:  [],
    arr_product: [],
    arr_edit  : [],
    massProducts : [],
    arrIcDelPrd: [],
    arrIcEdPrd : []
};
//-----------------------------------------------------------------------------------------------------------------
function massInputsFormPrd() {

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
            inp: form['short_description'],
            name: 'short_description',
        },
        {
            inp: form['full_description'],
            name: 'full_description',
        },
        // {
        //     inp: obj.p_short_description.querySelector('.ck-content'),
        //     name: 'short_description',
        // },
        // {
        //     inp: obj.p_full_description.querySelector('.ck-content'),
        //     name: 'full_description',
        // }
    ];

    return inpArr;
}
//--------------------------------------------------------------------------------------------------
function getNamesCategories() {

    const url = '/inf/Categories';

    fetch(url)
        .then( data => data.json())
        .then(arr => {
            addOptions(arr, obj.selectCategory, 'Выберите категорию');
        });
}
//--------------------------------------------------------------------------------------------------
function getNamesBrands() {

    const url = '/inf/brands';

    fetch(url)
        .then( data => data.json())
        .then(arr => {
            addOptions(arr, obj.selectBrand, 'Выберите бренд');
        });
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
        short_description = obj.form['short_description'].value,
        full_description  = obj.form['full_description'].value,
        // short_description = obj.p_short_description.querySelector('.ck-content').innerHTML,
        // full_description  = obj.p_full_description.querySelector('.ck-content').innerHTML,
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
            getAllProducts();
            let mass = obj.form.querySelectorAll('.form-control'),
                img_mass = obj.modal_windows.querySelectorAll('.input-file');
            mass.forEach(el=>{
                if(el.nodeName === 'INPUT') el.value = '';
                if (el.nodeName === 'SELECT') el.value = 'Выберите бренд';
                if(el.nodeName === 'TEXTAREA') el.value = '';

            });
            img_mass.forEach( el => {
                el.value = '';
            })

            obj.modal_windows.querySelector('.block_forms').nextElementSibling.innerHTML = data;
            setTimeout(()=>{
                obj.modal_windows.querySelector('.block_forms').nextElementSibling.innerHTML = '';
            }, 1000);


        })
})
//------------------------------------------------------------------------------------------------
function table_Products(arr) {
    //Формирую строки
    let trs = "<tr><th>Delete</th><th>Edit</th><th>ID</th><th>IMG</th><th>Name</th><th>Category</th><th>Brand</th><th>Price</th><th>Amount</th></tr>";
    arr.forEach(el=>{
        trs = `${trs}<tr><td class="iconsDel"><i class="material-icons" id="del_${el.id}">delete</i></td>   
                         <td class="iconsEd"><a href="#product_modal"><i class="material-icons" id="ed_${el.id}">create</i></a></td>   
                         <td>${el.id}</td><td class="mini_img"><img src="${el.main_img_url}"></td><td>${el.name}</td><td>${el.category}</td><td>${el.brand}</td><td>${el.price}</td><td>${el.amount}</td>`;
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
            obj.massProducts = arr[0];
            obj.arr_photos = arr[1];
            obj.arr_product = arr[2];
            obj.arr_edit = arr[3];
            createTable(arr[0], obj.table, table_Products(arr[0]));
        }).then(arr =>{

                obj.arrIcDelPrd = obj.table.querySelectorAll(".iconsDel");
                obj.arrIcEdPrd = obj.table.querySelectorAll(".iconsEd");
                addListenerDeletePrd(obj.arrIcDelPrd);
                addListenerEditPrd(obj.arrIcEdPrd);

        })


}
//-------------------------------------------------------------------------------------------------
function getMassIndexByIdPrd(ev) {
    let data = '';
    if(ev.target.hasAttribute('id')){

        data = ev.target.id.slice(ev.target.id.indexOf('_')+1);
        obj.massProducts.forEach( el => {
            if(el.id === data){
                fillInputsFormPrd(el);
            }

        });
    }
}
//----------------------------------------------------------------------------------------------------
function fillInputsFormPrd(arr) {

    let inpArr = massInputsFormPrd(),
        mass_photo_forms = [obj.form_main_photo, obj.form_photo_1, obj.form_photo_2, obj.form_photo_3],
        formProduct = obj.form,
        text_edits = document.querySelectorAll('.ck-content'),
        arr_photos = obj.arr_photos,
        arr_product = obj.arr_product,
        arr_edit = [arr['short_description'], arr['full_description']];


    mass_photo_forms.forEach(el => {
        for (let key in arr) {
            if (key.slice(0, -4) === el.name) {
                el.querySelector('.mini_img').innerHTML = `<img src=${arr[key]}>`;
            }
        }
    })


    for (let i = 0; i < inpArr.length; i++) {
        for (let key in arr) {
            if (inpArr[i].name === key) {
                if (inpArr[i].inp.nodeName === "INPUT" || inpArr[i].inp.nodeName === "SELECT") {
                    inpArr[i].inp.value = arr[key];
                }
                if(key === 'short_description'){
                    tinymce.get("short_description").setContent(arr[key]);

                }
                if(key === 'full_description'){
                    tinymce.get("full_description").setContent(arr[key]);

                }
            }
        }
    }
}

//----------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------
function addListenerDeletePrd(arr){
    for (let i = 0; i < arr.length; i++ ){
        arr[i].addEventListener('click', (ev)=>{
            Delete( ev, '/reg/delProduct');
        })
    }
}
// //----------------------------------------------------------------------------------------------------
function addListenerEditPrd(arr){
    for (let i = 0; i < arr.length; i++ ){
        arr[i].addEventListener('click',(ev)=>{
            getMassIndexByIdPrd(ev);
        });
    }
}
//--------------------------Editor----------------------------------------------------------------------
function createEditor() {
    // ClassicEditor
    //     .create( document.querySelector( '#editor_1' ), {
    //         toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
    //         language: 'ru',
    //         heading: {
    //             options: [
    //                 { model: 'paragraph', title: 'Параграф', class: 'ck-heading_paragraph' },
    //                 { model: 'heading1', view: 'h1', title: 'Заголовок 1', class: 'ck-heading_heading1' },
    //                 { model: 'heading2', view: 'h2', title: 'Заголовок 2', class: 'ck-heading_heading2' },
    //                 { model: 'heading3', view: 'h2', title: 'Заголовок 3', class: 'ck-heading_heading3' },
    //                 { model: 'heading4', view: 'h2', title: 'Заголовок 4', class: 'ck-heading_heading4' },
    //
    //             ]
    //         }
    //     } )
    //     .catch( error => {
    //         console.log( error );
    //     } );
    ClassicEditor
        .create( document.querySelector( '#editor_1' ) )
        .catch( error => {
            console.error( error );
        } );

    ClassicEditor
        .create( document.querySelector( '#editor_2' ) )
        .catch( error => {
            console.error( error );
        } );

    ClassicEditor.builtinPlugins.map( plugin => plugin.pluginName );
}

//------------------------End_Editor---------------------------------------------------------------------
getNamesCategories();
getNamesBrands();
getAllProducts();
// createEditor();
