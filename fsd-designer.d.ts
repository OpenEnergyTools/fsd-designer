import { LitElement } from 'lit';
import '@material/mwc-button';
import './function-editor.js';
export declare function createElement(doc: Document, tag: string, attrs: Record<string, string | null>): Element;
export default class SclBayTemplate extends LitElement {
    doc?: XMLDocument;
    editCount: number;
    get function(): Element | null;
    get substation(): Element | null;
    private createTemplate;
    render(): import("lit").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
