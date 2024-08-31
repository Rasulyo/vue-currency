<template>
  <div class="currency-input">
    <label>{{ label }}</label>
    <input
      type="text"
      :value="amount"
      :placeholder="placeholder"
      @input="handleInput"
      @focus="onFocus"
    />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  props: {
    amount: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Введите сумму",
    },
  },
  data() {
    return {
      errorMessage: "",
    };
  },
  methods: {
    handleInput(event) {
      const value = event.target.value;
      if (value === "") {
        this.errorMessage = "Пожалуйста, введите число.";
        this.$emit("update:amount", 0);
      } else if (isNaN(value)) {
        this.errorMessage = "Пожалуйста, введите действительное число.";
        this.$emit("update:amount", 0);
      } else {
        this.errorMessage = "";
        this.$emit("update:amount", parseFloat(value));
      }
    },
    onFocus() {
      this.$emit("focus");
    },
  },
};
</script>

<style scoped>
.currency-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 150px;
  width: 100%;
  margin: 0 10px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
