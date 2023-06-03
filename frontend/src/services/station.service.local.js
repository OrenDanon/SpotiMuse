
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
    getEmptyStation,
    addStationMsg
}
window.cs = stationService


async function query(filterBy = { txt: '', price: 0 }) {
    var stations = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stations = stations.filter(station => regex.test(station.vendor) || regex.test(station.description))
    }
    if (filterBy.price) {
        stations = stations.filter(station => station.price <= filterBy.price)
    }
    return stations
}

function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId)
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
        station.owner = userService.getLoggedinUser()
        savedStation = await storageService.post(STORAGE_KEY, station)
    }
    return savedStation
}

async function addStationMsg(stationId, txt) {
    // Later, this is all done by the backend
    const station = await getById(stationId)
    if (!station.msgs) station.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    station.msgs.push(msg)
    await storageService.put(STORAGE_KEY, station)

    return msg
}

function getEmptyStation() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

var stations =[ {
    "_id": "5cksxjas89xjsa8xjsa8jxs09",
    "name": "2Pac",
    "tags": [
      "Funk",
      "Happy"
    ],
    "createdBy": {
      "_id": "u101",
      "fullname": "Puki Ben David",
      "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg"
    },
    "likedByUsers": ['{minimal-user}', '{minimal-user}'],
    "songs": [
      {
        "id": "eXvBjCO19QY",
        "title": "2Pac - Changes ft. Talent",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
        "addedAt": 162521765262
      },
      {
        "id": "H1HdZFgR-aA",
        "title": "2Pac - All Eyez On Me",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162769765262

      },
      {
        "id": "Do5MMmEygsY",
        "title": "2Pac - Ghetto Gospel",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162854765262

      },
      {
        "id": "mwgZalAFNhM",
        "title": "2Pac - California Love feat. Dr. Dre (Dirty) (Music Video) HD",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162926765262

      },
      {
        "id": "Mb1ZvUDvLDY",
        "title": "2Pac - Dear Mama",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162845765262

      },
    ],
    "msgs": [
      {
        id: 'm101',
        from: '{mini-user}',
        txt: 'Manish?'
      }
    ]
  },
  {
    "_id": "5cksxjas89xjsa124sa8jt6g",
    "name": "Snoop Dogg",
    "tags": [
      "Funk",
      "Happy"
    ],
    "createdBy": {
      "_id": "u101",
      "fullname": "Puki Ben David",
      "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg"
    },
    "likedByUsers": ['{minimal-user}', '{minimal-user}'],
    "songs": [
      {
        "id": "_CL6n0FJZpk",
        "title": "Dr. Dre - Still D.R.E. ft. Snoop Dogg",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
        "addedAt": 162792765262
      },
      {
        "id": "_Rks2oCRS88",
        "title": "Snoop Dogg, Eminem, Dr. Dre - Back In The Game ft. DMX, Eve, Jadakiss, Ice Cube, Method Man, The Lox",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162841765262

      },
      {
        "id": "2soGJXQAQec",
        "title": "Snoop Dogg - Who Am I (What's My Name)?",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162981265262

      },
      {
        "id": "Wa5B22KAkEk",
        "title": "Snoop Dogg & Wiz Khalifa - Young, Wild and Free ft. Bruno Mars [Official Video]",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162324565262

      },
      {
        "id": "GtUVQei3nX4",
        "title": "Snoop Dogg - Drop It Like It's Hot (Official Music Video) ft. Pharrell Williams",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162841765262

      },
    ],
    "msgs": [
      {
        id: 'm101',
        from: '{mini-user}',
        txt: 'Manish?'
      }
    ]
  },
  {
    "_id": "5cksxjas89xjsa8xjsa8j9o0m",
    "name": "Beyonce",
    "tags": [
      "Funk",
      "Happy"
    ],
    "createdBy": {
      "_id": "u101",
      "fullname": "Puki Ben David",
      "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg"
    },
    "likedByUsers": ['{minimal-user}', '{minimal-user}'],
    "songs": [
      {
        "id": "Ob7vObnFUJc",
        "title": "Beyoncé - Love On Top (Official Video)",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
        "addedAt": 162888765262
      },
      {
        "id": "Q0E4wVF2a4k",
        "title": "Beyoncé - AMERICA HAS A PROBLEM (Feat. Kendrick Lamar) - (Official Lyric Video)",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162439765262

      },
      {
        "id": "AWpsOqh8q0M",
        "title": "Beyoncé - If I Were A Boy",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162441765262

      },
      {
        "id": "VBmMU_iwe6U",
        "title": "Beyoncé - Run the World (Girls) (Official Video)",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162238765262

      },
      {
        "id": "2EwViQxSJJQ",
        "title": "Beyoncé - Irreplaceable",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162521765262

      },
    ],
    "msgs": [
      {
        id: 'm101',
        from: '{mini-user}',
        txt: 'Manish?'
      }
    ]
  },
  {
    "_id": "5cksxjas89xjsa8xjsa8nvc43",
    "name": "Wiz khalifa",
    "tags": [
      "Funk",
      "Happy"
    ],
    "createdBy": {
      "_id": "u101",
      "fullname": "Puki Ben David",
      "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg"
    },
    "likedByUsers": ['{minimal-user}', '{minimal-user}'],
    "songs": [
      {
        "id": "RgKAFK5djSk",
        "title": "Wiz Khalifa - See You Again ft. Charlie Puth [Official Video] Furious 7 Soundtrack",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
        "addedAt": 162249765262
      },
      {
        "id": "C4yYiXuUqyM",
        "title": "Wiz Khalifa - What Would I Do [Official Music Video]",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162972365262

      },
      {
        "id": "MOk-_wCJbcM",
        "title": "Wiz Khalifa - Why Not Not Why [Official Music Video]",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162521765262

      },
      {
        "id": "Wa5B22KAkEk",
        "title": "Snoop Dogg & Wiz Khalifa - Young, Wild and Free ft. Bruno Mars [Official Video]",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162621765262

      },
      {
        "id": "KuVAeTHqijk",
        "title": "Wiz Khalifa - No Sleep [Music Video]",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162521765262

      },
    ],
    "msgs": [
      {
        id: 'm101',
        from: '{mini-user}',
        txt: 'Manish?'
      }
    ]
  },
  {
    "_id": "5cksxjas89xjsa8xjsa8jx6tc",
    "name": "Bruno Mars",
    "tags": [
      "Funk",
      "Happy"
    ],
    "createdBy": {
      "_id": "u101",
      "fullname": "Puki Ben David",
      "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg"
    },
    "likedByUsers": ['{minimal-user}', '{minimal-user}'],
    "songs": [
      {
        "id": "fLexgOxsZu0",
        "title": "Bruno Mars - The Lazy Song (Official Music Video)",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
        "addedAt": 162437865262
      },
      {
        "id": "SR6iYWJxHqs",
        "title": "Bruno Mars - Grenade (Official Music Video)",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162887765262

      },
      {
        "id": "OPf0YbXqDm0",
        "title": "Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162221765262

      },
      {
        "id": "LjhCEhWiKXk",
        "title": "Bruno Mars - Just The Way You Are (Official Music Video)",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162675465262

      },
      {
        "id": "8aRor905cCw",
        "title": "Travie McCoy: Billionaire ft. Bruno Mars [OFFICIAL VIDEO]",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162554765262

      },
    ],
    "msgs": [
      {
        id: 'm101',
        from: '{mini-user}',
        txt: 'Manish?'
      }
    ]
  },
]

utilService.saveToStorage(STORAGE_KEY,stations)
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




