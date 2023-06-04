
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
    addStationMsg,
    getSongById
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
function getSongById(station,songId){
  return station.songs.filter(song => song.id === songId)
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
        "id": "aBcDEf0",
        "title": "2Pac - Changes ft. Talent",
        "url": "eXvBjCO19QY",
        "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
        "addedAt": 162521765262
      },
      {
        "id": "aBcDEf1",
        "title": "2Pac - All Eyez On Me",
        "url": "H1HdZFgR-aA",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162769765262

      },
      {
        "id": "aBcDEf2",
        "title": "2Pac - Ghetto Gospel",
        "url": "Do5MMmEygsY",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162854765262

      },
      {
        "id": "aBcDEf3",
        "title": "2Pac - California Love feat. Dr. Dre (Dirty) (Music Video) HD",
        "url": "mwgZalAFNhM",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162926765262

      },
      {
        "id": "aBcDEf4",
        "title": "2Pac - Dear Mama",
        "url": "Mb1ZvUDvLDY",
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
        "id": "aBcDEf5",
        "title": "Dr. Dre - Still D.R.E. ft. Snoop Dogg",
        "url": "_CL6n0FJZpk",
        "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
        "addedAt": 162792765262
      },
      {
        "id": "aBcDEf6",
        "title": "Snoop Dogg, Eminem, Dr. Dre - Back In The Game ft. DMX, Eve, Jadakiss, Ice Cube, Method Man, The Lox",
        "url": "_Rks2oCRS88",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162841765262

      },
      {
        "id": "aBcDEf6",
        "title": "Snoop Dogg - Who Am I (What's My Name)?",
        "url": "2soGJXQAQec",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162981265262

      },
      {
        "id": "aBcDEf7",
        "title": "Snoop Dogg & Wiz Khalifa - Young, Wild and Free ft. Bruno Mars [Official Video]",
        "url": "Wa5B22KAkEk",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162324565262

      },
      {
        "id": "aBcDEf7",
        "title": "Snoop Dogg - Drop It Like It's Hot (Official Music Video) ft. Pharrell Williams",
        "url": "GtUVQei3nX4",
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
        "id": "aBcDEf8",
        "title": "Beyoncé - Love On Top (Official Video)",
        "url": "Ob7vObnFUJc",
        "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
        "addedAt": 162888765262
      },
      {
        "id": "aBcDEf9",
        "title": "Beyoncé - AMERICA HAS A PROBLEM (Feat. Kendrick Lamar) - (Official Lyric Video)",
        "url": "Q0E4wVF2a4k",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162439765262

      },
      {
        "id": "aBcDEf10",
        "title": "Beyoncé - If I Were A Boy",
        "url": "AWpsOqh8q0M",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162441765262

      },
      {
        "id": "aBcDEf11",
        "title": "Beyoncé - Run the World (Girls) (Official Video)",
        "url": "VBmMU_iwe6U",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162238765262

      },
      {
        "id": "aBcDEf12",
        "title": "Beyoncé - Irreplaceable",
        "url": "2EwViQxSJJQ",
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
        "id": "aBcDEf13",
        "title": "Wiz Khalifa - See You Again ft. Charlie Puth [Official Video] Furious 7 Soundsong",
        "url": "RgKAFK5djSk",
        "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
        "addedAt": 162249765262
      },
      {
        "id": "aBcDEf14",
        "title": "Wiz Khalifa - What Would I Do [Official Music Video]",
        "url": "C4yYiXuUqyM",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162972365262

      },
      {
        "id": "aBcDEf15",
        "title": "Wiz Khalifa - Why Not Not Why [Official Music Video]",
        "url": "MOk-_wCJbcM",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162521765262

      },
      {
        "id": "aBcDEf16",
        "title": "Snoop Dogg & Wiz Khalifa - Young, Wild and Free ft. Bruno Mars [Official Video]",
        "url": "Wa5B22KAkEk",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162621765262

      },
      {
        "id": "aBcDEf17",
        "title": "Wiz Khalifa - No Sleep [Music Video]",
        "url": "KuVAeTHqijk",
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
        "id": "aBcDEf18",
        "title": "Bruno Mars - The Lazy Song (Official Music Video)",
        "url": "fLexgOxsZu0",
        "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
        "addedAt": 162437865262
      },
      {
        "id": "aBcDEf19",
        "title": "Bruno Mars - Grenade (Official Music Video)",
        "url": "SR6iYWJxHqs",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162887765262

      },
      {
        "id": "aBcDEf20",
        "title": "Mark Ronson - Uptown Funk (Official Video) ft. Bruno Mars",
        "url": "OPf0YbXqDm0",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162221765262

      },
      {
        "id": "aBcDEf21",
        "title": "Bruno Mars - Just The Way You Are (Official Music Video)",
        "url": "LjhCEhWiKXk",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedAt": 162675465262

      },
      {
        "id": "aBcDEf22",
        "title": "Travie McCoy: Billionaire ft. Bruno Mars [OFFICIAL VIDEO]",
        "url": "8aRor905cCw",
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




