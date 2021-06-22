import React, { Component } from 'react'
import Swal from 'sweetalert2'

import RepoCard from './RepoCard'
import Spinner from './Spinner'
import githubAPI from '../apis/githubAPI'

export interface Repo {
  id: number,
  name: string,
  description: string,
  html_url: string,
  language: string,
  homepage: string,
  updated_at: string,
}

export interface ReposProps {
  totalPage: number
}

class Repos extends Component<ReposProps> {
  state = {
    repos: [] as Repo[],
    isLoading: false,
    page: 1,
  }

  observe: IntersectionObserver = null as any // 監看滾動分頁
  obRef = React.createRef() as React.RefObject<HTMLDivElement>

  fetchRepos = async (page: number) => {
    try {
      this.setState({ isLoading: true })
      const { data } = await githubAPI.getRepos(page)

      const repos = data.map((repo: Repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        homepage: repo.homepage,
        updated_at: repo.updated_at
      })) as Repo[]
      const newRepos = this.state.repos.concat(repos)

      this.setState({ repos: newRepos })
      this.setState({ isLoading: false })
    } catch (err) {
      this.setState({ isLoading: false })
      Swal.fire('503', '無法取得 Repositories，請稍後再試', 'error')
    }
  }

  loadMoreRepos = async (entries: IntersectionObserverEntry[]) => {
    const state = this.state
    if (state.isLoading) return void 0

    // ob 初始化時，不加載
    const { isIntersecting } = entries[0]
    const windowHeight = window.innerHeight
    const obPosition = (this.obRef.current as HTMLDivElement).offsetTop
    const isOverWindow = obPosition > windowHeight
    if (!isIntersecting || !isOverWindow) return void 0

    // 滿足條件時 loadMore
    const page = state.page + 1
    this.setState({ page })
    await this.fetchRepos(page)

    // 如分頁資料已全數加載，移除 observe
    if (page === this.props.totalPage) {
      this.observe.disconnect()
      this.observe = null as any
    }
  }

  ifSpinner() {
    return this.state.isLoading ? <Spinner /> : null
  }

  componentDidMount() {
    this.fetchRepos(this.state.page)

    // 滾動分頁
    this.observe = new IntersectionObserver(this.loadMoreRepos)
    this.observe.observe(this.obRef.current as HTMLDivElement)
  }

  render() {
    const repos = this.state.repos

    return (
      <>
        <div className="mt-3 mt-md-0 text-center text-md-start">
          <span className="fw-bold me-1">Repositories</span>
          <span className="badge rounded-pill bg-secondary">{ repos.length }</span>
        </div>
        <hr />
        <div className="position-relative">
          {repos.map(repo =>
            <RepoCard key={repo.id} repo={repo}></RepoCard>
          )}
          { this.ifSpinner() }
        </div>
        <div ref={this.obRef}></div>
      </>
    )
  }
}

export default Repos