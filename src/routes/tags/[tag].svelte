<script context="module" lang="ts">
  export const prerender = true
  import { variables } from "$lib/variables"

  export async function load({ page, fetch }) {
    const tag = page.params.tag
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
        .then((post) => post.data)
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
    //   http://localhost:8055/items/posts?search=finance
    //
    // http://localhost:8055/items/posts?filter%5Btags%5D%5B_contains%5D=gaming&filter%5Bstatus%5D%5B_eq%5D=published

    const posts = await getPost(
      `${variables.apiUrl}/items/posts?filter[status][_eq]=published&filter[tags][_contains]=${page.params.tag}`
    )

    return {
      props: {
        posts,
        tag
      }
    }
  }
</script>

<script lang="ts">
  export let posts
  export let tag

  $: if (posts) {
    for (let i in posts) {
      let str = posts[i].tags
      str = str.replace(/\s/g, "")
      const arr = str.split(",")
      posts[i].tags = arr
    }
  }
</script>

<div
  class="font-bold mx-auto border-orange-400 border-b-1 mt-7 text-center pb-2 text-4xl text-orange-400 w-11/12 sm:w-8/12">
  {tag} Posts
</div>

<div class="mt-10 posts">
  {#each posts as post}
    <div class="mb-7" after="border-2 border-red-500 border">
      <div
        class="font-bold py-3 text-3xl underline-solid underline underline-fuchsia-500 underline-2 underline-offset-5px">
        <a class="" sveltekit:prefetch href="/blog/{post?.slug}"
          >{post?.title}</a>
      </div>
      <div class="-mt-2 ml-3 details">
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
              <a class="ml-1.5 text-blue-400 underline" href="/tags/{tag}"
                >{tag}</a>
            {:else}
              <a class="ml-1.5 text-blue-400 underline" href="/tags/{tag}"
                >{tag}</a>
            {/if}
          {/each}
        </div>
      </div>
      <!-- summary -->
      <div
        class="mt-4 text-lg ml-1.5"
        before="text-xl font-bold content-open-quote"
        after="text-xl font-bold  content-close-quote">
        {post.summary}
      </div>
    </div>
    <div class="border mb-4" />
  {:else}
    No posts yet!
  {/each}
</div>
