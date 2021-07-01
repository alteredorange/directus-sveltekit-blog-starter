<script lang="ts">
	import Header from '$lib/Header/index.svelte';
	import '../app.css';
</script>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
    min-height: calc(100vh - 135px);
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    height: 50px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 40px 0;
    }
  }
</style>

<Header />
<main class="min-h-[calc(100%-70px)] min-h-[calc(100%+1rem)]">
  <slot />
</main>

<footer>
  <p>
    Docs: <a
      target="blank"
      href="https://docs.directus.io/getting-started/introduction/">Directus</a>
    & <a target="blank" href="https://kit.svelte.dev/docs">Sveltekit</a>
  </p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
