const htmlElem = {
    showCertificate : document.querySelector('.certificate'),
    hideCertificate : document.querySelector('.closeModal'),
    modalWindow     : document.querySelector('.modal__certificate')
}

const show = function showCertificate(){
    htmlElem.modalWindow.classList.remove('none');
}

const hide = function hideCertificate(){
    htmlElem.modalWindow.classList.add('none');
}

htmlElem.showCertificate.addEventListener('click', show);
htmlElem.hideCertificate.addEventListener('click', hide);