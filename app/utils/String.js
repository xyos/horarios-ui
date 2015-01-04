var StringUtils = {
  humanize: function(text) {
    return text.toLowerCase().replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });
  }
};
module.exports = StringUtils;