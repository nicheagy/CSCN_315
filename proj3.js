// Array to manage data
let games = [
    { opponent: "Akron", finalScore: "6-52", winner: "Ohio State" },
    { opponent: "Western Michigan", finalScore: "0-56", winner: "Ohio State" },
    { opponent: "Marshall", finalScore: "14-49", winner: "Ohio State" },
    { opponent: "Michigan State", finalScore: "7-38", winner: "Ohio State" },
    { opponent: "Iowa", finalScore: "7-35", winner: "Ohio State" },
    { opponent: "Oregon", finalScore: "32-31", winner: "Oregon" },
    { opponent: "Nebraska", finalScore: "17-21", winner: "Ohio State" },
    { opponent: "Penn State", finalScore: "13-20", winner: "Ohio State" },
    { opponent: "Purdue", finalScore: "0-45", winner: "Ohio State" },
    { opponent: "Northwestern", finalScore: "7-31", winner: "Ohio State" },
    { opponent: "Indiana", finalScore: "15-38", winner: "Ohio State" },
    { opponent: "Michigan", finalScore: "13-10", winner: "Michigan" },
    { opponent: "Tennessee", finalScore: "17-42", winner: "Ohio State" },
    { opponent: "Oregon", finalScore: "21-41", winner: "Ohio State" },
    { opponent: "Texas", finalScore: "14-28", winner: "Ohio State" },
    { opponent: "Notre Dame", finalScore: "23-34", winner: "Ohio State" }
  ];

// Function to process data and display relevant messages
function processData(arr) {
    // Creating a div element to display messages
    const outputDiv = document.createElement('div');
    outputDiv.style.textAlign = 'center';
    outputDiv.style.marginTop = '20px';
  
    // Adding the key
    let content = '';
    content += '<p><span style="color: green;">Green = Win</span> | <span style="color: red;">Red = Loss</span></p>';

    // Generating the rundown of games
    content += '<ul style="list-style-type: none;">';
    for (let i = 0; i < arr.length; i++) {
      let color;
      // If statement to determine the color
      if (arr[i].winner === "Ohio State") {
        color = 'green';
      } else {
        color = 'red';
      }
  
      
  
      // Adding the game information
      content += `<li style="color: ${color};"><strong>${arr[i].opponent}</strong>: ${arr[i].finalScore}`;
  
      // Switch statement to display a message based on total points scored
      let totalPoints = parseInt(arr[i].finalScore.split('-')[0]) + parseInt(arr[i].finalScore.split('-')[1]);
      switch (true) {
        case (totalPoints > 50):
          content += ` (High Scoring Game)</li>`;
          break;
        case (totalPoints >= 40 && totalPoints <= 50):
          content += ` (Moderate Scoring Game)</li>`;
          break;
        default:
          content += ` (Low Scoring Game)</li>`;
          break;
      }
  
      content += `<br>`; // Adding a line break between games
    }
    content += '</ul>';
  
    // Setting the content to the outputDiv and appending it to the body
    outputDiv.innerHTML = content;
    document.body.appendChild(outputDiv);
  }
  
  // Calling the function to process the data after the DOM content is loaded
  document.addEventListener('DOMContentLoaded', () => {
    processData(games);
  });