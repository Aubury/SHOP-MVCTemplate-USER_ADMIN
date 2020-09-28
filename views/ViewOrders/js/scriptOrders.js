let rex = {
    table : document.querySelector('#tableOrders'),
    massOrders : [],
    arrIcEd : []
}
//-------------------------------------------------------------------------------------------------------
const getAllOrders = function getAllOrders()
{
    fetch('/inf/orders').then( data => data.json())
        // .then( arr => console.log(arr));
        .then(arr=>{ createTable(arr);
            rex.massOrders = arr;})

}
//-------------------------------------------------------------------------------------------------------
const createTable = function createOrdersTable(arr){

    // rex.massAdmins = arr;
    const table = rex.table;
    //   Удаляю всех детей!!!
    while(table.hasChildNodes()){
        table.removeChild(table.firstChild);
    }
    //Формирую строки
    let trs = "<tr><th>Edit</th><th>Заказ</th><th>Количество</th><th>Дата заказа</th><th>ФИО</th><th>Email</th><th>Телефон</th><th>Адрес доставки</th><th>Статус</th></tr>";
    arr.forEach(el=>{
        trs = `${trs}<tr><td class="iconsEd"><i class="material-icons" id="ed_${el.email}">create</i></td>   
                         <td>Код: ${el.product.id}<br>
                                  ${el.product.name}<br>
                                  ${el.product.price}</td>
                         <td>${el.amount}</td>
                         <td>${el.data}</td>
                         <td>${el.surname}<br>${el.name}<br>${el.patronymic}<br></td>
                         <td>${el.email}</td>
                         <td>${el.telephone}</td>
                         <td>${el.address}</td>
                          <td>${el.status}<br></td></tr>`;
    });

    table.innerHTML = trs;

    rex.arrIcEd.push(document.querySelectorAll(".iconsEd"));
    addListtenerEd(rex.arrIcEd[0]);

}

//---------------------------------------------------------------------------------------------
getAllOrders();