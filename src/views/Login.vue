<template>
  <div class="login">

    <v-card style="position: absolute; top:0; bottom: 0; left: 0; right: 0;">
      <v-card-text style="position: absolute; bottom: 15px; right: 0;">
        <v-btn
          absolute
          dark
          fab
          top
          right
          color="green darken-2"
          @click="save"
        >
          <v-icon>save</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>

    <v-container>
      <v-layout row>
        <v-flex xs12 style="z-index: 0;" pt-3 pb-4>
          <p class="title">Enregistrer votre pseudo pour comparer votre score avec les autres joueurs</p>
          <p class="subheading">Insérez votre e-mail si vous voulez plus d'informations sur les prochains événements du HackSXB !</p>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12>
          <v-form v-model="valid">
            <v-text-field
              v-model="pseudo"
              :rules="pseudoRules"
              label="Pseudo"
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
            ></v-text-field>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export default {
  name: 'login',
  mounted() {
    if (this.$store.state.pseudo !== null) {
      this.pseudo = this.$store.state.pseudo;
    } else if (localStorage.getItem('pseudo')) {
      this.pseudo = localStorage.getItem('pseudo');
    }


    if (this.$store.state.email !== null) {
      this.email = this.$store.state.email;
    } else if (localStorage.getItem('email')) {
      this.email = localStorage.getItem('email');
    }
  },

  data: () => ({
    valid: false,
    pseudo: '',
    pseudoRules: [
      v => v.length <= 12 || 'Moins de 13 caractères'
    ],
    email: '',
    emailRules: [
      v => v.length === 0 || emailRegex.test(v) || 'E-mail invalide'
    ]
  }),
  methods: {
    save() {
      if(!this.valid) return;
      localStorage.setItem('pseudo', this.pseudo);
      localStorage.setItem('email', this.email);

      this.$store.state.pseudo = this.pseudo;
      this.$store.state.email = this.email;
    }
  }
};
</script>
