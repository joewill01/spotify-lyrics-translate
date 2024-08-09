let response = {"id":9269602,"name":"Marea (we’ve lost dancing)","trackName":"Marea (we’ve lost dancing)","artistName":"Fred again..","albumName":"Actual Life (April 14 - December 17 2020)","duration":285.375,"instrumental":false,"plainLyrics":"We've lost dancing (lost dancing)\nThis year we've had to lose\nOur space, we've lost\nWe've lost dancing\n\nAll these things that\nWe took for granted\n(We-we-we-we-we've lost dancing)\n\n(We-we-we-we-we've lost dancing)\n\nThis year we've had to lose\nOur space, we've lost dancing\n\nWe've lost\nThe hugs with friends and-\nAnd people that we loved\nAll thеse things that we took for granted (wе've lost dancing)\n\n(We've lost dancing, we've lost dancing)\nIf I can live through (we've lost dancing) this next six months (we've lost dancing)\nDay by day (we've lost dancing)\nIf I can live through this (we've lost dancing)\nWhat comes next\nWill be\nMarvellous\n\n(We've lost dancing)\n\nWe gon' make it through, through\n\nYeah, ooh\n\nWe've-dancing-lost, lost-dancing\nWe've lost dancing, dancing, dancing, lost, lost dancing\nLost, lost dancing\nWe've lost dancing, dancing, dancing, lost, lost dancing\nLost, lost dancing\nWe've lost dancing, dancing, dancing, lost, lost dancing\n\nWe gon' make it through\n\nDancing, lost, lost, lost da-da-dancing\nDancing, lost, lost, lost da-da-dancing\nDancing, lost, lost, lost da-da-dancing\nDancing, lost, lost, lost da-da-dancing\nDancing, lost, lost, lost da-da-dancing\nWe gon' make it through\n\nWhat comes next\nWill be\nMarvellous","syncedLyrics":"[00:00.09] We've lost dancing (lost dancing)\n[00:08.58] This year we've had to lose\n[00:11.77] Our space, we've lost\n[00:15.65] We've lost dancing\n[00:18.48] \n[00:23.20] All these things that\n[00:26.63] We took for granted\n[00:30.04] (We-we-we-we-we've lost dancing)\n[00:33.87] \n[01:01.56] (We-we-we-we-we've lost dancing)\n[01:04.95] \n[01:56.09] This year we've had to lose\n[01:58.98] Our space, we've lost dancing\n[02:05.24] \n[02:08.70] We've lost\n[02:10.89] The hugs with friends and-\n[02:14.47] And people that we loved\n[02:16.54] All thеse things that we took for granted (wе've lost dancing)\n[02:22.89] (We've lost dancing, we've lost dancing)\n[02:25.79] If I can live through (we've lost dancing) this next six months (we've lost dancing)\n[02:34.73] Day by day (we've lost dancing)\n[02:37.80] If I can live through this (we've lost dancing)\n[02:41.77] What comes next\n[02:46.69] Will be\n[02:50.07] Marvellous\n[02:52.56] \n[03:21.29] (We've lost dancing)\n[03:24.13] \n[03:37.34] We gon' make it through, through\n[03:40.71] \n[03:54.00] Yeah, ooh\n[03:56.41] We've-dancing-lost, lost-dancing\n[03:58.29] We've lost dancing, dancing, dancing, lost, lost dancing\n[04:01.11] Lost, lost dancing\n[04:02.42] We've lost dancing, dancing, dancing, lost, lost dancing\n[04:05.80] Lost, lost dancing\n[04:07.33] We've lost dancing, dancing, dancing, lost, lost dancing\n[04:08.75] We gon' make it through\n[04:10.50] Dancing, lost, lost, lost da-da-dancing\n[04:12.42] Dancing, lost, lost, lost da-da-dancing\n[04:14.52] Dancing, lost, lost, lost da-da-dancing\n[04:17.65] Dancing, lost, lost, lost da-da-dancing\n[04:21.62] Dancing, lost, lost, lost da-da-dancing\n[04:25.26] We gon' make it through\n[04:27.94] \n[04:34.50] What comes next\n[04:37.18] \n[04:39.39] Will be\n[04:41.25] Marvellous\n[04:41.89] "}



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
            text: text.trim()
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


let time = 248780;

let lyrics = parseLyric(response.syncedLyrics);

i=-1
for (let lyric of lyrics) {
    if (lyric.time < time) {
        i++
    } else {
        break;
    }
}

console.log(lyrics[i])
