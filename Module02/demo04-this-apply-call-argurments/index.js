"use strict";

const {
  watch,
  promises: { readFile },
} = require("fs");

class File {
  async showContent(filename) {
    console.log("index.js", (await readFile(filename)).toString());
  }

  watch(event, filename) {
    // use the argumets is a bad pratice, because you lost the control
    // of funtion arguments
    console.log("arguments", Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }
}

const file = new File();
// here it ignore the class 'this'
// and receive the watch this
//watch(__filename, file.watch);

//alternative 1 to not receive the watch this
// its ugly
//watch(__filename, (event, filename) => file.watch(event, filename));

// can make explicit what is the context that function should follow
// the bind return an function with file's this, ignoring the watch this
watch(__filename, file.watch.bind(file));

// how the sinon works to spyOn and change the return on tests
file.watch.call(
  {
    showContent: () => console.log("call: hey sinon"),
  },
  null,
  __filename
);

file.watch.apply(
  {
    showContent: () => console.log("apply: hey sinon"),
  },
  [null, __filename]
);
