<script lang="ts">
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import { accessToken } from '../../stores';
	import { sendReq } from '../../utils/sendReq';
	import { isSuccess } from '../../types';

	const form = useForm();

	let responseError = '';

	type SuccessResponse = {
		user: {
			id: string;
			email: string;
			role: string;
		};
		tokens: {
			access: {
				token: string;
				expires: string;
			};
			refresh: {
				token: string;
				expires: string;
			};
		};
	};

	$: onSubmit = async () => {
		const { email, password } = $form;
		const response = await sendReq<SuccessResponse>('POST', {
			url: `${import.meta.env.VITE_BACK_END_URL}/login`,
			payload: {
				email: email?.value,
				password: password?.value
			}
		});

		if (isSuccess<SuccessResponse>(response)) {
			accessToken.set(response.body.tokens.access.token);
		} else {
			responseError = response.body.message;
		}
	};
</script>

<form use:form>
	<h1>Login</h1>

	<input type="email" name="email" placeholder="email" use:validators={[required, email]} />
	<HintGroup for="email">
		<Hint on="required">This is a mandatory field</Hint>
		<Hint on="email" hideWhenRequired>Email is not valid</Hint>
	</HintGroup>

	<input name="password" placeholder="password" use:validators={[required]} />
	<Hint for="password" on="required">This is a mandatory field</Hint>

	<button disabled={!$form.valid} on:click|preventDefault={onSubmit}>Login</button>
</form>
{#if responseError}
	<p>{responseError}</p>
{/if}
{#if $accessToken}
	<p>Logged in</p>
{/if}

<style>
	:global(.touched:invalid) {
		border-color: red;
		outline-color: red;
	}
</style>
