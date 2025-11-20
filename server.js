import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serving frontend folder
app.use(express.static(path.join(__dirname, "/")));

// Fake Database
let users = [
  { username: "admin", password: "123" }
];

let data = {
  devices: [],
  qc: [],
  pairing: []
};

// ===============================
// ✅ DASHBOARD API
// ===============================
app.get("/api/dashboard", (req, res) => {
  res.json({
    totalSoundbox: data.devices.length,
    totalPairing: data.pairing.length,
    totalQC: data.qc.length
  });
});

// ===============================
// ROUTE FRONTEND DASHBOARD
// ===============================
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "./dashboard.html"));
});

// ✅ Register
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: "Username sudah digunakan!" });
  }
  users.push({ username, password });
  res.json({ message: "Registrasi berhasil!" });
});

// ✅ Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Akun salah!" });
  const token = Buffer.from(username).toString("base64");
  res.json({ message: "Login berhasil!", token });
});

// ✅ Devices
app.get("/api/devices", (req, res) => res.json(data.devices));
app.post("/api/devices", (req, res) => {
  data.devices.push(req.body);
  res.json({ message: "Device ditambahkan!" });
});

// ✅ QC
app.get("/api/qc", (req, res) => res.json(data.qc));
app.post("/api/qc", (req, res) => {
  data.qc.push(req.body);
  res.json({ message: "QC ditambahkan!" });
});

// ✅ Pairing
app.get("/api/pairing", (req, res) => res.json(data.pairing));
app.post("/api/pairing", (req, res) => {
  data.pairing.push(req.body);
  res.json({ message: "Pairing ditambahkan!" });
});

// ✅ Delete item berdasarkan deviceId
app.delete("/api/:type/:id", (req, res) => {
  const { type, id } = req.params;
  if (!data[type]) return res.status(404).json({ message: "Tipe data tidak ditemukan!" });

  data[type] = data[type].filter(item => item.deviceId !== id);
  res.json({ message: `${type} dengan ID ${id} berhasil dihapus!` });
});

// ✅ Seed Data
app.post("/api/seed", (req, res) => {
  data.devices = [
    { deviceId: "D001", deviceName: "Device Alpha" },
    { deviceId: "D002", deviceName: "Device Beta" }
  ];
  data.qc = [
    { deviceId: "D001", status: "QC OK" }
  ];
  data.pairing = [
    { deviceId: "D001", merchantId: "M100" }
  ];
  res.json({ message: "Data contoh ditambahkan!" });
});

// ✅ Clear Data
app.delete("/api/clear", (req, res) => {
  data = { devices: [], qc: [], pairing: [] };
  res.json({ message: "Semua data dihapus!" });
});

// Default route → ke login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./login.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./login.html"));
});

app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "./login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./register.html"));
});

app.get("/register.html", (req, res) => {
  res.sendFile(path.join(__dirname, "./register.html"));
});

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "./dashboard.html"));
});

app.get("/dashboard.html", (req, res) => {
  res.sendFile(path.join(__dirname, "./dashboard.html"));
});

// =====================
//  EXPORT untuk Vercel
// =====================
export default app;

// =====================
//  START SERVER (hanya untuk local development)
// =====================
if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server running http://localhost:${PORT}`);
  });
}
