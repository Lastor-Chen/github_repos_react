import { Component } from 'react'
import UserCard from '../components/UserCard'

class Home extends Component {
  handleUser(repos: number) {
    console.log('handle', repos)
  }

  render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3">
            <UserCard onFetchedUser={this.handleUser}/>
            <div className="bg-img mt-5"></div>
          </div>
          <div className="col-md-9">右</div>
        </div>
      </div>
    )
  }
}

export default Home
