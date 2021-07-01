<script context="module" lang="ts">
  export const prerender = true
  import { variables } from "$lib/variables"

  export async function load({ page, fetch }) {
    function timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }

    const getPost = async (url, retries = 1) => {
      const post = await fetch(url)
        .then(async (res) => {
          if (res.ok) return res.json()
          if (retries < 4) {
            console.log(
              `Problem with res, retrying in 4 seconds. This is attempt #${retries}`
            )
            await timeout(4000)
            return getPost(url, retries + 1)
          }
          console.log(res.status)
        })
        .then((post) => post.data[0])
        .catch(async (error) => {
          console.error(error.code)
          if (retries < 4) {
            console.log(
              `Directus Not Open Yet, Retrying in 4 seconds. This is attempt #${retries}`
            )
            await timeout(4000)
            return getPost(url, retries + 1)
          }
        })

      return post
    }

    const post = await getPost(
      `${variables.apiUrl}/items/posts?filter[status][_eq]=published&filter[slug][_eq]=${page.params.slug}`
    )

    return {
      props: {
        post
      }
    }
  }
</script>

<script lang="ts">
  export let post

  $: if (post) {
    let str = post.tags
    str = str.replace(/ /g, "")
    const arr = str.split(",")
    post.tags = arr
  }
</script>

<style global>
  code {
    /* font: 300; */
    font-weight: lighter;
    background: lightgray;
    color: rgb(58, 58, 58);
  }
</style>

<svelte:head>
  <title>{post?.title}</title>
</svelte:head>

<h1
  class="font-bold mx-auto border-orange-400 border-b-2 mt-7 text-center mb-4 pb-2 text-4xl text-5xl text-orange-400 w-11/12 uppercase md:w-8/12">
  {post?.title}
</h1>

<div class="mt-2 mb-4 ml-3 details">
  <div class="">
    Published on {(new Date(post.published_date).getMonth() > 8
      ? new Date(post.published_date).getMonth() + 1
      : "0" + (new Date(post.published_date).getMonth() + 1)) +
      "/" +
      (new Date(post.published_date).getDate() > 9
        ? new Date(post.published_date).getDate()
        : "0" + new Date(post.published_date).getDate()) +
      "/" +
      new Date(post.published_date).getFullYear()}
  </div>
  <div class="">
    Tags: {#each post.tags as tag, i}
      {#if i === post.tags.length - 1}
        <a
          class="ml-1.5 text-blue-400 underline"
          sveltekit:prefetch
          href="/tags/{tag}"
          >{tag}
        </a>
      {:else}
        <a
          class="ml-1.5 text-blue-400 underline"
          sveltekit:prefetch
          href="/tags/{tag}">{tag}</a>
      {/if}
    {/each}
  </div>
</div>

<div class="text-xl">{@html post?.body}</div>
