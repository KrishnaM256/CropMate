import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { v4 as uuidv4 } from 'uuid'
import './Home.css'
import farmer1 from '../../assets/farmer1.png'
import buyer1 from '../../assets/buyer1.jpg'
import CategoryCard from '../common/cards/categoryCard/categoryCard'
import FAQs from './FAQs'
import { useGetCountsDataQuery } from '../../redux/api/usersApiSlice'
const Home = () => {
  const { data, isLoading } = useGetCountsDataQuery()
  if (!isLoading) console.log(data)
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
            <h4>{data?.countFarmers}+</h4>
            <p>Farmers Joined</p>
          </div>
          <div className="statCard">
            <h4>{data?.countBuyers}+</h4>
            <p>Buyers Joined</p>
          </div>
          <div className="statCard">
            <h4>{data?.countOpenContracts}+</h4>
            <p>Contracts Opened</p>
          </div>
          <div className="statCard">
            <h4>{data?.countSignedContracts}+</h4>
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
              <p>- Farmer Harsh Ram Patil</p>
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
              <p>- Buyer Rajesh Verma</p>
            </div>
          </div>
        </div>
      </div>
      <FAQs></FAQs>
    </section>
  )
}

export default Home
