import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"
import { userService } from "./user.service.js"

const STORAGE_KEY = "station"

export const stationService = {
  query,
  getById,
  save,
  remove,
  getEmptyStation,
  addStationMsg,
  getDefaultSong,
  addSong,
  removeSong,
  getNextSong,
  getPrevSong,
  getGenreList,
  dataTransform,
  getSongById,
  convertDuration,
  totalSongsDuration,

}
window.cs = stationService

async function query(filterBy = { txt: "", price: 0 }) {
    var stations = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, "i")
        stations = stations.filter(
            (station) =>
                regex.test(station.vendor) || regex.test(station.description)
        )
    }
    if (filterBy.price) {
        stations = stations.filter((station) => station.price <= filterBy.price)
    }
    return stations
}

function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId)
}
function getSongById(station, songId) {
    return station.songs.filter((song) => song.id === songId)
}

async function remove(stationId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stationId)
}

async function save(station) {
    var savedStation
    if (station._id) {
        savedStation = await storageService.put(STORAGE_KEY, station)
    } else {
        // Later, owner is set by the backend
        // station.owner = userService.getLoggedinUser()
        savedStation = await storageService.post(STORAGE_KEY, station)
    }
    return savedStation
}
async function addSong(station) {
    const newSong = stationService.getDefaultSong()
    station.songs.push(newSong)
    return await save(station)
}
async function removeSong(station, songIdx) {
    station.songs.splice(songIdx, 1)
    return await save(station)
}
function _transformSongTitle(title) {
  title = title.replace(/\([^()]*\)/g, '');
  title = title.replace(/\{[^{}]*\}/g, '');
  title = title.replace(/&#?\w+;/g, '');
  title = title.trim();

  return title;
}
async function addStationMsg(stationId, txt) {
    // Later, this is all done by the backend
    const station = await getById(stationId)
    if (!station.msgs) station.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt,
    }
    station.msgs.push(msg)
    await storageService.put(STORAGE_KEY, station)

    return msg
}
function getNextSong(station, song, isRepeatOn) {
    const idx = station.songs.findIndex((nextSong) => nextSong.id === song.id)
    if (isRepeatOn && idx + 1 >= station.songs.length) {
        return station.songs[0]
    } else {
        return station.songs[idx + 1]
    }
}
function getPrevSong(station, song) {
    const idx = station.songs.findIndex((prevSong) => prevSong.id === song.id)
    return station.songs[idx - 1]
}
function totalSongsDuration(station) {
  const totalDuration = station.songs.reduce((acc, currSong) => {
    const durationParts = currSong.duration.split(":");
    const minutes = parseInt(durationParts[0]);
    const seconds = parseInt(durationParts[1]);
    const songDurationInSeconds = minutes * 60 + seconds;
    return acc + songDurationInSeconds;
  }, 0);

  const minutes = Math.floor(totalDuration / 60);
  const seconds = totalDuration % 60;

  let formattedDuration = "";

  if (minutes > 0) {
    formattedDuration += `${minutes} min `;
  }

  formattedDuration += `${seconds} sec`;

  return formattedDuration;
}
function dataTransform(response, durations) {
  const station = {}
  const songs = []
  response.map((res, idx) => {
    const song = {
      id: utilService.makeId(),
      title: _transformSongTitle(res.snippet.title),
      duration: convertDuration(durations[idx]),
      url: res.id.videoId,
      imgUrl: res.snippet.thumbnails.default.url,
      addedAt: ''
    }
    songs.push(song)
  })
  station.songs = songs
  return station
}
function getGenreList() {
  return [
    {
      title: "Pop",
      img: "https://i.scdn.co/image/ab67fb8200005cafa862ab80dd85682b37c4e768",
    },
    {
      title: "Hip-Hop",
      img: "https://i.scdn.co/image/ab67fb8200005caf7e11c8413dc33c00740579c1",
    },
    {
      title: "Rock",
      img: "https://i.scdn.co/image/ab67fb8200005cafae7e69beb88f16969641b53e",
    },
    {
      title: "Latin",
      img: "https://i.scdn.co/image/ab67fb8200005cafa59f90c077c9f618fd0dde30",
    },
    {
      title: "R&B",
      img: "https://i.scdn.co/image/ab67fb8200005cafbe6a6e705e1a71117c2d0c2c",
    },
    {
      title: "Metal",
      img: "https://i.scdn.co/image/ab67fb8200005cafefa737b67ec51ec989f5a51d",
    },
    {
      title: "Funk",
      img: "https://i.scdn.co/image/ab67fb8200005cafb2cdd7a95b0a5444aa15cfb5",
    },
    {
      title: "Country",
      img: "https://i.scdn.co/image/ab67fb8200005cafc0d2222b4c6441930e1a386e",
    },
    {
      title: "K-pop",
      img: "https://i.scdn.co/image/ab67fb8200005caf013ee3c983e6f60bf28bad5a",
    },
  ]
}

