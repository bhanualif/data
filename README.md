💻 Device App — 3 Tabel (Device, QC, Pairing)
📘 Deskripsi

Aplikasi sederhana untuk menampilkan dan mengelola tiga tabel utama:

Device — daftar perangkat Soundbox

QC (Quality Check) — status kelulusan QC tiap perangkat

Pairing — hasil pairing perangkat dengan merchant

Aplikasi ini bisa dijalankan dalam dua mode:

Frontend Only (localStorage) — tanpa server, semua data disimpan di browser.

Full Stack (Frontend + Backend API) — menggunakan server Express.js sebagai penyedia data.

🧩 Fitur Utama
Fitur	Deskripsi
📦 Device Table	Menampilkan daftar perangkat soundbox
🧾 QC Table	Menampilkan status QC (OK / Pending)
🔗 Pairing Table	Menampilkan hasil pairing dengan merchant
🧠 Data Persisten	Disimpan di localStorage (frontend-only) atau via API backend
🚀 Tombol Aksi	Tambah data contoh dan hapus semua data
⚙️ Mode 1 — Frontend Only (localStorage)
📂 File yang Dibutuhkan

index.html
(mengandung seluruh HTML, CSS, dan JavaScript murni)

💾 Struktur Data di localStorage
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

🧠 Fungsi JavaScript
Fungsi	Keterangan
getData()	Mengambil data dari localStorage
saveData(data)	Menyimpan data ke localStorage
renderTables()	Menampilkan semua tabel
renderDeviceTable(devices)	Render tabel Device
renderQCTable(qcList)	Render tabel QC
renderPairingTable(pairings)	Render tabel Pairing
seedData()	Tambahkan data contoh
clearData()	Hapus semua data
🚀 Cara Menjalankan

Unduh index.html

Buka di browser (Chrome, Edge, atau Firefox)

Klik “Tambah Data Contoh” untuk mengisi data awal

Klik “Hapus Semua Data” untuk menghapus semua data

⚙️ Mode 2 — Full Stack (Frontend + Backend API)
📂 Struktur Folder
pairing-app/
│
├── backend/
│   ├── server.js
│   └── package.json
│
└── frontend/
    └── index.html

⚡ Instalasi Backend
# 1. Buat folder baru
mkdir pairing-app && cd pairing-app

# 2. Buat subfolder backend & frontend
mkdir backend frontend
cd backend

# 3. Inisialisasi project Node.js
npm init -y

# 4. Install dependensi
npm install express cors

💡 File: server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let data = {
  devices: [
    { deviceId: "SBX-0001", deviceName: "sound box premium" },
    { deviceId: "SBX-0002", deviceName: "sound box pocket" },
  ],
  qc: [
    { deviceId: "SBX-0001", status: "QC OK" },
    { deviceId: "SBX-0002", status: "QC Pending" },
  ],
  pairing: [
    { deviceId: "SBX-0001", merchantId: "M-1001" },
  ]
};

// === ROUTES ===
app.get("/api/devices", (req, res) => res.json(data.devices));
app.get("/api/qc", (req, res) => res.json(data.qc));
app.get("/api/pairing", (req, res) => res.json(data.pairing));

app.post("/api/seed", (req, res) => {
  data = {
    devices: [
      { deviceId: "SBX-0001", deviceName: "sound box premium" },
      { deviceId: "SBX-0002", deviceName: "sound box pocket" },
    ],
    qc: [
      { deviceId: "SBX-0001", status: "QC OK" },
      { deviceId: "SBX-0002", status: "QC Pending" },
    ],
    pairing: [
      { deviceId: "SBX-0001", merchantId: "M-1001" },
    ]
  };
  res.json({ message: "✅ Data contoh berhasil ditambahkan" });
});

app.delete("/api/clear", (req, res) => {
  data = { devices: [], qc: [], pairing: [] };
  res.json({ message: "🧹 Semua data berhasil dihapus" });
});

app.listen(3000, () => console.log("✅ Server berjalan di http://localhost:3000"));

⚙️ package.json (tambahkan)
"scripts": {
  "start": "node server.js"
},
"type": "module"

🚀 Jalankan Server
npm start


Output: ✅ Server berjalan di http://localhost:3000

💡 Frontend (index.html)

File index.html tetap sama — hanya berbeda di sumber datanya.
Script-nya mengambil data dari endpoint backend, misalnya:

const API_BASE = "http://localhost:3000/api";

🧭 Ringkasan Perbandingan
Aspek	Frontend Only	Full Stack (API)
Penyimpanan Data	localStorage	di memori server (Express)
Ketergantungan	Browser saja	Node.js (Express + CORS)
Akses Data	Langsung dari JS	via HTTP API (GET, POST, DELETE)
Cocok untuk	Demo offline	Integrasi nyata (client-server)
