const { Pool } = require('pg');

const feedbackPool = new Pool({
  connectionString: process.env.FEEDBACK_DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

module.exports = feedbackPool;