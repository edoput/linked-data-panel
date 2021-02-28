// error: error happened
// setup: no content script injected
// done: content script injected
var state = "setup";
var table = document.querySelector("tbody")
var template = document.querySelector("#row-template")

function addRow(data) {
  var clone = template.content.cloneNode(true);
  var td = clone.querySelectorAll("td");
  td[0].textContent = data.title;
  td[1].textContent = data.type;
  td[2].textContent = data.url;
  table.append(clone);
}

function updateTable(response) {
  console.log(response)
  response.forEach(addRow);
  return Promise.resolve()
}

function setError(error) {
  console.log("error:", error);
  state = "error";
  return Promise.reject(error);
}

// each function returns a promise so we can chain
// stuff

function queryState() {
  console.log("state")
  return browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId,
    action: "state",
  });
}

function setup() {
  console.log("setup")
  return browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId,
    action: "setup",
  });
}

function connect() {
  console.log("connect")
  return browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId,
    action: "connect",
  });
}

function query() {
  console.log("query")
  return browser.runtime.sendMessage({
    tabId: browser.devtools.inspectedWindow.tabId,
    action: "query",
  });
}

function main (state) {
  queryState()
    .then(setup)
    .then(state)
    .then(connect)
    .then(state)
    .then(query)
    .then(updateTable)
    .catch(setError)
}

main(state)
