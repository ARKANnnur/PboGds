const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult, check, cookie } = require('express-validator');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const { MongoClient, ObjectId } = require('mongodb');
const methodOverride = require('method-override');

require('./utility/db');
const { User, Siswa } = require('./model/gds');
const { getViewPoin, exportExcel } = require('./controller/system');

const app = express();
const port = 3000;

// style css
// import 'style.css';

// Set up methodOveride
app.use(methodOverride('_method'));

// path join
// const path = require("path");
// app.set(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'dist')))

// Set up Ejs
app.use(expressLayouts);
app.set('layout', './layouts/main-layouts');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { secure: false },
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Test data
// User.findOne({ Username: '123' }, { Password: '123' }, function (err, docs) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(docs);
//     }
// });

// Halaman Login
app.get('/users', (req, res) => {
  res.render('login', {
    layouts: 'layouts/main-layouts',
    title: 'Login',
  });
});

// Proses Login
app.post(
  '/login',
  [
    body('Username', 'Password').custom(async (value) => {
      const cekUser = await User.findOne({ Username: value, Password: value });
      if (!cekUser) {
        throw new Error('Username/Password Salah');
      }
      return true;
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // res.redirect('/login')
      console.log(errors);
    } else {
      // kirimkan flash message
      // req.session.user = user;
      // req.flash('msg', 'Berhasil login');
      req.session.user = errors;
      res.redirect('/users/Siswas');
    }
  }
);

// app.post('/login', (req, res) => {
//     // mencari user berdasarkan username
//     User.findOne({ Username: req.body.Username }, (err, user) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).send();
//         }

//         // jika user tidak ditemukan, kembalikan pesan error
//         if (!user) {
//             return res.status(404).send('User tidak ditemukan');
//         }

//         // jika user ditemukan, cek password
//         if (user.Password !== req.body.Password) {
//             // kirimkan flash message
//             return res.status(404).send('Password salah');

//         }

//         // jika username dan password benar, simpan user ke sesi dan redirect ke halaman home
//         req.session.user = user;
//         res.redirect('/listSiswa');
//     });
// });

// Halaman List poin
app.get('/users/Points', async (req, res) => {
  // cek apakah ada user yang login
  // if (!req.session.user) {
  //     return res.redirect('/users')
  // }

  const poin = await Siswa.find();
  // const siswas = getPointSiswa(siswas);
  const siswas = await getViewPoin(poin);

  res.render('Points', {
    layouts: 'layouts/main-layouts',
    title: 'List Point',
    siswas,
    // user: req.session.user
  });
});

// Halaman List siswa
app.get('/users/Siswas', async (req, res) => {
  // cek apakah ada user yang login
  // if (!req.session.user) {
  //     return res.redirect('/users')
  // }

  const siswas = await Siswa.find();

  // if (siswas.poin > 0) {
  //     return console.log('ada');
  // }

  res.render('Siswas', {
    layouts: 'layouts/main-layouts',
    title: 'List Siswa',
    siswas,
    // user: req.session.user
  });
});

// Halaman tambah siswa
app.get('/users/Siswas/tambahSiswa', (req, res) => {
  // if (!req.session.user) {
  //     return res.redirect('/users')
  // }

  res.render('tambah', {
    layouts: 'layouts/main-layouts',
    title: 'Form Tambah Data Contact',
  });
});

// proses Tambah data Siswa
app.post(
  '/users/Siswas',
  [
    body('nisn, nis').custom(async (value) => {
      const duplikat = await Siswa.findOne({ nisn: value, nis: value });
      if (duplikat) {
        throw new Error('Nama nisn/nis Sudah Digunakan!');
      }
      return true;
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render('tambahSiswa', {
        title: 'Form Tambah Data Contact',
        layouts: 'layouts/main-layouts',
        errors: errors.array(),
      });
    } else {
      Siswa.insertMany(req.body, (error, result) => {
        // kirimkan flash message
        req.flash('msg', 'Data Contact Berhasil Di Tambahkan');
        res.redirect('/users/Siswas');
      });
    }
  }
);

// Delete point Siswa
app.post('/users/Points/:_id', async (req, res) => {
  // const siswas = await Siswa.find( {nama : req.params.nama } )
  // console.log(siswas);

  Siswa.updateOne(
    { _id: req.params._id },
    {
      pelanggaran: '',
      poin: 0,
    }
  ).then((result) => {
    // kirimkan flash message
    req.flash('msg', 'Data Contact Berhasil Di Ubah');
    res.redirect('/users/Points');
  });
});

// Hapus siswa
app.delete('/users/Siswas', (req, res) => {
  Siswa.deleteOne({ _id: req.body._id }).then((result) => {
    req.flash('msg', 'Data Siswa Berhasil Di Hapus');
    res.redirect('/users/Siswas');
  });
});

// Delete point
app.put('/users/Points', async (req, res) => {
  Siswa.updateMany(
    {},
    {
      pelanggaran: '',
      poin: 0,
    }
  ).then((result) => {
    // kirimkan flash message
    req.flash('msg', 'Data Contact Berhasil Di Ubah');
    res.redirect('/users/Points');
  });
});

// Halaman tambah Pelanggaran
app.get('/users/Siswas/tambahPelanggaran/:_id', async (req, res) => {
  // if (!req.session.user) {
  //     return res.redirect('/users')
  // }

  const siswas = await Siswa.findOne({ _id: req.params._id });

  res.render('tambahPelanggaran', {
    layouts: 'layouts/main-layouts',
    siswas,
    title: 'Form Tambah Data Contact',
  });
});

// proses Tambah Pelanggaran
app.put('/users/Siswas/tambahPelanggaran', async (req, res) => {
  Siswa.updateOne(
    { _id: req.body._id },
    {
      $set: {
        pelanggaran: req.body.pelanggaran,
        poin: req.body.poin,
      },
    }
  ).then((result) => {
    // kirimkan flash message
    req.flash('msg', 'Data Contact Berhasil Di Ubah');
    res.redirect('/users/Points');
  });
});

// halaman ubah siswa
app.get('/users/Siswas/edit/:_id', async (req, res) => {
  // if (!req.session.user) {
  //     return res.redirect('/users')
  // }

  const siswas = await Siswa.findOne({ _id: req.params._id });
  res.render('edit', {
    layouts: 'layouts/main-layouts',
    title: 'Form Edit Data Contact',
    siswas,
  });
});

// proses ubah siswa
app.put('/users/Siswas', async (req, res) => {
  Siswa.updateOne(
    { _id: req.body._id },
    {
      $set: {
        nisn: req.body.nisn,
        nis: req.body.nis,
        nama: req.body.nama,
        kelas: req.body.kelas,
        jurusan: req.body.jurusan,
        pelanggaran: req.body.pelanggaran,
        poin: req.body.poin,
      },
    }
  ).then((result) => {
    // kirimkan flash message
    req.flash('msg', 'Data Contact Berhasil Di Ubah');
    res.redirect('/users/Siswas');
  });
});

// Halaman detail siswa
app.get('/users/Siswas/:_id', async (req, res) => {
  // if (!req.session.user) {
  //     return res.redirect('/users')
  // }

  const siswas = await Siswa.findOne({ _id: req.params._id });

  res.render('detail', {
    layouts: 'layouts/main-layouts',
    title: 'Halaman detail Siswa',
    siswas,
  });
});

app.listen(port, () => {
  console.log(`Mongo client App | listening at https://localhost:${port}`);
});
