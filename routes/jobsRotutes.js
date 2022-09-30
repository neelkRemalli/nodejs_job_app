import express from 'express';
import {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} from '../controller/jobsController.js';

const router = express.Router();

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

export default router;
