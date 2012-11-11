var crypto = require('crypto');

exports.generateId = function(bytes) {
  return crypto.randomBytes(bytes).toString('hex');
}

exports.stripHtml = function(str) {
  if(typeof str === 'string') {
    return str.replace(/(<([^>]+)>)/ig,"");
  } else {
    return '';
  }
}

exports.md5 = function(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}