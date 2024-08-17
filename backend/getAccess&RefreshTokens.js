import axios from "axios"
import qs from "qs"
import { config } from "dotenv"

config()

const getgoogleOAuthTokens = async(code) => {
    const url = 'https://oauth2.googleapis.com/token'

    const values = {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: 'http://localhost:8000/api/v1/users/google-auth',
        grant_type: 'authorization_code'
    }

    try {
        const res = await axios.post(url, qs.stringify(values),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        return res.data
    } catch (error) {
        console.error(error) 
    }
}

const getGoogleUser = async(id_token ,access_token) => {
    try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${id_token}`
            }
        })

        return res
    } catch (error) {
        console.error(error) 
    }
}


export {getgoogleOAuthTokens, getGoogleUser}