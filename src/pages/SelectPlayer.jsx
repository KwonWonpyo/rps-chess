import OnePlayer from "../one_player.svg";
import TwoPlayer from "../two_players_ver2.svg";
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
    </>
  );
}

export default SelectPlayer;
