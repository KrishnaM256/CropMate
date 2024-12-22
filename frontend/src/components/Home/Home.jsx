import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { v4 as uuidv4 } from 'uuid'
import './Home.css'
import farmer1 from '../../assets/farmer1.png'
import buyer1 from '../../assets/buyer1.jpg'
import CategoryCard from '../common/cards/categoryCard/categoryCard'

const Home = () => {
  return (
    <section id="home">
      <div className="header">
        <h1 className="h1">
          Find the right <span className="diffFont">farming</span> <br />
          partnership, right away.
        </h1>
        <div className="search">
          <input
            type="search"
            name="search"
            placeholder="Find crops, services..."
          />
          <button type="button" className="searchBtn">
            <IoSearchOutline className="searchIcon" />
          </button>
        </div>
      </div>
      <div className="statsSection">
        <h3 className="h3">Our Impact</h3>
        <div className="statsGrid">
          <div className="statCard">
            <h4>10,000+</h4>
            <p>Farmers Joined</p>
          </div>
          <div className="statCard">
            <h4>5,000+</h4>
            <p>Buyers Joined</p>
          </div>
          <div className="statCard">
            <h4>20,000+</h4>
            <p>Contracts Signed</p>
          </div>
        </div>
      </div>
      <section id="roadmap">
        <h3 className="h3">Our Contract Farming Process</h3>
        <div className="roadmapContainer">
          <div className="roadmapLine"></div>
          <div className="steps">
            <div className="roadmapStep right">
              <div className="stepIcon">1</div>
              <div className="stepContent">
                <h4>Create Order and Contract</h4>
                <p>
                  Farmers create an order and contract, specifying details like
                  crops, quantity, price, and terms.
                </p>
              </div>
            </div>
            <div className="roadmapStep left">
              <div className="stepIcon">2</div>
              <div className="stepContent">
                <h4>Displayed in the Contract Market</h4>
                <p>
                  The order and contract are listed in the Contract Market
                  section, where buyers and farmers can find it.
                </p>
              </div>
            </div>
            <div className="roadmapStep right">
              <div className="stepIcon">3</div>
              <div className="stepContent">
                <h4>Best Buyer/Farmer Accepts the Contract</h4>
                <p>
                  Buyers or farmers can review the contract and accept it if the
                  terms align with their needs.
                </p>
              </div>
            </div>
            <div className="roadmapStep left">
              <div className="stepIcon">4</div>
              <div className="stepContent">
                <h4>Farmer Updates Status</h4>
                <p>
                  Farmers update the contract status as work progresses. Buyers
                  can track the status and monitor the progress of their order.
                </p>
              </div>
            </div>
            <div className="roadmapStep right">
              <div className="stepIcon">5</div>
              <div className="stepContent">
                <h4>Give Review and Rating</h4>
                <p>
                  After contract completion, both parties leave reviews and
                  ratings based on their experience working together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="statsSection testMonSec">
        <h3 className="h3">What Our Users Say</h3>
        <div className="testimonialGrid">
          <div className="testimonialCard">
            <div className="testimonial">
              <img src={farmer1} alt="Farmer Image" />
              <p>
                "This platform has transformed the way I manage my farming. It’s
                easy to connect with reliable buyers, and the secure contracts
                and timely payments give me peace of mind. The added benefit of
                quality assurance through lab tests is a huge plus. Highly
                recommended for any farmer looking to grow with trustworthy
                partners!"
              </p>
              <p>- Farmer John</p>
            </div>
          </div>
          <div className="testimonialCard">
            <div className="testimonial">
              <img src={buyer1} alt="Buyer Image" />
              <p>
                "This platform has been a game-changer for sourcing high-quality
                crops and services. The seamless contract process ensures
                security and reliability, and the ability to negotiate directly
                with farmers has made transactions smoother. It’s the perfect
                solution for any buyer looking to work with trusted farmers and
                streamline their sourcing process!"
              </p>
              <p>- Buyer John</p>
            </div>
          </div>
        </div>
      </div>
      <div className="faqSection">
        <h3 className="h3">Frequently Asked Questions</h3>
        <div className="faqGrid">
          <div className="faqItem">
            <h4>How do I create a contract?</h4>
            <p>
              To create a contract, simply log in to your account, navigate to
              the "Create Contract" section, and follow the step-by-step guide
              to create a secure agreement with trusted farmers or buyers.
            </p>
          </div>
          <div className="faqItem">
            <h4>Is the payment secure?</h4>
            <p>
              Yes, all payments are processed securely through trusted payment
              gateways, ensuring safety and reliability for both farmers and
              buyers.
            </p>
          </div>
          <div className="faqItem">
            <h4>How do I negotiate prices?</h4>
            <p>
              You can directly negotiate with farmers or buyers using our
              inbuilt chat feature. Once both parties agree on a price, the
              contract is automatically updated.
            </p>
          </div>
          <div className="faqItem">
            <h4>
              Can I review the quality of crops or services before signing a
              contract?
            </h4>
            <p>
              Yes, we offer quality assurance through lab tests and farmer
              reviews. You can view the results and feedback before proceeding
              with the contract.
            </p>
          </div>
          <div className="faqItem">
            <h4>How do I resolve disputes?</h4>
            <p>
              Our platform has a built-in dispute resolution system. In case of
              any disagreements, you can contact support, and we will help
              mediate the issue according to our platform's terms.
            </p>
          </div>
          <div className="faqItem">
            <h4>Can I update my contract after signing it?</h4>
            <p>
              Yes, you can request changes to a contract after it’s signed. Both
              parties must agree to the changes, and the contract will be
              updated accordingly.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
