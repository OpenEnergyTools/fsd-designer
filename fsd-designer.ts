import { css, html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

import '@material/mwc-button';

import './function-editor.js';
import { newEditEvent } from '@openscd/open-scd-core';
import { getReference } from '@openenergytools/scl-lib';

export function createElement(
  doc: Document,
  tag: string,
  attrs: Record<string, string | null>
): Element {
  const element = doc.createElementNS(doc.documentElement.namespaceURI, tag);
  Object.entries(attrs)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value !== null)
    .forEach(([name, value]) => element.setAttribute(name, value!));
  return element;
}

export default class SclBayTemplate extends LitElement {
  @property({ attribute: false })
  doc?: XMLDocument;

  @property({ type: Number })
  editCount = -1;

  @state()
  get function(): Element | null {
    return (
      this.doc?.querySelector(
        ':root > Substation > VoltageLevel > Bay > Function'
      ) ?? null
    );
  }

  @property({ attribute: false })
  get substation(): Element | null {
    return this.doc?.querySelector(':root > Substation') ?? null;
  }

  private createTemplate(): void {
    const scl = this.doc?.querySelector('SCL');
    if (!this.doc || !scl) return;

    const subsSt = createElement(this.doc, 'Substation', {});
    subsSt.setAttribute('name', 'TEMPLATES');

    const voltLv = createElement(this.doc, 'VoltageLevel', {});
    voltLv.setAttribute('name', 'TEMPLATES');

    const bay = createElement(this.doc, 'Bay', {});
    bay.setAttribute('name', 'TEMPLATES');

    const func = createElement(this.doc, 'Function', {});
    func.setAttribute('name', 'FUNCTION');

    subsSt.appendChild(voltLv);
    voltLv.appendChild(bay);
    bay.appendChild(func);

    this.dispatchEvent(
      newEditEvent({
        parent: scl,
        node: subsSt,
        reference: getReference(scl, 'Substation'),
      })
    );
  }

  render() {
    if (!this.doc)
      return html`<main>
        <h1>No SCL document loaded. Please create new project!</h1>
      </main>`;

    if (!this.substation)
      return html`<main>
        <h1>No substation section</h1>
        <mwc-button
          icon="playlist_add"
          label="Create Template"
          @click="${() => this.createTemplate()}"
        >
        </mwc-button>
      </main>`;

    return html`<function-editor-90-30
        .doc=${this.doc}
        .editCount=${this.editCount}
        .function=${this.function!}
      ></function-editor-90-30
      >.`;
  }

  static styles = css`
    :host {
      width: 100%;
      height: 100%;
    }

    h1 {
      color: var(--oscd-base03);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
      transition: background-color 150ms linear;
    }

    * {
      --fedit-primary: var(--oscd-primary);
      --fedit-secondary: var(--oscd-secondary);
      --fedit-surface: var(--oscd-base2);

      --fedit-text-color: var(--oscd-base03);
      --fedit-func-color: var(--oscd-base0);
      --fedit-subfunc-color: var(--oscd-base00);
      --fedit-lnode-color: var(--oscd-base01);
      --fedit-selected-color: var(--oscd-base02);
      --fedit-selected-text-color: var(--oscd-base2);
      --fedit-link-color: var(--oscd-base03);
      --fedit-detail-base1: var(--oscd-base2);
      --fedit-detail-base2: var(--oscd-base3);
      --fedit-hover-color: var(--oscd-secondary);
    }
  `;
}
