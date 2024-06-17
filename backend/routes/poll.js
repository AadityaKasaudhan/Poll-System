const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');

router.get('/polls', pollController.getPolls);
router.post('/polls', pollController.createPoll);
router.post('/polls/vote', pollController.votePoll);

module.exports = router;
