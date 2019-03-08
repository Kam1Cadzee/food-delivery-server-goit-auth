const login = "Kam1Cadze";
const password = "1596VADIMszx9B";

const config = {
  secret: 'secret-key',
  database: `mongodb+srv://${login}:${password}@cluster0-h5z9a.gcp.mongodb.net/mydb?retryWrites=true`
};

module.exports = config;