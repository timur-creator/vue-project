<template>
  <div class="results">
    <p>Last results:</p>
    <ul>
      <transition-group name="results__list">
        <li
          class="results__list-item"
          v-for="(value, index) in resultsToSave"
          v-bind:key="value"
        >
          Result {{ index + 1 }}: {{ value }}
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LastResults",
  props: {
    resultsToSave: Array
  }
};
</script>

<style scoped>
.results {
  margin: 0;
  padding-left: 45px;
  width: 280px;
}

.results p {
  font-size: 22px;
  font-weight: bold;
}

.results ul {
  list-style-type: none;
  padding-left: 0;
}

.results__list-item {
  font-size: 18px;
}

.results__list-enter-active,
.results__list-leave-active {
  transition: all 1s;
}

.results__list-enter,
.results__list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
