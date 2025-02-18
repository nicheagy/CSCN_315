// proj3.js

// Array to manage data
let data = [
    { team: "Ohio State", pointsPerGame: 35.7, totalPoints: 571, totalYards: 6870 },
    { team: "Opponents", pointsPerGame: 12.9, totalPoints: 206, totalYards: 4074 }
  ];
  
  // Function to process data and display relevant messages
  function processData(arr) {
    // Calculating the average using a for loop
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i].pointsPerGame;
    }
    let average = sum / arr.length;
  
    // Determining and displaying messages based on conditions
    if (average > 30) {
      console.log("The average points per game is quite high: " + average);
    } else if (average > 20) {
      console.log("The average points per game is moderate: " + average);
    } else {
      console.log("The average points per game is quite low: " + average);
    }
  
    // Using a switch statement to display a message based on the first element
    switch (arr[0].team) {
      case "Ohio State":
        console.log("First team is Ohio State");
        break;
      case "Opponents":
        console.log("First team is Opponents");
        break;
      default:
        console.log("First team is neither Ohio State nor Opponents");
    }
  }
  
  // Calling the function to process the data
  processData(data);
  