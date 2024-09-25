import type { Tree } from '@openscd/oscd-tree-grid';
type FilterOptions = {
    leafNode?: string;
    lnClass?: string;
};
export declare function dataAttributeTree(doc: XMLDocument, filter: FilterOptions): Tree;
export declare function getSourceDef(paths: string[][]): string[];
export {};
