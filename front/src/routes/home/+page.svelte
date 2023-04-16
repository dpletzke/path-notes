<script lang="ts">
	import { goto } from '$app/navigation';
	import { accessToken, user } from '../../stores';

	const onLogout = () => {
		accessToken.set(null);
		goto('/login');
	};
</script>

<div>
	<h1>Home</h1>
	{$accessToken}
</div>
<button on:click={onLogout}>Logout</button>
{JSON.stringify($user, null, 2)}

<style>
</style>
