<script context="module" lang="ts">
  export const prerender = true
</script>

<script lang="ts">
  import { onMount } from "svelte"
  let canvas

  onMount(() => {
    const ctx = canvas.getContext("2d")
    let frame
    ;(function loop() {
      frame = requestAnimationFrame(loop)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      for (let p = 0; p < imageData.data.length; p += 4) {
        const i = p / 4
        const x = i % canvas.width
        const y = (i / canvas.height) >>> 0

        const t = window.performance.now()

        const r = 64 + (128 * x) / canvas.width + 64 * Math.sin(t / 1000)
        const g = 64 + (128 * y) / canvas.height + 64 * Math.cos(t / 1400)
        const b = 128

        imageData.data[p + 0] = r
        imageData.data[p + 1] = g
        imageData.data[p + 2] = b
        imageData.data[p + 3] = 255
      }

      ctx.putImageData(imageData, 0, 0)
    })()
    return () => {
      cancelAnimationFrame(frame)
    }
  })

  let runningWidth
  $: runningHeight = runningWidth / 1.25
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="h-full my-auto items-center">
  <section class="mt-7 sm:-mt-7">
    <h1 class="font-bold text-center text-5xl text-gray-600">
      Directus SvelteKit Blog Starter
    </h1>
    <section>
      <div class="mx-auto bg-orange-300 h-11px mt-5 text-center w-5/12" />
    </section>
  </section>
  <section>
    <div
      class="flex flex-wrap mx-auto mt-11 w-8/12 justify-between sm:flex-nowrap md:w-7/12">
      <div
        class="flex-wrap my-auto mx-auto w-8/12 sm:w-5/12"
        bind:offsetWidth={runningWidth}>
        <div
          class="logo running"
          style="background-size: {runningHeight *
            18.75}px {runningHeight}px; width: {runningWidth}px; height: {runningHeight}px; " />
      </div>
      <div
        class="my-auto mx-auto text-center py-4 text-8xl text-orange-300 w-11/12 sm:my-none sm:w-2/12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="my-auto mx-auto max-h-100px w-10/12 seperator sm:max-h-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div
        class="flex-wrap my-auto mx-auto max-h-200px w-11/12 sm:max-h-none sm:w-5/12">
        <canvas
          bind:this={canvas}
          width={32}
          height={32}
          class="mx-auto max-h-200px sm:max-h-none" />
        <!-- <img src="/svelte-logo.svg" class="mx-auto h-200px" alt="" /> -->
      </div>
    </div>
  </section>
</div>
