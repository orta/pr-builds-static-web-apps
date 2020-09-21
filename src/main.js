import App from './App.svelte';
const queryParams = new URLSearchParams(document.location)

const app = new App({
	target: document.body,
	props: {
		name: queryParams.get("name") || 'world'
	}
});

export default app;
