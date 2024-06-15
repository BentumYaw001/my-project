/* eslint-disable no-undef */
import express from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(process.cwd(), 'data.json');

app.use(cors());
app.use(bodyParser.json());

// Endpoint to get all documents
app.get('/documents', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data file');
    }
    res.send(JSON.parse(data));
  });
});

// Endpoint to add a new document
app.post('/documents', (req, res) => {
  const newDocument = req.body;

  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data file');
    }

    const documents = JSON.parse(data);
    documents.push(newDocument);

    fs.writeFile(DATA_FILE, JSON.stringify(documents, null, 4), (err) => {
      if (err) {
        return res.status(500).send('Error writing data file');
      }
      res.send('Document added successfully');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
