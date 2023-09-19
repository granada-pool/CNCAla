import * as $runtime from "../runtime.js";
import * as Data$dEq from "../Data.Eq/index.js";
import * as Data$dMap$dInternal from "../Data.Map.Internal/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import * as Data$dSemiring from "../Data.Semiring/index.js";
import * as Data$dShow from "../Data.Show/index.js";
const $DurationComponent = tag => tag;
const Second = /* #__PURE__ */ $DurationComponent("Second");
const Minute = /* #__PURE__ */ $DurationComponent("Minute");
const Hour = /* #__PURE__ */ $DurationComponent("Hour");
const Day = /* #__PURE__ */ $DurationComponent("Day");
const Week = /* #__PURE__ */ $DurationComponent("Week");
const Month = /* #__PURE__ */ $DurationComponent("Month");
const Year = /* #__PURE__ */ $DurationComponent("Year");
const Duration = x => x;
const showDurationComponent = {
  show: v => {
    if (v === "Minute") { return "Minute"; }
    if (v === "Second") { return "Second"; }
    if (v === "Hour") { return "Hour"; }
    if (v === "Day") { return "Day"; }
    if (v === "Week") { return "Week"; }
    if (v === "Month") { return "Month"; }
    if (v === "Year") { return "Year"; }
    $runtime.fail();
  }
};
const show = /* #__PURE__ */ (() => Data$dMap$dInternal.showMap(showDurationComponent)(Data$dShow.showNumber).show)();
const showDuration = {show: v => "(Duration " + show(v) + ")"};
const newtypeDuration = {Coercible0: () => {}};
const eqDurationComponent = {
  eq: x => y => {
    if (x === "Second") { return y === "Second"; }
    if (x === "Minute") { return y === "Minute"; }
    if (x === "Hour") { return y === "Hour"; }
    if (x === "Day") { return y === "Day"; }
    if (x === "Week") { return y === "Week"; }
    if (x === "Month") { return y === "Month"; }
    return x === "Year" && y === "Year";
  }
};
const eq = /* #__PURE__ */ (() => Data$dMap$dInternal.eqMap(eqDurationComponent)(Data$dEq.eqNumber).eq)();
const ordDurationComponent = {
  compare: x => y => {
    if (x === "Second") {
      if (y === "Second") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y === "Second") { return Data$dOrdering.GT; }
    if (x === "Minute") {
      if (y === "Minute") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y === "Minute") { return Data$dOrdering.GT; }
    if (x === "Hour") {
      if (y === "Hour") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y === "Hour") { return Data$dOrdering.GT; }
    if (x === "Day") {
      if (y === "Day") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y === "Day") { return Data$dOrdering.GT; }
    if (x === "Week") {
      if (y === "Week") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y === "Week") { return Data$dOrdering.GT; }
    if (x === "Month") {
      if (y === "Month") { return Data$dOrdering.EQ; }
      return Data$dOrdering.LT;
    }
    if (y === "Month") { return Data$dOrdering.GT; }
    if (x === "Year" && y === "Year") { return Data$dOrdering.EQ; }
    $runtime.fail();
  },
  Eq0: () => eqDurationComponent
};
const compare = /* #__PURE__ */ (() => Data$dMap$dInternal.ordMap(ordDurationComponent)(Data$dOrd.ordNumber).compare)();
const semigroupDuration = {append: v => v1 => Data$dMap$dInternal.unionWith(ordDurationComponent)(Data$dSemiring.numAdd)(v)(v1)};
const monoidDuration = {mempty: Data$dMap$dInternal.Leaf, Semigroup0: () => semigroupDuration};
const eqDuration = {eq: x => y => eq(x)(y)};
const ordDuration = {compare: x => y => compare(x)(y), Eq0: () => eqDuration};
const durationFromComponent = k => v => Data$dMap$dInternal.$$$Map("Two", Data$dMap$dInternal.Leaf, k, v, Data$dMap$dInternal.Leaf);
const hour = /* #__PURE__ */ durationFromComponent(Hour);
const millisecond = x => Data$dMap$dInternal.$$$Map("Two", Data$dMap$dInternal.Leaf, Second, x / 1000.0, Data$dMap$dInternal.Leaf);
const minute = /* #__PURE__ */ durationFromComponent(Minute);
const month = /* #__PURE__ */ durationFromComponent(Month);
const second = /* #__PURE__ */ durationFromComponent(Second);
const week = /* #__PURE__ */ durationFromComponent(Week);
const year = /* #__PURE__ */ durationFromComponent(Year);
const day = /* #__PURE__ */ durationFromComponent(Day);
export {
  $DurationComponent,
  Day,
  Duration,
  Hour,
  Minute,
  Month,
  Second,
  Week,
  Year,
  compare,
  day,
  durationFromComponent,
  eq,
  eqDuration,
  eqDurationComponent,
  hour,
  millisecond,
  minute,
  monoidDuration,
  month,
  newtypeDuration,
  ordDuration,
  ordDurationComponent,
  second,
  semigroupDuration,
  show,
  showDuration,
  showDurationComponent,
  week,
  year
};
