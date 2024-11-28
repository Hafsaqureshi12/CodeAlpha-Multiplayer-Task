class MusicPlayer {
    constructor() {
        this.audioPlayer = document.getElementById('audio-player');
        this.playPauseBtn = document.getElementById('play-pause-btn');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.volumeControl = document.getElementById('volume-control');
        this.nowPlaying = document.getElementById('now-playing');
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        this.categorySelect = document.getElementById('category-select'); // Category dropdown
        this.playlist = document.getElementById('playlist');

        this.songs = [
            { title: "Song 1", artist: "Artist 1", src: "./music/song1.mp3", category: "rock" },
            { title: "Song 2", artist: "Artist 2", src: "./music/song2.mp3", category: "jazz" },
            { title: "Song 3", artist: "Artist 3", src: "./music/song3.mp3", category: "jazz" },
            { title: "Song 4", artist: "Artist 4", src: "./music/song4.mp3", category: "rock" },
            { title: "Song 5", artist: "Artist 5", src: "./music/song5.mp3", category: "pop" },
            { title: "Song 6", artist: "Artist 6", src: "./music/song6.mp3", category: "pop" },
            { title: "Song 7", artist: "Artist 7", src: "./music/song7.mp3", category: "pop" },
        ];

        this.currentSongIndex = 0;
        this.isPlaying = false;

        this.initEventListeners();
        this.renderPlaylist();  // Initial render
    }

    initEventListeners() {
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.prevBtn.addEventListener('click', () => this.playPrevious());
        this.nextBtn.addEventListener('click', () => this.playNext());
        this.volumeControl.addEventListener('input', (e) => this.setVolume(e.target.value));
        this.searchBtn.addEventListener('click', () => this.searchSongs());
        this.categorySelect.addEventListener('change', () => this.filterByCategory()); // Listen for category change
        this.audioPlayer.addEventListener('ended', () => this.playNext());
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.audioPlayer.pause();
            this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            this.audioPlayer.play();
            this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        this.isPlaying = !this.isPlaying;
    }

    playPrevious() {
        this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
        this.playSong();
    }

    playNext() {
        this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
        this.playSong();
    }

    playSong() {
        const song = this.songs[this.currentSongIndex];
        this.audioPlayer.src = song.src;
        this.audioPlayer.play();
        this.nowPlaying.textContent = `Now Playing: ${song.title} - ${song.artist}`;
        this.isPlaying = true;
        this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        this.highlightActiveSong();
    }

    setVolume(volume) {
        this.audioPlayer.volume = volume;
    }

    searchSongs() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const filteredSongs = this.songs.filter(song =>
            song.title.toLowerCase().includes(searchTerm) ||
            song.artist.toLowerCase().includes(searchTerm)
        );
        this.renderPlaylist(filteredSongs);
    }

    filterByCategory() {
        const category = this.categorySelect.value;
        const filteredSongs = category === 'all' ? this.songs : this.songs.filter(song => song.category === category);
        this.renderPlaylist(filteredSongs);
    }

    renderPlaylist(songsToRender = this.songs) {
        this.playlist.innerHTML = '';
        songsToRender.forEach((song, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item playlist-item';
            li.textContent = `${song.title} - ${song.artist}`;
            li.addEventListener('click', () => {
                this.currentSongIndex = this.songs.indexOf(song);
                this.playSong();
            });
            this.playlist.appendChild(li);
        });
        this.highlightActiveSong();
    }

    highlightActiveSong() {
        const playlistItems = this.playlist.querySelectorAll('.playlist-item');
        playlistItems.forEach((item, index) => {
            item.classList.toggle('active-song', index === this.currentSongIndex);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MusicPlayer();
});


