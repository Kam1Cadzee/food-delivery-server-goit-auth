const app = require("./app");
const includeRouters = require("./routes/router");
const bodyParser = require("body-parser");
const connectToDB = require("./db/connect-db");
const config = require("./config");
const Ingredient = require("./db/model/ingredient");
const Product = require("./db/model/product");

app.set("secret", config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
includeRouters();

const add = () => {
 const str = `[
  {
      "_id": "5c72f5288540ef1f94a20e9f",
      "i": ["5c805c1689a6fd062445f1d4", "5c805c1689a6fd062445f1d5", "5c805c1689a6fd062445f1d6"]
  },
  {
      "_id": "5c72f52b6178c24214b30c7e",
      "i": ["5c805c1689a6fd062445f1d7", "5c805c1689a6fd062445f1d5", "5c805c1689a6fd062445f1d8"]
  },
  {
      "_id": "5c72f52b6178c24214b30c80",
      "i": ["5c805c1689a6fd062445f1d6", "5c805c1689a6fd062445f1d7"]
  },
  {
      "_id": "5c72f52b6178c24214b30c81",
      "i": ["5c805c1689a6fd062445f1d4", "5c805c1689a6fd062445f1d5"]
  },
  {
      "_id": "5c72f54c9e879e3080f6c593",
      "i": ["5c805c1689a6fd062445f1d4"]
  },
  {
      "_id": "5c72f54c9e879e3080f6c594",
      "i": ["5c805c1689a6fd062445f1d4", "5c805c1689a6fd062445f1d7", "5c805c1689a6fd062445f1d6"]
  }
]`

const arr = JSON.parse(str);
arr.forEach(obj => {
  Product.findById(obj._id, (err, product) => {
    product.ingredients = obj.i;
    product.save();
  })
})

};
const startServer = port => {
  connectToDB(config.database)
    .then(() => {
      console.log("Database connection successful");
      //add();
      app.listen(port);
    })
    .catch(err => {
      console.error("Database connection error");
      throw err;
    });
};
module.exports = startServer;