function getDefaultSong() {
    return {
        id: utilService.makeId(),
        title: "2Pac - California Love feat. Dr. Dre (Dirty) (Music Video) HD",
        url: "mwgZalAFNhM",
        imgUrl: "https://i.ytimg.com/vi/LjxulQ1bEWg/maxresdefault.jpg",
        addedAt: Date.now(),
    }
}
function convertDuration(duration) {
    const durationRegex = /PT(\d+H)?(\d+M)?(\d+S)?/
    const matches = duration.match(durationRegex)

    let minutes = 0
    let seconds = 0

    if (matches[2]) {
        minutes = parseInt(matches[2].slice(0, -1))
    }

    if (matches[3]) {
        seconds = parseInt(matches[3].slice(0, -1))
    }

    return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`
}

function getEmptyStation() {
  return {
    name: 'My Playlist',
    imgUrl: 'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-dimensions/2500?v=v2&px=-1',
    tags: ["Pop"],
    createdBy: {
      _id: userService.getLoggedinUser()._id,
      fullname: userService.getLoggedinUser().username,
      imgUrl: userService.getLoggedinUser().imgUrl,
    },
    likedByUsers: [],
    songs: [],
    msgs: []
  }
}

var stations = utilService.loadFromStorage(STORAGE_KEY)
if (!stations) {
    stations = [
        {
            _id: "5cksxjas89xjsa8xjsa8jxs09",
            name: "2Pac",
            tags: ["Funk", "Happy"],
            imgUrl: "https://i.scdn.co/image/ab676161000051747f5cc432c9c109248ebec1ac",
            createdBy: {
                _id: "u101",
                fullname: "Puki Ben David",
                imgUrl: "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
            },
            likedByUsers: ["{minimal-user}", "{minimal-user}"],
            songs: [
                {
                    id: "aBcDEf0",
                    title: "2Pac - Changes ft. Talent",
                    url: "eXvBjCO19QY",
                    imgUrl: "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                    addedAt: 1559755062000,
                },
                {
                    id: "aBcDEf1",
                    title: "2Pac - All Eyez On Me",
                    url: "H1HdZFgR-aA",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1591377462000,
                },
                {
                    id: "aBcDEf2",
                    title: "2Pac - Ghetto Gospel",
                    url: "Do5MMmEygsY",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1591377462000,
                },
                {
                    id: "aBcDEf3",
                    title: "2Pac - California Love feat. Dr. Dre (Dirty) (Music Video) HD",
                    url: "mwgZalAFNhM",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1654449462000,
                },
                {
                    id: "aBcDEf4",
                    title: "2Pac - Dear Mama",
                    url: "Mb1ZvUDvLDY",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1683307062000,
                },
            ],
            msgs: [
                {
                    id: "m101",
                    from: "{mini-user}",
                    txt: "Manish?",
                },
            ],
        },
        {
            _id: "5cksxjas89xjsa124sa8jt6g",
            name: "Snoop Dogg",
            tags: ["Funk", "Happy"],
            imgUrl: "https://e0.pxfuel.com/wallpapers/187/357/desktop-wallpaper-snoop-dogg-for-widescreen-pc-full-thumbnail.jpg",
            createdBy: {
                _id: "u101",
                fullname: "Puki Ben David",
                imgUrl: "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
            },
            likedByUsers: ["{minimal-user}", "{minimal-user}"],
            songs: [
                {
                    id: "aBcDEf5",
                    title: "Dr. Dre - Still D.R.E. ft. Snoop Dogg",
                    url: "_CL6n0FJZpk",
                    imgUrl: "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                    addedAt: 1559755062000,
                },
                {
                    id: "aBcDEf6",
                    title: "Snoop Dogg, Eminem, Dr. Dre - Back In The Game ft. DMX, Eve, Jadakiss, Ice Cube, Method Man, The Lox",
                    url: "_Rks2oCRS88",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1591377462000,
                },
                {
                    id: "aBcDEf7",
                    title: "Snoop Dogg - Who Am I (What's My Name)?",
                    url: "2soGJXQAQec",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1591377462000,
                },
                {
                    id: "aBcDEf8",
                    title: "Snoop Dogg & Wiz Khalifa - Young, Wild and Free ft. Bruno Mars [Official Video]",
                    url: "Wa5B22KAkEk",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1654449462000,
                },
                {
                    id: "aBcDEf9",
                    title: "Snoop Dogg - Drop It Like It's Hot (Official Music Video) ft. Pharrell Williams",
                    url: "GtUVQei3nX4",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1683307062000,
                },
            ],
            msgs: [
                {
                    id: "m101",
                    from: "{mini-user}",
                    txt: "Manish?",
                },
            ],
        },
        {
            _id: "5cksxjas89xjsa8xjsa8j9o0m",
            name: "Omer Adam",
            tags: ["Funk", "Happy"],
            imgUrl: "https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/6a/24/87/6a24871e-87b8-815d-cc15-0a1b341917c0/mzl.gfsvgwov.jpg/375x375bb.jpg",
            createdBy: {
                _id: "u101",
                fullname: "Puki Ben David",
                imgUrl: "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
            },
            likedByUsers: ["{minimal-user}", "{minimal-user}"],
            songs: [
                {
                    id: "aBcDEf10",
                    title: "Beyoncé - Love On Top (Official Video)",
                    url: "Ob7vObnFUJc",
                    imgUrl: "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                    addedAt: 1559755062000,
                },
                {
                    id: "aBcDEf11",
                    title: "Beyoncé - AMERICA HAS A PROBLEM (Feat. Kendrick Lamar) - (Official Lyric Video)",
                    url: "Q0E4wVF2a4k",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1591377462000,
                },
                {
                    id: "aBcDEf12",
                    title: "Beyoncé - If I Were A Boy",
                    url: "AWpsOqh8q0M",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1654449462000,
                },
                {
                    id: "aBcDEf13",
                    title: "Beyoncé - Run the World (Girls) (Official Video)",
                    url: "VBmMU_iwe6U",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1683307062000,
                },
                {
                    id: "aBcDEf14",
                    title: "Beyoncé - Irreplaceable",
                    url: "2EwViQxSJJQ",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1683307062000,
                },
            ],
            msgs: [
                {
                    id: "m101",
                    from: "{mini-user}",
                    txt: "Manish?",
                },
            ],
        },
        {
            _id: "5cksxjas89xjsa8xjsa8nvc43",
            name: "Wiz khalifa",
            tags: ["Funk", "Happy"],
            imgUrl: "https://www.rap-up.com/wp-content/uploads/2011/01/wiz-smoke1.jpg",
            createdBy: {
                _id: "u101",
                fullname: "Puki Ben David",
                imgUrl: "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
            },
            likedByUsers: ["{minimal-user}", "{minimal-user}"],
            songs: [
                {
                    id: "aBcDEf15",
                    title: "Wiz Khalifa - See You Again ft. Charlie Puth [Official Video] Furious 7 Soundsong",
                    url: "RgKAFK5djSk",
                    imgUrl: "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                    addedAt: 1557076662000,
                },
                {
                    id: "aBcDEf16",
                    title: "Wiz Khalifa - What Would I Do [Official Music Video]",
                    url: "C4yYiXuUqyM",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1559755062000,
                },
                {
                    id: "aBcDEf17",
                    title: "Wiz Khalifa - Why Not Not Why [Official Music Video]",
                    url: "MOk-_wCJbcM",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1591377462000,
                },
                {
                    id: "aBcDEf18",
                    title: "Snoop Dogg & Wiz Khalifa - Young, Wild and Free ft. Bruno Mars [Official Video]",
                    url: "Wa5B22KAkEk",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1654449462000,
                },
                {
                    id: "aBcDEf19",
                    title: "Wiz Khalifa - No Sleep [Music Video]",
                    url: "KuVAeTHqijk",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1683307062000,
                },
            ],
            msgs: [
                {
                    id: "m101",
                    from: "{mini-user}",
                    txt: "Manish?",
                },
            ],
        },
        {
            _id: "5cksxjas89xjsa8xjsa8jx6tc",
            name: "Bruno Mars",
            tags: ["Funk", "Happy"],
            imgUrl: "https://images.sk-static.com/images/media/profile_images/artists/941964/huge_avatar",
            createdBy: {
                _id: "u101",
                fullname: "Puki Ben David",
                imgUrl: "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
            },
            likedByUsers: ["{minimal-user}", "{minimal-user}"],
            songs: [
                {
                    id: "aBcDEf20",
                    title: "Bruno Mars - The Lazy Song (Official Music Video)",
                    url: "fLexgOxsZu0",
                    imgUrl: "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                    addedAt: 1557076662000,
                },
                {
                    id: "aBcDEf21",
                    title: "Bruno Mars - Grenade (Official Music Video)",
                    url: "SR6iYWJxHqs",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1559755062000,
                },
                {
                    id: "aBcDEf22",
                    title: "Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars",
                    url: "OPf0YbXqDm0",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1591377462000,
                },
                {
                    id: "aBcDEf23",
                    title: "Bruno Mars - Just The Way You Are (Official Music Video)",
                    url: "LjhCEhWiKXk",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1654449462000,
                },
                {
                    id: "aBcDEf24",
                    title: "Travie McCoy: Billionaire ft. Bruno Mars [OFFICIAL VIDEO]",
                    url: "8aRor905cCw",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1683307062000,
                },
            ],
            msgs: [
                {
                    id: "m101",
                    from: "{mini-user}",
                    txt: "Manish?",
                },
            ],
        },
    ]

    utilService.saveToStorage(STORAGE_KEY, stations)
}
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
var userStations = utilService.loadFromStorage("userdb")
if (!userStations) {
    userStations = [
        {
            _id: "5cksxjas89xjsa8xjsa8jx6tc",
            name: "Bruno Mars",
            imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
            tags: ["Funk", "Happy"],
            createdBy: {
                _id: "u101",
                fullname: "Puki Ben David",
                imgUrl: "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
            },
            likedByUsers: ["{minimal-user}", "{minimal-user}"],
            songs: [
                {
                    id: "aBcDEf18",
                    title: "Bruno Mars - The Lazy Song (Official Music Video)",
                    url: "fLexgOxsZu0",
                    imgUrl: "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                    addedAt: 1557076662000,
                },
                {
                    id: "aBcDEf19",
                    title: "Bruno Mars - Grenade (Official Music Video)",
                    url: "SR6iYWJxHqs",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1559755062000,
                },
                {
                    id: "aBcDEf20",
                    title: "Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars",
                    url: "OPf0YbXqDm0",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1591377462000,
                },
                {
                    id: "aBcDEf21",
                    title: "Bruno Mars - Just The Way You Are (Official Music Video)",
                    url: "LjhCEhWiKXk",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1654449462000,
                },
                {
                    id: "aBcDEf22",
                    title: "Travie McCoy: Billionaire ft. Bruno Mars [OFFICIAL VIDEO]",
                    url: "8aRor905cCw",
                    imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    addedAt: 1683307062000,
                },
            ],
            msgs: [
                {
                    id: "m101",
                    from: "{mini-user}",
                    txt: "Manish?",
                },
            ],
        },
    ]
    utilService.saveToStorage("userdb", userStations)
}

var cache = utilService.loadFromStorage("cache")
if (!cache) {
    cache = {}
    utilService.saveToStorage("cache", cache)
}
