import axios from 'axios'

const apiHelper = axios.create({
  baseURL: 'https://api.github.com'
})

const USER = 'lastor-chen'  // github username
const LIMIT = 7             // page limit
const SORT_BY = 'pushed'

export default {
  pageLimit: LIMIT,
  getRepos(page: number) {
    return apiHelper.get(`/users/${USER}/repos?sort=${SORT_BY}&page=${page}&per_page=${LIMIT}`)
  },
  getUser() {
    return apiHelper.get(`https://api.github.com/users/${USER}`)
  }
}