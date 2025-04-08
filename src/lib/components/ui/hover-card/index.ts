import { LinkPreview as HoverCardPrimitive } from 'bits-ui';

const Root = HoverCardPrimitive.Root;
const Trigger = HoverCardPrimitive.Trigger;

export { Root, Trigger, Root as HoverCard, Trigger as HoverCardTrigger };

export { default as Content, default as HoverCardContent } from './hover-card-content.svelte';
