const obj = {
    form : document.forms['LogIn']
}
//-----------------------------------------------------------------------------
obj.form.addEventListener('submit', function (ev) {

    ev.preventDefault();

    const url = '/log-adm',
         fD = new FormData();

    fD.append('email',obj.form[0].value);
    fD.append('password', obj.form[1].value);

    fetch(url, {
        method: 'POST',
        body: fD
    }).then(e => e.json())
        .then( data => {
            if(data.length === 3){
                setCookie('table', data[1][2], 1);
                setCookie('admin_id', data[1][1], 1);
                setCookie('uPd', data[1][0], 1);
                // localStorage.setItem('user',`${data[2][1]}\r${data[2][2]}\r${data[2][3]}`);
                localStorage.setItem('user',`${data[2][1]}`);
                window.location.href = `${data[0]}`
            }else{
                obj.form.nextElementSibling.innerHTML = data;
                console.log(data);
            }
        })
})
//----------------------------------------------------------------------------
