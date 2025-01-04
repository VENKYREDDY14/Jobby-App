import {Link, withRouter} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'

import {BsBriefcase} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {eachJob} = props
  const {id} = eachJob
  return (
    <>
      <Link to={`/jobs/${id}`} className="li-item">
        <div key={eachJob.id} className="job-container">
          <div className="jobs">
            <img
              src={eachJob.companyLogoUrl}
              className="job-logo"
              alt="company logo"
            />
            <div className="head-rating-container">
              <h1 className="job-head">{eachJob.title}</h1>
              <div className="jobs">
                <FaStar className="rating-icon" />
                <p className="job-para-rating">{eachJob.rating}</p>
              </div>
            </div>
          </div>
          <div className="jobs2">
            <div className="jobs">
              <div className="jobs">
                <MdLocationOn className="location-icon" />
                <p className="job-para-rating">{eachJob.location}</p>
              </div>
              <div className="jobs1">
                <BsBriefcase className="location-icon" />
                <p className="job-para-rating">{eachJob.employmentType}</p>
              </div>
            </div>
            <div>
              <h1 className="job-head">{eachJob.packagePerAnnum}</h1>
            </div>
          </div>
          <hr />
          <h1 className="job-head">Description</h1>
          <p className="job-para-rating">{eachJob.jobDescription}</p>
        </div>
      </Link>
    </>
  )
}
export default withRouter(JobItem)
