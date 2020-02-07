<template>
  <div class="todolist">
    <p>Tragen Sie bitte eine Aufgabe in "To Do List" ein.</p>
    <div class="todolist__input-wrapper">
      <input
        ref="inputTask"
        class="todolist__input"
        v-on:keyup.13="addTaskToList"
        placeholder="Write Task"
        type="text"
        v-model="listItemInput"
      />
      <button class="add-task-button" @click="addTaskToList">add Task</button>
    </div>
    <div class="todolist__filter">
      <svg viewBox="0 0 24 24" id="filter" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 0l9 15.094v5.906l4 3v-8.906l9-15.094h-22zm18.479 2l-2.981 5h-8.996l-2.981-5h14.958z"
        ></path>
      </svg>
      <button :class="buttonDoneClass" @click="addFilterDone">
        done
      </button>
      <button :class="buttonNotDoneClass" @click="addFilterNotDone">
        not done
      </button>
      <button :class="buttonAllClass" @click="addFilterAll">
        all
      </button>
    </div>
    <div class="todolist__feld">
      <p class="todolist-head">done</p>
      <transition-group
        name="todolist-transition"
        tag="div"
        class="todolist-transition"
      >
        <li
          v-for="(task, index) in this.filterToDoList"
          v-bind:key="task.value"
          class="todolist-transition-item"
        >
          {{ task.value }}
          <input
            ref="changeInupt"
            v-show="task.changeMode"
            v-model="task.change"
            type="text"
            v-on:keyup.13="changeTask(index)"
            class="change-task-input"
          />
          <input
            class="done-checkbox"
            type="checkbox"
            :checked="task.checked"
            v-model="task.checked"
          />

          <span @click="changeTask(index)" class="change-task-button"
            >&#9998;</span
          >
          <span @click="deleteTaskFromList(index)" class="delete-task-button"
            >&#215;</span
          >
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToDoList",

  props: {
    checked: Boolean
  },

  data() {
    return {
      listItemInput: null,
      change: null,
      taskList: [],
      isDoneActive: true,
      isNotDoneActive: true,
      isAllActive: true
    };
  },

  mounted() {
    window.addEventListener("load", this.focusOnLoad());
  },

  methods: {
    focusOnLoad() {
      this.$refs.inputTask.focus();
    },

    addTaskToList() {
      this.taskList.push({
        value: this.listItemInput,
        checked: false,
        changeMode: false
      });
      this.listItemInput = "";
    },

    changeTask(index) {
      if (this.taskList[index].changeMode == false) {
        this.taskList[index].change = this.taskList[index].value;
        this.taskList[index].value = "";
        this.taskList[index].changeMode = true;
        this.$refs.changeInupt[index].focus();
      } else {
        this.updateTask(index);
        this.taskList[index].changeMode = false;
      }
    },

    updateTask(index) {
      if (typeof this.taskList[index].change == "string") {
        this.taskList[index].value = this.taskList[index].change;
        this.taskList[index].change = null;
      }
    },

    deleteTaskFromList(index) {
      this.taskList.splice(index, 1);
    },

    addFilterDone() {
      this.isDoneActive = !this.isDoneActive;
      if (this.isDoneActive == true) {
        this.isNotDoneActive = false;
      } else {
        this.isNotDoneActive = true;
        this.isAllActive = false;
      }
    },

    addFilterNotDone() {
      this.isNotDoneActive = !this.isNotDoneActive;
      if (this.isNotDoneActive == true) {
        this.isDoneActive = false;
      } else {
        this.isDoneActive = true;
        this.isAllActive = false;
      }
    },

    addFilterAll() {
      this.isAllActive = !this.isAllActive;
      if (this.isAllActive == true) {
        this.isDoneActive = true;
        this.isNotDoneActive = true;
      } else {
        this.isDoneActive = false;
        this.isNotDoneActive = false;
      }
    }
  },

  computed: {
    buttonNotDoneClass() {
      if (this.isNotDoneActive) {
        return "button-active";
      } else {
        return "button";
      }
    },

    buttonDoneClass() {
      if (this.isDoneActive) {
        return "button-active";
      } else {
        return "button";
      }
    },

    buttonAllClass() {
      if (this.isAllActive) {
        return "button-active";
      } else {
        return "button";
      }
    },

    filterToDoList() {
      if (this.isDoneActive == true && this.isNotDoneActive == false) {
        return this.taskList.filter(task => task.checked === true);
      } else if (this.isDoneActive == false && this.isNotDoneActive == true) {
        return this.taskList.filter(task => task.checked === false);
      } else if (this.isDoneActive == true && this.isNotDoneActive == true) {
        return this.taskList;
      } else {
        return null;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  max-width: 1200px;
}

.todolist__input-wrapper {
  align-items: center;
  display: flex;
  justify-content: center;
}

.todolist__input {
  font-size: 24px;
  height: 25px;
  width: 300px;
}

.add-task-button {
  background-color: red;
  color: white;
  font-weight: bold;
  height: 30px;
  margin-left: 1px;
  width: 70px;
}

.todolist__filter {
  display: flex;
  height: 20px;
  justify-content: space-around;
  margin: 10px auto;
  width: 200px;
}

.todolist__filter button {
  border-radius: 5px;
}

.todolist__filter .button-active {
  background-color: #379a93;
  border-color: #379a93;
  border-radius: 5px;
  color: white;
}

.todolist__filter svg {
  height: 90%;
}

.todolist__feld {
  background-color: antiquewhite;
  border-radius: 4px;
  margin: 10px auto;
  min-height: 100px;
  padding-bottom: 10px;
  position: relative;
  width: 500px;
}

.todolist-head {
  margin: auto;
  text-align: left;
  width: 450px;
}

.todolist-transition {
  display: flex;
  flex-direction: column;
  position: relative;
}

.todolist-transition-item {
  background-color: azure;
  border: 1px solid coral;
  border-radius: 3px;
  display: inline-block;
  font-size: 20px;
  height: 30px;
  list-style-type: none;
  margin: 2px auto;
  position: relative;
  transition: all 1s;
  width: 450px;
}

.todolist-transition-leave-active {
  position: absolute;
  transition: transform 1s;
}

.todolist-transition-enter {
  opacity: 0;
  transform: translateX(50px);
}

.todolist-transition-leave-to {
  transform: translateX(50px);
}

.done-checkbox {
  float: right;
  height: 20px;
  left: 0;
  position: absolute;
  width: 20px;
}

.change-task-button {
  cursor: pointer;
  position: absolute;
  right: 30px;
  top: -15%;
}

.change-task-input {
  font-size: 22px;
  height: 70%;
  text-align: center;
  width: 70%;
}

.delete-task-button {
  cursor: pointer;
  position: absolute;
  right: 0;
  top: -15%;
}

@media (max-width: 560px) {
  .todolist {
    width: 99vw;
  }

  .todolist__feld {
    width: 100%;
  }

  .todolist__input {
    width: 90%;
  }

  .todolist-transition-item {
    width: 95%;
  }
}
</style>
