const template = document.createElement("template");
template.innerHTML = `
    <style>
        label{
            color: red;
            display: block;
        }
        .description{
            font-size: .8rem;
            font-weight: lighter;
            color: #777;
        }
    </style>
    <label>
        <input type="checkbox"/>
        <slot></slot>
        <span class="description">
            <slot name="description"></slot>
        </span>
    </label>
`;
class MultiSelectTag extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
    this.checkbox = shadow.querySelector("input");
  }

  static get observedAttributes(){
    return ["checked"]
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "checked") this.updateChecked(newValue)
  }

  updateChecked(value){
    this.checkbox.checked = value != null && value !== "false"
  }

}

customElements.define("multi-select-tag", MultiSelectTag);

const item = document.querySelector("multi-select-tag");
let checked = true;

setInterval(() => {
  checked = !checked;
  item.setAttribute("checked", checked)
}, 500);