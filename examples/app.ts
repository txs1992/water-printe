import { Vue, Component } from "vue-property-decorator";
import waterPrinte from "../water-printe";

@Component
export default class App extends Vue {
  name: string = "哀木涕";

  mounted() {
    waterPrinte("哀木涕 Y009527", "body");
  }

  handleClick(name: string) {
    console.log(`click  ${typeof name === "string" ? name : "container"}`);
  }
}
