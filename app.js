let myLeads = ['0']
const inputEl = document.getElementById("input-el")
const ButtonEl = document.getElementById("input-btn")
const DeleteEL = document.getElementById("delet-btn")
let unEl = document.getElementById("un-ol")
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

ButtonEl.addEventListener("click", function () {
  myLeads.push(inputEl.value)
  inputEl.value = ""
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
})

DeleteEL.addEventListener("click", function () {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  })
})

function render(leads) {
  let listItems = ""
  for (let i = 1; i < leads.length; i++) {
    listItems += `<li><a target='_blank' href='${leads[i]}'>${leads[i]}</a></li>`
  }
  unEl.innerHTML = listItems
}

