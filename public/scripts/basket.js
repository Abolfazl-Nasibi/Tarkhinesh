// functions
function removeBasketItem(event){
    // removing from ui
    let mainParent = event.target.parentElement.parentElement.parentElement.parentElement
    let productName = mainParent.querySelector('.productName').innerHTML
    mainParent.remove()

    // removing from local storage
    let localFoods = JSON.parse(localStorage.getItem('localFoods'))
    let newLocal = localFoods.filter((item)=>{
        return item != productName
    })
    localStorage.setItem('localFoods' , JSON.stringify(newLocal))
}


// mobile menu element selection ----------------------------------------------------------------------------------------------------

const mobileMenuIcon = document.querySelector('#mobile-menu-icon');
const mobileMenuBox = document.querySelector('#mobile-menu-box');
const mobileMenuCloseBtn = document.querySelector('#mobile-menu-close');
const mobileMenuBlur = document.querySelector('#mobile-menu-box-blur');

// open mobile menu
mobileMenuIcon.addEventListener('click' , ()=>{
    mobileMenuIcon.classList.add('active');

    mobileMenuBlur.classList.remove('hidden');
    mobileMenuBlur.classList.add('fixed');
    mobileMenuBlur.style.animation = 'leftToRight 100ms linear';

    mobileMenuBox.classList.add('fixed');
    mobileMenuBox.classList.remove('hidden');
    mobileMenuBox.style.animation = 'rightToLeft 100ms linear'
})

// close mobile menu 
mobileMenuCloseBtn.addEventListener('click' , ()=>{
    mobileMenuIcon.classList.remove('active');

    mobileMenuBox.classList.remove('fixed');
    mobileMenuBox.classList.add('hidden');

    mobileMenuBlur.classList.remove('fixed');   
    mobileMenuBlur.classList.add('hidden');

})

// search icon click -------------------------------------------------------------------------------------------------------------
const searchIcon = document.querySelector('#search-icon');
const searchBox = document.querySelector('#search-box');
const seachBoxCloseButton = document.querySelector('#search-box-close');

searchIcon.addEventListener('click' ,()=>{
    mobileMenuBlur.classList.remove('hidden');
    mobileMenuBlur.classList.add('fixed');

    searchBox.classList.remove('hidden');
    searchBox.classList.add('fixed');
} )

seachBoxCloseButton.addEventListener('click' , ()=>{
    mobileMenuBlur.classList.add('hidden');
    mobileMenuBlur.classList.remove('fixed');

    searchBox.classList.add('hidden');
    searchBox.classList.remove('fixed');
})

// make menu dynamic --------------------------------------------------------------------------------------------------------------
// menu data definition
const menuLinks = [
    {
        id : 1,
        content : 'صفحه اصلی',
        hasSub : false,
        iconName : 'home',
        hasMobileMenu : true,
        active : false,
        link : 'index.html',
        specialId : ''
    },
    {
        id : 2,
        content : 'شعبه',
        hasSub : true,
        iconName : 'home-hashtag',
        hasMobileMenu : true,
        active : false,
        link : '#',
        specialId : 'branches'
    },
    {
        id : 3,
        content : 'منو',
        hasSub : true,
        iconName : 'menu-board',
        hasMobileMenu : true,
        active : false,
        link : '#',
        specialId : ''
    },
    {
        id : 4,
        content : 'اعطای نمایندگی',
        hasSub : false,
        iconName : '',
        hasMobileMenu : false,
        active : false,
        link : '#',
        specialId : ''
    },
    {
        id : 5,
        content : 'درباره ما',
        hasSub : false,
        iconName : 'user-2',
        hasMobileMenu : true,
        active : false,
        link : '#',
        specialId : ''
    },
    {
        id : 6,
        content : 'تماس با ما',
        hasSub : false,
        iconName : 'call',
        hasMobileMenu : true,
        active : false,
        link : '#',
        specialId : ''
    },
];

