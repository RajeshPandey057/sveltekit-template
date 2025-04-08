import * as FormPrimitive from 'formsnap';

const Control = FormPrimitive.Control as typeof FormPrimitive.Control;

export {
	Control,

	//
	Control as FormControl
};

export { default as Field, default as FormField } from './form-field.svelte';
export { default as Label, default as FormLabel } from './form-label.svelte';
export { default as FieldErrors, default as FormFieldErrors } from './form-field-errors.svelte';
export { default as Description, default as FormDescription } from './form-description.svelte';
export { default as Fieldset, default as FormFieldset } from './form-fieldset.svelte';

export { default as Legend, default as FormLegend } from './form-legend.svelte';
export { default as ElementField, default as FormElementField } from './form-element-field.svelte';
export { default as Button, default as FormButton } from './form-button.svelte';
