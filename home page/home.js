var SongAlbums = [
    {
        name: '.Damn',
        image: './images/jcole kendrick.jpeg',
        artist: "Kendrick Lamar",
        genre: 'hiphop',
        tracks: [
            {
                title: 'Fear',
                artist: 'Kendrick Lamar',
                image: './images/Kendrick Lamar - DAMN_ (2017).jpeg',
                music: './Songs/FEAR..mp3'
            },
            {
                title: 'WorldWide',
                artist: 'Kendrick Lamar',
                image: './images/kendrick lamar new album cover.jpeg',
                music: './Songs/WorldWide.mp3'
            },
            {
                title: 'Not Like Us',
                artist: 'Kendrick Lamar',
                image: './images/Not Like Us Kendrick Lamar.jpeg',
                music: './Songs/NOTLIKEUS.mp3'
            }
        ]
    },
    {
        name: 'HipHop',
        image: './images/metro future.jpeg',
        artist: "MetroB ,Future ",
        genre: 'hiphop',
        tracks: [
            {
                title: 'Low Life',
                artist: 'future',
                image: './images/metro future.jpeg',
                music: './Songs/FEAR..mp3'
            },
            {
                title: 'Type shit',
                artist: 'MetroB, Future',
                image: './images/metro future.jpeg',
                music: './Songs/FEAR..mp3'
            }
        ]
    },
    {
        name: 'Pop',
        image: './images/weeknd dua.jpeg',
        artist: "Weeknd, dua lipa",
        genre: 'pop',
        tracks: [
            {
                title: 'New rules',
                artist: 'Dua lipa',
                image: './images/dua lipa.jpeg',
                music: './images/dua lipa.jpeg'
            },
            {
                title: 'Blinding lights',
                artist: 'The Weeknd',
                image: './images/blinding lights.jpeg',
                music: './Songs/The Weeknd - Blinding Lights (Official Video).mp3'
            }
        ]
    },
    {
        name: 'Pop',
        image: './images/micheal.jpeg',
        artist: "Micheal Jackson",
        genre: 'pop',
        tracks: [
            {
                title: 'They Don’t Care About Us',
                artist: 'Micheal Jackson',
                image: './images/Michael Jackson - Off the Wall Album.jpeg',
                music: './Songs/Michael Jackson - They Dont Care About Us (Brazil Version) (Official Video).mp3'
            }
        ]
    },
    {
        name: 'Rock',
        image: './images/Geluid.jpeg',
        artist: "Arctic Monkeys",
        genre: 'rock',
        tracks: [
            {
                title: 'Do i wanna know',
                artist: 'Arctic Monekys',
                image: './images/Geluid.jpeg',
                music: './Songs/Arctic Monkeys - Do I Wanna Know_ (Official Video).mp3'
            }
        ]
    },
    {
        name: 'Not Like Us',
        image: './images/Not Like Us Kendrick Lamar.jpeg',
        artist: "Kendrick Lamar",
        genre: 'hiphop',
        tracks: [
            {
                title: 'Not Like Us',
                artist: 'Kendrick Lamar',
                image: './images/Not Like Us Kendrick Lamar.jpeg',
                music: './Songs/NOTLIKEUS.mp3'
            }
        ]
    },
    {
        name: 'AC/DC',
        image: './images/ACdC.jpeg',
        artist: "AC/DC",
        genre: 'rock',
        tracks: [
            {
                title: 'Thunderstruck',
                artist: 'AC/DC',
                image: './images/AC_DC - The Razors Edge.jpeg',
                music: './Songs/ACDC - Thunderstruck (Official Video).mp3'
            }
        ]
    }
];

var currentrack = null;
var audio = new Audio();
var isPlaying = false;

function each(coll, f) {
    if (Array.isArray(coll)) {
        for (var i = 0; i < coll.length; i++) {
            f(coll[i], i);
        }
    } else {
        for (var key in coll) {
            f(coll[key], key);
        }
    }
}

function map(array, func) {
    var acc = [];
    each(array, function(element, i) {
        acc.push(func(element, i));
    });
    return acc;
}


$(document).ready(function() {
    // time in mn&scnd
    function ConvertTiti(seconds) {
        var minutes = Math.floor(seconds / 60);
        var secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // durat slider
    function SliderMov() {
        $('#duration-slider').val(audio.currentTime / audio.duration * 100);
        $('#current-time').text(ConvertTiti(audio.currentTime));
    }


      $('#duration-slider').on('input', function() {
        audio.currentTime = $(this).val() / 100 * audio.duration;
    });


     
    $('#play-pause').click(function() {
        if (isPlaying) {
            $(this).html('<i class="fas fa-play"></i>');
            audio.play();
        } else {
            $(this).html('<i class="fas fa-pause"></i>');
            audio.pause();
        }
        isPlaying =!isPlaying
    });

    
    $('#volume-slider').on('input', function() {
        audio.volume = $(this).val();
    });

    
    $('#duration-slider').on('input', function() {
        audio.currentTime = $(this).val() / 100 * audio.duration;
    });

  
    function addAlbums(genre) {
        $('#albums-container').empty();
        var filteredAlbums = SongAlbums.filter(function(album) {
            return genre === 'all' || album.genre === genre;
        });
        filteredAlbums.forEach(function(album) {
            var albumElem = $('<div class="album"></div>');
            var albumHeader = $('<div class="album-header"></div>');
            var albumDetail = $('<div class="album-details"></div>');

            albumHeader.append('<h2 class="album-name">' + album.name + '</h2>');
            albumHeader.append('<img class="album-image" src="' + album.image + '" alt="' + album.name + '">');
            albumDetail.append('<p class="album-artist">Artist: ' + album.artist + '</p>');

            var trackList = $('<div class="track-list" style="display: none;"></div>');

            album.tracks.forEach(function(track) {
                var trackElement = $('<div class="track"></div>');
                trackElement.append('<h3>' + track.title + '</h3>');
                trackElement.append('<p>Artist: ' + track.artist + '</p>');
                trackElement.append('<img src="' + track.image + '" alt="' + track.title + '" class="track-image">');
                trackList.append(trackElement);
                trackElement.click(function() {
                    if (currentrack !== track) {
                        currentrack = track;
                        audio.src = track.music;
                        audio.play();
                        $('#play-pause').html('<i class="fas fa-pause"></i>');
                        isPlaying = true;
                        audio.addEventListener('loadedmetadata', function() {
                            $('#tot-durat').text(ConvertTiti(audio.duration));
                        });
                    }
                });
            });

            albumElem.append(albumHeader);
            albumElem.append(albumDetail);
            albumElem.append(trackList);
            $('#albums-container').append(albumElem);

            albumHeader.click(function() {
                trackList.slideToggle();
            });
        });
    }





    
    addAlbums('all');
    $('.filter-btn').click(function() {
        var genre = $(this).data('genre');
        addAlbums(genre);
    });

    //  genre button 
    $('#random-genre-btn').click(function() {
        var genres = ['hiphop', 'pop', 'rock'];
        var randomGenre = genres[Math.floor(Math.random() * genres.length)];
        addAlbums(randomGenre);
    });
    
    $(document).on('click', '.track-list', function() {
        document.body.style.paddingTop = '900px';
        console.log('clicked');
    });
});


// ;) <3 ❤😁😵👽