// Data for branches and foodMenu
const branches = [
    { id: 1, name: 'اکباتان' , htmlId : 'ekbatan' , class : "branchLink" },
    { id: 2, name: 'چالوس' , htmlId : 'chalus' , class : "branchLink" },
    { id: 3, name: 'اقدسیه' , htmlId : 'aghdasie' , class : "branchLink" },
    { id: 4, name: 'ونک' , htmlId : 'vanak' , class : "branchLink" }
];

const foodMenu = [
    { id: 1, name: 'غذای اصلی' },
    { id: 2, name: 'پیش غذا' },
    { id: 3, name: 'دسر' },
    { id: 4, name: 'نوشیدنی' }
];

// generate HTML for submenu items
function subMenuWriter(items) {
    return items.map(item => `<li class="${item.class} transition-all py-2 pr-2 w-full"><a href="#">${item.name}</a></li>`).join('');
}

// Generate submenu HTML for branches and food menu
const branchesHtmlHolder = subMenuWriter(branches);
const foodMenuHtmlHolder = subMenuWriter(foodMenu);

// menu variables
const desktopMenuWrapper = document.querySelector('#desktop-menu-wrapper');
const mobileMenuWrapper = document.querySelector('#mobile-menu-wrapper');

let desktopMenuFragment = document.createDocumentFragment();
let mobileMenuFragment = document.createDocumentFragment();
let menuLiPlaceHolder = null;
let menuHtmlPlaceHolder = null;

let menuActiveClass = null;

// add menu elements to desktop
menuLinks.forEach((obj)=>{
    createMenuItem(obj,false)
});
// add menu elements to mobile
desktopMenuWrapper.append(desktopMenuFragment);
menuLinks.forEach((obj)=>{
    if(obj.hasMobileMenu){
    createMenuItem(obj,true)
    }
});
mobileMenuWrapper.append(mobileMenuFragment);

