import React, { useState } from 'react'
import './FAQs.css'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const FAQs = () => {
  const [toggleAns1, setToggleAns1] = useState(false)
  const [toggleAns2, setToggleAns2] = useState(false)
  const [toggleAns3, setToggleAns3] = useState(false)
  const [toggleAns4, setToggleAns4] = useState(false)
  const [toggleAns5, setToggleAns5] = useState(false)
  const [toggleAns6, setToggleAns6] = useState(false)
  const [toggleAns7, setToggleAns7] = useState(false)

  return (
    <div className="faqSection">
      <h3 className="h3">Frequently Asked Questions</h3>
      <div className="faqItem">
        <div className="faQuestion" onClick={() => setToggleAns1(!toggleAns1)}>
          <p>How do I create a contract?</p>
          <button>{toggleAns1 ? <FaChevronUp /> : <FaChevronDown />}</button>
        </div>
        {toggleAns1 && (
          <p className="faqAns">
            To create a contract, simply log in to your account, navigate to the
            "Create Contract" section, and follow the step-by-step guide to
            create a secure agreement with trusted farmers or buyers.
          </p>
        )}
      </div>
      <div className="faqItem">
        <div className="faQuestion" onClick={() => setToggleAns2(!toggleAns2)}>
          <p>Is the payment secure?</p>
          <button>{toggleAns2 ? <FaChevronUp /> : <FaChevronDown />}</button>
        </div>
        {toggleAns2 && (
          <p className="faqAns">
            Our platform does not process payments directly. Buyers transfer
            payments to farmers using the payment method specified in the
            contract, such as bank transfer, UPI, or other agreed methods. This
            approach ensures transparency and flexibility for both parties. By
            handling payments directly, buyers and farmers have greater control
            over transactions and avoid platform fees, leading to cost-effective
            and secure dealings.
          </p>
        )}
      </div>
      <div className="faqItem">
        <div className="faQuestion" onClick={() => setToggleAns3(!toggleAns3)}>
          <p>How do I negotiate prices?</p>
          <button>{toggleAns3 ? <FaChevronUp /> : <FaChevronDown />}</button>
        </div>
        {toggleAns3 && (
          <p className="faqAns">
            You can directly negotiate with farmers or buyers using our inbuilt
            chat feature. Once both parties agree on a price, the contract is
            automatically updated.
          </p>
        )}
      </div>
      <div className="faqItem">
        <div className="faQuestion" onClick={() => setToggleAns4(!toggleAns4)}>
          <p>
            Can I review the quality of crops or services before signing a
            contract?
          </p>
          <button>{toggleAns4 ? <FaChevronUp /> : <FaChevronDown />}</button>
        </div>
        {toggleAns4 && (
          <p className="faqAns">
            While our platform does not provide lab tests or farmer reviews, we
            do offer a unique crop prediction feature. This allows you to
            predict the yield of crops based on data such as location, weather,
            and soil quality. This information helps you make informed decisions
            before proceeding with a contract.
          </p>
        )}
      </div>
      <div className="faqItem">
        <div className="faQuestion" onClick={() => setToggleAns5(!toggleAns5)}>
          <p>How do I resolve disputes?</p>
          <button>{toggleAns5 ? <FaChevronUp /> : <FaChevronDown />}</button>
        </div>
        {toggleAns5 && (
          <p className="faqAns">
            Our platform has a built-in dispute resolution system. In case of
            any disagreements, you can contact support, and we will help mediate
            the issue according to our platform's terms.
          </p>
        )}
      </div>
      <div className="faqItem">
        <div className="faQuestion" onClick={() => setToggleAns6(!toggleAns6)}>
          <p>Can I update my contract after signing it?</p>
          <button>{toggleAns6 ? <FaChevronUp /> : <FaChevronDown />}</button>
        </div>
        {toggleAns6 && (
          <p className="faqAns">
            Yes, you can request changes to a contract after it’s signed. Both
            parties must agree to the changes, and the contract will be updated
            accordingly.
          </p>
        )}
      </div>
    </div>
  )
}

export default FAQs
