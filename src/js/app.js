import {settings, select, classNames} from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Booking from './components/Booking.js';

const app = {
  initBooking: function(){
    const thisApp = this;

    thisApp.booking = document.querySelector(select.containerOf.booking);
    thisApp.booking = new Booking(thisApp.booking);
  },

  initPages: function(){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    thisApp.orderLink = document.querySelector(select.homeLinks.order);
    thisApp.bookingLink = document.querySelector(select.homeLinks.booking);
    
    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;
    
    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        /* get page id from href attribute */
        const id = clickedElement.getAttribute('href').replace('#', '');

        /* run thisApp.activatePage with that id */
        thisApp.activatePage(id);

        /* change URL hash */
        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function(pageId){
    const thisApp = this;

    /* add class "active" to matching pages, remove from non-matching */
    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    /* add class "active" to matching links, remove from non-matching */
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active, 
        link.getAttribute('href') == '#' + pageId
      );
    }

    /* order */
    thisApp.orderLink.addEventListener('click', function(event){
      const orderId = 'order';
      event.preventDefault();

      thisApp.activatePage(orderId);
      window.location.hash = '/' + orderId;
    });

    /* booking */
    thisApp.bookingLink.addEventListener('click', function(event){
      const bookingId = 'booking';
      event.preventDefault();

      thisApp.activatePage(bookingId);
      window.location.hash = '/' + bookingId;
    });
  },

  initMenu: function(){
    const thisApp = this;
    
    for(let productData in thisApp.data.products){
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);      
    }
  },

  initCart: function(){
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);
    
    thisApp.productList.addEventListener('add-to-cart', function(event){
      app.cart.add(event.detail.product);
    });
  },

  initData: function(){
    const thisApp = this;
    thisApp.data = {};

    const url = settings.db.url + '/' + settings.db.product;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);

        /* save parsedResponse as thisApp.data.products */
        thisApp.data.products = parsedResponse;

        /* execute initMenu method */
        thisApp.initMenu();
      });
  },

  initCarousel() {
    const carouselArray = [];

    carouselArray[0] = {
      title: 'Amaizing service!', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', author: '~ Margaret Osborne',
    };
    carouselArray[1] = {
      title: 'Perfect!', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', author: '~ Scarlett  Johansson',
    };
    carouselArray[2] = {
      title: 'Delicious!', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', author: '~ Johnny Cash',
    };

    let i = 0;
    const dots = document.querySelectorAll('.carousel-dots i');
    function changeSlide() {
      const title = document.querySelector('.review-title');
      const text = document.querySelector('.review-text');
      const name = document.querySelector('.review-author');

      for (let dot of dots) {
        if (dot.id == 'dot-'+ (i + 1)) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
        title.innerHTML = carouselArray[i].title;
        text.innerHTML = carouselArray[i].text;
        name.innerHTML = carouselArray[i].author;
      }

      if (i < carouselArray.length - 1) {
        i++;
      } else {
        i = 0;
      }
    }
    changeSlide();

    setInterval(() => {
      changeSlide();
    }, 3000);
  },

  init: function(){
    const thisApp = this;

    thisApp.initPages();
    thisApp.initData();
    thisApp.initCart();
    thisApp.initBooking();
    thisApp.initCarousel();
  },
};

app.init();


