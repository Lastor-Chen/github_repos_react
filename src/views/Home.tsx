import React, { Component } from 'react'
import githubAPI from '../apis/githubAPI'

import UserCard from '../components/UserCard'
import Repos from '../components/Repos'
import './Home.css'

class Home extends Component {
  state = {
    totalPage: 0,
  }
  pageLimit = githubAPI.pageLimit
  bgImg = React.createRef() as React.RefObject<HTMLDivElement>
  bgPath = `${process.env.PUBLIC_URL}/img/gundamcat.png`

  updateTotalPage = (reposSize: number) => {
    this.setState({ totalPage: Math.ceil(reposSize / this.pageLimit) })
  }

  handleScroll = () => {
    // 行動裝置時，不動作
    if (window.innerWidth < 768) return
    const bgImg = this.bgImg.current as HTMLElement
    const scrollTop = +window.scrollY.toFixed(1)

    bgImg.style.backgroundPositionY = `${scrollTop * 0.7}px`
    bgImg.style.opacity = `${scrollTop * 0.0005}`
  }

  componentDidMount() {
    // 背景圖視差滾動 (mobile 不動作)
    if (window.innerWidth > 768) {
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3">
            <UserCard onFetchedUser={this.updateTotalPage}/>
            <div
              className="bg-img mt-5"
              style={{backgroundImage: `url(${this.bgPath})`}}
              ref={this.bgImg}
            ></div>
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
