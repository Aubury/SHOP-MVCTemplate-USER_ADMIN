let rex = {
    form : document.forms['formComplaints']
    // arrInp : document.forms['formComplaints'].querySelectorAll('.inpText'),
};

//-----------------------------------------------------------------------------------------------------------------
//Обработчик отправки.
rex.form.addEventListener('submit', function (ev) {

    ev.preventDefault();

    const url = '/reg/addComplaints',
          fD = new FormData();

    fD.append('text',rex.form['text'].value);
    fetch(url,{
        method : 'POST',
        body : fD
    }).then( data => data.text())
        .then( text =>{
            rex.form.nextElementSibling.innerHTML = text;
            rex.form['text'].value = '';
            setTimeout(()=> {rex.form.nextElementSibling.innerHTML = '';}, 10000);
        })
});
