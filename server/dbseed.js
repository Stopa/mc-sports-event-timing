const mongo = require('mongodb').MongoClient;
const uuid = require('uuid/v4');

const config = require('./config');

mongo.connect(
  `mongodb://${config.mongodb.host}:${config.mongodb.port}`,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) throw error;

    const names = [
      'Usain Bolt',
      'Carl Lewis',
      'Jesse Owens',
      'Molly Huddle',
      'English Gardner',
      'Tori Bowie',
      'Shalane Flanagan',
      'Emma Coburn',
      'Tony Nõu',
      'Erki Nool'
    ];

    const athletes = names.map((name, index) => ({
      code: uuid(),
      startNumber: index,
      name,
    }));

    const db = client.db(config.mongodb.database);

    db.collection('athletes').insertMany(athletes);

    client.close();
  }
);
