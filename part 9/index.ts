import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator'
const app = express();
 app.use(express.json())
app.get('/hello', (_req, res) => {
   res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
    if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {       
        res.send(calculateBmi(Number(req.query.height), Number(req.query.weight)));
    } else {
        res.send({error: 'malformatted parameters'});
    }
   
});

app.post('/exercises', (req, res) => {
    const body = req.body
    if (Array.isArray(body?.daily_exercises) && !isNaN(Number(body?.target))){
        res.send(calculateExercises(body?.daily_exercises, Number(body.target)))
    } else {
        res.status(400).send({error: 'malformatted parameters'});
    }
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});