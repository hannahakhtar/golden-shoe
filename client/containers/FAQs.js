import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function FAQs() {

  return <>
    <Navbar />
    <h2>FAQs</h2>
    <p>Our most frequently asked questions.</p>
    <div>
      <dl>
        <dt><button>I am still waiting for my order</button></dt>
        <dd>
          <p>Has your estimated delivery date elapsed? Please allow a few extra days for your order to be delivered (especially during busy times). Our carriers are always doing their best to get your order to you, so make sure you keep an eye on your tracking link for the latest updates.</p>
          <p>If your order doesn’t arrive, please let us know within 30 days of the date by which your order should have been delivered and we’ll do our best to help you.</p>
        </dd>
        <dt><button>Will you be getting more stock?</button></dt>
        <dd>
          <p>We regularly update our stock levels. Please save the items and keep checking on the stock levels.</p>
        </dd>
        <dt><button>I have received a faulty item, what should I do?</button></dt>
        <dd>
          <p>We’re really sorry if you’ve received a faulty item.</p>
          <p>Please return the item to us as soon as possible so we can get this sorted for you. Don’t forget to select ‘Faulty’ when asked for a reason for your return. For more information on how to return, click <Link to={'/returns'}>here</Link>. If you’re not able to create a return, please <Link to={'/contact-us'}>get in touch</Link> with our Customer Care team and they will gladly help you further.</p>
        </dd>
        <dt><button>How can I pay for my order?</button></dt>
        <dd>Currently, Golden Shoe only accepts debit and credit cards. We plan to expand our payment options in the future.</dd>
        <dt><button>How much does shipping cost?</button></dt>
        <dd>Golden Shoe have a fixed £3 shipping fee. In the future, we plan to make a range of options available, including before 7pm and next day delivery.</dd>
 
      </dl>
    </div>
    < Footer />
  </>
}