import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import serverless from 'serverless-http'
import routes from './app/routes/index'
import globalErrorHandler from './errors/globalErrorHandler'
import { databaseConnect } from './helpers/dbConnect'

const app = express()

// ============================
// CORS Setup
// ============================
// Allow localhost for dev, and production frontend URL
const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080']

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  }),
)

// ============================
// Middleware
// ============================
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ============================
// Connect to Database
// ============================
databaseConnect() // uses cached connection internally

// ============================
// Routes
// ============================
app.get('/', (req, res) => res.send('API OK'))
app.use('/api/v1', routes)

// ============================
// Global Error Handling
// ============================
app.use(globalErrorHandler)

// ============================
// Export as serverless function
// ============================
export default serverless(app)
