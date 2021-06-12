<script>
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./Home.svelte";
	import Admin from "./Admin.svelte";

	export let url = "";
</script>

<Router {url}>
	<div>
		<Route path="/"><Home /></Route>
		<Route path="/admin"><Admin /></Route>
	</div>
</Router>
