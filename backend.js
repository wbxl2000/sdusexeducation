const express = require('express');
const app = express();
// const cors = require('cors');
// app.use(cors());
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const request = require('request');
let options = {
  url: 'http://seat.lib.sdu.edu.cn/api.php/users/201805130163',
  json: true,
  headers: {
      'Referer': 'http://seat.lib.sdu.edu.cn/home/web/space/id/19/day/2021-06-14/floor/0'
  }
};

app.post('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body.id);
  options.url = 'http://seat.lib.sdu.edu.cn/api.php/users/' + req.body.id;
  (async () => {
    const name = await new Promise((finish, error) => {
      request(options, (err, res, body) => {
        if (err) { return reject(err); }
        finish(body.data.list.name);
      });
    })
    console.log(name);
    res.json({
      check: name === req.body.name
    });
    res.end();
  })();
})

app.listen(2333, () => {
  console.log("http://localhost:2333/");
});