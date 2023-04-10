const router = require('express').Router();
const karyawanController = require('../controllers').karyawan;
//const verifyUser = require('../configs/verify');

router.get('/karyawan', karyawanController.karyawan);
// GET localhost:8080/karyawan => Ambil data semua karyawan
router.get('/karyawan/data', karyawanController.getDataKaryawan);

// GET localhost:8080/karyawan/2 => Ambil data semua karyawan berdasarkan id = 2
router.get('/karyawan/:id', karyawanController.getDataKaryawanByID);

// POST localhost:8080/karyawan/add => Tambah data karyawan ke database
router.post('/karyawan/add', karyawanController.addDataKaryawan);

// POST localhost:8080/karyawan/2 => Edit data karyawan
router.post('/karyawan/edit', karyawanController.editDataKaryawan);

// POST localhost:8080/karyawan/delete => Delete data karyawan
router.post('/karyawan/delete/', karyawanController.deleteDataKaryawan);

module.exports = router;