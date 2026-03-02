import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.send('Welcome to My API'));

app.get('/users', (req, res) => 
    res.json([
        { id: 1, name: 'John' },
        { id: 2, name: 'Sara' }
    ])
);

app.get('/status', (req, res) => res.send('API is Running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
