let dom = {
    tabsContainer : document.querySelector('.list__projects'),
    projectContainer : document.querySelector('.right__main__content'),
    select     : document.querySelector('#inputGroupSelect02'),
    option     : document.querySelector('#option'),
    tRm        : document.querySelector('#trm'),
    selector   : document.querySelector('#selector'),
    lists      : [],
    tabs       : [],
    options    : [],
    userInvest : [],
    hide       : 'none',
    map        : document.querySelector('.map'),
    address    : document.querySelector('.address'),
    phone      : document.querySelector('.phone'),

}

//----------------------------------------------------------------------------
const ready = function fillMass() {

    dom.tabs.push(document.querySelectorAll('.tab'));
    dom.lists.push(document.querySelectorAll('.list'));
    dom.options.push(document.querySelector('.tabOp'));

    dom.tabsContainer.firstElementChild.classList.add('active');
    dom.lists[0][0].classList.remove('none');

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
    dom.option.addEventListener('click', ()=>{
          let el = dom.select.value;
        dom.lists[0].forEach(list => {
            //Скрываю все вкладки
            list.classList.add(dom.hide);

            if(list.classList.contains(el)){
                list.classList.remove(dom.hide);
            }
        });

    })
}

//----------------------------------------------------------------------------
const getProgects = function getMassProjects(){

    fetch('/inf/project',{
        method:"POST",
        header:('Set-Cookie: cross-site-cookie=name; SameSite=None; Secure')
    }).then( data => data.json())
        .then(arr => creatProject(arr[1]));
}
//--------------------------------------------------------------------------
const getTotalPayments = function getUserPayments() {

    const url = '/inf/userInvest';

    fetch(url,{
        method:"POST",
        header:('Set-Cookie: cross-site-cookie=name; SameSite=None; Secure')
    }).then(mass => mass.json())
        .then(mass => dom.userInvest.push(mass))
        .then(getProgects());
        // .then(arr => console.log(arr));

}
//---------------------------------------------------------------------------
const deleteActione = function classAction() {
    dom.tabs[0].forEach( el => el.classList.remove('active'));
}
//--------------------------------------------------------------------------
const addOptions = function addOptions(name, i) {

    let option = new Option(`Проект \"${name}\"`,`project__${i}`);
       option.setAttribute('data-for', `project__${i}`);
       option.classList.add('tabOp');
    return option;
}
//----------------------------------------------------------------------------
const creatProject = function creatProject(arr) {
    let i = 1;
    const select = dom.select;

    while(select.hasChildNodes()){
        select.removeChild(select.firstChild);
    }


    arr.forEach( el => {
        if(el.published == '1'){

            let p = creatTab(el.name, i),
                div = projectCard(el, i),
                option = addOptions(el.name, i);

            dom.tabsContainer.appendChild(p);
            dom.projectContainer.appendChild(div);
            select.append(option);
            i++;
        }
    });
    ready();
}
//-----------------------------------------------------------------------------
function createAndClass(name = 'div', ...classes){
    const el = document.createElement(name);
    el.classList.add(...classes);
    return el;
}
//----------------------------------------------------------------------------
const creatTab = function createTabs(name, i) {

    const p = document.createElement('p');
    p.classList.add('tab');
    p.setAttribute('data-for', `project__${i}`);
    p.innerHTML = `Проект \"${name}\"`;
    return p;
}
//-----------------------------------------------------------------------------
const projectCard = function createProjectCart(arr, i){

    let share_investment = 0,
        invest_amount = 0,
        budget = dom.tRm;

    budget.innerHTML = arr.totalRM[0];

    dom.userInvest[0].forEach(
        el => {if(el.project == arr.name){
                       share_investment = el.share_investment;
                       invest_amount = el.invest_amount;
         }});

    let answ = '',
        projectCart  = document.createElement('div');
    projectCart.classList.add(`project__${i}`, 'none', 'list');

    answ += `<div class="card-header row justify-content-around">
                  <div class="col p-2 flex-grow-1">
                      <p>Бюджет: <span class="italic">${arr.budget}</span></p>
                      <p>Вложили: <span class="italic">${arr.raiser_money}</span></p>
                  </div>
                  <div class="col p-2 flex-grow-1">
                      <p>Ваша доля вклада: <span class="italic">${share_investment}</span></p>
                      <p>Вы вложили: <span class="italic">${invest_amount}</span></p>
                  </div>
               </div>
              <div class="container p-2">
               <div class="heightMainCsrd">
                     <h2>Проект \"${arr.name}\"</h2>
                     <p class="card-text p-2">
                     <img src="${arr.photo_1}" alt="" class="mainPhoto">
                     ${arr.text_1}</p>  
                     <p class="card-text p-2">
                      ${arr.text_2}</p>
                </div>   
              </div>    
                <div class="cardFooter"> 
                    <div class="aside" ">
                       <p>Номера счетов</p>
                       <p>**************</p>
                       <p>***************</p>
                    </div> 
                    <div class="padImg">
                        <div class="sizeImg"><img class="padImg " src="${arr.photo_2}" alt=""></div> 
                        <div class="sizeImg"> <img class="padImg" src="${arr.photo_3}" alt=""></div>
                        <div class="sizeImg"><img class="padImg" src="${arr.photo_4}" alt=""></div>
                        <div class="sizeImg"><img class="padImg" src="${arr.photo_5}" alt=""></div>
                     </div>
                 </div>
              </div>`;

    projectCart.innerHTML = answ;

    return projectCart;
}
//----------------------------------------------------------------------------
const splitStr = function StringToMass(str) {

    let comma = ',';
    let mass = str.split(comma);
    return mass;
}
//---------------------------------------------------------------------------
const fillFooter = function FillFooter(arr){
 let map = arr.link,
     phone = splitStr(arr.phone),
     address = splitStr(arr.address);

 dom.map.innerHTML = map;

 phone.forEach(el=> {
     let p = document.createElement('p');
         p.innerHTML = el.trim();
         dom.phone.appendChild(p);
 });

 address.forEach(el=> {
     let p =document.createElement('p');
     p.innerHTML = el.trim();
     dom.address.appendChild(p);
 })


}

//-----------------------------------------------------------------------------
const getAddress = function getAddress(){

    fetch('/inf/contacts',{
        method:'POST',
        header:('Set-Cookie: cross-site-cookie=name; SameSite=None; Secure')
    }).then( mass => mass.json())
        .then(mass => fillFooter(mass));
        // .then(mass => console.log(mass));
}
//-----------------------------------------------------------------------------

getAddress();
getTotalPayments();