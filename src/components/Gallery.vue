<template>
  <div>
    <div class="gallery-menu-container">
      <ul class="gallery-menu" :class="menuState"
          @click="openMenu" ref="galleryMenu">
        <li class="current-category" v-show="isShow">{{ currentCategory }}</li>
        <li :key="cat.categoryName"
          v-for="(cat, index) in galleryData"
          class="choose-category-button"
          @click="chooseCategory(index)"
        >
          {{ cat.categoryName }}
        </li>
      </ul>
    </div>

    <div class="gallery-container">
      <div
        v-for="(img, index) in category"
        :key="img.src"
        v-show="img.isActive"
      >
        <img :src="img.src" :alt="img.alt" @click="nextFoto(index)" />
        <div class="image-switcher">
          <button @click="lastFoto(index)">
            Last
          </button>
          <button @click="nextFoto(index)">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Gallery",
  data() {
    return {
      menuState: "menu-closed",
      category: "Animals",
      currentCategory: "Animals",
      isShow: true,
      galleryData: [
        {
          categoryName: "Animals",
          categoryList: [
            {
              src: require("../assets/Animals/Eagle.png"),
              alt: "Eagle",
              isActive: true
            },
            {
              src: require("../assets/Animals/Owl.png"),
              alt: "Owl",
              isActive: false
            },

            {
              src: require("../assets/Animals/Parrot.png"),
              alt: "Parrot",
              isActive: false
            },
            {
              src: require("../assets/Animals/Penguin.png"),
              alt: "Peguin",
              isActive: false
            },
            {
              src: require("../assets/Animals/Zebra.png"),
              alt: "Zebra",
              isActive: false
            }
          ]
        },
        {
          categoryName: "Flowers",
          categoryList: [
            {
              src: require("../assets/Flowers/Dahlia.png"),
              alt: "Dahlia",
              isActive: true
            },
            {
              src: require("../assets/Flowers/Dandelion.png"),
              alt: "Dandelion",
              isActive: false
            },
            {
              src: require("../assets/Flowers/Flower.png"),
              alt: "Flower",
              isActive: false
            },
            {
              src: require("../assets/Flowers/Lotus.png"),
              alt: "Lotus",
              isActive: false
            },
            {
              src: require("../assets/Flowers/Poppy.png"),
              alt: "Poppy",
              isActive: false
            },
            {
              src: require("../assets/Flowers/Red Rose.png"),
              alt: "Red Rose",
              isActive: false
            },
            {
              src: require("../assets/Flowers/Sunflower.png"),
              alt: "Sunflower",
              isActive: false
            },
            {
              src: require("../assets/Flowers/Whiterose.png"),
              alt: "Whiterose",
              isActive: false
            },
            {
              src: require("../assets/Flowers/Yellow Daisy.png"),
              alt: "Yellow Daisy",
              isActive: false
            }
          ]
        },
        {
          categoryName: "Instruments",
          categoryList: [
            {
              src: require("../assets/Instruments/Drum.png"),
              alt: "Drum",
              isActive: true
            },
            {
              src: require("../assets/Instruments/Guitar.png"),
              alt: "Guitar",
              isActive: false
            },
            {
              src: require("../assets/Instruments/Piano.png"),
              alt: "Piano",
              isActive: false
            },
            {
              src: require("../assets/Instruments/Turntable.png"),
              alt: "Turntable",
              isActive: false
            },
            {
              src: require("../assets/Instruments/Violin.png"),
              alt: "Violin",
              isActive: false
            }
          ]
        },
        {
          categoryName: "Sport",
          categoryList: [
            {
              src: require("../assets/Sports/8ball.png"),
              alt: "8ball",
              isActive: true
            },
            {
              src: require("../assets/Sports/Baseball.png"),
              alt: "Baseball",
              isActive: false
            },
            {
              src: require("../assets/Sports/Basketball.png"),
              alt: "Basketball",
              isActive: false
            },
            {
              src: require("../assets/Sports/Bowling.png"),
              alt: "Bowling",
              isActive: false
            },
            {
              src: require("../assets/Sports/Football.png"),
              alt: "Football",
              isActive: false
            },
            {
              src: require("../assets/Sports/Golf.png"),
              alt: "Golf",
              isActive: false
            },
            {
              src: require("../assets/Sports/Hockey.png"),
              alt: "Hockey",
              isActive: false
            },
            {
              src: require("../assets/Sports/Soccer.png"),
              alt: "Soccer",
              isActive: false
            },
            {
              src: require("../assets/Sports/Target.png"),
              alt: "Target",
              isActive: false
            },
            {
              src: require("../assets/Sports/Tennis.png"),
              alt: "Tennis",
              isActive: false
            },

          ]
        },
      ]
    };
  },

  mounted() {
    this.categoryOnLoad();
  },

  methods: {
    categoryOnLoad() {
      let cat = this.galleryData.find(
        galleryItem => galleryItem.categoryName === "Animals"
      );
      this.category = cat.categoryList;
    },
    openMenu() {
      if (this.menuState === "menu-opened") {
        this.menuState = "menu-closed";
        this.isShow = true;
      } else {
        this.menuState = "menu-opened";
        this.isShow = false;
      }
    },
    chooseCategory(index) {
      this.category = this.galleryData[index].categoryList;
      this.currentCategory = this.galleryData[index].categoryName;
    },
    lastFoto(index) {
      this.category[index].isActive = false;
      if (index > 0) {
        this.category[index - 1].isActive = true;
      } else {
        this.category[this.category.length - 1].isActive = true;
      }
    },

    nextFoto(index) {
      this.category[index].isActive = false;
      if (index < this.category.length - 1) {
        this.category[index + 1].isActive = true;
      } else {
        this.category[0].isActive = true;
      }
    },

    documentClick(e) {
      let el = this.$refs.galleryMenu;
      let target = e.target;
      if (el !== target && !el.contains(target)) {
        this.closeDropDown();
      }
    },

    closeDropDown() {
      this.menuState = "menu-closed";
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
.gallery-menu-container {
  height: 200px;
  .gallery-menu {
    border: #007feb solid;
    border-radius: 4px;
    color: #ff5722;
    font-size: 22px;
    font-weight: bold;
    margin: 0 auto;
    overflow: hidden;
    padding-left: 0;
    width: 120px;
    @media (max-width: 768px) {
      font-size: 16px;
    }
    &.menu-closed {
      height: 30px;
      @media (max-width: 768px) {
        height: 25px;
      }
    }

    &.menu-opened {
      height: 120px;
    }
    li {
      cursor: pointer;
    }
    .current-category {
      height: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .choose-category-button {
      align-self: center;
      color: #379a93;
      cursor: pointer;
      display: block;
      font-size: 20px;
      font-weight: bold;
      list-style: none;
      &:hover {
        background-color: red;
        color: white;
      }
    }
  }
}

.gallery-container {
  display: flex;
  flex-direction: column;
  img {
    @media (max-width: 768px) {
      max-width: 80vw;
    }
  }
  .image-switcher {
    button {
      background-color: #2c3e50;
      border-radius: 3px;
      font-size: 16px;
      font-weight: bold;
      color: white;
      cursor: pointer;
      height: 30px;
      margin: 10px;
      opacity: 0.8;
      width: 70px;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
