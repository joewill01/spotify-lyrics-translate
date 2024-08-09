import './NowPlaying.css';
import TempImage from './image.png';

function NowPlaying(props) {
    return (
		<div className="NowPlaying">
        {props.imageURL ?
			      <img className="NowPlaying__album-art" src={props.imageURL} />
        :
            <span className="NowPlaying__album-art-placeholder"></span>
        }

        <div className="NowPlaying__text">
            <h1 className="NowPlaying__text__title">{props.name ? props.name : "Not Playing"}</h1>
            <p className="NowPlaying__text__artist">{props.artist ? props.artist : "Not Playing"}</p>
        </div>
    </div>
    );
  }
  
  export default NowPlaying;
