const express = require('express');
const path = require('path');

const app = express();



//---------------------------------------------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  const allowedOrigins = ['http://127.0.0.1:3000', 'http://192.168.1.10:3000', 'http://localhost:3000', 
                          'http://127.0.0.1:5500', 'http://192.168.1.10:5500', 'http://localhost:5500', 
                          'http://127.0.0.1',      'http://192.168.1.10'     , 'http://localhost'
                         ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.setHeader('Access-Control-Allow-Origin', '*'); //diakses melalui `http://localhost:${port}/`

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


let options_static = {
  dotfiles: "allow", //allow, deny, ignore
  etag: true,
  extensions: ["htm", "html", "ejs", "js", "css"],
  index: false, //to disable directory indexing
  maxAge: "7d",
  redirect: false,
  setHeaders: function (res, path, stat) {
    //add this header to all static responses
    res.set('x-timestamp', Date.now());
  }
};

//app.use(`/static/`, express.static(__dirname+'/', options_static));  // didalam file src ditambah static

app.use(`/static/`, express.static(path.join(__dirname, '/'), options_static));

//---------------------------------------------------------------------------------------



console.log(__dirname);


// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});



//default port dari env atau jika tidak ada di set
const port = process.env.PORT || 8080;

//app.listen(port,"127.0.0.1"); //kalau mau di local
app.listen(port, () => {
  console.log(`------------------------------------------------------`);
  console.log(`Server is running on port ${port}.`);
  console.log(`lokasi file server.js atau directory root =  ${__dirname}`);
  console.log(`------------------------------------------------------`);
  console.log(`ini untuk nanti di heroku frontend`);
  console.log(`------------------------------------------------------`);
  console.log(`http://localhost:${port}/`);
  console.log(`http://192.168.1.10:${port}/`);
  console.log(`http://127.0.0.1:${port}/`);
  console.log(`------------------------------------------------------`);
});




console.log('Server started at http://localhost:' + port);


console.log('server running on http://127.0.0.1:' + port);

