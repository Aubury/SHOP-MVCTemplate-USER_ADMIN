let items = {
    nav : document.querySelector('#navigation'),
    ul_shop : document.querySelector('#shop'),
    massProducts : [],
    massCategories: []
}
//--------------------------------------------------------------------------------------------------
function getAllProducts()
{
    fetch('/inf/products')
        .then( data => data.json())
        // .then( arr => console.log(arr));
        .then(arr => {
            obj.massProducts = arr[0];
            massCategories(arr[0]);
        //     obj.arr_photos = arr[1];
        //     obj.arr_product = arr[2];
        //     obj.arr_edit = arr[3];
            createMenu(arr[0]);
        }).then(arr =>{
        //
        // obj.arrIcDelPrd = obj.table.querySelectorAll(".iconsDel");
        // obj.arrIcEdPrd = obj.table.querySelectorAll(".iconsEd");
        // addListenerDeletePrd(obj.arrIcDelPrd);
        // addListenerEditPrd(obj.arrIcEdPrd);

    })
}
//------------------------------------------------------------------------------------------
function massCategories(arr) {
   arr.forEach(el => {
       if(el.category){ items.massCategories.push(el.category);}
   })
}
//-----------------------------------------------------------------------------------------
function uniqueBrands(arr, key) {
    let result = [];

    for (let str of arr) {
        if(str.category === key){
            if (!result.includes(str.brand)) {
                result.push(str.brand);
            }
        }

    }
    return result;
}
//-----------------------------------------------------------------------------------------

function createMenu(arr) {

    let ul_shop = items.ul_shop,
        categories = items.massCategories,
        submenuCategories = document.createElement('ul');
        submenuCategories.classList.add('submenu');


       categories.forEach( ctg => {
           let li = document.createElement('li'),
               submenuBrands = document.createElement('ul'),
               brands = uniqueBrands(arr, ctg);

               li.classList.add('nav-item');
               li.classList.add('submenu-link');
               li.innerHTML = `<a href="#">${ctg}</a>`;
               submenuBrands.classList.add('submenu');
               li.appendChild(submenuBrands);

               brands.forEach( brand => {
                   let librnd = document.createElement('li'),
                       submenuItems = document.createElement('ul');
                       librnd.classList.add('nav-item');
                       librnd.classList.add('submenu-link');


                       librnd.innerHTML = `<a href="#">${brand}</a>`;
                       submenuBrands.appendChild(librnd);
                       submenuItems.classList.add('submenu');
                       librnd.appendChild(submenuItems);

                       arr.forEach( el => {
                           if(el.category === ctg || el.brand === brand){
                               let li = document.createElement('li');
                               li.classList.add('nav-item');
                               li.innerHTML = `<a href="#">${el.name}</a>`;
                               submenuItems.appendChild(li);
                           }
                       })
               })
           submenuCategories.appendChild(li);
       })

      ul_shop.appendChild(submenuCategories);
}

getAllProducts();