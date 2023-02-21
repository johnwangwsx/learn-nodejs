const { EventEmitter } = require("events");

const em = new EventEmitter();

em.on("load", () => console.log("load"));

em.emit('load');
