import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';

const Sub: typeof ContextMenuPrimitive.Sub = ContextMenuPrimitive.Sub;
const Root: typeof ContextMenuPrimitive.Root = ContextMenuPrimitive.Root;
const Trigger: typeof ContextMenuPrimitive.Trigger = ContextMenuPrimitive.Trigger;
const Group: typeof ContextMenuPrimitive.Group = ContextMenuPrimitive.Group;
const RadioGroup: typeof ContextMenuPrimitive.RadioGroup = ContextMenuPrimitive.RadioGroup;

export {
	Sub,
	Root,
	Group,
	Trigger,
	RadioGroup,

	//
	Root as ContextMenu,
	Sub as ContextMenuSub,
	Group as ContextMenuGroup,
	Trigger as ContextMenuTrigger,
	RadioGroup as ContextMenuRadioGroup
};

export { default as Item, default as ContextMenuItem } from './context-menu-item.svelte';
export { default as Content, default as ContextMenuContent } from './context-menu-content.svelte';
export {
	default as Shortcut,
	default as ContextMenuShortcut
} from './context-menu-shortcut.svelte';
export {
	default as Separator,
	default as ContextMenuSeparator
} from './context-menu-separator.svelte';
export {
	default as RadioItem,
	default as ContextMenuRadioItem
} from './context-menu-radio-item.svelte';

export {
	default as GroupHeading,
	default as ContextMenuGroupHeading
} from './context-menu-group-heading.svelte';
export {
	default as SubContent,
	default as ContextMenuSubContent
} from './context-menu-sub-content.svelte';
export {
	default as SubTrigger,
	default as ContextMenuSubTrigger
} from './context-menu-sub-trigger.svelte';
export {
	default as CheckboxItem,
	default as ContextMenuCheckboxItem
} from './context-menu-checkbox-item.svelte';
