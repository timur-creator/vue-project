<template>
  <div class="header">
    <ul class="nav-list" ref="headerNavigation">
      <li class="nav-list__home-button"><a href="index.html">&#127968;</a></li>
      <li
        class="nav-list__element"
        v-for="item in navList"
        @click="item.isActive = !item.isActive"
      >
        <router-link
          :to="item.url"
          :title="item.name"
          class="nav-list__element-link"
        >
          {{ item.name }}
        </router-link>
        <transition name="dropDown">
          <ul v-show="item.isActive" class="drop-down">
            <li v-for="subItem in item.children">
              <router-link
                :to="subItem.url"
                class="menu-item"
                :title="subItem.name"
                >{{ subItem.name }}
              </router-link>
            </li>
          </ul>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {
      navList: [
        {
          url: "#",
          name: "About us",
          isActive: false,
          children: [
            { url: "#", name: "Story" },
            { url: "#", name: "Our Team" },
            { url: "#", name: "Our Rules" }
          ]
        },
        { url: "#", name: "News", isActive: false },
        {
          url: "#",
          name: "Tools",
          isActive: false,
          children: [
            { url: "/tools/calculator", name: "Calculator" },
            { url: "/tools/todolist", name: "ToDoList" },
            { url: "/tools/memory", name: "Memory" },
            { url: "/tools/measure-conversion", name: "Measure Conversion" }
          ]
        },
        { url: "/Gallery", name: "Gallery", isActive: false },
        { url: "#", name: "Contact us", isActive: false }
      ]
    };
  },
  methods: {
    documentClick(e) {
      let el = this.$refs.headerNavigation;
      let target = e.target;
      if (el !== target && !el.contains(target)) {
        this.closeDropDown();
      }
    },

    closeDropDown() {
      this.navList.forEach(navItem => (navItem.isActive = false));
    }
  },

  created() {
    document.addEventListener("click", this.documentClick);
  },

  destroyed() {
    // important to clean up!!
    document.removeEventListener("click", this.documentClick);
  }
};
</script>

<style lang="scss" scoped>
.header {
  background: linear-gradient(to right, red, blue, green);
  height: 30px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    background: linear-gradient(to right, red, green, blue, purple);
    height: 120px;
    width: 100%;
  }
}

.nav-list {
  display: flex;
  font-size: 20px;
  justify-content: space-around;
  list-style-type: none;
  margin: 0 auto;
  position: relative;
  width: 70%;

  @media (max-width: 768px) {
    flex-direction: column;
    font-size: 16px;
    justify-content: flex-start;
    margin: 0;
    padding-left: 10px;
    width: 80px;
  }
}

.nav-list__home-button {
  left: -10%;
  position: absolute;

  @media (max-width: 768px) {
    display: none;
  }
}

.nav-list__element {
  align-self: auto;
  text-align: left;
  position: relative;
  width: 120px;

  .nav-list__element-link {
    color: #ffffff;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      color: red;
      border-bottom: 3px solid red;
      border-top: 3px solid red;
    }
  }
}

.menu-item {
  &:hover {
    color: red;
    font-weight: bold;
  }
}

.drop-down {
  background-color: rgba(7, 0, 255, 0.3);
  border-radius: 5px;
  color: #fff7f4;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  padding-right: 10px;
  position: absolute;
  text-align: left;
  list-style-type: none;
  padding-left: 10px;

  @media (max-width: 768px) {
    left: 80px;
    top: 0;
    width: 80px;
  }

  a {
    color: #ffffff;
    text-decoration: none;
  }
}

.dropDown {
  /*transition: top 2s;*/
  display: flex;
}

.dropDown-enter-active {
  position: absolute;
  transition: transform 0.5s;
}

.dropDown-enter,
.dropDown-leave-to {
  transform: translateY(-50px) scaleY(0);
  opacity: 0;

  @media (max-width: 768px) {
    transform: translateY(-50px) translateX(-50px) scaleY(0);
  }
}
</style>
