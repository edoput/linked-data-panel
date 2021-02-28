var state = "idle"; // one of idle, ready

// idle is when there has been no connection yet from the panel script
// ready is when we successfully injected the content script in the
// requested table

// there might be many errors happening here but we can only
// show them to the user if we relay them to the panel
function relayError(error) {
  return Promise.reject({reason: "error", error: error});
}

function unknownAction(action) {
  return Promise.reject({reason: "unknown action"});
}

function sendResponse(v) {
  return Promise.resolve(v);
}

function logResponse(v) {
  console.log(v);
  return Promise.resolve(v);
}

// handleMessage must return a promise
function handleMessage(request, sender) {
  // just don't pick up all the messages
  if (sender.url != browser.runtime.getURL("/devtools/panel/panel.html")) {
    return;
  }
  let connection;

  switch (request.action) {
    case "state":
      res = sendResponse(state);
      break;
    case "setup":
      res = browser.tabs.executeScript(
              request.tabId,
              {
                file: "/content_scripts/content.js",
              }).then(() => { state = "ready"; return state}, relayError)
                .then(sendResponse, relayError)
      break;
    case "connect":
      connection = browser.tabs.sendMessage(request.tabId, "connect");
      res = connection.then(sendResponse, relayError);
      break;
    case "query":
      connection = browser.tabs.sendMessage(request.tabId, "query");
      res = connection.then(sendResponse, relayError);
      break;
    default:
      res = unknownAction(request.action);
  }
  return res
}

browser.runtime.onMessage.addListener(handleMessage)
