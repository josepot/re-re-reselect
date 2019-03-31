// TypeScript Version: 3.0

export type Selector<S, R> = (state: S) => R;
export type ParametricSelector<S, P, R> = (state: S, props: P, ...args: any[]) => R;

interface OutputProps<C> {
  resultFunc: C;
  recomputations: () => number;
  resetRecomputations: () => number;
}
interface InstanceProps<S> {
  keySelector: Selector<S, string>;
}
type OutputInstanceProps<S, R, C> = OutputProps<C> & {
  use: (key: string) => () => void,
  clearCache: (recursive?: boolean) => void,
};
type OutputParametricInstanceProps<S, P, R, C> = OutputProps<C> & {
  use: (key: string) => () => void,
  clearCache: (recursive?: boolean) => void,
};
interface ParametricInstanceProps<S, P> {
  keySelector: ParametricSelector<S, P, string>;
}

export type OutputSelector<S, R, C> = Selector<S, R> & OutputProps<C>;
export type InstanceSelector<S, R> = Selector<S, R> & InstanceProps<S>;
export type OutputInstanceSelector<S, R, C> = Selector<S, R> & OutputProps<C> & OutputInstanceProps<S, R, C> & InstanceProps<S>;

export type OutputParametricSelector<S, P, R, C> = ParametricSelector<S, P, R> & OutputProps<C>;
export type ParametricInstanceSelector<S, P, R> = ParametricSelector<S, P, R> & ParametricInstanceProps<S, P>;
export type OutputParametricInstanceSelector<S, P, R, C> = ParametricSelector<S, P, R> & OutputParametricInstanceProps<S, P, R, C> & ParametricInstanceProps<S, P>;

export function isInstanceSelector<S, R, C>(selector: OutputSelector<S, R, C>): selector is OutputInstanceSelector<S, R, C>;
export function isInstanceSelector<S, P, R, C>(selector: OutputParametricSelector<S, P, R, C>): selector is OutputParametricInstanceSelector<S, P, R, C>;

/////////////////////////
/// createKeySelector ///
/////////////////////////

interface KeySelector<P> {
  (props: P, ...args: any[]): string;
}

export function createKeySelector<P>(keySelector: KeySelector<P>): ParametricInstanceSelector<{}, P, string>;

//////////////////////////////////
/// createKeyedSelectorFactory ///
//////////////////////////////////

export interface KeyedSelectorFactory<S, T> {
  <P>(keySelector: KeySelector<P>): ParametricInstanceSelector<S, P, T>;
}
export interface ParametricKeyedSelectorFactory<S, P1, T> {
  <P2>(keySelector: KeySelector<P2>): ParametricInstanceSelector<S, P1 & P2, T>;
}

export function createKeyedSelectorFactory<S1, R1, T>(
  selector1: Selector<S1, R1>,
  combiner: (res1: R1, key: string) => T
): KeyedSelectorFactory<S1, T>;
export function createKeyedSelectorFactory<S1, P1, R1, T>(
  selector1: ParametricSelector<S1, P1, R1>,
  combiner: (res1: R1, key: string) => T
): ParametricKeyedSelectorFactory<S1, P1, T>;

export function createKeyedSelectorFactory<S1, S2, R1, R2, T>(
  selector1: Selector<S1, R1>,
  selector2: Selector<S2, R2>,
  combiner: (res1: R1, res2: R2, key: string) => T
): KeyedSelectorFactory<S1 & S2, T>;
export function createKeyedSelectorFactory<S1, S2, P1, P2, R1, R2, T>(
  selector1: ParametricSelector<S1, P1, R1>,
  selector2: ParametricSelector<S2, P2, R2>,
  combiner: (res1: R1, res2: R2, key: string) => T
): ParametricKeyedSelectorFactory<S1 & S2, P1 & P2, T>;

export function createKeyedSelectorFactory<S1, S2, S3, R1, R2, R3, T>(
  selector1: Selector<S1, R1>,
  selector2: Selector<S2, R2>,
  selector3: Selector<S3, R3>,
  combiner: (res1: R1, res2: R2, res3: R3, key: string) => T
): KeyedSelectorFactory<S1 & S2 & S3, T>;
export function createKeyedSelectorFactory<S1, S2, S3, P1, P2, P3, R1, R2, R3, T>(
  selector1: ParametricSelector<S1, P1, R1>,
  selector2: ParametricSelector<S2, P2, R2>,
  selector3: ParametricSelector<S3, P3, R3>,
  combiner: (res1: R1, res2: R2, res3: R3, key: string) => T
): ParametricKeyedSelectorFactory<S1 & S2 & S3, P1 & P2 & P3, T>;

