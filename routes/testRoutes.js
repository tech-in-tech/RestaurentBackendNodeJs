// Import express
const express = require('express');
const { testUserController } = require('../controllers/testControllers');

// Router object
const router = express.Router();

// Routes GET | POST | UPDATE | DELETE |
router.get('/test-user',testUserController)





// Export router object
module.exports  = router