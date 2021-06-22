import { Component } from 'react'

import Swal from 'sweetalert2'

import './UserCard.css'
import githubAPI from '../apis/githubAPI'

interface Props {
  onFetchedUser: (repos: number) => void
}

class UserCard extends Component<Props> {
  state = {
    user: {
      avatar_url: 'https://via.placeholder.com/253?text=No+Image',  // default img
      name: '',
      accountName: ''
    }
  }

  fetchUser = async () => {
    try {
      const { data } = await githubAPI.getUser()
      this.setState({
        user: {
          avatar_url: data.avatar_url as string,
          name: data.name as string,
          accountName: data.login as string,
        }
      })

      this.props.onFetchedUser(data.public_repos)
    } catch (err) {
      Swal.fire('503', '無法取得 User，請稍後再試', 'error')
    }
  }

  componentDidMount() {
    this.fetchUser()
  }

  render() {
    const user = this.state.user

    return (
      <div className="card avatar-card-rwd">
        <img
          src={user.avatar_url}
          alt="user_avatar"
          title={user.accountName}
          className="card-img-top"
        />
        <div className="card-body">
          <h5>{user.name}</h5>
          <p className="mb-0">{user.accountName}</p>
        </div>
      </div>
    )
  }
}

export default UserCard
