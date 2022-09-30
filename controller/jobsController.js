import Job from '../models/jobsModel.js';
import CustomAPIError from '../middleware/custom-error.js';
// @desc get all jobs with GET
// @route api/v1/jobs
// @access Private
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort(
    '-createdAt'
  );
  res.status(200).json(jobs);
};

// @desc create with POST
// @route api/v1/jobs
// @access Private
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(200).json(job);
};

// @desc create with GET
// @route api/v1/jobs
// @access Private
const getJob = async (req, res) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new CustomAPIError(`job not found`, 404);
  }
  res.status(200).json(job);
};

// @desc create with PATCH
// @route api/v1/jobs/:id
// @access Private
const updateJob = async (req, res) => {
  
  const {
    params: { id: jobId },
    user: { userId },
  } = req;

 const job = await Job.findById(jobId);

 if (!job) {
   throw new CustomAPIError(`job not found`, 404);
 }

 if(job.createdBy.toString() !== userId){
    throw new CustomAPIError(`Not authorized to update this content`, 401);
 }
  const jobUpdated = await Job.findByIdAndUpdate({ _id:jobId, createdBy:userId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(jobUpdated);
};
// @desc create with DELETE
// @route api/v1/jobs/:id
// @access Private
const deleteJob = async (req, res) => {
    const {
        params: { id: jobId },
        user: { userId },
      } = req;
    
     const job = await Job.findById(jobId);
     
 if (!job) {
    throw new CustomAPIError(`job not found`, 404);
  }
 
  if(job.createdBy.toString() !== userId){
     throw new CustomAPIError(`Not authorized to update this content`, 401);
  }
  await job.remove();
  res.status(204).json(null)
};

export { getAllJobs, getJob, createJob, deleteJob, updateJob };

