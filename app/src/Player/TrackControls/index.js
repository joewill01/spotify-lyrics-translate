import './TrackControls.css';

function TrackControls(props) {
    return (
		<div className="TrackControls">
			<span className="TrackControls__back-button" onClick={props.onBackClick || (()=>{})}></span>

			<span className={`TrackControls__play-button ${props.isPlaying?"TrackControls__play-button--pause":"TrackControls__play-button--play"}`} onClick={props.onPlayClick || (()=>{})}></span>

			<span className="TrackControls__forward-button" onClick={props.onForwardClick || (()=>{})}></span>
      	</div>
    );
  }
  
  export default TrackControls;
