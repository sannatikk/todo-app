import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const authorizationRequired = "Authorization required"
const invalidCredentials = "Invalid credentials"

const auth = (req, res, next) => {

    console.log("Authenticating request")
    // console.log("Secret Key: " + process.env.JWT_SECRET_KEY)

    if (!req.headers.authorization) {
        res.statusMessage = authorizationRequired
        res.status(401).json({ message: authorizationRequired })
    } else {
        try {
            const token = req.headers.authorization
            // const token = req.headers.authorization.split(' ')[1]; // Extract token correctly

            console.log("Received token: " + token)
            jwt.verify(token, process.env.JWT_SECRET_KEY)
            next()
        } catch (err) {
            res.statusMessage = invalidCredentials
            res.status(403).json({ message: invalidCredentials })
        }
    }
}

export default { auth }