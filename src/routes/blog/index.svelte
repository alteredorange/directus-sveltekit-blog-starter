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

    const posts = getPosts(
      `${variables.apiUrl}/items/posts?filter[status][_eq]=published&sort=-id&page=1`
    )

    return {
      props: {
        posts
      }
    }
  }
</script>

<script>
  import { variables } from "$lib/variables"

  export let posts
  // `${variables.apiUrl}/items/posts?filter[status][_eq]=published&sort=-id&page=1`
  //

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

  // const posts = getPosts(
  //   `${variables.apiUrl}/items/posts?filter[status][_eq]=published&sort=-id&page=1`
  // )
</script>

<!-- {#each posts as post}
  <a href="/blog/{post?.slug}">{post?.title}</a>
{:else}
  No posts yet!
{/each} -->

{#await posts}
  Loading Posts...
{:then posts}
  {#each posts as post}
    <a href="/blog/{post?.slug}">{post?.title}</a>
  {/each}
{:catch error}
  Posts could not be loaded.
  <br />
  Error: {error}
{/await}
