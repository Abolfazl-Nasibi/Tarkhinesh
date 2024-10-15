// mobile menu open and close ----------------------------------------------------------------------------------------------------

const mobileMenuIcon = document.querySelector('#mobile-menu-icon');
const mobileMenuBox = document.querySelector('#mobile-menu-box');
const mobileMenuCloseBtn = document.querySelector('#mobile-menu-close');
const mobileMenuBlur = document.querySelector('#mobile-menu-box-blur');

// mobile menu open
mobileMenuIcon.addEventListener('click' , ()=>{
    mobileMenuIcon.classList.add('active');

    mobileMenuBlur.classList.remove('hidden');
    mobileMenuBlur.classList.add('fixed');
    mobileMenuBlur.style.animation = 'leftToRight 100ms linear';

    mobileMenuBox.classList.add('fixed');
    mobileMenuBox.classList.remove('hidden');
    mobileMenuBox.style.animation = 'rightToLeft 100ms linear'
})

// mobile menu close
mobileMenuCloseBtn.addEventListener('click' , ()=>{
    mobileMenuIcon.classList.remove('active');

    mobileMenuBox.classList.remove('fixed');
    mobileMenuBox.classList.add('hidden');

    mobileMenuBlur.classList.remove('fixed');   
    mobileMenuBlur.classList.add('hidden');

})

// make menu dynamic --------------------------------------------------------------------------------------------------------------
// menu objects
              





































const menuLinks = [
    {
        id : 1,
        content : 'صفحه اصلی',
        hasSub : false,
        iconName : 'home',
        hasMobileMenu : true,
        active : true
    },
    {
        id : 2,
        content : 'شعبه',
        hasSub : true,
        iconName : 'home-hashtag',
        hasMobileMenu : true,
        active : false
    },
    {
        id : 3,
        content : 'منو',
        hasSub : true,
        iconName : 'menu-board',
        hasMobileMenu : true,
        active : false
    },
    {
        id : 4,
        content : 'اعطای نمایندگی',
        hasSub : false,
        iconName : '',
        hasMobileMenu : false,
        active : false
    },
    {
        id : 5,
        content : 'درباره ما',
        hasSub : false,
        iconName : 'user-2',
        hasMobileMenu : true,
        active : false
    },
    {
        id : 6,
        content : 'تماس با ما',
        hasSub : false,
        iconName : 'call',
        hasMobileMenu : true,
        active : false
    },
];

// desktop menu ----------------------
const desktopMenuWrapper = document.querySelector('#desktop-menu-wrapper');
let deskMenuFragment = document.createDocumentFragment();

let menuLiPlaceHolder = null;
let menuHtmlPlaceHolder = null;







// create branches and food menu html holder
const branches = [
    {
        id : 1,
        name : 'اکباتان'
    },
    {
        id : 2,
        name : 'چالوس'
    },
    {
        id : 3,
        name : 'اقدسیه'
    },
    {
        id : 4,
        name : 'ونک'
    }
];
// branches
let branchesHtmlHolder = '';
branches.forEach((branch)=>{
    subMenuWritter('branches',branch)
});
// food menu
const foodMenu = [
    {
        id : 1,
        name : 'غذای اصلی'
    },
    {
        id : 2,
        name : 'پیش غذا'
    },
    {
        id : 3,
        name : 'دسر'
    },
    {
        id : 4,
        name : 'نوشیدنی'
    }
];
let foodMenuHtmlHolder = '';
foodMenu.forEach((food)=>{
    subMenuWritter('foodMenu',food)
});

function subMenuWritter(subMenuName,item){
    if(subMenuName=='branches'){
        branchesHtmlHolder += `<li><a href="#">${item.name}</a></li>`;
    }else if(subMenuName == 'foodMenu'){
        foodMenuHtmlHolder += `<li><a href="#">${item.name}</a></li>`;
    }
}







// add menu objects to html menu
menuLinks.forEach((obj)=>{
    createMenuItem(obj,false)
});
desktopMenuWrapper.append(deskMenuFragment);

