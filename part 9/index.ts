import express from 'express';
import { calculateBmi } from './bmiCalculator'
const app = express();

app.get('/hello', (_req, res) => {
   res.send('Hello Full Stack!')
})
app.get('/bmi', (req, res) => {
    if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {       
        res.send(calculateBmi(Number(req.query.height), Number(req.query.weight)))
    } else {
        res.send({error: 'malformatted parameters'})
    }
   
})
const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})