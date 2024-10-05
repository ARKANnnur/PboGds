const mongoose = require('mongoose');
mongoose.set('strictQuery', false)


mongoose.connect('mongodb://127.0.0.1:27017/Gds')
  .then(() => console.log('Connected!'));



  // const User = mongoose.model('User', {
  //   Username: {
  //     type: String,
  //     required: true,
  //   },
  //   Password: {
  //     type: String,
  //     required: true,
  //   },
  // });

  // const p = new User({
  //   Username: "123",
  //   Password: "123"
  // });

  // p.save().then((p) => console.log(p))

// const { MongoClient, ObjectId } = require('mongodb');

// const uri = 'mongodb://127.0.0.1:27017'
// const dbName = 'Gds';

// const client = new MongoClient(uri);

// client.connect((error, client) => {
//     if (error) {
//         return console.log('Koneksi gagal');
//     }
//     // Pilig database
//     const db = client.db(dbName);


//     // Menampilkan data berdasarkan kriteria
//     console.log(
//         db.collection('User')
//             .find({ Username: "ada" })
//             .toArray((error, result) => {
//                 console.log(result);
//             })
//     );

// });