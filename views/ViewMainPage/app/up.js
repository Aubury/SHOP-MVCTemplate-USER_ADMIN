window.onscroll = function(){
    let toTop = document.querySelector('.top');
    if(document.body.scrollTop > 300 || document.documentElement.scrollTop >300){
        toTop.classList.remove('topHide');
    }else{
        toTop.classList.add('topHide');
    }
}
document.querySelector('.top').addEventListener('click', function(){
    scrolled = window.pageYOffset;
    scrollToTop();
    function scrollToTop(){
        if(scrolled > 0){
            window.scrollTo(0, scrolled);
            scrolled -= 100;
            timer = setTimeout(scrollToTop, 10);
        }else{
            clearTimeout(timer);
            window.scrollTo(0, 0);
        }
    }
});

let scrolled,
    time;