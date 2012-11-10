exports = mongoose = require('mongoose');
mongoose.connect(config.db.url, { server: { auto_reconnect: false } });
exports = Schema = mongoose.Schema