// function to create and append menu items
function createMenuItem(obj,isMobile = false){
    menuLiPlaceHolder = document.createElement('li');
    menuLiPlaceHolder.id = obj.specialId;
    menuActiveClass = obj.active ? (isMobile ? 'text-xs font-estedad-regular text-primary' : 'font-estedad-bold text-primary border-b border-primary') : '';
    if(!obj.hasSub){
        menuHtmlPlaceHolder = `<a href="${obj.link}" class="${menuActiveClass} flex items-center gap-x-1">
                                    ${isMobile&&obj.hasMobileMenu ? `<svg class="w-4 h-4"><use href="#${obj.iconName}"></use></svg>` :``}
                                    ${obj.content}
                                </a>`;
                
    }else{
        if(isMobile){
            menuHtmlPlaceHolder = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-x-1">
                        <svg class="w-3 h-3">
                            <use href="#${obj.iconName}"></use>
                        </svg>
                        <span>${obj.content}</span>
                    </div>
                    <svg class="mobileSubArrow w-4 h-4 transition-all">
                        <use href="#arrow-down"></use>
                    </svg>
                </div>
                <ul id="${obj.content=='شعبه' ? 'branchMobileSub' : 'foodMenuMobileSub'}" class=" bg-white transition-all border-t-0 flex-col hidden border-gray-4 mt-0 group-hover:mt-2 divide-y divide-gray-4 font-estedad-bold text-gray-8 text-2xs ">
                    ${obj.content=='شعبه' ? branchesHtmlHolder : foodMenuHtmlHolder}
                </ul>
                `;
            menuLiPlaceHolder.classList.add('group')
        }else{
            menuHtmlPlaceHolder = `
                <a href="#" class="${obj.active ? 'font-estedad-bold text-primary border-b border-primary' : ''}">${obj.content}</a>
                <svg class="w-4 h-4">
                    <use href="#arrow-down"></use>
                </svg>
                <ul class="invisible z-10 opacity-0 transition-all delay-75 group-hover:visible group-hover:opacity-100 absolute top-[120%] ${obj.content =='شعبه' ? 'left-0' : 'right-0'} flex flex-col w-36 px-2 bg-white text-sm text-gray-8 rounded-md shadow-[0_0px_6px_rgba(0,0,0,0.1)] divide-y divide-gray-3 child:inline-block child:py-2">
                ${obj.content=='شعبه' ? branchesHtmlHolder : foodMenuHtmlHolder}
                </ul>
                `;
            menuLiPlaceHolder.classList.add('group','flex','items-center','relative','gap-x-1','cursor-pointer');
        }
    }
    menuLiPlaceHolder.innerHTML = menuHtmlPlaceHolder;
    if(isMobile){
        mobileMenuFragment.append(menuLiPlaceHolder);
    }else{
        desktopMenuFragment.append(menuLiPlaceHolder)
    }
}

// function for mobile menu submenu arrows
let mobileSubArrows = document.querySelectorAll('.mobileSubArrow');
mobileSubArrows.forEach((arrow)=>{
    arrow.addEventListener('click' , (event)=>{
        let ulElem = event.target.parentElement.nextElementSibling;
        ulElem.classList.toggle('hidden')
        ulElem.classList.toggle('flex')
        event.target.classList.toggle('-rotate-90')
    })
})

// products items definition(product list) -------------------------------------------------------------------------------------------------------
const products = [
    // Main Dishes
    { id: 1, name: "پاستا سبزیجات", src: "../images/products/pasta-sabzi.png", category: "Main Dish", price: "180000", count : 0, hasDiscount: true, discountAmount: 20000, discountPercent: 11, score: 5 },
    { id: 2, name: "کوفته برنجی", src: "../images/products/kufte-berenji.png", category: "Main Dish", price: "150000", count : 0, hasDiscount: true, discountAmount: 15000, discountPercent: 10, score: 4 },
    { id: 3, name: "سوشی", src: "../images/products/soushi.png", category: "Main Dish", price: "200000", count : 0, hasDiscount: true, discountAmount: 25000, discountPercent: 13, score: 2 },
    { id: 4, name: "لازانیا", src: "../images/products/lazania.png", category: "Main Dish", price: "190000", count : 0, hasDiscount: true, discountAmount: 30000, discountPercent: 16, score: 5 },
    { id: 5, name: "راتاتویی", src: "../images/products/ratatoui.png", category: "Main Dish", price: "160000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 4 },
    { id: 6, name: "پاستا بلونز", src: "../images/products/pasta-blunz.png", category: "Main Dish", price: "170000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 1 },
    { id: 7, name: "پیتزا قارچ", src: "../images/products/pizza-qharch.png", category: "Main Dish", price: "180000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 3 },
    { id: 8, name: "پیتزا سبزیجات و خامه", src: "../images/products/pizza-sabzi.png", category: "Main Dish", price: "200000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 5 },
    { id: 9, name: "پیتزا بادمجان و زیتون", src: "../images/products/pizza-bademjan.png", category: "Main Dish", price: "190000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 2 },
    { id: 10, name: "پیتزا روکولا", src: "../images/products/pizza-rokulla.png", category: "Main Dish", price: "150000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 4 },
    { id: 11, name: "پالاک پنیر", src: "../images/products/palak-cheese.png", category: "Main Dish", price: "160000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 3 },
    { id: 12, name: "کالزونه اسفناج", src: "../images/products/esfenaj-kalzune.png", category: "Main Dish", price: "170000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 1 },

    // Appetizers
    { id: 13, name: "فلافل", src: "../images/products/falafel.png", category: "Appetizer", price: "90000", count : 0, hasDiscount: true, discountAmount: 10000, discountPercent: 11, score: 3 },
    { id: 14, name: "باقالا قاتوق", src: "../images/products/baghala.png", category: "Appetizer", price: "100000", count : 0, hasDiscount: true, discountAmount: 20000, discountPercent: 20, score: 4 },
    { id: 15, name: "میرزا قاسمی", src: "../images/products/mirza-ghasemi.png", category: "Appetizer", price: "110000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 2 },
    { id: 16, name: "کشک بادمجان", src: "../images/products/kashk-bademjan.png", category: "Appetizer", price: "120000", count : 0, hasDiscount: true, discountAmount: 15000, discountPercent: 13, score: 5 },
    { id: 17, name: "کوکو سبزی", src: "../images/products/koko-sabzi.png", category: "Appetizer", price: "100000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 3 },
    { id: 18, name: "دلمه برگ مو", src: "../images/products/dolme-barg.png", category: "Appetizer", price: "110000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 5 },
    { id: 19, name: "دلمه کلم برگ", src: "../images/products/dolme-kalam.png", category: "Appetizer", price: "90000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 2 },
    { id: 20, name: "بادمجان شکم‌پر", src: "../images/products/bademjan-shekampor.png", category: "Appetizer", price: "120000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 3 },
    { id: 21, name: "بورانی بادمجان", src: "../images/products/borani.png", category: "Appetizer", price: "90000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 1 },
    { id: 22, name: "کله جوش", src: "../images/products/kale-joosh.png", category: "Appetizer", price: "100000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 4 },
    { id: 23, name: "پاکورا سبزیجات", src: "../images/products/pakoura.png", category: "Appetizer", price: "120000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 3 },

    // Desserts
    { id: 25, name: "دلمه برگ مو (Dessert)", src: "../images/products/dolme-barg.png", category: "Dessert", price: "110000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 3 },
    { id: 26, name: "کوفته برنجی (Dessert)", src: "../images/products/kufte-berenji.png", category: "Dessert", price: "90000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 4 },
    { id: 27, name: "پاکورا سبزیجات (Dessert)", src: "../images/products/pakoura.png", category: "Dessert", price: "120000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 2 },

    
    // Drinks
    { id: 28, name: "لیموناد", src: "../images/products/limonade.png", category: "Drink", price: "30000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 4 },
    { id: 29, name: "چای ماسالا", src: "../images/products/Chai-masala.png", category: "Drink", price: "40000", count : 0, hasDiscount: true, discountAmount: 4000, discountPercent: 10, score: 3 },
    { id: 30, name: "هات چاکلت", src: "../images/products/hot-chocolate.png", category: "Drink", price: "35000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 5 },
    { id: 31, name: "اسپرسو", src: "../images/products/espresso.png", category: "Drink", price: "50000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 2 },
    { id: 32, name: "شیرشکلات", src: "../images/products/chocolate-milk.png", category: "Drink", price: "45000", count : 0, hasDiscount: false, discountAmount: 0, discountPercent: 0, score: 5 }
];



// text area text counter
const textCounter = document.querySelector('#textarea-length-counter');
const feedBackArea = document.querySelector('#feedback-textarea');
feedBackArea.addEventListener('input' , ()=>{
    textCounter.innerHTML = feedBackArea.value.length + '/150'
});


// search page----------------------------------------
const searchInput =  document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-button');
// adding searched item name to url desktop
searchBtn.addEventListener('click' , ()=>{
    window.location.href = `http://127.0.0.1:5501/public/html/search.html?${searchInput.value}`;
})
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        window.location.href = `http://127.0.0.1:5501/public/html/search.html?${searchInput.value}`;
    }
});

