import express from 'express'                   // Import the express package to create the server
import cors from 'cors'                         // Import the cors package to enable Cross-Origin Resource Sharing
import todoRouter from './routes/todoRouter.js' // Import the todoRouter from the todoRouter.js file to create routes for the todo API
import userRouter from './routes/userRouter.js' // Import the userRouter from the userRouter.js file to create routes for the user API

const port = process.env.PORT                   // Get the port from the environment variables

const app = express()                           // Create a new express server instance to handle requests
app.use(cors())                                 // Enable Cross-Origin Resource Sharing
app.use(express.json())                         // Enable JSON body parsing
app.use(express.urlencoded({extended: false}))  // Enable URL-encoded body parsing with the extended option set to false, which means that the values can be strings or arrays

app.use('/', todoRouter)                        // Use the todoRouter for the / path, which means that all routes defined in the todoRouter will be prefixed with /
app.use('/user', userRouter)                    // Use the userRouter for the /user path, which means that all routes defined in the userRouter will be prefixed with /user

app.use((err, req, res, next) => {              // Error handling middleware function
    const statusCode = err.statusCode || 500    // Get the status code from the error object or set it to 500 if it is not defined
    res.status(statusCode).json({error: err.message})   // Send the status code and error message as JSON
})

app.listen(port)                                // Start the server and listen on the specified port