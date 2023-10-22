const {server, mongoose} = require('./server')

mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "junction"
}).then(() => {
  console.log("connected to the database");
  server.listen(5000, () => console.log('listening on port 5000'));
}).catch(err => console.log(err));