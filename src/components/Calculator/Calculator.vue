<template>
  <div>
    <ModeSwitcher v-on:switchModeOnOff="changeMode"></ModeSwitcher>
    <div class="wrapper">
      <div :class="calculatorClass" class="calculator">
        <div
          ref="calcDisplay"
          :style="styleDisplay"
          class="calculator__display"
        >
          <span ref="span">{{ displayValue }}</span>
        </div>
        <button
          type="button"
          v-for="item in numberButtonAttributes"
          :key="item.id"
          @click="updateCurrentOperand(item.value)"
          :class="item.class"
          class="number-button"
        >
          {{ item.value }}
        </button>

        <button
          type="button"
          v-for="item in twoOperandsButtonAttributes"
          :key="item.id"
          @click="addNextAction(item.action)"
          :class="item.class"
          class="service-button"
        >
          {{ item.value }}
        </button>
        <button
          type="button"
          v-for="item in serviceButtonAtributes"
          :key="item.id"
          @click="item.method"
          v-bind="serviceButtonAtributes"
          :class="item.class"
          class="service-button"
        >
          {{ item.value }}
        </button>
      </div>
      <LastResults :resultsToSave="resultsToSave" />
    </div>
  </div>
</template>

<script>
import ModeSwitcher from "./ModeSwitcher.vue";
import LastResults from "./Last-results.vue";

