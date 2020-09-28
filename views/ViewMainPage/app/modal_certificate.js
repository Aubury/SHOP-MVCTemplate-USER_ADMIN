const htmlElem = {
    showModalCertificate   : document.querySelector('.certificate'),//Открыть модальное окно свидетельства
    hideModalCertificate   : document.querySelector('.closeModalCertificate'), //Закрыть модальное окно свидетельства
    modalWindowCertificate : document.querySelector('.modal__certificate')//Mодальное окно свидетельства
}

const showCert = function showCertificate(){
    htmlElem.modalWindowCertificate.classList.remove('none'); // Открыть модальное окно свидетельства
}

const hideCert = function hideCertificate(){
    htmlElem.modalWindowCertificate.classList.add('none');  // Закрыть модальное окно свидетельства
}

htmlElem.showModalCertificate.addEventListener('click', showCert);
htmlElem.hideModalCertificate.addEventListener('click', hideCert);