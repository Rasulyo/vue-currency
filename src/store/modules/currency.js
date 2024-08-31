import axios from "axios";

const state = {
  rates: {},
  baseCurrency: "USD",
  secondCurrency: "RUB",
  thirdCurrency: "EUR",
  fromAmount: 1000,
  toAmount: 0,
};

const getters = {
  getRates: (state) => state.rates,
  getBaseCurrency: (state) => state.baseCurrency,
  getSecondCurrency: (state) => state.secondCurrency,
  getThirdCurrency: (state) => state.thirdCurrency,
  getFromAmount: (state) => state.fromAmount,
  getToAmount: (state) => state.toAmount,
};

const actions = {
  async fetchRates({ commit }) {
    try {
      const response = await axios.get(
        "https://status.neuralgeneration.com/api/currency"
      );
      commit("setRates", response.data);
    } catch (error) {
      console.error("Error fetching rates:", error);
    }
  },
  setBaseCurrency({ commit }, currency) {
    commit("setBaseCurrency", currency);
  },
  setFromAmount({ commit }, amount) {
    commit("setFromAmount", amount);
  },
  setToAmount({ commit }, amount) {
    commit("setToAmount", amount);
  },
};

const mutations = {
  setRates(state, rates) {
    state.rates = rates;
  },
  setBaseCurrency(state, currency) {
    state.baseCurrency = currency;
  },
  setFromAmount(state, amount) {
    state.fromAmount = amount;
  },
  setToAmount(state, amount) {
    state.toAmount = amount;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
