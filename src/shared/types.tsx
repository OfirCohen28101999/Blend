export interface PostProps {
    id: number;
    postTitle: string;
    postText: string;
    postImg?: string
    creatingUser: boolean;
    postLikes: number;
    // trackId
    // date
  }
  
  export interface CommentProps {
    // id: number;
    commentText: string;
    postId: number
    userId: number;
    // date
  }