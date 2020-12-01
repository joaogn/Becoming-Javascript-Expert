"use strict";module.exportDefault((str) => {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{3,20}(?:,[A-Za-zÀ-ÖØ-öø-ÿ]{3,20})*$/gm;
  return regex.test(str);
});
