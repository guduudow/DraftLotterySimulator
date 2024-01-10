window.onload = season;

//names of all 32 NHL teams
var teams = [
  "Anaheim Ducks®",
  "Arizona Coyotes®",
  "Boston Bruins®",
  "Buffalo Sabres®",
  "Calgary Flames®",
  "Carolina Hurricanes®",
  "Chicago Blackhawks®",
  "Colorado Avalanche®",
  "Columbus Blue Jackets®",
  "Dallas Stars®",
  "Detroit Red Wings®",
  "Edmonton Oilers®",
  "Florida Panthers®",
  "Los Angeles Kings®",
  "Minnesota Wild®",
  "Montreal Canadiens®",
  "Nashville Predators®",
  "New Jersey Devils®",
  "New York Islanders®",
  "New York Rangers®",
  "Ottawa Senators®",
  "Philadelphia Flyers®",
  "Pittsburgh Penguins®",
  "San Jose Sharks®",
  "Seattle Kraken®",
  "St. Louis Blues®",
  "Tampa Bay Lightning®",
  "Toronto Maple Leafs®",
  "Vancouver Canucks®",
  "Vegas Golden Knights®",
  "Washington Capitals®",
  "Winnipeg Jets®",
];

let results = [];

function season() {
  for (let i = 0; i < teams.length; i++) {
    let result = {}; //all the teams get put into an object with wins, losses and points
    result.team = teams[i];
    result.wins = Math.floor(Math.random(0) * 83);
    result.losses = 82 - result.wins;
    result.points = result.wins * 2;
    results.push(result);
  }

  //cite: https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  //this helps me sort by points specifically from lowest to highest
  const naturalCollator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });

  results.sort((a, b) => naturalCollator.compare(a.points, b.points));

  //this adds the following headers to the table
  results.map((result) => {
    return addToTable({
      teamName: result?.team,
      wins: result?.wins,
      loses: result?.losses,
      points: result?.points,
    });
  });

  // LOTTERY ALGORITHIM BELOW \\
  let btn = document.getElementById("simulation");
  //function that will perform how the lottery work
  btn.onclick = function algorithim() {
    //hide the regular standings and only show lottery results
    standings.style.display = "none";
    function showResults() {
      lottery_standings.style.display = "block";
      simulating.style.display = "none";
      // display congratulations
      congrats.style.display = "block";
      var congratulations = document.getElementById("congrats");
      congratulations.innerHTML = `<h2>The ${worstTen[0].team} have won the first overall pick!</h2>`;
    }

    //adding a time delay of 3 seconds for simulating lottery
    let sim = document.getElementById("simulating");
    setTimeout(showResults, 3000);
    simulating.style.display = "block";
    sim.innerHTML = `<h2>Simulating Lottery...</h2>`;

    //take the worst ten teams and put them into a seperate array
    var worstTen = results.slice(0, 10);

    //using forEach add 4 lottery balls to each of the 10 teams and total sum of all balls
    worstTen.forEach((element) => {
      element.lotteryballs = [
        Math.floor(Math.random(0) * 101),
        Math.floor(Math.random(0) * 101),
        Math.floor(Math.random(0) * 101),
        Math.floor(Math.random(0) * 101),
      ];
      element.totalSum =
        element.lotteryballs[0] +
        element.lotteryballs[1] +
        element.lotteryballs[2] +
        element.lotteryballs[3];
      if (element.points > 50) {
        // if a team has greater than 50 points, odds of winning lottery will be less
        element.totalSum += 60;
      } else if (element.points < 50) {
        // if a team has less than 50 points, odds of winning lottery are greater
        element.totalSum -= 60;
      }
    });
    console.log(worstTen);
    //code below is cited again: see line 51 for source.
    const naturalCollator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: "base",
    });
    // sorts from lowest to highest number
    worstTen.sort((b, a) => naturalCollator.compare(b.totalSum, a.totalSum));

    //hide simulate lottery button
    simulation.style.display = "none";
    //show go back button
    goback.style.display = "block";
    goback.onclick = function gohome() {
      window.location.reload();
    };
    //prints all 10 teams in new lottery order on to screen
    function lotteryTable({ teamName, wins, losses, points }) {
      // get element by id of table
      var table = document.getElementById("lottery_standings");

      // create an empty row
      var tr = document.createElement("tr");

      // create four empty columns
      var td1 = document.createElement("td");
      var td2 = document.createElement("td");
      var td3 = document.createElement("td");
      var td4 = document.createElement("td");

      var column1 = document.createTextNode(teamName);
      var column2 = document.createTextNode(wins);
      var column3 = document.createTextNode(losses);
      var column4 = document.createTextNode(points);

      // append the column with the values
      td1.appendChild(column1);
      td2.appendChild(column2);
      td3.appendChild(column3);
      td4.appendChild(column4);

      // append the td to tr
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);

      // append the row to the table
      table.appendChild(tr);
    }

    worstTen.map((worstTen) => {
      return lotteryTable({
        teamName: worstTen?.team,
        wins: worstTen?.wins,
        losses: worstTen?.losses,
        points: worstTen?.points,
      });
    });
  };
}
//showing the original standings from worst to best, all 32 teams
function addToTable({ teamName, wins, loses, points }) {
  // get element by id of table
  var table = document.getElementById("standings");

  // create an empty row
  var tr = document.createElement("tr");

  // create four empty columns
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");

  var column1 = document.createTextNode(teamName);
  var column2 = document.createTextNode(wins);
  var column3 = document.createTextNode(loses);
  var column4 = document.createTextNode(points);

  // append the column with the values
  td1.appendChild(column1);
  td2.appendChild(column2);
  td3.appendChild(column3);
  td4.appendChild(column4);

  // append the td to tr
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);

  // append the row to the table
  table.appendChild(tr);
}
