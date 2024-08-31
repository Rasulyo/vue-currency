<template>
  <div>
    <h1>Конвертация валют</h1>
    <div class="converter">
      <div class="conversion-field">
        <label>Из</label>
        <select v-model="fromCurrency">
          <option
            v-for="currency in currencies"
            :key="currency"
            :value="currency"
          >
            {{ currency }}
          </option>
        </select>
        <input
          type="text"
          v-model.number="fromAmount"
          placeholder="Введите сумму"
          @focus="
            focusedFirst = true;
            focusedSecond = false;
          "
        />
      </div>

      <div class="conversion-field">
        <label>В</label>
        <select v-model="toCurrency">
          <option
            v-for="currency in currencies"
            :key="currency"
            :value="currency"
          >
            {{ currency }}
          </option>
        </select>
        <input
          type="number"
          v-model.number="toAmount"
          placeholder="Результат"
          @focus="
            focusedFirst = false;
            focusedSecond = true;
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";

export default {
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

<style scoped>
.converter {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.conversion-field {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  margin-bottom: 5px;
}

select,
input {
  margin: 5px;
  padding: 10px;
  font-size: 16px;
}
</style>
