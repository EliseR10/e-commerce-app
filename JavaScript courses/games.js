const team = {
    _players: [
      {firstName: 'Jackson', lastName: 'Peter', age: 30},
      {firstName: 'Mark', lastName: 'Marinov', age: 35},
      {firstName: 'John', lastName: 'Dupont', age: 37}],
  
    _games: [
      {opponent: 'Jets', teamPoints: 42, opponentPoints: 32},
      {opponent: 'Giants', teamPoints: 52, opponentPoints:35},
      {opponent: 'Small', teamPoints: 55, opponentPoints:45},
      ],
  
    get players() {
      return this._players;
    },
  
    get games() {
      return this._games;
    },
  
     addPlayer(newFirstName, newLastName, newAge){
      let player = { 
        firstName: newFirstName,
        lastName: newLastName,
        age: newAge,
      };
        this.players.push(player);
    },
  
    addGame(newOpponent, newTeamPoints, newOpponentPoints){
      let game = {
        opponent: newOpponent,
        teamPoints: newTeamPoints,
        opponentPoints: newOpponentPoints,
      }
        this.games.push(game);
    },
  
  };
  
  team.addPlayer('Bugs', 'Bunny', 76);
  console.log(team._players);
  
  team.addGame('Titans', 100, 98);
  console.log(team._games);
  