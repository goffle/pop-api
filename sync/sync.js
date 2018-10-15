const Mongo = require("../src/mongo");

let count = 0;
let currents = 0;
let offset = 0;
let collection = "";
function SyncES(object, c, from, cb) {
  count = 0;
  collection = c;
  offset = from;
  return new Promise(async (resolve, reject) => {
    await object
      .find()
      .cursor()
      .eachAsync(async model => {
        await index(model, cb);
      });
  });
}

function index(model, cb) {
  return new Promise((resolve, reject) => {
    if (offset > count) {
      if (count % 100 === 0) {
        console.log("pass", collection, count, currents);
        cb(`Pass ${collection} ${count} ${currents}`);
      }
      count++;
      resolve();
      return;
    }

    currents++;
    if (currents < 100) {
      resolve();
    }
    model.index((err, res) => {
      if (err) {
        console.log("ERROR ", err);
        cb(`ERROR ${err} `);
      }
      currents--;
      count++;
      resolve();
      if (count % 100 === 0) {
        cb(`Done ${collection} ${count} ${currents}`);
        console.log("done", collection, count, currents);
      }
    });
  });
}

module.exports = SyncES;
