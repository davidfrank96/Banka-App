const overlay = document.querySelector('.overlay');
const mobileMenu = document.querySelector('.mobile-menu');
//const checkbox = document.getElementById('agree').checked;

const redirect = location => {
    window.location.href = `${location}.html`;
};

const toggleMobileNav = () => {
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav.classList.contains('hide')) {
        overlay.classList.remove('hide');
        mobileMenu.classList.add('open');
    } else {
        overlay.classList.add('hide');
        mobileMenu.classList.remove('open');
    }
    mobileNav.classList.toggle('hide');
};


overlay.addEventListener("click", () => {
    const mobileNav = document.querySelector('.mobile-nav');
    if (!mobileNav.classList.contains("hide")) {
        toggleMobileNav();
    }
});

mobileMenu.addEventListener("click", toggleMobileNav);



//const check = () => {
//    const checkbox = document.getElementById('agree');
//    if (document.getElementById('agree').checked) {
//        return true;
//    } else {
//        alert('Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy');
//        return false;
//    }
//    
//}

//checkbox.addEventListener("click", check);