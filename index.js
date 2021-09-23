const express = require('express');
const https = require('ssl-express-www'); //buat selalu redirect ke https.
const app = express();
const port = process.env.PORT || 5000;
const myLiffId = process.env.MY_LIFF_ID;

app.use(https); //https.
app.use(express.static('public')); // atau assets note: <folder name>
app.use('/assets', express.static("public")); //note: ini buat access kalo misal nyimpen foto di assets <https://<appname>.herokuapp.com/assets/<path>
app.get('/send-id', function(req, res) {
    res.json({id: myLiffId});
});

app.listen(port, () => console.log(`app listening on port ${port}!`));