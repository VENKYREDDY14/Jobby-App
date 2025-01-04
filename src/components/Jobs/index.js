import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {BsSearch} from 'react-icons/bs'
import Header from '../Header'

import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profileDetails: {},
      profileStatus: 'loading',
      employmentType: [],
      minimumPackage: '',
      search: '',
      jobsList: [],
      jobsApi: 'loading',
    }
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    this.setState({profileStatus: 'loading'})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const {profile_details} = data
      const updatedData = {
        name: profile_details.name,
        profileImageUrl: profile_details.profile_image_url,
        shortBio: profile_details.short_bio,
      }
      this.setState({profileDetails: updatedData, profileStatus: 'success'})
    } else {
      this.setState({profileStatus: 'failure'})
    }
  }

  retryProfile = () => {
    this.getProfile()
  }

  getProfileDetails = () => {
    const {profileDetails, profileStatus} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    switch (profileStatus) {
      case 'loading':
        return this.loading()
      case 'success':
        return (
          <div>
            <div className="profile-container">
              <img src={profileImageUrl} alt="profile" />
              <h1 className="profile-name">{name}</h1>
              <p className="profile-description">{shortBio}</p>
            </div>
            <div className="hr-line">
              <hr />
            </div>
            {this.getEmploymentType()}
            {this.getSalaryRange()}
          </div>
        )
      case 'failure':
        return (
          <div className="profile-retry-container">
            <button className="retry-button" onClick={this.retryProfile}>
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  employment = id => {
    this.setState(prevState => {
      let {employmentType} = prevState
      if (employmentType.includes(id)) {
        employmentType = employmentType.filter(each => each !== id)
      } else {
        employmentType = [...employmentType, id]
      }
      return {employmentType}
    }, this.getJobs)
  }

  getEmploymentType = () => (
    <ul>
      <h1 className="employment-heading">Types of Employment</h1>
      {employmentTypesList.map(each => (
        <li key={each.employmentTypeId.toLowerCase()}>
          <div>
            <input
              type="checkbox"
              id={each.employmentTypeId}
              onClick={() => this.employment(each.employmentTypeId)}
            />
            <label htmlFor={each.employmentTypeId} className="label">
              {each.label}
            </label>
          </div>
        </li>
      ))}
      <div className="hr-line">
        <hr />
      </div>
    </ul>
  )

  salaryRange = id => {
    this.setState({minimumPackage: id}, this.getJobs)
  }

  getSalaryRange = () => (
    <ul>
      <h1 className="employment-heading">Salary Range</h1>
      {salaryRangesList.map(each => (
        <li key={each.salaryRangeId}>
          <div>
            <input
              type="radio"
              id={each.salaryRangeId}
              name="salary"
              onChange={() => this.salaryRange(each.salaryRangeId)}
            />
            <label htmlFor={each.salaryRangeId} className="label">
              {each.label}
            </label>
          </div>
        </li>
      ))}
      <div className="hr-line">
        <hr />
      </div>
    </ul>
  )

  loading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getJobs = async () => {
    this.setState({jobsApi: 'loading'})
    const {minimumPackage, search, employmentType} = this.state
    const newEmployment = employmentType.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?minimum_package=${minimumPackage}&employment_type=${newEmployment}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({jobsList: updatedData, jobsApi: 'success'})
    } else {
      this.setState({jobsApi: 'failure'})
    }
  }

  onSearch = event => {
    this.setState({search: event.target.value})
  }

  getSearch = () => {
    this.getJobs()
  }

  retryJobs = () => {
    this.getJobs()
  }

  renderFailure = () => (
    <>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1 className="job-head">Oops! Something Went Wrong</h1>
        <p className="job-para-rating">
          We cannot seem to find the page you are looking for.
        </p>
        <button className="retry-button" onClick={this.retryJobs}>
          Retry
        </button>
      </div>
    </>
  )

  renderNoJobs = () => (
    <>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="job-head h1">No Jobs Found</h1>
        <p className="job-para-rating p1">
          We could not find any jobs. Try other filters
        </p>
      </div>
    </>
  )

  renderJobs = () => {
    const {jobsList, jobsApi} = this.state
    const len = jobsList.length

    switch (jobsApi) {
      case 'loading':
        return this.loading()
      case 'success':
        return len !== 0 ? (
          <ul>
            {jobsList.map(eachJob => (
              <li key={eachJob.id}>
                <JobItem eachJob={eachJob} />
              </li>
            ))}
          </ul>
        ) : (
          this.renderNoJobs()
        )
      case 'failure':
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="jobs-bg-container">
          <Header />
          <div className="jobs3">
            <div className="jobs4">{this.getProfileDetails()}</div>
            <div>
              <div className="search-container" data-testid="searchButton">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.onSearch}
                  value={this.state.search}
                />
                <button
                  type="button"
                  className="search-button"
                  onClick={this.getSearch}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
