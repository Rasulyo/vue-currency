<template>
  <div class="home">
    <h1>Курсы валют относительно {{ baseCurrency }}</h1>
    <ul v-if="getRates">
      <li v-for="(rate, currency) in baseCurrencyPairs" :key="currency">
        1 {{ baseCurrency }} {{ rate }} {{ currency }}
      </li>
    </ul>
    <p v-else>Курсы валют загружаются...</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HomeView",
  computed: {
    ...mapGetters("currency", ["getRates", "getBaseCurrency"]),
    baseCurrency() {
      return this.getBaseCurrency;
    },
    baseCurrencyPairs() {
      return this.getCalculatedCurrencies(this.baseCurrency);
    },
  },
  methods: {
    ...mapActions("currency", ["fetchRates"]),
    getCalculatedCurrencies(baseCurrency) {
      const rates = this.getRates;

      let baseCurrencyPairs = {};

      for (const [currencyPair, rate] of Object.entries(rates)) {
        const [fromCurrency, toCurrency] = currencyPair.split("-");
        if (
          fromCurrency === baseCurrency.toLocaleLowerCase() &&
          toCurrency !== baseCurrency.toLocaleLowerCase()
        ) {
          baseCurrencyPairs[toCurrency] = rate.toFixed(2);
        } else if (
          toCurrency === baseCurrency.toLocaleLowerCase() &&
          fromCurrency !== baseCurrency.toLocaleLowerCase()
        ) {
          baseCurrencyPairs[fromCurrency] = (1 / rate).toFixed(2);
        }
      }

      return baseCurrencyPairs;
    },
  },
  mounted() {
    this.fetchRates();
  },
};
</script>

<style scoped>
.home {
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  font-size: 18px;
  margin: 10px 0;
}
</style>
