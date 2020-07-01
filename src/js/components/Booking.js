import {templates, select} from '../settings.js';
import {utils} from '../utils.js';
import AmountWidget from './AmountWidget.js';
  
class Booking{
  constructor(bookingConfig){
    const thisBooking = this;
      
    thisBooking.render(bookingConfig);
    thisBooking.initWidgets();
  }

  render(bookingConfig){
    const thisBooking = this;

    /* generate HTML based on template */
    const generatedHTML = templates.bookingWidget();

    /* generate object */
    thisBooking.dom = {};

    thisBooking.dom.wrapper = bookingConfig;

    /* create element generatedDOM */
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);

    /* add element to thisBooking.dom.wrapper */
    thisBooking.dom.wrapper.appendChild(generatedDOM);
    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);

    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);
  }

  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
  }
}

export default Booking;