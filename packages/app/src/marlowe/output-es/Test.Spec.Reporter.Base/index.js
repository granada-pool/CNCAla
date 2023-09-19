import * as $runtime from "../runtime.js";
import * as Control$dMonad$dState$dTrans from "../Control.Monad.State.Trans/index.js";
import * as Control$dMonad$dWriter$dTrans from "../Control.Monad.Writer.Trans/index.js";
import * as Data$dArray from "../Data.Array/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dGeneric$dRep from "../Data.Generic.Rep/index.js";
import * as Data$dIdentity from "../Data.Identity/index.js";
import * as Data$dList from "../Data.List/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMap$dInternal from "../Data.Map.Internal/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dMonoid from "../Data.Monoid/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dShow from "../Data.Show/index.js";
import * as Data$dShow$dGeneric from "../Data.Show.Generic/index.js";
import * as Data$dString$dCodeUnits from "../Data.String.CodeUnits/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnfoldable from "../Data.Unfoldable/index.js";
import * as Effect$dAff from "../Effect.Aff/index.js";
import * as Effect$dException from "../Effect.Exception/index.js";
import * as Pipes$dInternal from "../Pipes.Internal/index.js";
import * as Test$dSpec$dConsole from "../Test.Spec.Console/index.js";
import * as Test$dSpec$dResult from "../Test.Spec.Result/index.js";
import * as Test$dSpec$dStyle from "../Test.Spec.Style/index.js";
import * as Test$dSpec$dSummary from "../Test.Spec.Summary/index.js";
import * as Test$dSpec$dTree from "../Test.Spec.Tree/index.js";
const $RunningItem = (tag, _1, _2) => ({tag, _1, _2});
const genericShowArgsArgument = {genericShowArgs: v => [Data$dShow.showStringImpl(v)]};
const monadWriterT = /* #__PURE__ */ Control$dMonad$dWriter$dTrans.monadWriterT(Data$dMonoid.monoidString)(Data$dIdentity.monadIdentity);
const bindStateT = /* #__PURE__ */ Control$dMonad$dState$dTrans.bindStateT(monadWriterT);
const monadStateStateT = /* #__PURE__ */ Control$dMonad$dState$dTrans.monadStateStateT(monadWriterT);
const $$get = /* #__PURE__ */ (() => monadStateStateT.state(s => Data$dTuple.$Tuple(s, s)))();
const all = /* #__PURE__ */ (() => Data$dMap$dInternal.foldableMap.foldMap((() => {
  const semigroupConj1 = {append: v => v1 => v && v1};
  return {mempty: true, Semigroup0: () => semigroupConj1};
})()))();
const applicativeStateT = /* #__PURE__ */ Control$dMonad$dState$dTrans.applicativeStateT(monadWriterT);
const for_ = /* #__PURE__ */ Data$dFoldable.for_(applicativeStateT)(Data$dFoldable.foldableArray);
const ordArray = /* #__PURE__ */ Data$dOrd.ordArray(Test$dSpec$dTree.pathItemOrd);
const RunningTest = value0 => value1 => $RunningItem("RunningTest", value0, value1);
const RunningPending = value0 => $RunningItem("RunningPending", value0);
const RunningSuite = value0 => value1 => $RunningItem("RunningSuite", value0, value1);
const scanWithStateM = dictMonad => {
  const bindProxy = Pipes$dInternal.bindProxy(dictMonad);
  return step => begin => {
    const go = x => bindProxy.bind(Pipes$dInternal.$$$Proxy("Request", undefined, Pipes$dInternal.Pure))(a => bindProxy.bind(Pipes$dInternal.$$$Proxy(
      "Respond",
      a,
      Pipes$dInternal.Pure
    ))(() => bindProxy.bind(Pipes$dInternal.monadTransProxy.lift(dictMonad)(step(x)(a)))(x$p => go(x$p))));
    return bindProxy.bind(Pipes$dInternal.monadTransProxy.lift(dictMonad)(begin))(x => go(x));
  };
};
const scanWithStateM1 = /* #__PURE__ */ scanWithStateM(Effect$dAff.monadAff);
const runningItemGeneric = {
  to: x => {
    if (x.tag === "Inl") { return $RunningItem("RunningTest", x._1._1, x._1._2); }
    if (x.tag === "Inr") {
      if (x._1.tag === "Inl") { return $RunningItem("RunningPending", x._1._1); }
      if (x._1.tag === "Inr") { return $RunningItem("RunningSuite", x._1._1._1, x._1._1._2); }
    }
    $runtime.fail();
  },
  from: x => {
    if (x.tag === "RunningTest") { return Data$dGeneric$dRep.$Sum("Inl", Data$dGeneric$dRep.$Product(x._1, x._2)); }
    if (x.tag === "RunningPending") { return Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inl", x._1)); }
    if (x.tag === "RunningSuite") { return Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Sum("Inr", Data$dGeneric$dRep.$Product(x._1, x._2))); }
    $runtime.fail();
  }
};
const runningItemShow = {
  show: /* #__PURE__ */ (() => {
    const $0 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsProduct(genericShowArgsArgument)({
      genericShowArgs: v => [
        (() => {
          if (v.tag === "Just") { return "(Just " + Test$dSpec$dResult.showResult.show(v._1) + ")"; }
          if (v.tag === "Nothing") { return "Nothing"; }
          $runtime.fail();
        })()
      ]
    }))({reflectSymbol: () => "RunningTest"});
    const $1 = Data$dShow$dGeneric.genericShowConstructor(genericShowArgsArgument)({reflectSymbol: () => "RunningPending"});
    const $2 = Data$dShow$dGeneric.genericShowConstructor(Data$dShow$dGeneric.genericShowArgsProduct(genericShowArgsArgument)({genericShowArgs: v => [v ? "true" : "false"]}))({
      reflectSymbol: () => "RunningSuite"
    });
    return x => {
      if (x.tag === "RunningTest") { return $0["genericShow'"](Data$dGeneric$dRep.$Product(x._1, x._2)); }
      if (x.tag === "RunningPending") { return $1["genericShow'"](x._1); }
      if (x.tag === "RunningSuite") { return $2["genericShow'"](Data$dGeneric$dRep.$Product(x._1, x._2)); }
      $runtime.fail();
    };
  })()
};
const printFailures = dictMonadWriter => {
  const Monad1 = dictMonadWriter.MonadTell1().Monad1();
  const applicativeStateT1 = Control$dMonad$dState$dTrans.applicativeStateT(Monad1);
  const traverse_ = Data$dFoldable.traverse_(applicativeStateT1)(Data$dFoldable.foldableArray);
  const bindStateT1 = Control$dMonad$dState$dTrans.bindStateT(Monad1);
  const monadStateStateT1 = Control$dMonad$dState$dTrans.monadStateStateT(Monad1);
  const get1 = monadStateStateT1.state(s => Data$dTuple.$Tuple(s, s));
  const $0 = Control$dMonad$dState$dTrans.monadWriterStateT(dictMonadWriter);
  const evalStateT = Control$dMonad$dState$dTrans.evalStateT(Monad1.Bind1().Apply0().Functor0());
  return xs$p => {
    const go$lazy = $runtime.binding(() => traverse_(v => {
      if (v.tag === "Node") {
        if (v._1.tag === "Left") {
          const $1 = v._1._1;
          const $2 = v._2;
          return bindStateT1.bind(get1)(v1 => {
            const $3 = v1.crumbs;
            return bindStateT1.bind(monadStateStateT1.state(s => Data$dTuple.$Tuple(undefined, {...s, crumbs: Data$dList$dTypes.$List("Cons", $1, $3)})))(() => bindStateT1.bind(go$lazy()($2))(() => monadStateStateT1.state(s => Data$dTuple.$Tuple(
              undefined,
              {...s, crumbs: $3}
            ))));
          });
        }
        if (v._1.tag === "Right") {
          const spin = spin$a0$copy => {
            let spin$a0 = spin$a0$copy, spin$c = true, spin$r;
            while (spin$c) {
              const v$1 = spin$a0;
              spin$a0 = v$1;
            }
            return spin$r;
          };
          return spin(v._1._1);
        }
        $runtime.fail();
      }
      if (v.tag === "Leaf") {
        if (v._2.tag === "Just" && v._2._1.tag === "Failure") {
          const $1 = v._2._1._1;
          const $2 = v._1;
          return bindStateT1.bind(monadStateStateT1.state(s => {
            const s$p = {...s, i: s.i + 1 | 0};
            return Data$dTuple.$Tuple(s$p, s$p);
          }))(v1 => bindStateT1.bind((() => {
            const go$1 = go$1$a0$copy => go$1$a1$copy => {
              let go$1$a0 = go$1$a0$copy, go$1$a1 = go$1$a1$copy, go$1$c = true, go$1$r;
              while (go$1$c) {
                const b = go$1$a0, v$1 = go$1$a1;
                if (v$1.tag === "Nil") {
                  go$1$c = false;
                  go$1$r = b;
                  continue;
                }
                if (v$1.tag === "Cons") {
                  go$1$a0 = b.init ? {init: false, acc: v$1._1} : {init: false, acc: b.acc + " " + v$1._1};
                  go$1$a1 = v$1._2;
                  continue;
                }
                $runtime.fail();
              }
              return go$1$r;
            };
            return $0.MonadTell1().tell(Data$dShow.showIntImpl(v1.i) + ") " + go$1({init: true, acc: ""})(Data$dList.reverse(Data$dList$dTypes.$List("Cons", $2, v1.crumbs))).acc + "\n");
          })())(() => $0.MonadTell1().tell(Test$dSpec$dStyle.styled(Test$dSpec$dStyle.red)(Data$dString$dCodeUnits.fromCharArray(Data$dArray.replicate(2)(" ")) + Effect$dException.message($1)) + "\n")));
        }
        return applicativeStateT1.pure();
      }
      $runtime.fail();
    }));
    const go = go$lazy();
    return evalStateT(go(xs$p))({i: 0, crumbs: Data$dList$dTypes.Nil});
  };
};
const defaultUpdate = opts => e => {
  const modifyRunningItems = f => bindStateT.bind($$get)(s => {
    const nextRunningItems = f(opts.getRunningItems(s));
    const allFinished = all(v => {
      if (v.tag === "RunningPending") { return true; }
      if (v.tag === "RunningTest") {
        if (v._2.tag === "Nothing") { return false; }
        if (v._2.tag === "Just") { return true; }
        $runtime.fail();
      }
      if (v.tag === "RunningSuite") { return v._2; }
      $runtime.fail();
    })(nextRunningItems);
    return bindStateT.bind((() => {
      const $0 = opts.putRunningItems(allFinished ? Data$dMap$dInternal.Leaf : nextRunningItems)(s);
      return monadStateStateT.state(v => Data$dTuple.$Tuple(undefined, $0));
    })())(() => {
      const $0 = for_(Data$dMap$dInternal.toUnfoldable(Data$dUnfoldable.unfoldableArray)(nextRunningItems))(v => opts.printFinishedItem(v._1)(v._2));
      if (allFinished) { return $0; }
      return applicativeStateT.pure();
    });
  });
  return bindStateT.bind((() => {
    if (e.tag === "Suite") {
      if (e._1 === "Sequential") { return applicativeStateT.pure(); }
      if (e._1 === "Parallel") { return modifyRunningItems(Data$dMap$dInternal.insert(ordArray)(e._2)($RunningItem("RunningSuite", e._3, false))); }
      $runtime.fail();
    }
    if (e.tag === "SuiteEnd") {
      return modifyRunningItems(Data$dMap$dInternal.update(ordArray)(v1 => {
        if (v1.tag === "RunningSuite") { return Data$dMaybe.$Maybe("Just", $RunningItem("RunningSuite", v1._1, true)); }
        return Data$dMaybe.Nothing;
      })(e._1));
    }
    if (e.tag === "Test") {
      if (e._1 === "Sequential") { return applicativeStateT.pure(); }
      if (e._1 === "Parallel") { return modifyRunningItems(Data$dMap$dInternal.insert(ordArray)(e._2)($RunningItem("RunningTest", e._3, Data$dMaybe.Nothing))); }
      $runtime.fail();
    }
    if (e.tag === "TestEnd") {
      const $0 = e._1;
      const $1 = e._3;
      return bindStateT.bind(monadStateStateT.state(s => Data$dTuple.$Tuple(opts.getRunningItems(s), s)))(runningItem => {
        const v1 = Data$dMap$dInternal.lookup(ordArray)($0)(runningItem);
        if (v1.tag === "Just" && v1._1.tag === "RunningTest") {
          return modifyRunningItems(Data$dMap$dInternal.insert(ordArray)($0)($RunningItem("RunningTest", v1._1._1, Data$dMaybe.$Maybe("Just", $1))));
        }
        return applicativeStateT.pure();
      });
    }
    if (e.tag === "Pending") {
      const $0 = e._2;
      const $1 = e._1;
      return bindStateT.bind(monadStateStateT.state(s => Data$dTuple.$Tuple(opts.getRunningItems(s), s)))(runningItem => {
        const $2 = runningItem.tag === "Leaf";
        const $3 = modifyRunningItems(Data$dMap$dInternal.insert(ordArray)($1)($RunningItem("RunningPending", $0)));
        if (!$2) { return $3; }
        if ($2) { return applicativeStateT.pure(); }
        $runtime.fail();
      });
    }
    if (e.tag === "End") { return applicativeStateT.pure(); }
    if (e.tag === "Start") { return applicativeStateT.pure(); }
    $runtime.fail();
  })())(() => opts.update(e));
};
const defaultSummary = dictMonadWriter => {
  const Monad1 = dictMonadWriter.MonadTell1().Monad1();
  const $0 = Monad1.Bind1();
  const $1 = Monad1.Applicative0();
  const printFailures1 = printFailures(dictMonadWriter);
  return xs => $0.bind((() => {
    const v = Test$dSpec$dSummary.summarize(xs);
    const $2 = v.failed;
    const $3 = v.pending;
    return $0.bind((() => {
      const $4 = dictMonadWriter.MonadTell1().tell(Test$dSpec$dStyle.styled(Test$dSpec$dStyle.green)(Data$dShow.showIntImpl(v.passed) + " passing") + "\n");
      if (v.passed > 0) { return $4; }
      return $1.pure();
    })())(() => $0.bind((() => {
      const $4 = dictMonadWriter.MonadTell1().tell(Test$dSpec$dStyle.styled(Test$dSpec$dStyle.cyan)(Data$dShow.showIntImpl($3) + " pending") + "\n");
      if ($3 > 0) { return $4; }
      return $1.pure();
    })())(() => {
      const $4 = dictMonadWriter.MonadTell1().tell(Test$dSpec$dStyle.styled(Test$dSpec$dStyle.red)(Data$dShow.showIntImpl($2) + " failed") + "\n");
      if ($2 > 0) { return $4; }
      return $1.pure();
    }));
  })())(() => $0.bind(dictMonadWriter.MonadTell1().tell("\n"))(() => printFailures1(xs)));
};
const defaultReporter = initialState => onEvent => scanWithStateM1(s => e => {
  const $0 = onEvent(e)(s);
  const $1 = $0._1._2;
  return Effect$dAff._liftEffect((() => {
    const $2 = Test$dSpec$dConsole.write($0._2);
    return () => {
      $2();
      return $1;
    };
  })());
})(Effect$dAff._pure(initialState));
export {
  $RunningItem,
  RunningPending,
  RunningSuite,
  RunningTest,
  all,
  applicativeStateT,
  bindStateT,
  defaultReporter,
  defaultSummary,
  defaultUpdate,
  for_,
  genericShowArgsArgument,
  $$get as get,
  monadStateStateT,
  monadWriterT,
  ordArray,
  printFailures,
  runningItemGeneric,
  runningItemShow,
  scanWithStateM,
  scanWithStateM1
};
