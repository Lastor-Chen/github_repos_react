import { Component } from 'react'
import githubAPI from '../apis/githubAPI'

import UserCard from '../components/UserCard'
import Repos from '../components/Repos'
import './Home.css'



class Home extends Component {
  state = {
    totalPage: 0,
  }
  pageLimit = githubAPI.pageLimit

  updateTotalPage = (reposSize: number) => {
    this.setState({ totalPage: Math.ceil(reposSize / this.pageLimit) })
  }

  render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3">
            <UserCard onFetchedUser={this.updateTotalPage}/>
            <div className="bg-img mt-5"></div>
          </div>
          <div className="col-md-9">
            <Repos totalPage={this.state.totalPage} />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
