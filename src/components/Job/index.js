import {Component} from 'react'

import Cookies from 'js-cookie'

import {FaStar} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'

import {BsBriefcase} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class Job extends Component {
  constructor(props) {
    super(props)
    this.state = {uniqueJobDetils: [], apiStatus: apiStatusConstants.initial}
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedDetails = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }

      const {jobDetails, similarJobs} = updatedDetails
      const similarJob = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        rating: each.rating,
        title: each.title,
        location: each.location,
      }))
      const {life_at_company} = jobDetails
      const lifeAtCompany = {
        description: life_at_company.description,
        imageUrl: life_at_company.image_url,
      }
      const updatedData = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
        lifeAtCompany,
        skills: jobDetails.skills,
      }
      const updatedJobDetails = {
        jobDetails: updatedData,
        similarJobs: similarJob,
      }
      this.setState({
        uniqueJobDetils: updatedJobDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  jobDetailsSuccess = () => {
    const {uniqueJobDetils} = this.state
    const {jobDetails = {}, similarJobs = []} = uniqueJobDetils
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      lifeAtCompany = [],
      location,
      packagePerAnnum,
      rating,
      skills = [],
      title,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <>
        <Header />
        <div className="unique-job-bg-container">
          <div className="unique-job-container">
            <div className="logo-rating-container">
              <img src={companyLogoUrl} />
              <div className="rating-cont">
                <h1 className="job-title">{title}</h1>
                <div className="rating-container">
                  <FaStar className="star-icon" />
                  <p className="styling-rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="package-container">
              <div className="rating-container">
                <div className="rating-container">
                  <MdLocationOn className="location-icon" />
                  <p className="styling-rating">{location}</p>
                </div>
                <div className="rating-container">
                  <BsBriefcase className="location-icon" />
                  <p className="styling-rating">{employmentType}</p>
                </div>
              </div>
              <div>
                <p className="package">{packagePerAnnum}</p>
              </div>
            </div>
            <hr />
            <div>
              <div className="visit-button">
                <h1 className="package">Description</h1>
                <div className="logo-rating-container">
                  <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
                    Visit
                  </a>
                  <MdLocationOn className="location-icon" />
                </div>
              </div>
              <p className="styling-rating">{jobDescription}</p>
            </div>
            <div>
              <h1 className="package">Skills</h1>
              <ul className="ul">
                {skills.map(eachSkill => (
                  <li key={eachSkill.name} className="li">
                    <img src={eachSkill.image_url} />
                    <h1 className="list-item-heading">{eachSkill.name}</h1>
                  </li>
                ))}
              </ul>
            </div>
            <div className="company-container">
              <div>
                <h1 className="package">Life at Company</h1>
                <p className="company-description">{description}</p>
              </div>
              <div>
                <img src={imageUrl} />
              </div>
            </div>
          </div>
          <div>
            <h1 className="package">Similar Jobs</h1>
            <ul className="ul">
              {similarJobs.map(eachJob => (
                <li className="similar-job-container" key={eachJob.id}>
                  <div className="logo-rating-container">
                    <img
                      src={eachJob.companyLogoUrl}
                      className="similar-job-image"
                      alt="similar job company logo"
                    />
                    <div className="rating-cont">
                      <h1 className="job-title">{eachJob.title}</h1>
                      <div className="rating-container">
                        <FaStar className="star-icon" />
                        <p className="styling-rating">{eachJob.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h1 className="package">Description</h1>
                    </div>
                    <p className="styling-rating">{eachJob.jobDescription}</p>
                  </div>
                  <div className="rating-container">
                    <div className="rating-container">
                      <MdLocationOn className="location-icon" />
                      <p className="styling-rating">{eachJob.location}</p>
                    </div>
                    <div className="rating-container">
                      <BsBriefcase className="location-icon" />
                      <p className="styling-rating">{eachJob.employmentType}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  retryJob = () => {
    this.getJobDetails()
  }

  jobDetailsFailure = () => (
    <>
      <div className="unique-job-bg">
        <div className="b">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1 className="job-head">Oops! Something Went Wrong</h1>
          <p className="job-para-rating">
            We cannot seem to find the page you are looking for.
          </p>
          <button className="retry-button" onClick={this.retryJob}>
            Retry
          </button>
        </div>
      </div>
    </>
  )

  renderLoader = () => (
    <>
      <div className="loader-container unique-job-bg1" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.jobDetailsSuccess()
      case apiStatusConstants.failure:
        return this.jobDetailsFailure()
      case apiStatusConstants.inprogress:
        return this.renderLoader()
      default:
        return null
    }
  }
}
export default Job
