export async function load(event) {
	const { user } = event.locals;
	return { user };
}
