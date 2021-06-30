<script lang="ts">
  import { page } from "$app/stores"
</script>

<style>
  a.active::before {
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

  a.active {
    -webkit-text-decoration-line: underline;
    text-decoration-line: underline;
    text-decoration: underline;
    font-weight: bold;
    text-decoration-thickness: 2px;
    --tw-text-opacity: 1;
    color: rgba(249, 115, 22, var(--tw-text-opacity));
  }

  a:hover {
    color: rgba(249, 115, 22, var(--tw-text-opacity));
  }
</style>

<header>
  <div
    class="flex font-bold font-xl text-center pt-3 text-blue-400 menu items-center justify-between">
    <div class="left">
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
      <a href="http://localhost:8055">Directus Admin</a>
    </div>
  </div>
</header>
