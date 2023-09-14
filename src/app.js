import express from 'express';
const app = express();


app.use(express.json());

app.use((req, res, next) => {
    res.status(404).json({error: "not found"})
})

app.listen(4000, () => console.log('Server started on port 4000'));