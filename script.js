console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let currentTimestamp = document.getElementById('timestamp');
let songs = [
    {songName: "Beethoven Symphony No. 5", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "In The End - Linkin Park", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "21 Savage - Bank Account", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "ACDC - Thunderstruck", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Beethoven - Moonlight Sonata", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Numb - Linkin Park", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Queen - Bohemian Rhapsody", filePath: "songs/7.mp3", coverPath: "covers/6.jpg"},
    {songName: "Yiruma - Kiss the Rain", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Yiruma - River Flows in You", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"}
];



songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    // element.getElementsById("timestamp")[i].
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    updateTrackTime(audioElement);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
function formatSecondsAsTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);
    return (minutes < 10 ? '0' : '') + minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
}

function updateTrackTime(track){
    var currTimeDiv = document.getElementById('currentTime');
    var durationDiv = document.getElementById('duration');
  
    var currTime = Math.floor(track.currentTime); 
    var duration = Math.floor(track.duration);
    console.log(currTime);
    console.log(duration);
    // currTimeDiv.innerHTML = formatSecondsAsTime(currTime);
  
    if (isNaN(duration)){
      durationDiv.innerHTML = '00:00';
    } 
    else{
      durationDiv.innerHTML = formatSecondsAsTime(currTime) + "/" + formatSecondsAsTime(duration);
      console.log(durationDiv.innerHTML);
    }
  }
  // Get references to the search input and the container of song items.
const songSearchInput = document.getElementById('songSearch');
const songItemContainer = document.querySelector('.songItemContainer');

// Add an input event listener to the search input.
songSearchInput.addEventListener('input', function () {
    const searchQuery = songSearchInput.value.toLowerCase(); // Convert the input to lowercase for case-insensitive matching.
    const songItems = songItemContainer.querySelectorAll('.songItem');

    // Loop through each song item and check if it contains the search query.
    songItems.forEach(function (songItem) {
        const songName = songItem.querySelector('.songName').textContent.toLowerCase();

        if (songName.includes(searchQuery)) {
            songItem.style.display = 'block'; // Show the matching song item.
        } else {
            songItem.style.display = 'none'; // Hide non-matching song items.
        }
    });
});
