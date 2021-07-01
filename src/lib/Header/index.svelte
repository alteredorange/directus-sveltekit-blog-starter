<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
</script>

<style>
  header {
    display: flex;
    justify-content: space-between;
  }

  .corner {
    width: 3em;
    height: 3em;
  }

  .corner a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .corner img {
    width: 2em;
    height: 2em;
    object-fit: contain;
  }

  nav {
    display: flex;
    justify-content: center;
    --background: rgba(255, 255, 255, 0.7);
  }

  svg {
    width: 2em;
    height: 3em;
    display: block;
  }

  path {
    fill: var(--background);
  }

  ul {
    position: relative;
    padding: 0;
    margin: 0;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    background: var(--background);
    background-size: contain;
  }

  li {
    position: relative;
    height: 100%;
  }

  li.active::before {
    --size: 6px;
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: calc(50% - var(--size));
    border: var(--size) solid transparent;
    border-top: var(--size) solid var(--accent-color);
  }

  nav a {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 1em;
    color: var(--heading-color);
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 10%;
    text-decoration: none;
    transition: color 0.2s linear;
  }

  a:hover {
    color: var(--accent-color);
  }
</style>

<header>
  <div
    class="flex font-bold font-xl text-center pt-3 text-blue-400 menu items-center justify-between">
    <div class="cursor-pointer left" on:click={() => goto("/")}>
      <div class="flex ml-10 logo items-center">
        <img src="/svelte-logo.svg" alt="" class="h-10" />
        <div class="font-bold ml-3 text-2xl text-gray-600">Cool Blog</div>
      </div>
    </div>
    <div class="right mr-12 text-lg children:mx-4">
      <a
        sveltekit:prefetch
        class=""
        class:active={$page.path === "/"}
        aria-current={$page.path === "/" ? "page" : undefined}
        href="/">Home</a>

      <a
        sveltekit:prefetch
        class:active={$page.path === "/blog"}
        aria-current={$page.path === "/blog" ? "page" : undefined}
        href="/blog">Blog</a>
      <a href="http://localhost:8055" target="blank">Directus Admin</a>
    </div>
  </div>
</header>
