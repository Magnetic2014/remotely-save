declare module "node-diff3" {
  export function LCS(a:  string[], b: string[]): any;
  export function diff3Merge(a: string[], o:  string[], b: string[], options?:  any): any;
  export function diffComm(a: string[], b: string[]): any;
  export function diffPatch(a: string[], b: string[]): any;
  export function mergeDiff3(a: string[], o: string[], b: string[], options?: any): any;
  export function mergeDigIn(a:  string, o: string, b:  string, options?: any): {
    conflict: boolean;
    result: string[];
  };
  export function patch(a: string[], diff: any): string[];
}