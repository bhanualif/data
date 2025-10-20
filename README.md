# Device App — 3 Tabel (Device, QC, Pairing)

## 📋 Deskripsi
Aplikasi sederhana berbasis HTML + JavaScript murni untuk menampilkan tiga tabel:
- **Device**: daftar perangkat soundbox
- **QC**: status quality check setiap perangkat
- **Pairing**: hasil pairing perangkat dengan merchant

Semua data disimpan secara **persisten di localStorage** (key: `device-app`).

---

## 🚀 Cara Menjalankan
1. Unduh file `index.html`
2. Buka di browser (Chrome/Edge/Firefox)
3. Klik **“Tambah Data Contoh”** untuk melihat data muncul di ketiga tabel.
4. Klik **“Hapus Semua Data”** untuk mengosongkan data.

---

## 💾 Struktur Data di localStorage
```json
{
  "devices": [
    { "deviceId": "SBX-0001", "deviceName": "sound box premium" }
  ],
  "qc": [
    { "deviceId": "SBX-0001", "status": "QC OK" }
  ],
  "pairing": [
    { "deviceId": "SBX-0001", "merchantId": "M-1001" }
  ]
}

| Fungsi                         | Keterangan                       |
| ------------------------------ | -------------------------------- |
| `getData()`                    | Mengambil data dari localStorage |
| `saveData(data)`               | Menyimpan data ke localStorage   |
| `renderTables()`               | Menampilkan seluruh tabel        |
| `renderDeviceTable(devices)`   | Menampilkan tabel Device         |
| `renderQCTable(qcList)`        | Menampilkan tabel QC             |
| `renderPairingTable(pairings)` | Menampilkan tabel Pairing        |
