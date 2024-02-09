import apiClient, { CanceledError } from "./api-client"
import { PostProps } from "../shared/types"

export { CanceledError }
const getAllPosts = () => {
    const abortController = new AbortController()
    const req = apiClient.get<PostProps[]>('api/post', { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

const createPost = () => {
    const abortController = new AbortController()
    const req = apiClient.post<PostProps[]>('api/post', { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

const getPostById = ((postId: string) => {
    const abortController = new AbortController()
    const req = apiClient.get<PostProps[]>('api/post/' + postId, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
})

const deletePost = ((postId: string) => {
    const abortController = new AbortController()
    const req = apiClient.delete<PostProps[]>('api/post/' + postId, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}
)
const updatePost = ((postId: string) => {
    const abortController = new AbortController()
    const req = apiClient.patch<PostProps[]>('api/post/' + postId, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
})

const getCommentsByPostId = ((postId: string) => {
    const abortController = new AbortController()
    const req = apiClient.get<PostProps[]>('api/post/' + postId + '/comments', { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
})

const commentOnPost = ((postId: string) => {
    const abortController = new AbortController()
    const req = apiClient.post<PostProps[]>('api/post/comment' + postId, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
})

const updateComment = ((commentId: string) => {
    const abortController = new AbortController()
    const req = apiClient.patch<PostProps[]>('api/post/comment' + commentId, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
})

const deleteComment = ((commentId: string) => {
    const abortController = new AbortController()
    const req = apiClient.delete<PostProps[]>('api/post/comment' + commentId, { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
})

export default { getAllPosts, createPost, getPostById, deletePost, updatePost, getCommentsByPostId, commentOnPost, updateComment, deleteComment }