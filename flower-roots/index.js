const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 8000

connectDB()

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/status', require('./routes/statusRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/posts', require('./routes/postRoutes'))
app.use('/api/messages', require('./routes/messageRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))