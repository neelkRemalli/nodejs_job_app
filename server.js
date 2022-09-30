import dotenv from 'dotenv';
import express from 'express';
import connectDb from './db/config.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';
import protectedRoute from './middleware/protected-route.js';
import 'express-async-errors';
dotenv.config();

///// Routes
import authRoutes from './routes/authRoutes.js';
import jobsRoutes from './routes/jobsRotutes.js';

////// middleware ///////
const app = express();

app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', protectedRoute, jobsRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.LOCAL_MONGUURI);
    app.listen(
      port,
      console.log(`Server running on port ${port}, DB running!!!`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
