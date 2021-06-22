import { Component } from 'react'

import Swal from 'sweetalert2'
import githubAPI from '../apis/githubAPI'

import UserCard from '../components/UserCard'
import RepoCard from '../components/RepoCard'
import './Home.css'

export interface repo {
  id: number,
  name: string,
  description: string,
  html_url: string,
  language: string,
  homepage: string,
  updated_at: string,
}

class Home extends Component {
  state = {
    repos: [] as repo[],
    page: 1,
    totalPage: 0,
    observe: null, // 監看滾動分頁
    isLoading: false
  }
  pageLimit = githubAPI.pageLimit

  updateTotalPage = (reposSize: number) => {
    this.setState({ totalPage: Math.ceil(reposSize / this.pageLimit) })
  }

  fetchRepos = async (page: number) => {
    try {
      this.setState({ isLoading: true })
      const { data } = await githubAPI.getRepos(page)

      const repos = data.map((repo: repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        homepage: repo.homepage,
        updated_at: repo.updated_at
      })) as repo[]

      this.setState({ repos })
      this.setState({ isLoading: false })
    } catch (err) {
      this.setState({ isLoading: false })
      Swal.fire('503', '無法取得 Repositories，請稍後再試', 'error')
    }
  }

  componentDidMount() {
    this.fetchRepos(this.state.page)
  }

  render() {
    const repos = this.state.repos
    const spinner = (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    )

    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3">
            <UserCard onFetchedUser={this.updateTotalPage}/>
            <div className="bg-img mt-5"></div>
          </div>
          <div className="col-md-9">
            <div className="mt-3 mt-md-0 text-center text-md-left">
              <span className="font-weight-bold">Repositories</span>
              <span className="badge badge-pill badge-secondary">{ repos.length }</span>
            </div>
            <hr />
            <div className="position-relative">
              {
                repos.map(repo => 
                  <RepoCard key={repo.id} repo={repo}></RepoCard>
                )
              }
              { this.state.isLoading ? spinner : '' }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
