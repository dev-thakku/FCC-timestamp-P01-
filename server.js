
var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//@desc   Responds with unix timestamp and utc date
//@route  GET /ap/:date?
app.get("/api/:date?", (req, res) => {
  const time = req.params.date;
  if (time) {
    const unix = Date.parse(time) || Number(time);
    const utc = new Date(unix).toUTCString();
    res.json(unix ? { unix, utc } : { error: "Invalid Date" });
  } else {
    const currDate = new Date();
    res.json({
      unix: currDate.getTime(),
      utc: currDate.toUTCString(),
    });
  }
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
