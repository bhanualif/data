import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve file statis dari folder frontend
app.use(express.static(path.join(__dirname, "./")));

// =====================
//  In-Memory Database
// =====================
let data = {
  devices: [
    { deviceId: "SBX-0001", deviceName: "Sound Box Premium" },
    { deviceId: "SBX-0002", deviceName: "Sound Box Pocket" },
  ],
  qc: [
    { deviceId: "SBX-0001", status: "QC OK" },
    { deviceId: "SBX-0002", status: "QC Pending" },
  ],
  pairing: [
    { deviceId: "SBX-0001", merchantId: "M-1001" },
  ]
};

// =====================
//  ROUTES
// =====================
app.get("/api/devices", (req, res) => res.status(200).json(data.devices));
app.get("/api/qc", (req, res) => res.status(200).json(data.qc));
app.get("/api/pairing", (req, res) => res.status(200).json(data.pairing));

// CREATE ENDPOINTS
app.post("/api/devices", (req, res) => {
  const { deviceId, deviceName } = req.body;
  if (!deviceId || !deviceName)
    return res.status(400).json({ error: "deviceId dan deviceName wajib diisi" });

  data.devices.push({ deviceId, deviceName });
  res.status(201).json({ message: "✅ Device baru berhasil ditambahkan", devices: data.devices });
});

app.post("/api/qc", (req, res) => {
  const { deviceId, status } = req.body;
  if (!deviceId || !status)
    return res.status(400).json({ error: "deviceId dan status wajib diisi" });

  data.qc.push({ deviceId, status });
  res.status(201).json({ message: "✅ QC berhasil ditambahkan", qc: data.qc });
});

app.post("/api/pairing", (req, res) => {
  const { deviceId, merchantId } = req.body;
  if (!deviceId || !merchantId)
    return res.status(400).json({ error: "deviceId dan merchantId wajib diisi" });

  data.pairing.push({ deviceId, merchantId });
  res.status(201).json({ message: "✅ Pairing berhasil ditambahkan", pairing: data.pairing });
});

// RESET / CLEAR DATA
app.post("/api/seed", (req, res) => {
  data = {
    devices: [
      { deviceId: "SBX-0001", deviceName: "Sound Box Premium" },
      { deviceId: "SBX-0002", deviceName: "Sound Box Pocket" },
    ],
    qc: [
      { deviceId: "SBX-0001", status: "QC OK" },
      { deviceId: "SBX-0002", status: "QC Pending" },
    ],
    pairing: [
      { deviceId: "SBX-0001", merchantId: "M-1001" },
    ]
  };
  res.status(201).json({ message: "✅ Data contoh berhasil ditambahkan" });
});

app.delete("/api/clear", (req, res) => {
  data = { devices: [], qc: [], pairing: [] };
  res.status(200).json({ message: "🧹 Semua data berhasil dihapus" });
});

app.delete("/api/devices/:id", (req, res) => {
  const { id } = req.params;
  data.devices = data.devices.filter(d => d.deviceId !== id);
  res.json({ message: `🗑️ Device ${id} dihapus`, devices: data.devices });
});

app.delete("/api/qc/:id", (req, res) => {
  const { id } = req.params;
  data.qc = data.qc.filter(q => q.deviceId !== id);
  res.json({ message: `🗑️ QC ${id} dihapus`, qc: data.qc });
});

app.delete("/api/pairing/:id", (req, res) => {
  const { id } = req.params;
  data.pairing = data.pairing.filter(p => p.deviceId !== id);
  res.json({ message: `🗑️ Pairing ${id} dihapus`, pairing: data.pairing });
});

// =====================
//  ROOT ROUTE
// =====================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

// =====================
//  START SERVER
// =====================
app.listen(3000, () => {
  console.log("✅ API server running on http://localhost:3000");
});
