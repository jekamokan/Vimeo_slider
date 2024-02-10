// ініціалізація Swiper
const swiper1 = new Swiper('#swiper-container-1', {
  slidesPerView: 4, 
  pagination: {
      el: '.swiper-pagination-1',
      clickable: true,
  },
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
  on: {
      init: function () {
          initVideoPlayers();
      },
      slideChange: function () {
          pauseAllVideos();
      },
  }
});


const swiper2 = new Swiper('#swiper-container-2', {
  slidesPerView: 1, 
  pagination: {
      el: '.swiper-pagination-2',
      clickable: true,
  },
  on: {
      init: function () {
          initVideoPlayers();
      },
      slideChange: function () {
          pauseAllVideos();
      },
  },
  thumbs: {
      swiper: swiper1 
  }
});

// змінні
const getClass = className => document.querySelector('.' + className);
const getAllClass = className => document.querySelectorAll('.' + className);
const popup = getClass('popup')
const closeBtn = getClass('close-btn');
let selectedVideoId = null;
const swiperSlides = getAllClass("swiper-slide");

// Ловимо клік при натисканні на перший слайд
swiperSlides.forEach((swiperSlide) => {
    swiperSlide.addEventListener('click', function () {
        const videoId = swiperSlide.querySelector('.video-player').getAttribute('id');
        popup.style.display = 'block';
        console.log(videoId);
        playVideoInPopup(videoId);
    });
});

// Запуск відео в popup
function playVideoInPopup(videoId) {
  const popupVideoPlayer = document.querySelector(`#swiper-container-2 #${CSS.escape(videoId)}`);
  if (popupVideoPlayer) {
      const options = {
          id: popupVideoPlayer.getAttribute('data-video-id'),
          width: '100%',
          loop: false
      };
      const player = new Vimeo.Player(popupVideoPlayer, options);
      player.ready().then(function () {
          player.play();
      });
  }
}

// функція для закривання popup та ії виклик
const closePopup = (event) => {
    if (event.target === popup || event.target === closeBtn) {
        popup.style.display = 'none';
        pauseAllVideos();
    }
};

popup.addEventListener('click', closePopup);
closeBtn.addEventListener('click', closePopup);



// ініціалізація відео
function initVideoPlayers() {
    const videoPlayers = document.querySelectorAll('.video-player');
    videoPlayers.forEach(function (playerContainer) {
        const videoId = playerContainer.getAttribute('data-video-id');
        const options = {
            id: videoId,
            width: '100%',
            loop: false
        };
        const player = new Vimeo.Player(playerContainer, options);
    });
}

// при зміні слайда зупиняти відео
function pauseAllVideos() {
    const videoPlayers = document.querySelectorAll('.video-player');
    videoPlayers.forEach(function (playerContainer) {
        const player = playerContainer.querySelector('iframe');
        if (player) {
            const playerAPI = new Vimeo.Player(player);
            playerAPI.pause();
        }
    });
}
