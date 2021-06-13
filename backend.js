const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all("*",function(req,res,next){
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method.toLowerCase() == 'options')
    res.send(200).end();  //让options尝试请求快速结束
  else
    next();
});

const request = require('request');
let options = {
  url: 'http://seat.lib.sdu.edu.cn/api.php/users/201805130163',
  json: true,
  headers: {
      'Referer': 'http://seat.lib.sdu.edu.cn/home/web/space/id/19/day/2021-06-14/floor/0'
  }
};

app.post('/', (req, res) => {
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