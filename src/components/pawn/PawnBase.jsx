import { action, makeObservable, observable } from 'mobx';

class PawnBase {
  constructor(value, isOpen, team) {
    this.value = value;
    this.isOpen = isOpen;
    this.team = team;
    this.move = false;

    makeObservable(this, {
      value: observable,
      isOpen: observable,
      move: observable,
      setOpen: action,
      toggleMove: action,
    });
  }

  setOpen(open) {
    this.isOpen = open;
  }

  toggleMove() {
    this.move = !this.move;
  }
}

export default PawnBase;