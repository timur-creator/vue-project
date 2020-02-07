import Vue from "vue";
import VueRouter from "vue-router";
import ToDoList from "../components/To-do-list.vue";
import Calculator from "../components/Calculator/Calculator";
import Gallery from "../components/Gallery";
import Memory from "../components/Memory";
import MeasureConversion from "../components/MeasureConversion";

Vue.use(VueRouter);

const routes = [
  {
    path: "/tools/todolist",
    name: "ToDoList",
    component: ToDoList
  },
  {
    path: "/tools/calculator",
    name: "Calculator",
    component: Calculator
  },
  {
    path: "/Gallery",
    name: "Gallery",
    component: Gallery
  },
  {
    path: "/tools/memory",
    name: "Memory",
    component: Memory
  },
  {
    path: "/tools/measure-conversion",
    name: "MeasureConversion",
    component: MeasureConversion
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
