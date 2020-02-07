<template>
  <div class="measure-conversion__container">
    <div class="current-measure-system">
      <input type="text">
      <ul
        class="current-measure-system_menu"
        :class="currentUnitsMenuState"
        @click="openCurrentUnitsMenu"
        ref="galleryMenu"
      >
        <li class="current-unit" v-show="isShow">{{ currentUnit }}</li>
        <li
          :key="curItem.unit"
          v-for="(curItem, index) in currentUnits"
          class="choose-category-button"
          @click="chooseCategory(index)"
        >
          {{ curItem.unit }}
        </li>
      </ul>
    </div>
    <div class="equal">
      =
    </div>
    <div class="end-measure-system">
      <input type="text">
      <ul
        class="end-measure-system_menu"
        :class="endUnitsMenuState"
        @click="openEndUnitsMenu"
        ref="galleryMenu"
      >
        <li class="current-category" v-show="isShow">{{ endUnit }}</li>
        <li
          :key="endItem.unit"
          v-for="(endItem, index) in endUnits"
          class="choose-category-button"
          @click="chooseCategory(index)"
        >
          {{ endItem.unit }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MetricConversion",
  data() {
    return {
      currentCategory: "Weight",
      category: "Weight",
      currentUnit: "kg",
      endUnit: "pound",
      currentUnitsMenuState: "menu-closed",
      endUnitsMenuState: "menu-closed",
      currentUnits: "Metric",
      endUnits: "Avoirdupois",
      isShow: true,
      measureData: [
        {
          categoryName: "Weight",
          categoryList: [
            {
              measureSystem: "Metric",
              units: [
                {unit: "gram"},
                {unit: "kilogram"},
                {unit: "ton"}
              ]
            },
            {
              measureSystem: "Avoirdupois",
              units: [
                {unit: "dram"},
                {unit: "ounce"},
                {unit: "pound"},
                {unit: "stone"},
                {unit: "quarter"}
              ]
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.categoryOnLoad();
    this.currentMeasureSystemOnLoad();
    this.endMeasureSystemOnLoad()
  },
  methods: {
    categoryOnLoad() {
      let cat = this.measureData.find(
        dataItem => dataItem.categoryName === "Weight"
      );
      this.category = cat.categoryList;
    },
    currentMeasureSystemOnLoad() {
      let cat = this.category.find(
        dataItem => dataItem.measureSystem === "Metric"
      );
      this.currentUnits = cat.units;
    },
    endMeasureSystemOnLoad() {
      let cat = this.category.find(
        dataItem => dataItem.measureSystem === "Avoirdupois"
      );
      this.endUnits = cat.units;
    },
    openCurrentUnitsMenu() {
      if (this.currentUnitsMenuState === "menu-opened") {
        this.currentUnitsMenuState = "menu-closed";
        this.isShow = true;
      } else {
        this.currentUnitsMenuState = "menu-opened";
        this.isShow = false;
      }
    },
    openEndUnitsMenu() {
      if (this.endUnitsMenuState === "menu-opened") {
        this.endUnitsMenuState = "menu-closed";
        this.isShow = true;
      } else {
        this.endUnitsMenuState = "menu-opened";
        this.isShow = false;
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.measure-conversion__container {
  display: flex;
  height: 200px;
  justify-content: center;
  .current-measure-system,
  .end-measure-system {
    display: flex;
    height: 30px;
    input {
      width: 150px;
    }
    .current-measure-system_menu,
    .end-measure-system_menu {
      border: #007feb solid;
      border-radius: 4px;
      color: #ff5722;
      font-size: 18px;
      font-weight: bold;
      margin: 0 auto;
      overflow: hidden;
      padding-left: 0;
      width: 80px;
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
        height: fit-content;
      }
      li {
        cursor: pointer;
      }
      .current-unit {
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
  .equal {
    width: 150px;
  }
}
</style>
