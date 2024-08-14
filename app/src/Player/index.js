import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from 'react-oauth2-code-pkce';

import './Player.css';

import NowPlaying from './NowPlaying';
import SeekBar from './SeekBar';
import TrackControls from './TrackControls';
import Lyrics from './Lyrics';
import Menu from './Menu';


const track = {name: "",album: {images: [{ url: "" }]},artists: [{ name: "" }]}

function Player() {

	let [player, setPlayer] = useState(undefined);
	let [isPlaying, setIsPlaying] = useState(undefined);
	let [currentTrackName, setCurrentTrackName] = useState("");
	let [currentTrackArtist, setCurrentTrackArtist] = useState("");
	let [currentAlbum, setCurrentAlbum] = useState("");
	let [currentTrackImageURL, setCurrentTrackImageURL] = useState("");
	let [currentPosition, setCurrentPosition] = useState(undefined);
	let [trackDuration, setTrackDuration] = useState(undefined);

	const { token, error, logOut } = useContext(AuthContext);

	useEffect(() => {
		// inject Spotify Web Player SDK script into the document
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'LyricTranslate',
                getOAuthToken: cb => { cb(token); },
                volume: 1
            });
            setPlayer(player);
    
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
			
			player.addListener('player_state_changed', (state) => {
				if (!state) {
					return;
				}

				setIsPlaying(!state.paused);
				setTrackDuration(state.duration);
				setCurrentPosition(state.position);

				if (state.track_window.current_track) {
					setCurrentTrackName(state.track_window.current_track.name);
					setCurrentTrackArtist(state.track_window.current_track.artists[0].name);
					setCurrentAlbum(state.track_window.current_track.album.name)
					setCurrentTrackImageURL(state.track_window.current_track.album.images[0].url);
				} else {
					setCurrentTrackName("");
					setCurrentTrackArtist("");
					setCurrentAlbum("");
					setCurrentTrackImageURL("");
				}
			});

            player.connect();

			setInterval(() => {
				// runs regularly to update the current track position state, and to check if active lyric needs changing


				// do start interval on connect and stop on disconnect

				if (player) {
				
					player.getCurrentState().then(state => {
						if (!state) {
						console.error('User is not playing music through the Web Playback SDK');
						return;
						}

						setTrackDuration(state.duration);
						setCurrentPosition(state.position);

						
					});

				}
			}, 100)
        };
		return () => {

			//stop interval 


			console.log('Player unmounted');
			console.log()
			document.body.removeChild(script);
		  };
    }, [])

	function onSeekBarSeek(millis) {
		if (player) {
			player.seek(millis);
		}
	}

    return (
		<div className="Player">
			{currentTrackImageURL ?
			<img className="Player__background-image" src={currentTrackImageURL}></img>
			:""}

			<Lyrics
				name={currentTrackName}
				artist={currentTrackArtist}
				album={currentAlbum}
				currentPosition={currentPosition}
				trackDuration={trackDuration}
			/>

			<Menu onLogoutClick={() => {logOut()}} />

			<div className="Player__bottom">
				<NowPlaying
					name={currentTrackName}
					artist={currentTrackArtist}
					imageURL={currentTrackImageURL}
				/>

				<SeekBar
					trackDuration={trackDuration}
					currentPosition={currentPosition}
					onSeek={onSeekBarSeek}
				/>

				<TrackControls
					isPlaying={isPlaying}
					onPlayClick={() => {player.togglePlay()}}
					onForwardClick={() => {player.nextTrack()}}
					onBackClick={() => {player.previousTrack()}}
				/>
				{/*have option to enable/disable this in menu*/}
			</div>
      </div>
    );
  }
  
  export default Player;