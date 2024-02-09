export interface PostProps {
    id: number;
    title: string;
    description: string;
    image?: string
    creatingUser: boolean;
    track?: TrackProps;
  }
  
  export interface TrackProps {
    spotifyId: string,
    name: string,
    image: string,
    artistSpotifyId: string,
    artistName: string,
    previewUrl: string
  }

  export interface CommentProps {
    // id: number;
    description: string;
    postId: number
    userId: number;
    // creatingUser: UserProps,
    // post: PostProps,
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
}

export interface SessionProps {

}