// adding searched itme name to url mobile
const mobileSearchInput = document.querySelector('#mobile-search-input');
const searchBtnMobile = document.querySelector('#mobile-search-button');


// branches box -----------------------------------------------------------------------------------------------------
// open and close branches box
const branchesMenuLink = document.querySelector('#branches');
const closeBranchesBox = document.querySelector('#close-branches-box');
const branchesBox = document.querySelector('#branches-box')
branchesMenuLink.addEventListener('click',(event)=>{
    branchesBox.classList.remove('hidden');
    branchesBox.classList.add('fixed');
    mobileMenuBlur.classList.remove('hidden')
    mobileMenuBlur.classList.add('fixed')
})

closeBranchesBox.addEventListener('click',(event)=>{
    branchesBox.classList.add('hidden');
    branchesBox.classList.remove('fixed');
    mobileMenuBlur.classList.add('hidden')
    mobileMenuBlur.classList.remove('fixed')
})

// events for entering branch page
const branchesCarts = document.querySelectorAll('.branche-cart');
branchesCarts.forEach((brancheCart)=>[
    brancheCart.addEventListener('click',(event)=>{
        window.location.href = `http://127.0.0.1:5501/public/html/branches.html?${brancheCart.id}`
    })
])

// made branch submenu links clickable 

