import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FAQComponent from '../components/FAQcomponent'

// ! https://github.com/TylerPottsDev/react-accordion/blob/master/src/App.js
// ! fix background image in component

export default function FAQs() {

  const [faqs, setFaqs] = useState([
    {
      question: 'I am still waiting for my order',
      answer: 'Has your estimated delivery date elapsed? Please allow a few extra days for your order to be delivered (especially during busy times. Our carriers are always doing their best to get your order to you, so make sure you keep an eye on your tracking link for the latest updates. If your order doesn not arrive, please let us know within 30 days of the date by which your order should have been delivered and we’ll do our best to help you.',
      open: true
    },
    {
      question: 'Will you be getting more stock?',
      answer: 'We regularly update our stock levels. Please save the items and keep checking on the stock levels.',
      open: false
    },
    {
      question: 'I have received a faulty item, what should I do?',
      answer: 'We’re really sorry if you’ve received a faulty item.',
      open: false
    },
    {
      question: 'How can I pay for my order?',
      answer: 'Currently, Golden Shoe only accepts debit and credit cards. We plan to expand our payment options in the future. Please return the item to us as soon as possible so we can get this sorted for you. Don’t forget to select ‘Faulty’ when asked for a reason for your return. If you’re not able to create a return, please get in touch with our Customer Care team and they will gladly help you further.',
      open: false
    },
    {
      question: 'How much does shipping cost?',
      answer: 'Golden Shoe have a fixed £3 shipping fee. In the future, we plan to make a range of options available, including before 7pm and next day delivery.',
      open: false
    }
  ])

  function toggleFAQ(index) {
    setFaqs(faqs.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open
      } else {
        faq.open = false
      }
      return faq
    }))
  }

  return <>
    <Navbar />
    <h2>FAQs</h2>
    <p>Our most frequently asked questions.</p>
    <div className="faqs">
      {faqs.map((faq, index) => {
        return <div key={index}>
          <FAQComponent faq={faq} index={index} toggleFAQ={toggleFAQ}/>
        </div>
      })}
    </div>
    < Footer />
  </>
}