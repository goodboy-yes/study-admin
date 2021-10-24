import type {
  VNode,
  ComponentPublicInstance,
  FunctionalComponent,
  PropType as VuePropType,
} from "vue";

declare global {
  type TimeoutHandle = ReturnType<typeof setTimeout>;
  type IntervalHandle = ReturnType<typeof setInterval>;
}
