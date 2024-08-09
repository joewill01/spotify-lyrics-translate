import React, { useEffect, useState, useRef } from 'react';

import './Lyrics.css';

function Lyrics(props) {
	
	let lyricsContainerRef = useRef();

    let [lyrics, setLyrics] = useState([]);
    let [currentLyric, setCurrentLyric] = useState(0);

    // lrc (String) - lrc file text
    function parseLyric(lrc) {
      // will match "[00:00.00] ooooh yeah!"
      // note: i use named capturing group
      const regex = /^\[(?<time>\d{2}:\d{2}(.\d{2})?)\](?<text>.*)/;

      // split lrc string to individual lines
      const lines = lrc.split("\n");

      const output = [];

      lines.forEach(line => {
          const match = line.match(regex);

          // if doesn't match, return.
          if (match == null) return;

          const { time, text } = match.groups;

          output.push({
              time: parseTime(time) * 1000,
              text: text.trim(),
              active: false
          });
      });

      // parse formated time
      // "03:24.73" => 204.73 (total time in seconds)
      function parseTime(time) {
          const minsec = time.split(":");

          const min = parseInt(minsec[0]) * 60;
          const sec = parseFloat(minsec[1]);

          return min + sec;
      }

      return output;
    }

    useEffect(() => {
        // finds the current lyric
        let i=-1
        for (let lyric of lyrics) {
            if (lyric.time < props.currentPosition) {
                i++
            } else {
                break;
            }
        }

		if (i===-1) {
			lyricsContainerRef.current.style.top = `0`;
		}
        
        setCurrentLyric(i);
        let currentLyricElement = document.getElementsByClassName('Lyrics__lyric')[i];
        if (currentLyricElement) {
			lyricsContainerRef.current.style.top = `-${currentLyricElement.offsetTop}px`;
        }

    }, [props.currentPosition,])


    useEffect(() => {
      if (props.name) {
        fetch(`https://lrclib.net/api/get?artist_name=${props.artist}&track_name=${props.name}&album_name=${props.album}&duration=${props.trackDuration/1000}`)
            .then((response) => response.json())
            .then((json) => {
				if (json.syncedLyrics) {
					setLyrics(parseLyric(json.syncedLyrics));	
				} else {
					setLyrics([])
				}
            })

        console.log("lyrics loaded")
      }
    }, [props.name, ])

    return (
		<div className="Lyrics">
			<div className="Lyrics__lyric-container" ref={lyricsContainerRef}>
				{
					lyrics.map((lyric, key) => {
						return <span className={`Lyrics__lyric ${key == currentLyric ? "active" : ""}`}>{lyric.text ? lyric.text : "♫"}</span>
					})
				}

				{lyrics?<p className="Lyrics__contribution">Lyrics provided by lrclib.net</p>:""}
			</div>

      	</div>
    );
  }
  
  export default Lyrics;
