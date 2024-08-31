<template>
  <header>
    <nav>
      <router-link class="custom-link" to="/">
        <VButton>Главная страница</VButton>
      </router-link>
      <router-link class="custom-link" to="/convert">
        <VButton>Конвертация</VButton>
      </router-link>
      <select v-model="baseCurrency" @change="changeCurrency">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="RUB">RUB</option>
      </select>
    </nav>
  </header>
  <router-view></router-view>
</template>

<script>
import VButton from "@/components/v-button/VButton.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    VButton,
  },
  computed: {
    ...mapGetters("currency", ["getBaseCurrency"]),
    baseCurrency: {
      get() {
        return this.getBaseCurrency;
      },
      set(value) {
        this.setBaseCurrency(value);
      },
    },
  },
  methods: {
    ...mapActions("currency", ["setBaseCurrency", "fetchRates"]),
    changeCurrency() {
      this.setBaseCurrency(this.baseCurrency);
      this.fetchRates();
    },
  },
  mounted() {
    this.fetchRates();
    console.log("fetched");
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  display: flex;
  gap: 20px;

  .custom-link {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
