import jwt from "jsonwebtoken"
import dotenv from "dotenv" 
dotenv.config() // this "activates" the .env file

const authorizationRequired = "Authorization required"
const invalidCredentials = "Invalid credentials"

const auth = (req, res, next) => {                                  // middleware function

    if (!req.headers.authorization) {                               // if there is no authorization header
        res.statusMessage = authorizationRequired                   // set the status message
        res.status(401).json({ message: authorizationRequired })    // send the response
    } else {                                                        // if there is an authorization header
        try {                                                       // try to verify the token
            const token = req.headers.authorization                 // get the token from the header in the request object
            jwt.verify(token, process.env.JWT_SECRET_KEY)           // verify the token using the secret key
            next()                                                  // if the token is valid, call the next middleware function
        } catch (err) {                                             // if the token is invalid
            res.statusMessage = invalidCredentials                  // set the status message
            res.status(403).json({ message: invalidCredentials })   // send the response
        }
    }
}

export { auth }