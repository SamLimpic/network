import { AppState } from '../AppState'
// import router from '../router'
import { api } from './AxiosService'

class PostsService {
  async getAllPosts() {
    const res = await api.get('api/posts')
    AppState.posts = res.data.posts
  }

  async getPostsByQuery(query) {
    const res = await api.get(`api/posts?query=${query}`)
    AppState.posts = res.data.posts
  }

  async getPostsByPage(num) {
    const res = await api.get(`api/posts?page=${num}`)
    AppState.posts = res.data.posts
  }

  // async getPostsById(id) {
  //   const res = await api.get(`api/posts/${id}`)
  //   AppState.activePosts = res.data
  // }

  async createPost(newPost) {
    const res = await api.post('api/posts', newPost)
    AppState.posts.push(res.data)
    // everytime a post is created, we will change pages
    // router.push({ name: 'PostDetails', params: { id: res.data.id } })
  }

  async likePost(id) {
    const res = await api.post(`api/posts/${id}/like`)
    AppState.posts.id = res.data
    this.getAllPosts()
  }

  // async editPost(id, edit) {
  //   const res = await api.put(`api/posts/${id}`, edit)
  //   AppState.posts = res.data
  // }
  async deletePost(id) {
    await api.delete(`api/posts/${id}`)
    AppState.posts = AppState.posts.filter(post => post.id !== id)
    location.reload()
  }
}

export const postsService = new PostsService()
