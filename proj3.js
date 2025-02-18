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
    
    // Generating the rundown of games
    let content = '<h2>Ohio State Buckeyes 2024 Season Rundown</h2>';
    content += '<ul style="list-style-type: none;">';
    for (let i = 0; i < arr.length; i++) {
      let color = arr[i].winner === "Ohio State" ? 'green' : 'red';
      content += `<li style="color: ${color};"><strong>${arr[i].opponent}</strong>: ${arr[i].finalScore}</li>`;
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