<template>
  <div>
    <h1>{{ msg }}</h1>
    <div class="menu">
      <span :class="normalModeClass" @click="checked = false">Normal Mode</span>
      <label class="mode-switcher">
        <input type="checkbox" :checked="switchMode()" v-model="checked" />
        <span><slot></slot></span>
      </label>
      <span :class="profiModeClass" @click="checked = true">Profi Mode</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModeSwitcher",
  props: [
    /*"switchModeOnOff"*/
  ],
  data() {
    return {
      checked: false,
      msg: "Calculator",
      normalModeClass: "menu-item-active",
      profiModeClass: "menu-item-passive"
    };
  },
  methods: {
    switchMode() {
      this.$emit("switchModeOnOff", this.checked);
      this.showSwitchAction();
    },
    showSwitchAction() {
      if (this.checked) {
        this.profiModeClass = "menu-item-active";
        this.normalModeClass = "menu-item-passive";
      } else {
        this.normalModeClass = "menu-item-active";
        this.profiModeClass = "menu-item-passive";
      }
    }
  }
};
</script>

<style>
.menu {
  display: flex;
  justify-content: center;
  margin: 20px;
}

.mode-switcher {
  transform: translateY(-5px);
}

.mode-switcher input[type="checkbox"] {
  display: none;
}

.mode-switcher input[type="checkbox"]:checked + span:before {
  background-color: rgba(0, 127, 235, 0.5);
}

.mode-switcher input[type="checkbox"]:checked + span:after {
  background-color: #007feb;
  transform: translate(80%, -50%);
}

.mode-switcher input[type="checkbox"] + span {
  cursor: pointer;
  display: inline-block;
  font-weight: 500;
  margin: 0px 15px;
  padding: 0px 15px;
  position: relative;
  text-align: left;
}

.mode-switcher input[type="checkbox"] + span:before,
label.mode-switcher input[type="checkbox"] + span:after {
  content: "";
  cursor: pointer;
  margin: 0;
  outline: 0;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  transition: all 200ms ease-out;
}

.mode-switcher input[type="checkbox"] + span:before {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  height: 14px;
  left: 1px;
  width: 34px;
}

.mode-switcher input[type="checkbox"] + span:after {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.14),
    0 2px 2px 0 rgba(0, 0, 0, 0.098), 0 1px 5px 0 rgba(0, 0, 0, 0.084);
  height: 20px;
  left: 0;
  width: 20px;
}

.menu-item-passive {
  cursor: pointer;
}

.menu-item-active {
  color: #007feb;
  font-weight: bold;
}

@media (max-width: 350px) {
  h1 {
    font-size: 20px;
  }

  .mode-switcher {
    margin: 5px 0;
  }

  .menu {
    display: flex;
    flex-flow: column;
  }
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>-->
