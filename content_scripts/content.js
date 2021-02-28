function messagePrinter (request, sender) {
  console.log(request, sender);
  switch (request) {
    case "connect":
      res = "ok";
      break;
    default:
      alternates = document.querySelectorAll("link[rel=alternate]");
      res = [];
      for (let i = 0; i < alternates.length; i++) {
        res.push({
          title: alternates[i].title,
          type: alternates[i].type,
          url: alternates[i].href,
        })
      }
      break;
  }
  return Promise.resolve(res)
}

browser.runtime.onMessage.addListener(messagePrinter)