export default {
  name: "Calculator",
  data() {
    return {
      currentOperand: 0,
      savedOperand: null,
      displayValue: 0,
      calculateResult: null,
      currentCalculateAction: null,
      fontSizeValue: 32,
      serviceButtonAtributes: this.normalModeButtonAttributes,
      styleDisplay: {
        fontSize: "32px"
      },
      calculatorClass: "calculator",
      resultsToSave: [],
      profiMode: false,

      numberButtonAttributes: [
        { value: 1, class: "calculator__button-one" },
        { value: 2, class: "calculator__button-two" },
        { value: 3, class: "calculator__button-three" },
        { value: 4, class: "calculator__button-four" },
        { value: 5, class: "calculator__button-five" },
        { value: 6, class: "calculator__button-six" },
        { value: 7, class: "calculator__button-seven" },
        { value: 8, class: "calculator__button-eight" },
        { value: 9, class: "calculator__button-nine" },
        { value: 0, class: "calculator__button-zero" },
        { value: ".", class: "calculator__button-dot" }
      ],
      twoOperandsButtonAttributes: [
        {
          value: "\u{00d7}",
          class: "calculator__button-multiple",
          action: "multiple"
        },
        { value: "-", class: "calculator__button-minus", action: "minus" },
        {
          value: "\u{00f7}",
          class: "calculator__button-divide",
          action: "divide"
        },
        { value: "+", class: "calculator__button-add", action: "add" },
        { value: "x^y", class: "calculator__button-power", action: "power" }
      ],
      normalModeButtonAttributes: [
        {
          value: "C",
          method: this.clearDisplay,
          class: "calculator__button-clear"
        },
        {
          value: "\u{21e6}",
          method: this.deleteLastSymbol,
          class: "calculator__button-delete"
        },
        {
          value: "=",
          method: this.doCalculation,
          class: "calculator__button-equal"
        }
      ],
      profiModeButtonAttributes: [
        {
          value: "C",
          method: this.clearDisplay,
          class: "calculator__button-clear "
        },
        {
          value: "\u{21e6}",
          method: this.deleteLastSymbol,
          class: "calculator__button-delete"
        },
        {
          value: "\u{03c0}",
          method: this.showNumberPi,
          class: "calculator__button-pi"
        },
        {
          value: "\u{221a}",
          method: this.takeSquareRoot,
          class: "calculator__button-root"
        },
        {
          value: "x" + "\u{00b2}",
          method: this.squareOperand,
          class: "calculator__button-square"
        },
        {
          value: "\u{215F}" + "x",
          method: this.divideOneIntoOperand,
          class: "calculator__button-power-minus-one"
        },
        {
          value: "=",
          method: this.doCalculation,
          class: "calculator__button-equal"
        }
      ]
    };
  },
  components: {
    ModeSwitcher,
    LastResults
  },

  mounted() {
    window.addEventListener("resize", this.changeFontSize);
  },

  destroyed() {
    window.removeEventListener("resize", this.changeFontSize);
  },

  methods: {
    changeMode(profiMode) {
      if (profiMode == true) {
        this.serviceButtonAtributes = this.profiModeButtonAttributes;
        this.calculatorClass = "calculator-profi-mode";
      } else {
        this.serviceButtonAtributes = this.normalModeButtonAttributes;
        this.calculatorClass = "calculator-normal-mode";
      }
    },

    updateCurrentOperand(value) {
      if (this.currentOperand === 0) {
        switch (value) {
          case 0:
            this.currentOperand = 0;
            break;
          case ".":
            this.currentOperand = "0.";
            this.updateCalculatorDisplay(this.currentOperand);
            break;
          default:
            this.currentOperand = "";
            this.currentOperand += value;
            this.updateCalculatorDisplay(this.currentOperand);
        }
      } else if (this.currentOperand == "0.") {
        this.currentOperand += value;
        this.updateCalculatorDisplay(this.currentOperand);
      } else {
        this.currentOperand += value;
        this.updateCalculatorDisplay(this.currentOperand);
      }
    },

    updateCalculatorDisplay(value) {
      this.displayValue = value;
      this.changeFontSize();
    },

    changeFontSize() {
      let stringWidth = this.$refs.span.offsetWidth;
      let displayWidth = this.$refs.calcDisplay.clientWidth;
      if (displayWidth < 200) {
        this.styleDisplay.fontSize = "16px";
      } else {
        if (stringWidth > displayWidth) {
          this.fontSizeValue *= 0.9;
          this.styleDisplay.fontSize = this.fontSizeValue + "px";
        } else {
          this.styleDisplay.fontSize = "32px";
        }
      }
    },

    clearDisplay() {
      this.currentOperand = 0;
      this.updateCalculatorDisplay(this.currentOperand);
      this.styleDisplay.fontSize = "32px";
    },

    deleteLastSymbol() {
      if (
        typeof this.currentOperand === "string" &&
        this.currentOperand.length > 1
      ) {
        this.currentOperand = this.currentOperand.substring(
          0,
          this.currentOperand.length - 1
        );
        this.updateCalculatorDisplay(this.currentOperand);
      } else {
        this.currentOperand = 0;
        this.updateCalculatorDisplay(this.currentOperand);
      }
    },

    showNumberPi() {
      this.currentOperand = Math.PI;
      this.updateCalculatorDisplay(this.currentOperand);
    },

    squareOperand() {
      this.calculateResult = this.currentOperand * this.currentOperand;
      this.editCalculateResult(this.calculateResult);
    },

    divideOneIntoOperand() {
      this.calculateResult = 1 / this.currentOperand;
      this.editCalculateResult(this.calculateResult);
    },

    takeSquareRoot() {
      this.calculateResult = Math.sqrt(this.currentOperand);
      this.editCalculateResult(this.calculateResult);
    },

    saveCurentOperand() {
      this.savedOperand = this.currentOperand;
      this.currentOperand = 0;
      this.updateCalculatorDisplay(this.savedOperand);
    },

    editCalculateResult(result) {
      this.updateCalculatorDisplay(result);
      this.currentOperand = result;
    },

    addNextAction(action) {
      this.saveCurentOperand();
      this.currentCalculateAction = action;
    },

    doCalculation() {
      if (this.currentOperand !== 0) {
        switch (this.currentCalculateAction) {
          case "add":
            this.calculateResult =
              parseFloat(this.savedOperand) + parseFloat(this.currentOperand);
            break;
          case "minus":
            this.calculateResult =
              parseFloat(this.savedOperand) - parseFloat(this.currentOperand);
            break;
          case "divide":
            this.calculateResult =
              parseFloat(this.savedOperand) / parseFloat(this.currentOperand);
            break;
          case "multiple":
            this.calculateResult =
              parseFloat(this.savedOperand) * parseFloat(this.currentOperand);
            break;
          case "power":
            this.calculateResult = Math.pow(
              parseFloat(this.savedOperand),
              parseFloat(this.currentOperand)
            );
        }
        this.updateCalculatorDisplay(this.calculateResult);
        this.currentOperand = this.calculateResult;
        this.saveLastResults(this.calculateResult);
        this.savedOperand = 0;
      }
    },

    saveLastResults(calculateResult) {
      this.resultsToSave.push(calculateResult);
    }
  }
};
</script>

<style src="./Calculator.css" scoped></style>
