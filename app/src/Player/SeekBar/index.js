import React, { useEffect, useRef } from 'react';

import './SeekBar.css';

function SeekBar(props) {
	const seekBarRef = useRef();


	function seekBarClick(e) {
		if (props.trackDuration && props.onSeek) {
			props.onSeek(((e.clientX - seekBarRef.current.getBoundingClientRect().x) / seekBarRef.current.offsetWidth) * props.trackDuration)
		}
	}


    return (
		<div className="SeekBar">
			<span className="SeekBar__time-since-start">{(props.trackDuration != undefined && props.currentPosition != undefined) ? `${Math.floor(props.currentPosition / 60000)}:${(((props.currentPosition % 60000) / 1000).toFixed(0) < 10 ? "0" : "")}${((props.currentPosition % 60000) / 1000).toFixed(0)}` : "--:--"}</span>
			<div ref={seekBarRef} onClick={seekBarClick} className="SeekBar__bar">
				<span className="SeekBar__bar__progress" style={(props.trackDuration && props.currentPosition) ? {width: `${(props.currentPosition/props.trackDuration)*100}%`} : {width: 0}}></span>
			</div>
			<span className="SeekBar__time-until-end">{(props.trackDuration != undefined && props.currentPosition != undefined) ? `${Math.floor(props.trackDuration / 60000)}:${(((props.trackDuration % 60000) / 1000).toFixed(0) < 10 ? "0" : "")}${((props.trackDuration % 60000) / 1000).toFixed(0)}` : "--:--"}</span>
		</div>
    );
  }
  
  export default SeekBar;
