const mongoose = require('mongoose')

// Membuat Schema
const User = mongoose.model('User', {
  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

const Siswa = mongoose.model('Siswa', {
  nis: {
    type: String,
    required: true,
  },
  nisn: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  kelas: {
    type: String,
    required: true,
  },
  jurusan: {
    type: String,
    required: true,
  },
  pelanggaran: {
    type: [ String ],
    required: false,
  },
  poin: {
    type: String,
    required: false,
  },
});

// const p = new Siswa({
//   nis: "05452425",
//   nisn: "54567564",
//   nama: "Lindas",
//   kelas: "XII-RPL-2",
//   jurusan: "RPL",
//   pelanggaran: "",
//   poin: "",
// });

// p.save().then((p) => console.log(p))


module.exports = { User, Siswa };