const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const pg = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://bwkuqgbvurejdl:881971ef337972da1e7efad42368eecb21efba6ebbc0ae9dd91995c2ee4bdebd@ec2-54-247-81-97.eu-west-1.compute.amazonaws.com:5432/d3shffknvv234'

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    pg.connect(DATABASE_URL, function(err, client, done) {
      console.log(err);
      client.query('SELECT * FROM users ORDER BY RANDOM()', function(err, result) {
        done();
        if (err)
         { console.error(err); response.send("Error " + err); }
        else
         { res.render('index', {results: result.rows})}
      });
    });

  })
  .post('/db', function (request, response) {
    console.log(request.params);
    console.log(request.body);
    console.log(request.query);
    const name = request.body.name
    const photo = request.body.photo
    const id = request.body.id
    console.log(name, photo, id);
    pg.connect(DATABASE_URL, function(err, client, done) {
      console.log(err);
      client.query(`INSERT INTO users VALUES ('${id}', '${name}', '${photo}')`, function(err, result) {
        done();
        if (err)
         { console.error(err); response.send("Error " + err); }
        else
         { response.send({results: result}) }
      });
    });
  })
  .get('/db', function (request, response) {
    pg.connect(DATABASE_URL, function(err, client, done) {
      console.log(err);
      client.query('SELECT * FROM users', function(err, result) {
        done();
        if (err)
         { console.error(err); response.send("Error " + err); }
        else
         { response.send({results: result.rows}) }
      });
    });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
