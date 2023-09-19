// | This module defines a type of native homogeneous Javascript Objects.
// |
// | To maximize performance, Javascript objects are not wrapped,
// | and some native code is used even when it's not necessary.
import * as $runtime from "../runtime.js";
import * as Control$dMonad$dST$dInternal from "../Control.Monad.ST.Internal/index.js";
import * as Data$dArray from "../Data.Array/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dFoldableWithIndex from "../Data.FoldableWithIndex/index.js";
import * as Data$dFunction from "../Data.Function/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dShow from "../Data.Show/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnfoldable from "../Data.Unfoldable/index.js";
import * as Unsafe$dCoerce from "../Unsafe.Coerce/index.js";
import {_copyST, _fmapObject, _foldM, _foldSCObject, _lookup, _lookupST, _mapWithKey, all, empty, keys, runST, size, toArrayWithKey} from "./foreign.js";
const showTuple = dictShow1 => ({show: v => "(Tuple " + Data$dShow.showStringImpl(v._1) + " " + dictShow1.show(v._2) + ")"});
const forWithIndex_ = /* #__PURE__ */ Data$dFoldableWithIndex.forWithIndex_(Control$dMonad$dST$dInternal.applicativeST);
const for_ = /* #__PURE__ */ Data$dFoldable.for_(Control$dMonad$dST$dInternal.applicativeST);
const identity = x => x;
const ordTuple = /* #__PURE__ */ Data$dTuple.ordTuple(Data$dOrd.ordString);
const values = /* #__PURE__ */ toArrayWithKey(v => v1 => v1);
const toUnfoldable = dictUnfoldable => {
  const $0 = toArrayWithKey(Data$dTuple.Tuple);
  return x => Data$dArray.toUnfoldable(dictUnfoldable)($0(x));
};
const toAscUnfoldable = dictUnfoldable => {
  const $0 = Data$dArray.sortWith(Data$dOrd.ordString)(Data$dTuple.fst);
  const $1 = toArrayWithKey(Data$dTuple.Tuple);
  return x => Data$dArray.toUnfoldable(dictUnfoldable)($0($1(x)));
};
const toAscArray = /* #__PURE__ */ toAscUnfoldable(Data$dUnfoldable.unfoldableArray);
const toArray = /* #__PURE__ */ toArrayWithKey(Data$dTuple.Tuple);
const thawST = _copyST;
const singleton = k => v => {
  const $0 = {};
  $0[k] = v;
  return $0;
};
const showObject = dictShow => {
  const show = Data$dShow.showArrayImpl(showTuple(dictShow).show);
  return {show: m => "(fromFoldable " + show(toArray(m)) + ")"};
};
const mutate = f => m => {
  const s = {...m};
  f(s)();
  return s;
};
const member = $0 => $1 => _lookup(false, v => true, $0, $1);
const mapWithKey = f => m => _mapWithKey(m, f);
const lookup = $0 => $1 => _lookup(Data$dMaybe.Nothing, Data$dMaybe.Just, $0, $1);
const isSubmap = dictEq => m1 => m2 => all(k => v => _lookup(false, dictEq.eq(v), k, m2))(m1);
const isEmpty = /* #__PURE__ */ all(v => v1 => false);
const insert = k => v => mutate($0 => () => {
  $0[k] = v;
  return $0;
});
const functorObject = {map: f => m => _fmapObject(m, f)};
const functorWithIndexObject = {mapWithIndex: mapWithKey, Functor0: () => functorObject};
const fromHomogeneous = () => Unsafe$dCoerce.unsafeCoerce;
const fromFoldableWithIndex = dictFoldableWithIndex => {
  const forWithIndex_1 = forWithIndex_(dictFoldableWithIndex);
  return l => {
    const s = {};
    forWithIndex_1(l)(k => v => () => {
      s[k] = v;
      return s;
    })();
    return s;
  };
};
const fromFoldableWith = dictFoldable => {
  const for_1 = for_(dictFoldable);
  return f => l => {
    const s = {};
    for_1(l)(v => {
      const $0 = v._1;
      const $1 = _lookupST(v._2, f(v._2), $0, s);
      return () => {
        const v$p = $1();
        s[$0] = v$p;
        return s;
      };
    })();
    return s;
  };
};
const fromFoldable = dictFoldable => {
  const fromFoldable1 = Data$dArray.fromFoldableImpl(dictFoldable.foldr);
  return l => {
    const s = {};
    for (const v of fromFoldable1(l)) {
      s[v._1] = v._2;
    }
    return s;
  };
};
const freezeST = _copyST;
const foldMaybe = f => z => m => _foldSCObject(m, z, f, Data$dMaybe.fromMaybe);
const foldM = dictMonad => {
  const bind1 = dictMonad.Bind1().bind;
  return f => z => _foldM(bind1)(f)(dictMonad.Applicative0().pure(z));
};
const foldM1 = /* #__PURE__ */ foldM(Control$dMonad$dST$dInternal.monadST);
const union = m => mutate(s => foldM1(s$p => k => v => () => {
  s$p[k] = v;
  return s$p;
})(s)(m));
const unions = dictFoldable => dictFoldable.foldl(union)(empty);
const unionWith = f => m1 => m2 => mutate(s1 => foldM1(s2 => k => v1 => {
  const $0 = _lookup(v1, v2 => f(v1)(v2), k, m2);
  return () => {
    s2[k] = $0;
    return s2;
  };
})(s1)(m1))(m2);
const semigroupObject = dictSemigroup => ({append: unionWith(dictSemigroup.append)});
const monoidObject = dictSemigroup => ({mempty: empty, Semigroup0: () => ({append: unionWith(dictSemigroup.append)})});
const fold = /* #__PURE__ */ _foldM(Data$dFunction.applyFlipped);
const foldMap = dictMonoid => {
  const mempty = dictMonoid.mempty;
  return f => fold(acc => k => v => dictMonoid.Semigroup0().append(acc)(f(k)(v)))(mempty);
};
const foldableObject = {
  foldl: f => fold(z => v => f(z)),
  foldr: f => z => m => Data$dFoldable.foldrArray(f)(z)(values(m)),
  foldMap: dictMonoid => {
    const foldMap1 = foldMap(dictMonoid);
    return f => foldMap1(v => f);
  }
};
const foldableWithIndexObject = {
  foldlWithIndex: f => fold(b => a => f(a)(b)),
  foldrWithIndex: f => z => m => Data$dFoldable.foldrArray(v => f(v._1)(v._2))(z)(toArrayWithKey(Data$dTuple.Tuple)(m)),
  foldMapWithIndex: dictMonoid => foldMap(dictMonoid),
  Foldable0: () => foldableObject
};
const traversableWithIndexObject = {
  traverseWithIndex: dictApplicative => {
    const Apply0 = dictApplicative.Apply0();
    return f => ms => fold(acc => k => v => Apply0.apply(Apply0.Functor0().map(b => a => mutate($0 => () => {
      $0[k] = a;
      return $0;
    })(b))(acc))(f(k)(v)))(dictApplicative.pure(empty))(ms);
  },
  FunctorWithIndex0: () => functorWithIndexObject,
  FoldableWithIndex1: () => foldableWithIndexObject,
  Traversable2: () => traversableObject
};
const traversableObject = {
  traverse: dictApplicative => {
    const $0 = traversableWithIndexObject.traverseWithIndex(dictApplicative);
    return x => $0(v => x);
  },
  sequence: dictApplicative => traversableObject.traverse(dictApplicative)(identity),
  Functor0: () => functorObject,
  Foldable1: () => foldableObject
};
const filterWithKey = predicate => m => {
  const m$p = {};
  return foldM1(acc => k => v => {
    if (predicate(k)(v)) {
      return () => {
        acc[k] = v;
        return acc;
      };
    }
    return () => acc;
  })(m$p)(m)();
};
const filterKeys = predicate => filterWithKey(x => {
  const $0 = predicate(x);
  return v => $0;
});
const filter = predicate => filterWithKey(v => predicate);
const eqObject = dictEq => ({eq: m1 => m2 => isSubmap(dictEq)(m1)(m2) && isSubmap(dictEq)(m2)(m1)});
const ordObject = dictOrd => {
  const eqObject1 = eqObject(dictOrd.Eq0());
  return {compare: m1 => m2 => Data$dOrd.ordArray(ordTuple(dictOrd)).compare(toAscArray(m1))(toAscArray(m2)), Eq0: () => eqObject1};
};
const eq1Object = {eq1: dictEq => eqObject(dictEq).eq};
const $$delete = k => mutate($0 => () => {
  delete $0[k];
  return $0;
});
const pop = k => m => {
  const $0 = _lookup(Data$dMaybe.Nothing, Data$dMaybe.Just, k, m);
  if ($0.tag === "Just") {
    return Data$dMaybe.$Maybe(
      "Just",
      Data$dTuple.$Tuple(
        $0._1,
        mutate($1 => () => {
          delete $1[k];
          return $1;
        })(m)
      )
    );
  }
  return Data$dMaybe.Nothing;
};
const alter = f => k => m => {
  const v = f(_lookup(Data$dMaybe.Nothing, Data$dMaybe.Just, k, m));
  if (v.tag === "Nothing") {
    return mutate($0 => () => {
      delete $0[k];
      return $0;
    })(m);
  }
  if (v.tag === "Just") {
    const $0 = v._1;
    return mutate($1 => () => {
      $1[k] = $0;
      return $1;
    })(m);
  }
  $runtime.fail();
};
const update = f => k => m => alter(v2 => {
  if (v2.tag === "Nothing") { return Data$dMaybe.Nothing; }
  if (v2.tag === "Just") { return f(v2._1); }
  $runtime.fail();
})(k)(m);
export {
  alter,
  $$delete as delete,
  eq1Object,
  eqObject,
  filter,
  filterKeys,
  filterWithKey,
  fold,
  foldM,
  foldM1,
  foldMap,
  foldMaybe,
  foldableObject,
  foldableWithIndexObject,
  forWithIndex_,
  for_,
  freezeST,
  fromFoldable,
  fromFoldableWith,
  fromFoldableWithIndex,
  fromHomogeneous,
  functorObject,
  functorWithIndexObject,
  identity,
  insert,
  isEmpty,
  isSubmap,
  lookup,
  mapWithKey,
  member,
  monoidObject,
  mutate,
  ordObject,
  ordTuple,
  pop,
  semigroupObject,
  showObject,
  showTuple,
  singleton,
  thawST,
  toArray,
  toAscArray,
  toAscUnfoldable,
  toUnfoldable,
  traversableObject,
  traversableWithIndexObject,
  union,
  unionWith,
  unions,
  update,
  values
};
export * from "./foreign.js";
