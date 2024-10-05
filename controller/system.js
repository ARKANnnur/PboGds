const getViewPoin = (Siswa) => {
  const getPointSiswa = Siswa.filter(({ poin }) => poin && Number(poin) > 0);
  return getPointSiswa;
};

// const pushPoint = Siswa => {
//     const pushPointSiswa = { Siswa.pelanggaran || Siswa.poin } => {
//         pushPoint.push()
//     }
// }

module.exports = { getViewPoin };
