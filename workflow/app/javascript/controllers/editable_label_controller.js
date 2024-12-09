import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="editable-label"
export default class extends Controller {
  static values = { editorClass: String, original: String, identifier: String };
  static targets = [ 'label', 'input' ];

  connect() {
    this.view();
    this.input = this.inputTarget.querySelector('input');
    this.input.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  disconnect() {
    this.input.removeEventListener("keydown", this.handleKeyDown.bind(this)); 
  }

  edit() {
    this.inputTarget.classList.remove('hidden');
    this.labelTarget.classList.add('hidden');
    this.input.select();
  }

  view() {
    this.labelTarget.classList.remove('hidden');
    this.inputTarget.classList.add('hidden');
  }

  confirm(event) {
    event.preventDefault();
    this.dispatch('changed', { detail: { original: this.originalValue, new: this.input.value }, prefix: this.identifierValue });
    this.view();
    console.log('changed', { detail: { original: this.originalValue, new: this.input.value }, prefix: this.identifierValue });
  }

  cancel(event) {
    event.preventDefault();
    this.input.value = this.originalValue;
    this.view();
    console.log('cancelled', { detail: { original: this.originalValue }, prefix: this.identifierValue });
  }

  handleKeyDown(event) {
    switch (event.key){
      case "Escape":
        this.cancel(event);
        break;
      case "Enter":
        this.confirm(event);
        break;
    }
  }
}
