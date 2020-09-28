const ex = {
    link :  'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
    curs : document.querySelector('#exchange'),
    arr : []
}
function  getExchange() {
     let link = ex.link,
         mass = ex.arr;

     fetch(link,
         { method:'GET'})
         .then(data => data.json())
                .then( data => {
                    for (let i = 0; i < data.length; i++){
                        mass.push(data[i]);
                    }
                    printExchange();
                 });
}
//---------------------------------------------------------------------
function  getCurrent(name, item) {
    let mass = ex.arr;

    for (let i = 0; i < mass.length; i++){

        if(mass[i].ccy === name) {

            return mass[i][item];
        }
}
//--------------------------------------------------------------------
}
function printExchange() {

    let block = ex.curs,
        info  = '';

    info += `<table class="ta">
            <tr><th>Название валюты</th><th>Покупка</th><th>Продажа</th></tr>
            <tr>
              <td>USA</td>
              <td>${getCurrent('USD', 'buy')}</td>
              <td>${getCurrent('USD', 'sale')}</td>
            </tr>
            <tr>
               <td>EUR</td>
               <td>${getCurrent('EUR', 'buy')}</td>
               <td>${getCurrent('EUR', 'sale')}</td>
             </tr>
            <tr>
              <td>RUR</td>
              <td>${getCurrent('RUR', 'buy')}</td>
              <td>${getCurrent('RUR', 'sale')}</td></tr>
        </table>`;

    block.innerHTML = info;

}
getExchange()

