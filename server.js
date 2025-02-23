const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Conectar a MongoDB
mongoose.connect('mongodb+srv://alederibia:FdwdqZYSqvnlXWow@clusterasere.ixatg.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAsere', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir un esquema y modelo para los clics
const clickSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
});

const Click = mongoose.model('Click', clickSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para registrar un clic
app.post('/api/clicks', async (req, res) => {
  const newClick = new Click();
  await newClick.save();
  res.status(201).json({ message: 'Clic registrado', click: newClick });
});

// Ruta para obtener todos los clics
app.get('/api/clicks', async (req, res) => {
  const clicks = await Click.find().sort({ timestamp: -1 });
  res.json(clicks);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

app.use(express.static('public'));