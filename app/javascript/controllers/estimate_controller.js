import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="estimate"
export default class extends Controller {
  static targets = ["addButton", "box", "cover", "manual", "game", "userPrice", "estimatedPrice", "offerInfos", "addCollectionButton"]
  static values = {
    price: Number,
  }

  connect() {
    // console.log(this.estimatedPriceTarget);
  }

  displaySubmitArea() {
    this.estimatedPriceTarget.innerText = this.estimate().toFixed(2)
    this.addButtonTarget.classList.remove("d-none")
  }

  onSale() {
    this.offerInfosTarget.classList.remove("d-none")
    this.addCollectionButtonTarget.classList.add("d-none")
    this.userPriceTarget.setAttribute("required", true)
    this.offerInfosTarget.classList.remove("d-none")
  }

  notOnSale() {
    this.offerInfosTarget.classList.add("d-none")
    this.addCollectionButtonTarget.classList.remove("d-none")
    this.userPriceTarget.removeAttribute("required")
  }

  estimate() {
    let estimation = this.priceValue
    estimation *= 1
        - this.dropInValue(this.boxTarget.value)
        - this.dropInValue(this.coverTarget.value)
        - this.dropInValue(this.manualTarget.value)
        - this.dropInValue(this.gameTarget.value)
    return estimation
  }

  dropInValue(grade) {
    if (grade == "Très bon état") {
      return 0
    } else if (grade == "Bon état") {
      return 0.075
    } else if (grade == "Mauvais état") {
      return 0.15
    } else if (grade == "Absent") {
      return 0.25
    } else {
        return 0
      }
    }
  }
