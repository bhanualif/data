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

app.listen(3000, () => console.log("✅ API server running on http://localhost:3000"));

