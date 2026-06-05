const { getSummary } = require('../services/summaryService');

function getSummaryController(req, res, next) {
  try {
    const summary = getSummary();
    res.json(summary);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSummary: getSummaryController,
};
