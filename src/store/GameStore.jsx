import { action, makeObservable, observable } from "mobx";

class GameStore {
  num_of_players;

  constructor() {
    makeObservable(this, {
      num_of_players: observable,
      setNumPlayers: action,
    });
  }

  setNumPlayers(num_of_players) {
    this.num_of_players = num_of_players;
  }
}

export default GameStore;
