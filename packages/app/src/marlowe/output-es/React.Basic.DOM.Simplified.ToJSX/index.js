import * as $runtime from "../runtime.js";
import * as Control$dBind from "../Control.Bind/index.js";
import * as Data$dArray from "../Data.Array/index.js";
const toJSXString = {toJSX: x => [x]};
const toJSXJSX = {toJSX: Data$dArray.singleton};
const toJSXArrayJSX = {toJSX: x => x};
const toJSX = dict => dict.toJSX;
const toJSXArray = dictToJSX => {
  const toJSX1 = dictToJSX.toJSX;
  return {toJSX: arr => Control$dBind.arrayBind(arr)(toJSX1)};
};
const toJSXMaybe = dictToJSX => (
  {
    toJSX: v => {
      if (v.tag === "Just") { return dictToJSX.toJSX(v._1); }
      if (v.tag === "Nothing") { return []; }
      $runtime.fail();
    }
  }
);
export {toJSX, toJSXArray, toJSXArrayJSX, toJSXJSX, toJSXMaybe, toJSXString};