let branchesLinks = document.querySelectorAll('.branchLink');
branchesLinks.forEach((branchL)=>{
    branchL.addEventListener('click' , ()=>{
        let clickedBranchObj = branches.find((branchInBranches)=>{
            return branchInBranches.name == branchL.firstElementChild.innerHTML;
        })
        window.location.href = `http://127.0.0.1:5501/public/html/branches.html?${clickedBranchObj.htmlId}`
    })
})

// made branch cart button clickable

let branchButtons = document.querySelectorAll('.branchBtn');
branchButtons.forEach((branchBtn)=>{
    branchBtn.addEventListener('click' , ()=>{
        let clickedBranchObj = branches.find((branchInBranches)=>{
            return branchInBranches.htmlId == branchBtn.name
        })
        console.log(clickedBranchObj);
        window.location.href = `http://127.0.0.1:5501/public/html/branches.html?${clickedBranchObj.htmlId}`
    })
})

// get basketed products from local host 

const localFoods = JSON.parse(localStorage.getItem('localFoods')) || [];

const basket = [];

function addFoodsFromLocal(){
    localFoods.forEach((foodName)=>{
        let foundedFood = products.find((product)=>{
            return product.name == foodName
        })
        if (basket.includes(foundedFood)){
            foundedFood.count+=1
        }
        else{
            basket.push(foundedFood)
            foundedFood.count+=1
        }
    })
};
addFoodsFromLocal();

// add foods html obj to website
const basketFoodWrapper = document.querySelector('#basketFoodsWrapper');
const basketFoodsFragment = document.createDocumentFragment();

function addFoodsToWebsite(outList , wrapper){
    outList.forEach((listItem)=>{
        let mainDiv = document.createElement('div')
        mainDiv.classList = '';
        mainDiv.innerHTML = `
                <div class='flex items-center h-40 border border-gray-4 rounded-lg overflow-hidden'>
                    <img src="${listItem.src}" alt="" class="w-[169px] h-full object-cover">
                    <div class=" h-full w-[295px] flex flex-col items-start justify-between gap-y-1 pr-8 py-4">
                        <!-- title and  -->
                        <span class="productName font-estedad-bold text-xl">${listItem.name}</span>
                        <!-- resources -->
                        <span class="h-[50px] flex items-center text-sm">مواد اولیه محصول...</span>
                        <div class="flex">
                            <!-- stars -->
                            <span class="flex child:w-6 child:h-6">
                                <img src="../images/star-empt.png" alt="">
                                <img src="../images/star-empt.png" alt="">
                                <img src="../images/Star.png" alt="">
                                <img src="../images/Star.png" alt="">
                                <img src="../images/Star.png" alt="">
                            </span>
                            
                        </div>
                    </div>
                    <div class="h-full flex  flex-col items-end justify-between px-6 py-4">
                        <!-- trash icon -->
                        <div class="flex items-start justify-end" >
                            <svg class="w-6 h-6"  onclick='removeBasketItem(event)'>
                                <use href="#trash"></use>
                            </svg>
                        </div>
                        ${listItem.hasDiscount ? `<!-- discount price -->
                        <div class="flex items-center justify-center gap-x-2">
                            <span class="line-through text-gray-5">${listItem.price}</span>
                            <span class="bg-error-extraLight text-error rounded-xl px-1 text-xs">%${listItem.discountPercent}</span>
                        </div>` : ''}
                        
                        <!-- price -->
                        <div class="flex items-center justify-center gap-x-1">
                            <span class="text-xl">${listItem.hasDiscount ? listItem.price - listItem.discountAmount : listItem.price}</span>
                            <span class="text-lg">تومان</span>
                        </div>
                    </div>
                </div>
        `;
        wrapper.append(mainDiv)
    })
};
addFoodsToWebsite(basket , basketFoodsFragment)
basketFoodWrapper.append(basketFoodsFragment)




