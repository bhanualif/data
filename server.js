import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

let users = [
  { username: "admin", password: "123" }
];

let data = {
  devices: [],
  qc: [],
  pairing: []
};

app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: "Username sudah digunakan!" });
  }
  users.push({ username, password });
  res.json({ message: "Registrasi berhasil!" });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Akun salah!" });
  const token = Buffer.from(username).toString("base64");
  res.json({ message: "Login berhasil!", token });
});

app.get("/api/devices", (req, res) => res.json(data.devices));
app.post("/api/devices", (req, res) => {
  data.devices.push(req.body);
  res.json({ message: "Device ditambahkan!" });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.listen(3000, () => console.log("✅ Server running http://localhost:3000"));
