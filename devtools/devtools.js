browser.devtools.panels.create(
    "Linked data",
    "",
    "/devtools/panel/panel.html"
).then((newPanel) => {
    //newPanel.onShown.addListener(initialisePanel);
    //newPanel.onHidden.addListener(unInitialisePanel);
});
// this script is executed in the context of the devtool page
// which means it has access to
// - the normal DOM API accessible through the global `window` object
// - the same webextension API as in content scripts
// - the devtools api
//
// this access propagates to panels you create (?)
//
// you can interact with the inspected window using the devtools.inspectedWindow
// 
