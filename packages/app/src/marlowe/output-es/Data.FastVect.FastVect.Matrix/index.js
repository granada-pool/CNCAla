import * as $runtime from "../runtime.js";
import * as Data$dArray from "../Data.Array/index.js";
import * as Data$dEq from "../Data.Eq/index.js";
import * as Data$dFastVect$dFastVect from "../Data.FastVect.FastVect/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dFoldableWithIndex from "../Data.FoldableWithIndex/index.js";
import * as Data$dFunction from "../Data.Function/index.js";
import * as Data$dFunctor from "../Data.Functor/index.js";
import * as Data$dFunctorWithIndex from "../Data.FunctorWithIndex/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dShow from "../Data.Show/index.js";
import * as Data$dTraversable from "../Data.Traversable/index.js";
import * as Data$dTraversableWithIndex from "../Data.TraversableWithIndex/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Type$dProxy from "../Type.Proxy/index.js";
const foldable1Vect = /* #__PURE__ */ Data$dFastVect$dFastVect.foldable1Vect();
const toArray = v => v;
const sequence1 = /* #__PURE__ */ (() => Data$dTraversable.traversableArray.traverse(Data$dMaybe.applicativeMaybe)(Data$dTraversable.identity))();
const Matrix = x => x;
const functorMatrix = {map: f => v => Data$dFunctor.arrayMap(Data$dFunctor.arrayMap(f))(v)};
const functorWithIndexTupleIntI = {
  mapWithIndex: f => v => Data$dFunctorWithIndex.mapWithIndexArray(i => Data$dFunctorWithIndex.mapWithIndexArray(j => f(Data$dTuple.$Tuple(i, j))))(v),
  Functor0: () => functorMatrix
};
const foldableMatrix = {
  foldl: f => z => v => Data$dFoldable.foldlArray(Data$dFoldable.foldlArray(f))(z)(v),
  foldr: f => z => v => Data$dFoldable.foldrArray((() => {
    const $0 = Data$dFoldable.foldrArray(f);
    return b => a => $0(a)(b);
  })())(z)(v),
  foldMap: dictMonoid => {
    const foldMap2 = Data$dFoldable.foldableArray.foldMap(dictMonoid);
    return f => v => foldMap2(foldMap2(f))(v);
  }
};
const foldableWithIndexTupleInt = {
  foldlWithIndex: f => z => v => Data$dFoldableWithIndex.foldableWithIndexArray.foldlWithIndex(i => Data$dFoldableWithIndex.foldableWithIndexArray.foldlWithIndex(j => f(Data$dTuple.$Tuple(
    i,
    j
  ))))(z)(v),
  foldrWithIndex: f => z => v => Data$dFoldableWithIndex.foldableWithIndexArray.foldrWithIndex(i => {
    const $0 = Data$dFoldableWithIndex.foldableWithIndexArray.foldrWithIndex(j => f(Data$dTuple.$Tuple(i, j)));
    return b => a => $0(a)(b);
  })(z)(v),
  foldMapWithIndex: dictMonoid => {
    const foldMapWithIndex1 = Data$dFoldableWithIndex.foldableWithIndexArray.foldMapWithIndex(dictMonoid);
    return f => v => foldMapWithIndex1(i => foldMapWithIndex1(j => f(Data$dTuple.$Tuple(i, j))))(v);
  },
  Foldable0: () => foldableMatrix
};
const traversableMatrix = {
  traverse: dictApplicative => {
    const traverse1 = Data$dTraversable.traversableArray.traverse(dictApplicative);
    return f => v => dictApplicative.Apply0().Functor0().map(Matrix)(traverse1(traverse1(f))(v));
  },
  sequence: dictApplicative => {
    const traverse1 = Data$dTraversable.traversableArray.traverse(dictApplicative);
    const sequence2 = Data$dTraversable.traversableArray.traverse(dictApplicative)(Data$dTraversable.identity);
    return v => dictApplicative.Apply0().Functor0().map(Matrix)(traverse1(sequence2)(v));
  },
  Functor0: () => functorMatrix,
  Foldable1: () => foldableMatrix
};
const traversableWithIndexTuple = {
  traverseWithIndex: dictApplicative => {
    const traverseWithIndex1 = Data$dTraversableWithIndex.traversableWithIndexArray.traverseWithIndex(dictApplicative);
    return f => v => dictApplicative.Apply0().Functor0().map(Matrix)(traverseWithIndex1(i => traverseWithIndex1(j => f(Data$dTuple.$Tuple(i, j))))(v));
  },
  FunctorWithIndex0: () => functorWithIndexTupleIntI,
  FoldableWithIndex1: () => foldableWithIndexTupleInt,
  Traversable2: () => traversableMatrix
};
const foldable1Matrix = () => () => (
  {
    foldl1: f => v => foldable1Vect.foldl1(f)(Data$dFunctor.arrayMap(foldable1Vect.foldl1(f))(v)),
    foldr1: f => v => foldable1Vect.foldr1(f)(Data$dFunctor.arrayMap(foldable1Vect.foldr1(f))(v)),
    foldMap1: dictSemigroup => {
      const foldMap11 = foldable1Vect.foldMap1(dictSemigroup);
      return f => v => foldMap11(foldMap11(f))(v);
    },
    Foldable0: () => foldableMatrix
  }
);
const eqMatrix = dictEq => {
  const eq1 = Data$dEq.eqArrayImpl(Data$dEq.eqArrayImpl(dictEq.eq));
  return {eq: x => y => eq1(x)(y)};
};
const ordMatrix = dictOrd => {
  const compare = Data$dOrd.ordArray(Data$dOrd.ordArray(dictOrd)).compare;
  const eqMatrix1 = eqMatrix(dictOrd.Eq0());
  return {compare: x => y => compare(x)(y), Eq0: () => eqMatrix1};
};
const applyMatrix = {
  apply: v => v1 => Data$dArray.zipWith(Data$dFunction.apply)(Data$dFunctor.arrayMap(Data$dFastVect$dFastVect.applyVect.apply)(v))(v1),
  Functor0: () => functorMatrix
};
const toVectVect = v => v;
const toVectArray = () => () => v => v;
const toVect = () => v => Data$dFastVect$dFastVect.indexImpl(0)(v);
const toArrayArray = () => () => v => Data$dFunctor.arrayMap(toArray)(v);
const showMatrix = dictShow => {
  const show = Data$dShow.showArrayImpl(Data$dShow.showArrayImpl(dictShow.show));
  return () => () => ({show: m => show(Data$dFunctor.arrayMap(toArray)(m))});
};
const singleton = a => [[a]];
const replicate = () => dictReflectable => () => dictReflectable1 => v => v1 => a => Data$dArray.replicate(dictReflectable1.reflectType(Type$dProxy.Proxy))(Data$dArray.replicate(dictReflectable.reflectType(Type$dProxy.Proxy))(a));
const applicativeMatrix = () => dictReflectable => () => dictReflectable1 => (
  {pure: replicate()(dictReflectable)()(dictReflectable1)(Type$dProxy.Proxy)(Type$dProxy.Proxy), Apply0: () => applyMatrix}
);
const outerMap = dictReflectable => () => dictReflectable1 => () => f => v1 => v2 => Data$dFunctor.arrayMap(elemW => Data$dFunctor.arrayMap(elemH => f(elemH)(elemW))(v1))(v2);
const outerProduct = dictReflectable => () => dictReflectable1 => () => dictSemiring => outerMap(dictReflectable)()(dictReflectable1)()(dictSemiring.mul);
const modify = dictReflectable => () => () => () => dictReflectable1 => () => () => () => v => v1 => f => v2 => Data$dFastVect$dFastVect.modifyImpl(dictReflectable1.reflectType(Type$dProxy.Proxy))(Data$dFastVect$dFastVect.modifyImpl(dictReflectable.reflectType(Type$dProxy.Proxy))(f))(v2);
const $$set = dictReflectable => () => () => () => dictReflectable1 => () => () => () => i => j => a => m => modify(dictReflectable)()()()(dictReflectable1)()()()(i)(j)(v => a)(m);
const mapWithTerm = dictReflectable => () => dictReflectable1 => () => f => v => Data$dFastVect$dFastVect.mapWithTerm(dictReflectable1)()(() => () => dictReflectable2 => j => Data$dFastVect$dFastVect.mapWithTerm(dictReflectable)()(() => () => dictReflectable3 => {
  const f2 = f(dictReflectable3)(dictReflectable2)()()()();
  return i => f2(i)(j);
}))(v);
const index = () => () => () => () => () => () => dictReflectable => dictReflectable1 => v => v1 => v2 => Data$dFastVect$dFastVect.indexImpl(dictReflectable.reflectType(Type$dProxy.Proxy))(Data$dFastVect$dFastVect.indexImpl(dictReflectable1.reflectType(Type$dProxy.Proxy))(v2));
const traced = dictReflectable => () => m => Data$dFastVect$dFastVect.generate(dictReflectable)()(Type$dProxy.Proxy)(() => () => dictReflectable1 => i => index()()()()()()(dictReflectable1)(dictReflectable1)(i)(i)(m));
const trace = dictReflectable => dictSemiring => {
  const sum1 = Data$dFoldable.foldlArray(dictSemiring.add)(dictSemiring.zero);
  return () => m => sum1(traced(dictReflectable)()(m));
};
const transform = dictReflectable => () => dictReflectable1 => () => dictSemiring => {
  const sum1 = Data$dFoldable.foldlArray(dictSemiring.add)(dictSemiring.zero);
  return m => v => Data$dFastVect$dFastVect.generate(dictReflectable)()(Type$dProxy.Proxy)(() => () => dictReflectable2 => i => sum1(Data$dFastVect$dFastVect.generate(dictReflectable1)()(Type$dProxy.Proxy)(() => () => dictReflectable3 => j => dictSemiring.mul(index()()()()()()(dictReflectable2)(dictReflectable3)(i)(j)(m))(Data$dFastVect$dFastVect.indexImpl(dictReflectable3.reflectType(j))(v)))));
};
const product = dictReflectable => () => dictReflectable1 => () => dictReflectable2 => () => dictSemiring => {
  const transform3 = transform(dictReflectable)()(dictReflectable1)()(dictSemiring);
  return m1 => v => Data$dFunctor.arrayMap(v1 => transform3(m1)(v1))(v);
};
const generate = dictReflectable => () => dictReflectable1 => () => v => v1 => f => Data$dFastVect$dFastVect.generate(dictReflectable1)()(Type$dProxy.Proxy)(() => () => dictReflectable2 => j => Data$dFastVect$dFastVect.generate(dictReflectable)()(Type$dProxy.Proxy)(() => () => dictReflectable3 => {
  const f1 = f(dictReflectable3)(dictReflectable2)()()()();
  return i => f1(i)(j);
}));
const transpose = dictReflectable => () => dictReflectable1 => () => m => generate(dictReflectable1)()(dictReflectable)()(Type$dProxy.Proxy)(Type$dProxy.Proxy)(dictReflectable2 => dictReflectable3 => () => () => () => () => i => j => index()()()()()()(dictReflectable3)(dictReflectable2)(j)(i)(m));
const fromVectVect = Matrix;
const fromVectArray = () => () => dictReflectable => arr => {
  if (arr.length === dictReflectable.reflectType(Type$dProxy.Proxy)) { return Data$dMaybe.$Maybe("Just", arr); }
  return Data$dMaybe.Nothing;
};
const fromVect = () => v => [v];
const fromArrayArray = () => () => dictReflectable => () => dictReflectable1 => arr => {
  const $0 = sequence1(Data$dFunctor.arrayMap(Data$dFastVect$dFastVect.fromArray(dictReflectable1)()(Type$dProxy.Proxy))(arr));
  if ($0.tag === "Just") {
    if ($0._1.length === dictReflectable.reflectType(Type$dProxy.Proxy)) { return Data$dMaybe.$Maybe("Just", $0._1); }
    return Data$dMaybe.Nothing;
  }
  if ($0.tag === "Nothing") { return Data$dMaybe.Nothing; }
  $runtime.fail();
};
const empty = [];
const dotProduct = dictReflectable => () => dictSemiring => {
  const sum1 = Data$dFoldable.foldlArray(dictSemiring.add)(dictSemiring.zero);
  const mul = dictSemiring.mul;
  return v1 => v2 => sum1(Data$dArray.zipWith(Data$dFunction.apply)(Data$dFunctor.arrayMap(mul)(v1))(v2));
};
const diag = dictReflectable => () => dictSemiring => {
  const zero = dictSemiring.zero;
  return v => generate(dictReflectable)()(dictReflectable)()(Type$dProxy.Proxy)(Type$dProxy.Proxy)(dictReflectable1 => dictReflectable2 => () => () => () => () => i => j => {
    if (dictReflectable1.reflectType(i) === dictReflectable2.reflectType(j)) { return Data$dFastVect$dFastVect.indexImpl(dictReflectable1.reflectType(i))(v); }
    return zero;
  });
};
export {
  Matrix,
  applicativeMatrix,
  applyMatrix,
  diag,
  dotProduct,
  empty,
  eqMatrix,
  foldable1Matrix,
  foldable1Vect,
  foldableMatrix,
  foldableWithIndexTupleInt,
  fromArrayArray,
  fromVect,
  fromVectArray,
  fromVectVect,
  functorMatrix,
  functorWithIndexTupleIntI,
  generate,
  index,
  mapWithTerm,
  modify,
  ordMatrix,
  outerMap,
  outerProduct,
  product,
  replicate,
  sequence1,
  $$set as set,
  showMatrix,
  singleton,
  toArray,
  toArrayArray,
  toVect,
  toVectArray,
  toVectVect,
  trace,
  traced,
  transform,
  transpose,
  traversableMatrix,
  traversableWithIndexTuple
};
