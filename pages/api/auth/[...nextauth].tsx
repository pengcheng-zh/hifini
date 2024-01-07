import { postRequest } from "@/app/service/apiRequest";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, {
        providers: [
            CredentialsProvider({
                name: 'Credentials',
                credentials: {
                    email: {label: "Email", type: "email"},
                    password: {label: "Password", type: "password"}
                },
                async authorize(credentials, req) {
                    const { email, password } = credentials??{}
                    const { headers } = req.headers??{}
                    console.log('authorize', email, password)
                    let response= await postRequest(headers, "/user/login", {
                        email: email,
                        password: password
                    })
                    console.log('response user', response)
                    let user =  {
                        id: response?.object?.userId,
                        userName: response?.object?.userName,
                        authToken: response?.object?.authToken,
                        avatar: response?.object?.avatar
                    }
                    res.setHeader('Authorization', response?.object?.authToken);
                    console.log('response user', user)
                    return user
                },
    
            })
        ],
        session: {
            strategy: "jwt"
        },
        callbacks: {
            async session({token, session}) {
                console.log('session callback', token, session)
                if(token) {
                    session.user.id = token.user_id
                    session.user.name = token.name
                    session.user.avatar = token.picture
                    session.user.authToken = token.auth_token
                }
                return session
            },
            async jwt({ token, user }) {
                console.log('jwt callback', token, user)
                if(user) {
                    token.user_id = user.id
                    token.name = user.userName
                    token.picture = user.avatar
                    token.auth_token = user.authToken
                }
                return token
            }
        },
        cookies: {
            sessionToken: {
                name: 'pacal-session-token',
                options: {
                    httpOnly: true,
                    sameSite: 'lax',
                    path: '/',
                    secure: true
                }
            },
            callbackUrl: {
                name: 'pacal-callback-url',
                options: {
                    sameSite: 'lax',
                    path:'/',
                    secure: true
                }
            },
            csrfToken: {
                name: 'pacal-csrf-token',
                options: {
                    httpOnly: true,
                    sameSite: 'lax',
                    path: '/',
                    secure: true
                }
            }
        },
        pages: {
            signIn: '/login',
            newUser: '/login/regist'
        },
        debug: true
    });
}