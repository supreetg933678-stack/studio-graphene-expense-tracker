function sendJson(res, status, payload) {
  res.status(status).json({ success: status >= 200 && status < 300, data: payload });
}

function sendError(res, status, message, details = null) {
  res.status(status).json({ success: false, message, details });
}

module.exports = {
  sendJson,
  sendError,
};
