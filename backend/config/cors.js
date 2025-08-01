const cors = require('cors');

module.exports = corsConfig = ()=> cors({
  origin: process.env.FRONTEND_URL, // React app URL
  credentials: true
});
