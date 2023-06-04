import { useNavigate } from 'react-router-dom';

import { ReactComponent as PlayIcon } from "../assets/icons/play.svg"

export function StationPreview({ station }) {
  const navigate = useNavigate();

  function navigateToStation(id) {
    navigate(`/station/${id}`);
  }

  return (
    <div className="station-preview" key={station._id} onClick={()=>navigateToStation(station._id)}>
      <img src="https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg" alt="" />
      <div className="play">
        <span className="fa fa-play flex align-center justify-center"><PlayIcon title="Play" />
</span>
      </div>
      <h4>{station.name}</h4>
      <p>Lorem ipsum dotur adipis iusto nihil.</p>
    </div>
  );
}