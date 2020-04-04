
const ytdl = require("ytdl-core");
const express = require("express");
const cors = require("cors");
const cors_proxy = require('cors-anywhere');
const rateLimit = require("express-rate-limit");

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 10 minutes 20 request
  max: 10 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

var allowedOrigins = ['http://localhost:3000',
  'https://ylight.xyz'];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.options("*", cors());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to ylight api")
})



app.get('/song', async (req, res) =>
  ytdl
    .getInfo(req.query.id)
    .then(info => {
      const audioFormats = ytdl.filterFormats(info.formats, 'audioonly')
      res.set('Cache-Control', 'public, max-age=20000'); //6hrs aprox
      res.json(audioFormats[1].url)
    })
    .catch(err => res.status(400).json(err.message))
)

let proxy = cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeaders: [], // Do not require any headers.
  removeHeaders: [] // Do not remove any headers.
});

app.get('/proxy/:proxyUrl*', (req, res) => {
  req.url = req.url.replace('/proxy/', '/'); // Strip '/proxy' from the front of the URL, else the proxy won't work.
  proxy.emit('request', req, res);
});


app.listen(port, () => console.log(`Server is listening on port ${port}.`));
