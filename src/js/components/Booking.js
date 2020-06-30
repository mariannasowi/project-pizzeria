import {templates, select} from '../settings.js';
import {utils} from '../utils.js';
import AmountWidget from './AmountWidget.js';
  
class Booking{
  constructor(Booking){
    const thisBooking = this;
      
    thisBooking.render(Booking);
    thisBooking.initWidgets();
    console.log('thisBooking', thisBooking);
    }

    render(Booking){
      const thisBooking = this;

      /* generate HTML based on template */
      const generatedHTML = templates.bookingWidget();

      /* generate object */
      thisBooking.dom = {};

      thisBooking.dom.wrapper = Booking;

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