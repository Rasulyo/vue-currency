<template>
  <div class="currency-selector">
    <label>{{ label }}</label>
    <select :value="selectedCurrency" @change="updateCurrency">
      <option v-for="currency in currencies" :key="currency" :value="currency">
        {{ currency }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    currencies: {
      type: Array,
      required: true,
    },
    selectedCurrency: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateCurrency(event) {
      this.$emit("update:selectedCurrency", event.target.value);
    },
  },
};
</script>

<style scoped>
.currency-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
}

select {
  margin-top: 5px;
  padding: 10px;
  font-size: 16px;
}
</style>
