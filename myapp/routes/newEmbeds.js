var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  switch (req.url.slice(2)) {
    default:
      res.render('embedBuilder/start');
      break
  }
});

module.exports = router;