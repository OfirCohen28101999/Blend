export interface PostProps {
  _id: string,
  title: string,
  description: string,
  image?: string
  creatingUser: UserProps,
  track: TrackProps,
  createdAt?: Date,
  updatedAt?: Date
}

export interface CreatePostProps {
  title: string,
  description: string,
  trackId: string, 
  image: string
  postId?: string
}

export interface TrackProps {
  _id: string,
  spotifyId: string,
  name: string,
  image: string,
  artistSpotifyId: string,
  artistName: string,
  previewUrl: string,
  createdAt: Date,
  updatedAt: Date
}

export interface SecondTrack {
  tracks: TrackProps[]
}
export interface FirstTrack {
  data: SecondTrack
}

export interface CommentProps {
  _id: string;
  title: string
  description: string;
  userId: number;
  creatingUser?: UserProps,
  post?: PostProps,
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface CreateCommentProps {
  description: string,
  postId: string,
  title: string
}

export interface UserProps {
  name?: string,
  email: string,
  password: string,
  passwordConfirm?: string,
  role?: string,
  image?: string,
  verified?: boolean,
  provider?: string,
  bio?: string
  accessToken?: string,
  refreshToken?: string
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface UpdateUserProps {
  bio: string,
  image?: File
}

export interface SecondPost {
  posts: PostProps[]
}

export interface FirstPost {
  data: SecondPost
}

export interface SecondPostCreate {
  post: PostProps
}

export interface FirstPostCreate {
  data: SecondPostCreate
}

export interface SecondComment {
  comments: CommentProps[]
}

export interface FirstComment {
  data: SecondComment
}