<template>
  <div class="game" @click="capture($event)">
    <video
      ref="video"
      id="video"
      width="100%"
      height="auto"
      autoplay
    />
    <img id="poulpe_in_game" :src="poulpeImg" v-if="challenge" />
    <v-footer fixed height="180px" class="text-xs-center" v-if="challenge">
      <p class="headline">
        Énigme
      </p>
      <p class="riddle">
        {{challenge.riddle_text}}
      </p>
      <p class="small">
        Cliquez n'importe où pour envoyer une photo.
      </p>
    </v-footer>
  </div>
</template>

<style lang="scss" scoped>
#poulpe_in_game {
  position: absolute;
  bottom: 180px;
  right: 0;
  max-width: 40%;
}

.v-footer {
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #6200ee;
  vertical-align: middle;

  .headline {
    font-weight: bold;
  }

  .riddle {
    font-size: 20px;
  }

  .small {
    font-size: 12px;
  }
}
</style>

<script>
import axios from 'axios';

export default {
  name: 'game',
  data() {
    return {
      challenge: null,
      poulpeImg: null,
      timer: null,
    };
  },
  mounted() {
    this.setVideoSrc(this.$store.state.cameraId);

    axios.get('https://romal-server.scalingo.io/api/running-challenges/')
    .then((runningChallengeResponse) => {
      this.runningChallengeId = runningChallengeResponse.data[0].challenge;
      
      axios.get(`https://romal-server.scalingo.io/api/challenges/${this.runningChallengeId}`)
      .then((challengeResponse) => {
        this.challenge = challengeResponse.data;
        this.poulpeImg = '/img/poulpe/waiting.png';
      });
    });
  },
  methods: {
    setVideoSrc(cameraId) {
      if(!cameraId) return;

      this.video = this.$refs.video;

      navigator.mediaDevices.getUserMedia( {video: {deviceId: {exact: cameraId}}} )
      .then((stream) => {
        this.video.srcObject = stream;
        return navigator.mediaDevices.enumerateDevices();
      }).then((devices) => {
        // TODO: chck for label updats here ? cf https://github.com/webrtc/samples/blob/gh-pages/src/content/devices/input-output/js/main.js
      });
    },
    capture($event) {
      if (!this.runningChallengeId) return;
      const video = this.$refs.video;

      const w = video.videoWidth;
      const h = video.videoHeight;
      const canvas = document.createElement('canvas');
      canvas.width  = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, w, h);

      let data = canvas.toDataURL().split('data:image/png;base64,')[1];

      if(this.timer !== null) {
        clearTimeout(this.timer);
      }

      this.poulpeImg = '/img/poulpe/surprised.png';

      axios.post(`https://romal-server.scalingo.io/api/challenges/${this.runningChallengeId}/solve/`,
				data,
				{
					headers: {
						'Content-Disposition': 'form-data; name="file"; filename="upload.png"'
					}
        })
			.then((response) => {
        console.log(response);
        if (response.solved === true) {
          this.poulpeImg = '/img/poulpe/joy.png';
        } else {
          this.poulpeImg = '/img/poulpe/angry.png';
          this.timer = setTimeout(() => {
            this.poulpeImg = '/img/poulpe/waiting.png';
          }, 2000);
        }
      })
      .catch((e) => {
        console.error(e);
        this.poulpeImg = '/img/poulpe/angry.png';
        this.timer = setTimeout(() => {
          this.poulpeImg = '/img/poulpe/waiting.png';
        }, 2000);
      })
    },
  },
  watch: {
    ['$store.state.cameraId'](cameraId) {
      this.setVideoSrc(cameraId);
    },
  },
};
</script>
