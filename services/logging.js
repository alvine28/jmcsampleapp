const appInsights = require("applicationinsights");
const serverConfig = require("../server");

let enabled = true;
try {
    const appInsights = require("applicationinsights");
    appInsights.setup("ae7f28a2-35a2-4524-87ca-42fbae7417d9")
        .setAutoDependencyCorrelation(true)
        .setAutoCollectRequests(true)
        .setAutoCollectPerformance(true)
        .setAutoCollectExceptions(true)
        .setAutoCollectDependencies(true)
        .setAutoCollectConsole(true)
        .setUseDiskRetryCaching(true)
        .start();
} catch (error) {
    console.log("Cannot start Application Insights; either pass the value to this app, or use the App Insights default environment variable.");
    enabled = false;
}

module.exports = {
    ready: enabled,
    logRequest: function(req) {
        let message = `Request was captured for path: ${req.originalUrl}.`;
        console.log(message);
        if(this.ready) {
            appInsights.defaultClient.trackRequest({ name: "normalPage", properties: 
                { type: "page", value: req.originalUrl, dateTime: new Date() }});
        }
    },
    logEvent: function(name, data) {
        if(this.ready) {
            appInsights.defaultClient.trackEvent({ name: name, properties: { data: data }});
        }
    }
}