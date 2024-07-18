const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // Ajoutez ceci pour activer CORS
app.use(express.static(path.join(__dirname, '../public')));

// Load initial items from recette.json
let items = [];
const dataFilePath = path.join(__dirname, 'recettes.json');
if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath);
    items = JSON.parse(data);
}

app.get('/api/recettes', (req, res) => {
    res.json({ recettes: items });
});

app.post('/api/recettes', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newItem);

    // Save items to recette.json
    fs.writeFileSync(dataFilePath, JSON.stringify(items, null, 2));

    res.status(201).json(newItem);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
