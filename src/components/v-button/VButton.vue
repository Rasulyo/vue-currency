<script setup></script>

<template>
  <button class="v-button" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<style scoped lang="scss">
@import "v-button";
</style>
