const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`What's your name?\n`, name => {
  console.log(`Hi ${name}!`);
  readline.question(`How old will you be by the end of the year?\n`, age => {
    const num = Number.parseInt(age);
    if (Number.isNaN(num)) {
      console.log('That is not a real age.. :(');
    } else {
      console.log(`So you were born in ${2019 - num}.`);
    }
    readline.close();
  });
});
