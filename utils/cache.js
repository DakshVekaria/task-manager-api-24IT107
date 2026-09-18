const NodeCache = require('node-cache');

// stdTTL: default time-to-live in seconds for every key
// checkperiod: how often expired keys are auto-cleaned
const cache = new NodeCache({ stdTTL: 60, checkperiod: 70 });

module.exports = cache;