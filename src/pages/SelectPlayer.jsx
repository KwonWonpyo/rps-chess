import OnePlayer from "../resource/one_player.svg";
import TwoPlayer from "../resource/two_players_ver2.svg";
import ButtonSquare1 from "../components/buttons/ButtonSquare1";
import { Link } from "react-router-dom";

function SelectPlayer() {
  return (
    <>
      <Link to={"singlePlay"}>
        <ButtonSquare1
          text={"1인용 플레이"}
          svg={OnePlayer}
          alt={"one player"}
        />
      </Link>
      <Link to={"multiPlay"}>
        <ButtonSquare1
          text={"2인용 플레이"}
          svg={TwoPlayer}
          alt={"two players"}
        />
      </Link>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </>
  );
}

export default SelectPlayer;
