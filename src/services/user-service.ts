import { CredentialResponse } from "@react-oauth/google";
import apiClient from "./api-client";
import { UserProps } from "../shared/types";

// export interface IUser {
//     email: string,
//     password?: string,
//     imgUrl?: string,
//     _id?: string,
//     accessToken?: string,
//     refreshToken?: string
// }

export const registerUser = (user: UserProps) => {
    return new Promise<UserProps>((resolve, reject) => {
        console.log("Registering user...")
        console.log(user)
        apiClient.post("api/auth/register", user).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const signInUser = (user: UserProps) => {
    return new Promise<UserProps>((resolve, reject) => {
        console.log("Registering user...")
        console.log(user)
        apiClient.post("api/auth/login", user).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const googleSignin = (credentialResponse: CredentialResponse) => {
    return new Promise<UserProps>((resolve, reject) => {
        console.log("googleSignin ...")
        apiClient.post("api/auth/session/oauth/google", credentialResponse).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}