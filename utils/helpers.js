module.exports = {
  json: function (context) {
    return JSON.stringify(context);
  },
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  format_plural: (word, amount) => {
    return amount !== 1 ? `${word}s` : word;
  },
};
//this file exports a JSON formatter and a date and pluralization helper function. The JSON formatter converts
