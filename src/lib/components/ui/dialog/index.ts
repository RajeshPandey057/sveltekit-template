import { Dialog as DialogPrimitive } from 'bits-ui';

const Root: typeof DialogPrimitive.Root = DialogPrimitive.Root;
const Trigger: typeof DialogPrimitive.Trigger = DialogPrimitive.Trigger;
const Close: typeof DialogPrimitive.Close = DialogPrimitive.Close;
const Portal: typeof DialogPrimitive.Portal = DialogPrimitive.Portal;

export {
	Root,
	Portal,
	Trigger,
	Close,
	//
	Root as Dialog,
	Portal as DialogPortal,
	Trigger as DialogTrigger,
	Close as DialogClose
};

export { default as Title, default as DialogTitle } from './dialog-title.svelte';
export { default as Footer, default as DialogFooter } from './dialog-footer.svelte';
export { default as Header, default as DialogHeader } from './dialog-header.svelte';
export { default as Overlay, default as DialogOverlay } from './dialog-overlay.svelte';
export { default as Content, default as DialogContent } from './dialog-content.svelte';

export { default as Description, default as DialogDescription } from './dialog-description.svelte';
