import * as $runtime from "../runtime.js";
import * as Data$dEq from "../Data.Eq/index.js";
import * as Data$dEuclideanRing from "../Data.EuclideanRing/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dFoldableWithIndex from "../Data.FoldableWithIndex/index.js";
import * as Data$dList from "../Data.List/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMap$dInternal from "../Data.Map.Internal/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dShow from "../Data.Show/index.js";
import * as Data$dTraversable from "../Data.Traversable/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Type$dProxy from "../Type.Proxy/index.js";
import {emptyImpl, hasImpl, insertImpl} from "./foreign.js";
const ordMap = /* #__PURE__ */ Data$dMap$dInternal.ordMap(Data$dOrd.ordInt);
const showVect = dictShow => dictReflectable => (
  {
    show: v => "Vect.Sparse.Read " + Data$dShow.showIntImpl(dictReflectable.reflectType(Type$dProxy.Proxy)) + " " + Data$dList$dTypes.showList({
      show: record => "{ elem: " + dictShow.show(record.elem) + ", ix: " + Data$dShow.showIntImpl(record.ix) + " }"
    }).show(v)
  }
);
const functorVect = {map: f => v => Data$dList$dTypes.listMap(v1 => ({ix: v1.ix, elem: f(v1.elem)}))(v)};
const functorWithIndexIntVect = {mapWithIndex: f => v => Data$dList$dTypes.listMap(v1 => ({ix: v1.ix, elem: f(v1.ix)(v1.elem)}))(v), Functor0: () => functorVect};
const foldableVect = {
  foldl: bab => {
    const go = go$a0$copy => go$a1$copy => go$a2$copy => {
      let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$a2 = go$a2$copy, go$c = true, go$r;
      while (go$c) {
        const v = go$a0, v1 = go$a1, v2 = go$a2;
        if (v2.tag === "Nil") {
          go$c = false;
          go$r = v1;
          continue;
        }
        if (v2.tag === "Cons") {
          if (hasImpl(v2._1.ix)(v)) {
            go$a0 = v;
            go$a1 = v1;
            go$a2 = v2._2;
            continue;
          }
          go$a0 = insertImpl(v2._1.ix)(v);
          go$a1 = bab(v1)(v2._1.elem);
          go$a2 = v2._2;
          continue;
        }
        $runtime.fail();
      }
      return go$r;
    };
    return go(emptyImpl);
  },
  foldr: i => Data$dFoldable.foldrDefault(foldableVect)(i),
  foldMap: dictMonoid => i => foldableVect.foldl(acc => x => dictMonoid.Semigroup0().append(acc)(i(x)))(dictMonoid.mempty)
};
const foldableWithIndexIntVect = {
  foldlWithIndex: ibab => {
    const go = go$a0$copy => go$a1$copy => go$a2$copy => {
      let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$a2 = go$a2$copy, go$c = true, go$r;
      while (go$c) {
        const v = go$a0, v1 = go$a1, v2 = go$a2;
        if (v2.tag === "Nil") {
          go$c = false;
          go$r = v1;
          continue;
        }
        if (v2.tag === "Cons") {
          if (hasImpl(v2._1.ix)(v)) {
            go$a0 = v;
            go$a1 = v1;
            go$a2 = v2._2;
            continue;
          }
          go$a0 = insertImpl(v2._1.ix)(v);
          go$a1 = ibab(v2._1.ix)(v1)(v2._1.elem);
          go$a2 = v2._2;
          continue;
        }
        $runtime.fail();
      }
      return go$r;
    };
    return go(emptyImpl);
  },
  foldrWithIndex: i => Data$dFoldableWithIndex.foldrWithIndexDefault(foldableWithIndexIntVect)(i),
  foldMapWithIndex: dictMonoid => i => foldableWithIndexIntVect.foldlWithIndex(i$1 => acc => x => dictMonoid.Semigroup0().append(acc)(i(i$1)(x)))(dictMonoid.mempty),
  Foldable0: () => foldableVect
};
const traversableVect = {
  traverse: dictApplicative => {
    const Apply0 = dictApplicative.Apply0();
    return amb => {
      const go = v => v1 => {
        if (v1.tag === "Nil") { return dictApplicative.pure(Data$dList$dTypes.Nil); }
        if (v1.tag === "Cons") {
          if (hasImpl(v1._1.ix)(v)) { return go(v)(v1._2); }
          const $0 = v1._1.ix;
          return Apply0.apply(Apply0.Functor0().map(v2 => v3 => Data$dList$dTypes.$List("Cons", {ix: $0, elem: v2}, v3))(amb(v1._1.elem)))(go(insertImpl($0)(v))(v1._2));
        }
        $runtime.fail();
      };
      return go(emptyImpl);
    };
  },
  sequence: dictApplicative => traversableVect.traverse(dictApplicative)(Data$dTraversable.identity),
  Functor0: () => functorVect,
  Foldable1: () => foldableVect
};
const traversableWithIndexIntVe = {
  traverseWithIndex: dictApplicative => {
    const Apply0 = dictApplicative.Apply0();
    return iamb => {
      const go = v => v1 => {
        if (v1.tag === "Nil") { return dictApplicative.pure(Data$dList$dTypes.Nil); }
        if (v1.tag === "Cons") {
          if (hasImpl(v1._1.ix)(v)) { return go(v)(v1._2); }
          const $0 = v1._1.ix;
          return Apply0.apply(Apply0.Functor0().map(v2 => v3 => Data$dList$dTypes.$List("Cons", {ix: $0, elem: v2}, v3))(iamb($0)(v1._1.elem)))(go(insertImpl($0)(v))(v1._2));
        }
        $runtime.fail();
      };
      return go(emptyImpl);
    };
  },
  FunctorWithIndex0: () => functorWithIndexIntVect,
  FoldableWithIndex1: () => foldableWithIndexIntVect,
  Traversable2: () => traversableVect
};
const isVectVect = {TraversableWithIndex0: () => traversableWithIndexIntVe};
const toList = () => v => v;
const take = () => dictReflectable => () => () => proxy => v => {
  const takes = dictReflectable.reflectType(proxy);
  return Data$dList.filter(v1 => v1.ix < takes)(v);
};
const splitAt = () => dictReflectable => () => () => proxy => v => {
  const splits = dictReflectable.reflectType(proxy);
  const $0 = Data$dList.partition(v1 => v1.ix < splits)(v);
  return {before: $0.yes, after: $0.no};
};
const sparse = Data$dList$dTypes.Nil;
const snoc = () => dictReflectable => () => v => elem => Data$dList$dTypes.$List("Cons", {ix: dictReflectable.reflectType(Type$dProxy.Proxy), elem}, v);
const singleton = elem => Data$dList$dTypes.$List("Cons", {ix: 0, elem}, Data$dList$dTypes.Nil);
const $$set = dictReflectable => () => () => () => proxy => elem => v => Data$dList$dTypes.$List("Cons", {ix: dictReflectable.reflectType(proxy), elem}, v);
const replicate = () => dictReflectable => proxy => elem => {
  const terminus = dictReflectable.reflectType(proxy);
  return Data$dList$dTypes.unfoldableList.unfoldr(v => {
    if (v.ix === terminus) { return Data$dMaybe.Nothing; }
    return Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(v, {ix: v.ix + 1 | 0, elem}));
  })({ix: 0, elem});
};
const mapWithTerm = dictReflectable => () => f => {
  const f1 = f()();
  return xs => functorWithIndexIntVect.mapWithIndex(i => elem => f1({reflectType: v1 => i})(Type$dProxy.Proxy)(elem))(xs);
};
const indexModulo = () => dictReflectable => i => v => {
  const moded = Data$dEuclideanRing.intMod(i)(dictReflectable.reflectType(Type$dProxy.Proxy));
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const b = go$a0, v$1 = go$a1;
      if (v$1.tag === "Nil") {
        go$c = false;
        go$r = b;
        continue;
      }
      if (v$1.tag === "Cons") {
        go$a0 = (() => {
          if (b.tag === "Nothing") {
            if (moded === v$1._1.ix) { return Data$dMaybe.$Maybe("Just", v$1._1.elem); }
            return Data$dMaybe.Nothing;
          }
          return b;
        })();
        go$a1 = v$1._2;
        continue;
      }
      $runtime.fail();
    }
    return go$r;
  };
  return go(Data$dMaybe.Nothing)(v);
};
const index = dictReflectable => () => () => () => proxy => v => {
  const ixInt = dictReflectable.reflectType(proxy);
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const b = go$a0, v$1 = go$a1;
      if (v$1.tag === "Nil") {
        go$c = false;
        go$r = b;
        continue;
      }
      if (v$1.tag === "Cons") {
        go$a0 = (() => {
          if (b.tag === "Nothing") {
            if (ixInt === v$1._1.ix) { return Data$dMaybe.$Maybe("Just", v$1._1.elem); }
            return Data$dMaybe.Nothing;
          }
          return b;
        })();
        go$a1 = v$1._2;
        continue;
      }
      $runtime.fail();
    }
    return go$r;
  };
  return go(Data$dMaybe.Nothing)(v);
};
const head = () => v => {
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const b = go$a0, v$1 = go$a1;
      if (v$1.tag === "Nil") {
        go$c = false;
        go$r = b;
        continue;
      }
      if (v$1.tag === "Cons") {
        go$a0 = (() => {
          if (b.tag === "Nothing") {
            if (v$1._1.ix === 0) { return Data$dMaybe.$Maybe("Just", v$1._1.elem); }
            return Data$dMaybe.Nothing;
          }
          return b;
        })();
        go$a1 = v$1._2;
        continue;
      }
      $runtime.fail();
    }
    return go$r;
  };
  return go(Data$dMaybe.Nothing)(v);
};
const generate = dictReflectable => () => v => f => {
  const f1 = f()();
  return Data$dList$dTypes.listMap(i => ({ix: i, elem: f1({reflectType: v1 => i})(Type$dProxy.Proxy)}))(Data$dList.range(0)(dictReflectable.reflectType(Type$dProxy.Proxy) - 1 | 0));
};
const empty = Data$dList$dTypes.Nil;
const drop = () => dictReflectable => () => () => proxy => v => {
  const drops = dictReflectable.reflectType(proxy);
  return Data$dList.mapMaybe(v1 => {
    if (v1.ix >= drops) { return Data$dMaybe.$Maybe("Just", {ix: v1.ix - drops | 0, elem: v1.elem}); }
    return Data$dMaybe.Nothing;
  })(v);
};
const cons = () => () => elem => v => Data$dList$dTypes.$List("Cons", {ix: 0, elem}, Data$dList$dTypes.listMap(v1 => ({ix: v1.ix + 1 | 0, elem: v1.elem}))(v));
const asMap = /* #__PURE__ */ (() => {
  const go = go$a0$copy => go$a1$copy => {
    let go$a0 = go$a0$copy, go$a1 = go$a1$copy, go$c = true, go$r;
    while (go$c) {
      const b = go$a0, v = go$a1;
      if (v.tag === "Nil") {
        go$c = false;
        go$r = b;
        continue;
      }
      if (v.tag === "Cons") {
        go$a0 = (() => {
          const $0 = v._1.elem;
          return Data$dMap$dInternal.alter(Data$dOrd.ordInt)(v1 => {
            if (v1.tag === "Just") { return Data$dMaybe.$Maybe("Just", v1._1); }
            if (v1.tag === "Nothing") { return Data$dMaybe.$Maybe("Just", $0); }
            $runtime.fail();
          })(v._1.ix)(b);
        })();
        go$a1 = v._2;
        continue;
      }
      $runtime.fail();
    }
    return go$r;
  };
  return go(Data$dMap$dInternal.Leaf);
})();
const eqVect = dictEq => ({eq: v => v1 => Data$dMap$dInternal.eqMap(Data$dEq.eqInt)(dictEq).eq(asMap(v))(asMap(v1))});
const ordVect = dictOrd => {
  const eqVect1 = eqVect(dictOrd.Eq0());
  return {compare: v => v1 => ordMap(dictOrd).compare(asMap(v))(asMap(v1)), Eq0: () => eqVect1};
};
const fromMap = dictReflectable => () => v => v1 => {
  const $0 = Data$dMap$dInternal.findMax(v1);
  if ($0.tag === "Just" && $0._1.key < dictReflectable.reflectType(v) && $0._1.key >= 0) {
    return Data$dMaybe.$Maybe(
      "Just",
      Data$dMap$dInternal.foldableWithIndexMap.foldlWithIndex(ix => b => elem => Data$dList$dTypes.$List("Cons", {ix, elem}, b))(Data$dList$dTypes.Nil)(v1)
    );
  }
  return Data$dMaybe.Nothing;
};
const modify = dictReflectable => () => () => () => proxy => f => v => Data$dMap$dInternal.foldableWithIndexMap.foldlWithIndex(ix => b => elem => Data$dList$dTypes.$List(
  "Cons",
  {ix, elem},
  b
))(Data$dList$dTypes.Nil)(Data$dMap$dInternal.update(Data$dOrd.ordInt)(x => Data$dMaybe.$Maybe("Just", f(x)))(dictReflectable.reflectType(proxy))(asMap(v)));
const applyVect = {
  apply: v => v1 => Data$dMap$dInternal.foldableWithIndexMap.foldlWithIndex(ix => b => elem => Data$dList$dTypes.$List("Cons", {ix, elem}, b))(Data$dList$dTypes.Nil)(Data$dMap$dInternal.intersectionWith(Data$dOrd.ordInt)(Data$dMap$dInternal.identity)(asMap(v))(asMap(v1))),
  Functor0: () => functorVect
};
const applicativeVect = () => dictReflectable => ({pure: replicate()(dictReflectable)(Type$dProxy.Proxy), Apply0: () => applyVect});
const append = () => () => dictReflectable => () => v => v1 => Data$dList$dTypes.foldableList.foldr(Data$dList$dTypes.Cons)(Data$dList$dTypes.listMap(v2 => (
  {ix: v2.ix + dictReflectable.reflectType(Type$dProxy.Proxy) | 0, elem: v2.elem}
))(v1))(v);
export {
  append,
  applicativeVect,
  applyVect,
  asMap,
  cons,
  drop,
  empty,
  eqVect,
  foldableVect,
  foldableWithIndexIntVect,
  fromMap,
  functorVect,
  functorWithIndexIntVect,
  generate,
  head,
  index,
  indexModulo,
  isVectVect,
  mapWithTerm,
  modify,
  ordMap,
  ordVect,
  replicate,
  $$set as set,
  showVect,
  singleton,
  snoc,
  sparse,
  splitAt,
  take,
  toList,
  traversableVect,
  traversableWithIndexIntVe
};
export * from "./foreign.js";
