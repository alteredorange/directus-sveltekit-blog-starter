<script context="module" lang="ts">
  export const prerender = true

  export async function load({ fetch }, retries = 1) {
    //published posts with limit and sort by most recent
    // `${variables.apiUrl}/items/posts?filter[status][_eq]=published&limit=1&sort=-id`
    function timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }
    const getPosts = async (url, retries = 1) => {
      const posts = await fetch(url)
        .then(async (res) => {
          if (res.ok) return res.json()
          if (retries < 4) {
            console.log(
              `Problem with res, retrying in 4 seconds. This is attempt #${retries}`
            )
            await timeout(4000)
            return getPosts(url, retries + 1)
          }
          console.log(res.status)
        })
        .then((posts) => posts.data)
        .catch(async (error) => {
          console.error(error.code)
          if (retries < 4) {
            console.log(
              `Directus Not Open Yet, Retrying in 4 seconds. This is attempt #${retries}`
            )
            await timeout(4000)
            return getPosts(url, retries + 1)
          }
        })

      return posts
    }

    // const posts = await fetch(
    //   `${variables.apiUrl}/items/posts?filter[status][_eq]=published&sort=-id&page=1`
    // )
    //   .then((res) => {
    //     if (res.ok) return res.json()
    //     if (retries > 0) {
    //       console.log("Directus Connection Not Open Yet, Retrying...")
    //       return setTimeout(
    //         fetch(
    //           `${variables.apiUrl}/items/posts?filter[status][_eq]=published&sort=-id&page=1`
    //         ),
    //         2000
    //       )
    //     }
    //   })
    //   .then((posts) => posts.data)

    const url = `${variables.apiUrl}/items/posts?filter[status][_eq]=published&sort=-published_date&page=1`
    const res = await fetch(url)

    if (res.ok) {
      // let pre = await res.json()
      // let posts = pre.data
      return {
        props: {
          preposts: await res.json()
        }
      }
    }

    // const posts = await getPosts(
    //   `${variables.apiUrl}/items/posts?filter[status][_eq]=published&sort=-published_date&page=1`
    // )

    // return {
    //   props: {
    //     posts
    //   }
    // }
  }
</script>

<script>
  import { variables } from "$lib/variables"

  export let preposts
  $: posts = preposts.data
  // `${variables.apiUrl}/items/posts?filter[status][_eq]=published&sort=-id&page=1`

  // https://stackoverflow.com/a/33292942/2936521
  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const getPosts = async (url, retries = 1) => {
    const posts = await fetch(url)
      .then(async (res) => {
        if (res.ok) return res.json()
        if (retries < 4) {
          console.log(
            `Problem with res, retrying in 4 seconds. This is attempt #${retries}`
          )
          await timeout(4000)
          return getPosts(url, retries + 1)
        }
        console.log(res.status)
      })
      .then((posts) => posts.data)
      .catch(async (error) => {
        console.error(error.code)
        if (retries < 4) {
          console.log(
            `Directus Not Open Yet, Retrying in 4 seconds. This is attempt #${retries}`
          )
          await timeout(4000)
          return getPosts(url, retries + 1)
        }
      })

    return posts
  }

  // $: if (!posts)
  //   posts = getPosts(
  //     `${variables.apiUrl}/items/posts?filter[status][_eq]=published&sort=-published_date&page=1`
  //   )

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
  Recent Posts
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

<!-- {#await posts}
  Loading Posts...
{:then posts}
  {#each posts as post}
    <a href="/blog/{post?.slug}">{post?.title}</a>
  {/each}
{:catch error}
  Posts could not be loaded.
  <br />
  Error: {error}
{/await} -->
