<template>
  <div>
    <h1>Конвертация валют</h1>
    <div class="converter">
      <CurrencySelector
        :currencies="currencies"
        :selectedCurrency="fromCurrency"
        @update:selectedCurrency="fromCurrency = $event"
        label="Из"
      />
      <CurrencyInput
        :amount="fromAmount"
        label="Сумма"
        placeholder="Введите сумму"
        @update:amount="fromAmount = $event"
        @focus="
          focusedFirst = true;
          focusedSecond = false;
        "
      />

      <CurrencySelector
        :currencies="currencies"
        :selectedCurrency="toCurrency"
        @update:selectedCurrency="toCurrency = $event"
        label="В"
      />
      <CurrencyInput
        :amount="toAmount"
        label="Результат"
        placeholder="Результат"
        @update:amount="toAmount = $event"
        @focus="
          focusedFirst = false;
          focusedSecond = true;
        "
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import CurrencySelector from "./CurrencySelector.vue";
import CurrencyInput from "./CurrencyInput.vue";

export default {
  components: {
    CurrencySelector,
    CurrencyInput,
  },
  setup() {
    const store = useStore();
    const fromCurrency = ref("USD");
    const toCurrency = ref("RUB");
    const fromAmount = ref(1000);
    const toAmount = ref(0);
    const currencies = ["USD", "EUR", "RUB"];

    const focusedFirst = ref(false);
    const focusedSecond = ref(false);
    const getRates = computed(() => store.getters["currency/getRates"]);

    const getCalculatedCurrencies = (fromCurrency, toCurrency) => {
      const rates = getRates.value;
      const rate = rates[`${fromCurrency}-${toCurrency}`];
      return rate ? Number(rate.toFixed(2)) : null;
    };

    const convertCurrency = () => {
      const rate = getCalculatedCurrencies(
        fromCurrency.value.toLowerCase(),
        toCurrency.value.toLowerCase()
      );

      if (rate) {
        if (focusedFirst.value) {
          toAmount.value = fromAmount.value * rate;
        } else if (focusedSecond.value) {
          const newRate = toAmount.value / rate;
          fromAmount.value = newRate.toFixed(2);
        }
      }
    };

    watch([fromAmount, toAmount, focusedFirst], convertCurrency);

    onMounted(() => {
      convertCurrency();
    });

    return {
      fromCurrency,
      toCurrency,
      fromAmount,
      toAmount,
      currencies,
      focusedFirst,
      focusedSecond,
    };
  },
};
</script>

<style scoped lang="scss">
.converter {
  display: flex;
  gap: 20px;
  max-width: 500px;
  margin: 0 auto;
  justify-content: center;
}
</style>
