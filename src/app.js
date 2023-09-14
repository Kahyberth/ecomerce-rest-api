import express from 'express';
import user from './routes/create-user.routes.js';
const app = express();


app.use(express.json());

app.use('/api', user);

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(4000, () => console.log('Server started on port 4000'));