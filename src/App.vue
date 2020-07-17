<template>
  <div id="app">
    <Header />


    <keep-alive>
      <router-view class="main-content" />
    </keep-alive>
    <Footer class="footer" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";

import ToDoList from "./components/To-do-list.vue";
import Calculator from "./components/Calculator/Calculator.vue";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer.vue";
import Memory from "./components/Memory.vue";
import MeasureConversion from "./components/MeasureConversion.vue";

export default {
  name: "app",
  components: {
    Header,
    ToDoList,
    Calculator,
    Gallery,
    Footer,
    Memory,
    MeasureConversion
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .main-content {
    background-color: ghostwhite;
    min-height: 65vh;
    padding-bottom: 30px;
    padding-top: 25px;
    width: 100%;
  }
  .footer {
    max-width: 1200px;
    margin: 0 auto;
  }
}

</style>
