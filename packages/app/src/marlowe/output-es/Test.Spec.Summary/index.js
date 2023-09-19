import * as $runtime from "../runtime.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dSemiring from "../Data.Semiring/index.js";
const semiringRecord = /* #__PURE__ */ Data$dSemiring.semiringRecord()(/* #__PURE__ */ Data$dSemiring.semiringRecordCons({reflectSymbol: () => "failed"})()(/* #__PURE__ */ Data$dSemiring.semiringRecordCons({
  reflectSymbol: () => "passed"
})()(/* #__PURE__ */ Data$dSemiring.semiringRecordCons({reflectSymbol: () => "pending"})()(Data$dSemiring.semiringRecordNil)(Data$dSemiring.semiringInt))(Data$dSemiring.semiringInt))(Data$dSemiring.semiringInt));
const Count = x => x;
const semigroupCount = {append: v => v1 => semiringRecord.add(v)(v1)};
const newtypeSummary = {Coercible0: () => {}};
const monoidCount = /* #__PURE__ */ (() => ({mempty: semiringRecord.zero, Semigroup0: () => semigroupCount}))();
const summarize$lazy = /* #__PURE__ */ $runtime.binding(() => Data$dFoldable.foldableArray.foldMap(monoidCount)(v => {
  if (v.tag === "Leaf") {
    if (v._2.tag === "Just") {
      if (v._2._1.tag === "Success") { return {passed: 1, failed: 0, pending: 0}; }
      if (v._2._1.tag === "Failure") { return {passed: 0, failed: 1, pending: 0}; }
      $runtime.fail();
    }
    if (v._2.tag === "Nothing") { return {passed: 0, failed: 0, pending: 1}; }
    $runtime.fail();
  }
  if (v.tag === "Node") { return summarize$lazy()(v._2); }
  $runtime.fail();
}));
const summarize = /* #__PURE__ */ summarize$lazy();
const successful = groups => summarize(groups).failed === 0;
export {Count, monoidCount, newtypeSummary, semigroupCount, semiringRecord, successful, summarize};
