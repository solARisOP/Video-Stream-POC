import express from "express"
import { getgoogleOAuthTokens, getGoogleUser } from "./getAccess&RefreshTokens.js"
import jwt from "jsonwebtoken"

const app = express()


app.get("/api/v1/users/google-auth", async (req, res) => {
    // get the code from query params
    const {code} = req.query

    // get the id and access token with the code
    const {id_token, access_token} = await getgoogleOAuthTokens(code)

    // get user with tokens
    // const user = jwt.decode(id_token)
    
    //or

    const user = await getGoogleUser(id_token, access_token)

    // upsert user


    // create access and refresh tokens
    const accessToken = jwt.sign(user.data, "teremere",{expiresIn: '1d'})
    const refreshToken = jwt.sign(user.data, "teremere",{expiresIn: '10d'})

    // set cookies
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    }

    res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)

    // redirect back to client
    res.redirect('http://localhost:5173/user')
})

app.listen(8000, ()=>console.log("listeng on poort 8000"))