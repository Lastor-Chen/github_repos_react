import { Component } from 'react'
import dayjs from '../apis/dayjs'
import { repo } from '../views/Home'
import './RepoCard.css'

export interface RepoCardProps {
  repo: repo
}

class RepoCard extends Component<RepoCardProps> {
  fromNow(ISOString: string) {
    return dayjs(ISOString).fromNow()
  }

  ifHomepage(repo: repo) {
    if (!repo.homepage) return null

    return (
      <div className="ms-3">
        <a href={repo.homepage}>
          <span className="badge bg-info">demo</span>
        </a>
      </div>
    )
  }

  ifDescription(repo: repo) {
    if (repo.description) {
      return <p className="card-text">{repo.description}</p>
    } else {
      return <p className="card-text text-muted">No description...</p>
    }
  }

  render() {
    const repo = this.props.repo

    return (
      <div className="card mb-3">
        <div className="card-body">
          <div className="card-title d-flex mb-0">
            <a href={repo.html_url} className="text-decoration-none">
              <h5 className="mb-0 fw-bold">{repo.name}</h5>
            </a>
            {this.ifHomepage(repo)}
          </div>
          <div className="repo-info my-3">
            <span className="lang-dot me-3" data-color={repo.language}>
              {repo.language}
            </span>
            <span>Updated {this.fromNow(repo.updated_at)}</span>
          </div >
          <hr />
          {this.ifDescription(repo) }
        </div>
      </div>
    )
  }
}

export default RepoCard