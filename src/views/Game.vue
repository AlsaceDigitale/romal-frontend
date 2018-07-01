<template>
  <div class="game" @click="capture($event)">
    <video
      ref="video"
      id="video"
      width="100%"
      height="auto"
      autoplay
    />
    <v-footer fixed height="180px" class="text-xs-center">
      <p class="headline">
        Énigme
      </p>
      <p class="riddle">
        {{riddle}}
      </p>
      <p class="small">
        Cliquez n'importe où pour envoyer une photo.
      </p>
    </v-footer>
  </div>
</template>

<style lang="scss" scoped>
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
      riddle: "Vous permet de voir plus loin que le bout de votre nez.",
    };
  },
  mounted() {
    this.setVideoSrc(this.$store.state.cameraId);
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
      const video = this.$refs.video;

      const w = video.videoWidth;
      const h = video.videoHeight;
      const canvas = document.createElement('canvas');
      canvas.width  = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, w, h);

      let data = canvas.toDataURL().split('data:image/png;base64,')[1];

      axios.post('https://romal-server.scalingo.io/api/challenges/6/solve/',
				data,
				{
					headers: {
						'Content-Disposition': 'form-data; name="file"; filename="upload.png"'
					}
				}
			).then((response) => {
				console.log(response);
			});
    },
  },
  watch: {
    ['$store.state.cameraId'](cameraId) {
      this.setVideoSrc(cameraId);
    },
  },
};
</script>
