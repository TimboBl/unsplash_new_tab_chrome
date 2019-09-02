/*chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.message === "settings") {
		chrome.storage.local.get(["unsplash_settings"], async (result) => {
			console.log(result);
			sendResponse(result.unsplash_settings);
			return Promise.resolve();
		});
	} else if (message.message === "save") {
		chrome.storage.local.set({unsplash_settings: message.settings}, async () => {
			console.log("Done");
			sendResponse("lol");
			return Promise.resolve();
		});
	}
});*/

chrome.runtime.onConnect.addListener(port => {
	port.onMessage.addListener((message) => {
		if (message.message === "settings") {
			chrome.storage.local.get(["unsplash_settings"], async (result) => {
				port.postMessage({message: "settings", data: result.unsplash_settings});
				return Promise.resolve();
			});
		} else if (message.message === "save") {
			chrome.storage.local.set({unsplash_settings: message.settings}, async () => {
				console.log("Done");
				port.postMessage("lol");
				return Promise.resolve();
			});
		}
	});
});
