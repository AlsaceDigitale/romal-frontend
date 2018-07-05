<template>
  <div ref="home" class="home story" @click="nextText">
    <img ref="img" src="img/sleeping.png"/>
    <div class="text-box" v-if="currentText.length > 0">
      <span>{{ currentText }}</span>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.home {
  background: #ddede2;
  transition: background-color 1500ms;

  &.story {
  background: black;

    img {
      opacity: 0;
    }

    .text-box {
      bottom: 45%;
    }
  }
}

img {
  width: 100%;
  max-width: 800px;
  top: 0;
  position: absolute;
  left: 0;
  transition: opacity 1500ms;
}

.text-box {
  height: 130px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  padding: 20px 50px;
  background: rgba(37, 35, 68, 0.9);
  border-radius: 80px;
  line-height: 90px;
  font-size: 18px;
  vertical-align: middle;
  transition: bottom 1000ms;
  -webkit-transition: bottom 1000ms;
  -moz-transition: bottom 1000ms;

  span {
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
  }
}
</style>

<script>
const storyTexts = [
  'Depuis des temps immémoriaux, le Poulpe Sanguinaire sommeille dans les tréfonds de l\'Ill',
  'Hélas ! Les travaux sur la presqu\'île, le réchauffement climatique et des troubles gastriques l\'ont tiré de sa torpeur',
  'Distrayez-le en répondant à ses énigmes, où il détruira Strasbourg !',

  'ZZzzzzzz...',
  'Mmh qu\'est-ce que c\'est...',
  'Ah, encore un humain...',
  'Bon, tu viens pour jouer je suppose ?',
  'C\'est pas bien compliqué, ton petit cerveau d\'humain devrait réussir à comprendre',
  'Je te propose une énigme, et il faut que tu m\'envois une photo qui correspond',
  'Si je te demande une photo d\'un truc sur lequel tu peux t\'assoir, m\'envois pas un écureil quoi...',
  'C\'est parti ?',
];

const conneries = [
  'Les chatons c\'est mignon',
  'Elle est où la poulette ?',
  'Ils sont à quel étage les toilettes ?',
  'C’est trop calme... J’aime pas trop beaucoup ça... J’préfère quand c’est un peu trop plus moins calme...',
  'Nyyaaa~~',
  'Tu penses que j\'peux avoir un truc à boire ? Fait chaud là haut...'
]

export default {
  name: 'home',
  data() {
    return {
      finishedIntro: false,
      currentTextId: 0,
      currentText: storyTexts[0],
    };
  },
  mounted() {
    if(this.$store.state.finishedIntro) {
      this.finishedIntro = true;

      this.currentText = '';
      this.$refs.home.classList.remove('story');
      this.$refs.img.src = 'img/jaded.png';

      let self = this;
      (function loop() {
        const rand = 10000 + (Math.random() - 0.5) * 5000;
        setTimeout(() => {
          self.currentText = conneries[Math.floor(Math.random() * conneries.length)];
          setTimeout(() => {
            self.currentText = '';
            loop();
          }, 400 + self.currentText.length * 30)
        }, rand);
      }());
    }
  },
  methods: {
    nextText() {
      if(!this.finishedIntro) {
        if (this.currentTextId < storyTexts.length) {
          this.currentTextId += 1;
          this.currentText = storyTexts[this.currentTextId];
        }

        if (this.currentTextId === 3) {
          this.$refs.home.classList.remove('story');
        }
        if (this.currentTextId === 4) {
          this.$refs.img.src = 'img/tired.png';
        }
        if (this.currentTextId === 5) {
          this.$refs.img.src = 'img/jaded.png';
        }

        if (this.currentTextId === 11) {
          this.$store.state.finishedIntro = true;
          this.$router.push('/game');
        }
      }
    },
  },
};
</script>
