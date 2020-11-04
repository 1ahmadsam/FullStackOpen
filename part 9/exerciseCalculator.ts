
interface Results {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
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

console.log(calculateExercises( [3, 0, 2, 4.5, 0, 3, 1] , 2) )