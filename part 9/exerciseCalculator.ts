
interface Results {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}
interface exerciseValues {
    values: Array<number>,
    target: number
}

const parseArgumentsExercise = (args: Array<string>) :  exerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    let exerciseValues = []
    for (let i = 3; i < args.length; i ++) {
        if (!isNaN(Number(args[i]))) {
            exerciseValues.push(Number(args[i]))
        } else {
            throw new Error('Provided values were not all numbers!');
        }
    }
    return { values: exerciseValues, target: Number(args[2])}
    
}
const calculateExercises = (args: Array<number>, target: number): Results => {
    // calculate average, amount of days & amount of days actually exercising
    let trainingDays = 0;
    let numberOfDays = args.length;
    let hoursTrained = 0;

    args.forEach(day => {
        if (day > 0 ){
            trainingDays += 1;
            hoursTrained += day;
        }
    })
    const average = hoursTrained / numberOfDays

    const ratingRounded = Math.round(average)
    let rating;
    let ratingDescription;
    if (ratingRounded === target && average < target) {
        ratingDescription= 'not too bad but could be better'
        rating = 2;
    }
    else if (ratingRounded >= target && average > target) {
        ratingDescription= 'good work you hit the target and more'
        rating = 3;
    }
    else if (ratingRounded < target && average < target) {
        ratingDescription= 'need to improve, poor performance'
        rating = 1;
    } else if (average === target) {
        ratingDescription= 'good work you hit the target exactly'
        rating = 2.5;
    }

    return { periodLength: numberOfDays,trainingDays: trainingDays,
        success: average > target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average }
}

try {
    const { values, target } = parseArgumentsExercise(process.argv);
    console.log(calculateExercises(values, target))
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}

// console.log(calculateExercises( [3, 0, 2, 4.5, 0, 3, 1] , 2) )