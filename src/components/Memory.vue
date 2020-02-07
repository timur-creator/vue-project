<template>
  <div class="memory-component">
    <Teaser />
    <div class="memory-container">
      <div
        v-for="(img, index) in imageGallery"
        :key="img.index"
        class="image-container"
      >
        <img
          :src="img.src"
          :alt="img.alt"
          @click="showImage(index)"
          :class="img.imageItem"
          class="image"
        />
      </div>
    </div>
    <div class="click_counter">
      <p>Count of click: {{ this.clickCount }}</p>
    </div>
    <div v-show="this.congratulation">
      <p>You win!!!</p>
    </div>
  </div>
</template>

<script>
import Teaser from "./Teaser.vue";

export default {
  name: "Memory",
  components: {
    Teaser
  },
  data() {
    return {
      imageGallery: [
        {
          src: require("../assets/Sports/8ball.png"),
          alt: "8ball",
          imageItem: "img-hide",
          opened: false
        },
        {
          src: require("../assets/Sports/Baseball.png"),
          alt: "Baseball",
          imageItem: "img-hide",
          opened: false
        },
        {
          src: require("../assets/Sports/Basketball.png"),
          alt: "Basketball",
          imageItem: "img-hide",
          opened: false
        },
        {
          src: require("../assets/Sports/Bowling.png"),
          alt: "Bowling",
          imageItem: "img-hide",
          opened: false
        },
        {
          src: require("../assets/Sports/Football.png"),
          alt: "Football",
          imageItem: "img-hide",
          opened: false
        },
        {
          src: require("../assets/Sports/Golf.png"),
          alt: "Golf",
          imageItem: "img-hide",
          opened: false
        },
        {
          src: require("../assets/Sports/Hockey.png"),
          alt: "Hockey",
          imageItem: "img-hide",
          opened: false
        },
        {
          src: require("../assets/Sports/Soccer.png"),
          alt: "Soccer",
          imageItem: "img-hide",
          opened: false
        },
        {
          src: require("../assets/Sports/Target.png"),
          alt: "Target",
          imageItem: "img-hide",
          opened: false
        },
        {
          src: require("../assets/Sports/Tennis.png"),
          alt: "Tennis",
          imageItem: "img-hide",
          opened: false
        }
      ],
      chooseOne: {
        obj: null,
        copy: {
          alt: null,
          opened: false
        }
      },
      chooseTwo: {
        obj: null,
        copy: {
          alt: null
        }
      },
      clickCount: 0,
      closedItem: null,
      congratulation: false
    };
  },
  mounted() {
    this.createField();
    ondragstart = function() {
      return false;
    };
  },

  methods: {
    createField() {
      let arr = JSON.parse(JSON.stringify(this.imageGallery));
      arr.push(...this.imageGallery);
      this.shuffle(arr);
      this.imageGallery = arr;
    },

    shuffle(arr) {
      let j, temp;
      for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      return arr;
    },

    showImage(index) {
      this.count();
      if (
        this.imageGallery[index].opened === false &&
        this.imageGallery[index] !== this.chooseOne.obj
      ) {
        this.imageGallery[index].imageItem = "img-active";
        this.chooseImage(index);
      }
    },

    chooseImage(index) {
      if (
        (!this.chooseOne.copy.src && !this.chooseTwo.copy.src) ||
        (this.chooseOne.copy.src && this.chooseTwo.copy.src)
      ) {
        this.chooseOne.obj = this.imageGallery[index];
        this.chooseOne.copy = Object.assign({}, this.imageGallery[index]);
      } else if (
        this.chooseOne.copy.src.length > 0 &&
        !this.chooseTwo.copy.src
      ) {
        this.chooseTwo.obj = this.imageGallery[index];
        this.chooseTwo.copy = Object.assign({}, this.imageGallery[index]);
        this.compareImages(index);
      }
    },

    compareImages() {
      if (this.chooseOne.copy.src === this.chooseTwo.copy.src) {
        this.chooseOne.obj.imageItem = "img-passive";
        this.chooseTwo.obj.imageItem = "img-passive";
        this.chooseOne.obj.opened = true;
        this.chooseTwo.obj.opened = true;
        this.clearCurrentCompare();
        this.winGame();
      } else {
        this.hideImageWithTimeOut();
      }
      this.clearCurrentCompare();
    },

    hideImageWithTimeOut() {
      setTimeout(this.hideImage, 500);
    },

    hideImage() {
      for (var i = 0; i < this.imageGallery.length; i++) {
        if (this.imageGallery[i].opened === false) {
          this.imageGallery[i].imageItem = "img-hide";
        }
      }
    },

    getStatus() {
      this.closedItem = this.imageGallery.find(item => item.opened == false);
      return this.closedItem;
    },

    winGame() {
      this.getStatus();
      if (!this.closedItem) {
        this.congratulation = true;
      }
    },

    clearCurrentCompare() {
      this.chooseOne.copy.src = null;
      this.chooseTwo.copy.src = null;
    },

    count() {
      this.clickCount += 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.memory-component {
  max-width: 1200px;
  margin: 0 auto;

  .memory-container {
    display: grid;
    grid-column-gap: 5px;
    grid-row-gap: 5px;
    grid-template-rows: repeat(4, 1fr);
    height: 400px;
    margin: 20px auto;
    padding: 1px;
    width: 500px;
    grid-template-columns: repeat(5, 1fr);

    .image-container {
      border: 2px solid black;
      border-radius: 5px;
      height: 100px;
      width: 100px;

      img {
        width: 100%;
        height: 100%;
      }

      .img-passive {
        opacity: 0.2;
      }

      .img-hide {
        opacity: 0;
        transition: 1s;
      }

      .hideDelay {
        transition-delay: 500ms;
      }

      .img-active {
        opacity: 1;
        transition: 1s;
      }
    }
  }

  .click_counter {
    margin: 50px 0;
    text-align: left;

    p {
      font-weight: bold;
    }
  }
}
</style>
