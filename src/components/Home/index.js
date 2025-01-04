import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <div className="home-bg-container">
      <Header />
      <div>
        <div className="home-container">
          <h1 className="home-main-heading">
            Find The Job That Fits Your Life
          </h1>
          <p className="home-main-para">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and potenial.
          </p>
          <div>
            <Link to="/jobs">
              <button className="home-button">Find Jobs</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
)
export default Home
