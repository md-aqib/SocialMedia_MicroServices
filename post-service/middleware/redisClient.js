// const redis = require('redis');

// // Create a Redis client using the connection URL from environment variables
// const redisClient = redis.createClient({
//   url: process.env.REDIS_URL,
// });

// // Handle connection errors
// redisClient.on('error', (err) => {
//   console.error('Redis Client Error:', err);
// });

// // Connect to Redis
// (async () => {
//   try {
//     await redisClient.connect();
//     console.log('Connected to Redis');
//   } catch (err) {
//     console.error('Could not connect to Redis:', err);
//   }
// })();

// module.exports = { redisClient };

const IORedis = require('ioredis');

// Create a Redis connection using ioredis
const redisClient = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null, // Set this to null as required by BullMQ
})

// Add event listeners for error and connection
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = { redisClient };
