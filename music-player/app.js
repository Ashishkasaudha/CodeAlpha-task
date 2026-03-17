const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playlist = document.getElementById("playlist");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
document.getElementById("shuffle").addEventListener("click",()=>{
index = Math.floor(Math.random()*songs.length);
loadSong(songs[index]);
playSong();
});

let songs = [
{
title:"Demo Song",
artist:"SoundHelix",
src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
},
{
title:"Demo Song 2",
artist:"SoundHelix",
src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
},
{
title:"Demo Song 3",
artist:"SoundHelix",
src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
}
];
let index = 0;

function loadSong(song){
title.textContent = song.title;
artist.textContent = song.artist;
audio.src = song.src;
}

loadSong(songs[index]);

function playSong(){
audio.play();
playBtn.textContent="⏸";
}

function pauseSong(){
audio.pause();
playBtn.textContent="▶";
}

playBtn.addEventListener("click",()=>{
if(audio.paused){
playSong();
}else{
pauseSong();
}
});

function nextSong(){
index++;
if(index > songs.length-1){
index=0;
}
loadSong(songs[index]);
playSong();
}

function prevSong(){
index--;
if(index < 0){
index = songs.length-1;
}
loadSong(songs[index]);
playSong();
}

nextBtn.addEventListener("click",nextSong);
prevBtn.addEventListener("click",prevSong);

audio.addEventListener("timeupdate",()=>{

let progressPercent = (audio.currentTime / audio.duration)*100;

progress.value = progressPercent;

current.textContent = formatTime(audio.currentTime);
duration.textContent = formatTime(audio.duration);

});

progress.addEventListener("input",()=>{
audio.currentTime = (progress.value/100)*audio.duration;
});

volume.addEventListener("input",()=>{
audio.volume = volume.value;
});

function formatTime(time){
let min = Math.floor(time/60);
let sec = Math.floor(time%60);
if(sec<10) sec="0"+sec;
return min+":"+sec;
}

audio.addEventListener("ended",nextSong);

songs.forEach((song,i)=>{

let li = document.createElement("li");

li.textContent = song.title+" - "+song.artist;

li.addEventListener("click",()=>{
index = i;
loadSong(songs[index]);
playSong();
});

playlist.appendChild(li);

});