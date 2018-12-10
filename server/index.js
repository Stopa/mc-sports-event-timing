const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const ws = require('ws');

const config = require('./config');
const Athlete = require('./models/athlete');
const Time = require('./models/time');

const app = express();

const server = http.createServer(app);

mongoose.connect(
  `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`,
  { useNewUrlParser: true }
);

const wss = new ws.Server({ server });

app.get('/athletes', (req, res) => {
  Athlete.find({}, (error, athletes) => {
    res.json(athletes);
  })
});

app.use(express.json());

app.get('/times', (req, res) => {

  const { from, to } = req.query;

  const fromTime = new Date(Number.parseInt(from, 10));
  const toTime = new Date(Number.parseInt(to, 10));

  Time.find({
    clockTime: {
      $gte: fromTime,
      $lte: toTime,
    }
  }, (error, times) => {
    res.json(times);
  })
});

app.post('/times', (req, res) => {
  const { code, timingPoint, clockTime } = req.body;

  Athlete.findOne({ code }, (error, athlete) => {
    if (!athlete) {
      res.status(404).json({
        status: 'error',
        message: 'Athlete with given code not found',
      });
    } else {
      const newTime = new Time({code, timingPoint, clockTime: new Date(clockTime*1000)});

      newTime.save((dbError) => {
        if (dbError) {
          res.status(500).json({
            status: 'error',
            message: dbError.message,
          });
        } else {
          wss.clients.forEach((client) => {
            client.send(JSON.stringify({
              name: athlete.name,
              startNumber: athlete.startNumber,
              code,
              timingPoint,
              clockTime,
            }));
          });

          res.status(201).json({
            status: 'ok',
          });
        }
      });
    }
  });
});

server.listen(config.port, () => {
  console.log(`Server listening at port ${config.port}`);
});