// mobile menu ------------------------
const mobileMenuWrapper = document.querySelector('#mobile-menu-wrapper');
let mobileMenuFragment = document.createDocumentFragment();
let mobileMenuLiPlaceHolder = null;
let mobileMenuHtmlPlaceHolder = null;






// add menu objects to html menu
menuLinks.forEach((obj)=>{
    createMenuItem(obj,true)
});
mobileMenuWrapper.append(mobileMenuFragment);

function createMenuItem(obj,isMobile = false){
    menuLiPlaceHolder = document.createElement('li');
    if(isMobile){
        if(obj.hasMobileMenu){
            mobileMenuLiPlaceHolder = document.createElement('li');
            if(obj.active){
                mobileMenuLiPlaceHolder.classList.add('text-xs','font-estedad-regular','text-primary')
            }
            if(!obj.hasSub){
                mobileMenuHtmlPlaceHolder = `
                <a href="#">
                    <svg class="w-4 h-4">
                        <use href="#${obj.iconName}"></use>
                    </svg>
                    <span>${obj.content}</span>
                </a>
                `;
            }else{
                mobileMenuHtmlPlaceHolder = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-x-1">
                            <svg class="w-3 h-3">
                                <use href="#${obj.iconName}"></use>
                            </svg>
                            <span>${obj.content}</span>
                        </div>
                        <svg class="w-4 h-4 group-hover:rotate-180 transition-all">
                            <use href="#arrow-down"></use>
                        </svg>
                    </div>
                <ul class=" bg-white transition-all child:transition-all hidden child:hidden group-hover:child:block border-t-0 group-hover:border-t flex-col  border-gray-4 mt-0 group-hover:mt-2 divide-y divide-gray-4 font-estedad-bold text-gray-8 text-2xs child:py-2 child:pr-2 child:w-full">
                ${obj.content=='شعبه' ? branchesHtmlHolder : foodMenuHtmlHolder}
                </ul>
                `;
                mobileMenuLiPlaceHolder.classList.add('group')
            }
                mobileMenuLiPlaceHolder.innerHTML = mobileMenuHtmlPlaceHolder;
                mobileMenuFragment.append(mobileMenuLiPlaceHolder);
        }
    }else{
        if(!obj.hasSub){
            menuHtmlPlaceHolder = `
            <a href="#" class="${obj.active ? 'font-estedad-bold text-primary border-b border-primary' : ''}">${obj.content}</a>
            `;
        }else{
            menuHtmlPlaceHolder = `
            <a href="#" class="${obj.active ? 'font-estedad-bold text-primary border-b border-primary' : ''}">${obj.content}</a>
                        <svg class="w-4 h-4">
                            <use href="#arrow-down"></use>
                        </svg>
                        <!-- subMenu -->
                        <ul class="invisible z-10 opacity-0 transition-all delay-75 group-hover:visible group-hover:opacity-100 absolute top-[120%] ${obj.content =='شعبه' ? 'left-0' : 'right-0'} flex flex-col w-36 px-2 bg-white text-sm text-gray-8 rounded-md shadow-[0_0px_6px_rgba(0,0,0,0.1)] divide-y divide-gray-3 child:inline-block child:py-2">
                        ${obj.content=='شعبه' ? branchesHtmlHolder : foodMenuHtmlHolder}
                        </ul>
            `;
            menuLiPlaceHolder.classList.add('group','flex','items-center','relative','gap-x-1','cursor-pointer')
        }
            menuLiPlaceHolder.innerHTML = menuHtmlPlaceHolder;
            deskMenuFragment.append(menuLiPlaceHolder);
    }
}










































// products list -------------------------------------------------------------------------------------------------------------
const products = [
// Main Dishes
{ id: 1, name: "پاستا سبزیجات", src: "../images/products/pasta-sabzi.png", category: "Main Dish", price: "180000", count: 1, hasDiscount: true, discountAmount: 20000, discountPercent: 11, score: 5 },
{ id: 2, name: "کوفته برنجی", src: "../images/products/kufte-berenji.png", category: "Main Dish", price: "150000", count: 1, hasDiscount: true, discountAmount: 15000, discountPercent: 10, score: 4 },
{ id: 3, name: "سوشی", src: "../images/products/soushi.png", category: "Main Dish", price: "200000", count: 1, hasDiscount: true, discountAmount: 25000, discountPercent: 13, score: 2 },
{ id: 4, name: "لازانیا", src: "../images/products/lazania.png", category: "Main Dish", price: "190000", count: 1, hasDiscount: true, discountAmount: 30000, discountPercent: 16, score: 5 },
{ id: 5, name: "راتاتویی", src: "../images/products/ratatoui.png", category: "Main Dish", price: "160000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 4 },
{ id: 6, name: "پاستا بلونز", src: "../images/products/pasta-blunz.png", category: "Main Dish", price: "170000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 1 },
{ id: 7, name: "پیتزا قارچ", src: "../images/products/pizza-qharch.png", category: "Main Dish", price: "180000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 3 },
{ id: 8, name: "پیتزا سبزیجات و خامه", src: "../images/products/pizza-sabzi.png", category: "Main Dish", price: "200000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 5 },
{ id: 9, name: "پیتزا بادمجان و زیتون", src: "../images/products/pizza-bademjan.png", category: "Main Dish", price: "190000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 2 },
{ id: 10, name: "پیتزا روکولا", src: "../images/products/pizza-rokulla.png", category: "Main Dish", price: "150000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 4 },
{ id: 11, name: "پالاک پنیر", src: "../images/products/palak-cheese.png", category: "Main Dish", price: "160000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 3 },
{ id: 12, name: "کالزونه اسفناج", src: "../images/products/esfenaj-kalzune.png", category: "Main Dish", price: "170000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 1 },

// Appetizers
{ id: 13, name: "فلافل", src: "../images/products/falafel.png", category: "Appetizer", price: "90000", count: 1, hasDiscount: true, discountAmount: 10000, discountPercent: 11, score: 3 },
{ id: 14, name: "باقالا قاتوق", src: "../images/products/baghala.png", category: "Appetizer", price: "100000", count: 1, hasDiscount: true, discountAmount: 20000, discountPercent: 20, score: 4 },
{ id: 15, name: "میرزا قاسمی", src: "../images/products/mirza-ghasemi.png", category: "Appetizer", price: "110000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 2 },
{ id: 16, name: "کشک بادمجان", src: "../images/products/kashk-bademjan.png", category: "Appetizer", price: "120000", count: 1, hasDiscount: true, discountAmount: 15000, discountPercent: 13, score: 5 },
{ id: 17, name: "کوکو سبزی", src: "../images/products/koko-sabzi.png", category: "Appetizer", price: "100000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 3 },
{ id: 18, name: "دلمه برگ مو", src: "../images/products/dolme-barg.png", category: "Appetizer", price: "110000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 5 },
{ id: 19, name: "دلمه کلم برگ", src: "../images/products/dolme-kalam.png", category: "Appetizer", price: "90000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 2 },
{ id: 20, name: "بادمجان شکم‌پر", src: "../images/products/bademjan-shekampor.png", category: "Appetizer", price: "120000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 3 },
{ id: 21, name: "بورانی بادمجان", src: "../images/products/borani.png", category: "Appetizer", price: "90000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 1 },
{ id: 22, name: "کله جوش", src: "../images/products/kale-joosh.png", category: "Appetizer", price: "100000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 4 },
{ id: 23, name: "پاکورا سبزیجات", src: "../images/products/pakoura.png", category: "Appetizer", price: "120000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 3 },

// Desserts
{ id: 24, name: "پاستا سبزیجات (Dessert)", src: "../images/products/pasta-sabzi.png", category: "Dessert", price: "100000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 5 },
{ id: 25, name: "دلمه برگ مو (Dessert)", src: "../images/products/dolme-barg.png", category: "Dessert", price: "110000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 3 },
{ id: 26, name: "کوفته برنجی (Dessert)", src: "../images/products/kufte-berenji.png", category: "Dessert", price: "90000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 4 },
{ id: 27, name: "پاکورا سبزیجات (Dessert)", src: "../images/products/pakoura.png", category: "Dessert", price: "120000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 2 },

  
// Drinks
{ id: 28, name: "لیموناد", src: "../images/products/limonade.png", category: "Drink", price: "30000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 4 },
{ id: 29, name: "چای ماسالا", src: "../images/products/Chai-masala.png", category: "Drink", price: "40000", count: 1, hasDiscount: true, discountAmount: 4000, discountPercent: 10, score: 3 },
{ id: 30, name: "هات چاکلت", src: "../images/products/hot-chocolate.png", category: "Drink", price: "35000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 5 },
{ id: 31, name: "اسپرسو", src: "../images/products/espresso.png", category: "Drink", price: "50000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 2 },
{ id: 32, name: "شیرشکلات", src: "../images/products/chocolate-milk.png", category: "Drink", price: "45000", count: 1, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 5 }
];

// main page slider
let sliderSlides = [
    {id : 1 , src : "../images/slider-slide1.png" , text : "تجربه غذای سالم و گیاهی به سبک ترخینه"},
    {id : 2 , src : "../images/slider-slide2.png" , text : "طعم بی‌نظیر طبیعت!"},
    {id : 3 , src : "../images/slider-slide3.png" , text : "لذت غذای سالم و گیاهی را با ترخینه تجربه کنید!"}
]

const slider = document.querySelector('#slider');


let slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
let slideProduct = null;
let slideProductDiv = null;
let index = 0;

// create an element for slider at page start
sliderInnerHTmlFiller();


// next and prev button
nextBtn.addEventListener('click' ,nextSlide);

setInterval(() => {
    nextSlide()
}, 3000);

prevBtn.addEventListener('click' , prevSlide)

function sliderInnerHTmlFiller(side = 'right',currentIndex = index){
    slideProduct = sliderSlides[currentIndex];
    slideProductDiv = document.createElement('div');
    slideProductDiv.classList.add('slide','w-full','h-full','absolute');
    slideProductDiv.innerHTML = `
    <img src="${slideProduct.src}" alt="slide image" class="w-full h-full object-cover">
                    <p class="absolute left-1/2 -translate-x-1/2 top-20 lg:top-[128px] w-full lg:w-auto text-center  font-estedad-bold text-tint-1 text-base lg:text-4xl">${slideProduct.text}</p>
                    <a href="#" class="flex items-center justify-center absolute top-56 left-1/2 -translate-x-1/2 w-48 h-10 rounded-lg bg-primary text-white text-base font-estedad-medium">سفارش آنلاین غذا</a>
    `;
    slideProductDiv.style.animation =(side=='right') ? 'next2 100ms linear' : 'prev1 100ms linear';
    slider.innerHTML = '';
    slider.append(slideProductDiv)
}

// next slide func
function nextSlide(){
    if(index==sliderSlides.length-1){
        index = 0;
    }else{
        index ++;
    }
    
    sliderInnerHTmlFiller();

    searchDot();
}

// prev slide func
function prevSlide(){
    if(index==0){
        index = sliderSlides.length-1;
    }else{
        index --;
    }
    
    sliderInnerHTmlFiller('left');

    searchDot();
}

// dots -----------------
const dotsContainer = document.querySelector('.dots-container');
let dotsFragment = document.createDocumentFragment();
let dotsSpanHolder = null;

sliderSlides.forEach((slide)=>{
    dotsSpanHolder = document.createElement('span');
    dotsSpanHolder.classList.add('dot','rounded-full','w-2','h-2','bg-gray-5');
    dotsSpanHolder.setAttribute('attr' , slide.id);
    dotsSpanHolder.addEventListener('click' , (event)=>{
        sliderInnerHTmlFiller('right',slide.id-1);
        dots.forEach((dot)=>{
            dot.classList.remove('active')
        });
        event.target.classList.add('active')
    })
    dotsFragment.append(dotsSpanHolder);
})
dotsContainer.append(dotsFragment)

let dots = document.querySelectorAll('.dot');

function searchDot(){

    dots.forEach((dot)=>{
        dot.classList.remove('active')
    });
    dots.forEach((dot)=>{
        if(dot.getAttribute('attr')==index+1){
            dot.classList.add('active')
        }
    })
}