const { Queue, Worker, QueueScheduler } = require('bullmq');
const { redisClient } = require('./redisClient')

// Create a new queue
const myQueue = new Queue('my-queue', {
  connection: redisClient
});

// Add a job to the queue
async function addJob(data) {
  await myQueue.add('my-job', data, {
    attempts: 3, // Retry up to 3 times if the job fails
    backoff: 5000, // Wait 5 seconds before retrying
  });
}

// Worker to process jobs from the queue
const worker = new Worker('my-queue', async (job) => {
  console.log(`Processing job ${job.id} with data: `, job.data);
  // Implement your job processing logic here
}, { connection: redisClient });

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed!`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed with error: `, err);
});

module.exports = { addJob };

