interface BmiValues {
    height:number;
    weight:number;
}


const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
        height: Number(args[2]),
        weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}




export const calculateBmi = (height: number, weight: number ) : string => {
    
    const BMI = weight / Math.pow((height / 100), 2)
    if (BMI < 15) {
        return 'Very severely underweight'
    }
    else if (BMI >= 15 && BMI < 16){
        return 'Severely underweight'
    }
    else if (BMI >= 16 && BMI < 18.5){
        return 'Underweight'
    }
    else if (BMI >= 18.5 && BMI < 25){
        return 'Normal (healthy weight)'
    }
    else if (BMI >= 25 && BMI < 30){
        return 'Overweight'
    }
    else if (BMI >= 30 && BMI < 35){
        return 'Obese Class I (Moderately obese)'
    }
    else if (BMI >= 35 && BMI < 40){
        return 'Obese Class II (Severely obese)'
    }
    else if (BMI >= 40){
        return 'Obese Class III (Very severely obese)'
    }
    return 'Incorrect Input'
}

try { 
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight))
}
catch (err) {
    console.log('Error, something bad happened, message: ', err.message);
}