//////////////////////
/// createSelector ///
//////////////////////

export { };

/* one selector */
export function createSelector<S1, R1, T>(
  selector1: Selector<S1, R1>,
  combiner: (res1: R1) => T,
): OutputSelector<S1, T, (res1: R1) => T>;

export function createSelector<S1, P1, R1, T>(
  selector1: ParametricSelector<S1, P1, R1>,
  combiner: (res1: R1) => T,
): OutputParametricSelector<S1, P1, T, (res1: R1) => T>;

/* two selector */
export function createSelector<S1, S2, R1, R2, T>(
  selector1: Selector<S1, R1>,
  selector2: Selector<S2, R2>,
  combiner: (res1: R1, res2: R2) => T,
): OutputSelector<S1 & S2, T, (res1: R1, res2: R2) => T>;

export function createSelector<S1, S2, P1, P2, R1, R2, T>(
  selector1: ParametricSelector<S1, P1, R1>,
  selector2: ParametricSelector<S2, P2, R2>,
  combiner: (res1: R1, res2: R2) => T,
): OutputParametricSelector<S1 & S2, P1 & P2, T, (res1: R1, res2: R2) => T>;

/* three selector */
export function createSelector<S1, S2, S3, R1, R2, R3, T>(
  selector1: Selector<S1, R1>,
  selector2: Selector<S2, R2>,
  selector3: Selector<S3, R3>,
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputSelector<S1 & S2 & S3, T, (res1: R1, res2: R2, res3: R3) => T>;

export function createSelector<S1, S2, S3, P1, P2, P3, R1, R2, R3, T>(
  selector1: ParametricSelector<S1, P1, R1>,
  selector2: ParametricSelector<S2, P2, R2>,
  selector3: ParametricSelector<S3, P3, R3>,
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputParametricSelector<S1 & S2 & S3, P1 & P2 & P3, T, (res1: R1, res2: R2, res3: R3) => T>;

/* tuple argument */
/* one selector */
export function createSelector<S1, R1, T>(
  selectors: [Selector<S1, R1>],
  combiner: (res1: R1) => T,
): OutputSelector<S1, T, (res1: R1) => T>;

export function createSelector<S1, P1, R1, T>(
  selectors: [ParametricSelector<S1, P1, R1>],
  combiner: (res1: R1) => T,
): OutputParametricSelector<S1, P1, T, (res1: R1) => T>;

/* two selector */
export function createSelector<S1, S2, R1, R2, T>(
  selectors: [Selector<S1, R1>, Selector<S2, R2>],
  combiner: (res1: R1, res2: R2) => T,
): OutputSelector<S1 & S2, T, (res1: R1, res2: R2) => T>;

export function createSelector<S1, S2, P1, P2, R1, R2, T>(
  selectors: [ParametricSelector<S1, P1, R1>, ParametricSelector<S2, P2, R2>],
  combiner: (res1: R1, res2: R2) => T,
): OutputParametricSelector<S1 & S2, P1 & P2, T, (res1: R1, res2: R2) => T>;

/* three selector */
export function createSelector<S1, S2, S3, R1, R2, R3, T>(
  selectors: [Selector<S1, R1>, Selector<S2, R2>, Selector<S3, R3>],
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputSelector<S1 & S2 & S3, T, (res1: R1, res2: R2, res3: R3) => T>;

export function createSelector<S1, S2, S3, P1, P2, P3, R1, R2, R3, T>(
  selectors: [ParametricSelector<S1, P1, R1>, ParametricSelector<S2, P2, R2>, ParametricSelector<S3, P3, R3>],
  combiner: (res1: R1, res2: R2, res3: R3) => T,
): OutputParametricSelector<S1 & S2 & S3, P1 & P2 & P3, T, (res1: R1, res2: R2, res3: R3) => T>;

/* any number of uniform selectors */
export function createSelector<S, R, T>(
  selectors: Selector<S, R>[],
  combiner: (...res: R[]) => T,
): OutputSelector<S, T, (...res: R[]) => T>;
export function createSelector<S, P, R, T>(
  selectors: ParametricSelector<S, P, R>[],
  combiner: (...res: R[]) => T,
): OutputParametricSelector<S, P, T, (...res: R[]) => T>;

////////////////////////////////
/// createStructuredSelector ///
////////////////////////////////

export function createStructuredSelector<S, T>(
  selectors: {[K in keyof T]: Selector<S, T[K]>},
): OutputSelector<S, T, never>;

export function createStructuredSelector<S, P, T>(
  selectors: {[K in keyof T]: ParametricSelector<S, P, T[K]>},
): OutputParametricSelector<S, P, T, never>;
