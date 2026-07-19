import{c as o,j as t,B as r,e as x}from"./index-D7dOofDe.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=o("Inbox",[["polyline",{points:"22 12 16 12 14 15 10 15 8 12 2 12",key:"o97t9d"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}]]);function c({title:s="No data found",description:m="There is no data to display at the moment.",actionLabel:e,onAction:a,className:n}){return t.jsxs("div",{className:x("flex flex-col items-center justify-center py-16 text-center",n),children:[t.jsx(i,{className:"mb-4 h-16 w-16 text-disabled"}),t.jsx("h4",{className:"mb-2 text-lg font-semibold text-text-primary",children:s}),t.jsx("p",{className:"mb-6 max-w-sm text-sm text-text-secondary",children:m}),e&&a&&t.jsx(r,{variant:"primary",onClick:a,children:e})]})}c.displayName="EmptyState";export{c as E};
