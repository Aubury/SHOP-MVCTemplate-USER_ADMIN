const dom = {
    lists : [],
    tabs : [],
    hide : 'none'
}
//---------------------------------------------------------------------------
const deleteActione = function classAction() {
    dom.tabs.forEach( el => el.classList.remove('active'));
}
//-----------------------------------------------------------------------------
const ready = function fillMass() {

    dom.tabs.push(document.querySelectorAll('.tab'));
    dom.lists.push(document.querySelectorAll('.list'));

    dom.tabs[0].forEach(tab => tab.addEventListener('click', e => {
        deleteActione();
        dom.lists[0].forEach(list => {
            //Скрываю все вкладки
            list.classList.add(dom.hide);
            tab.classList.add('active');

            if(list.classList.contains(e.target.dataset.for)){
                list.classList.remove(dom.hide);
            }
        });
    }));
}
//----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", ready);