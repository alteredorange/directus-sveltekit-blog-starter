<script context="module" lang="ts">
  export const prerender = true
  import { variables } from "$lib/variables"

  export async function load({ page, fetch }) {
    // Use a `limit` querystring parameter to fetch a limited number of posts
    // e.g. fetch('posts.json?limit=5') for 5 most recent posts
    //     const posts = await fetch("/posts.json").then((res) => res.json())

    console.log(page.params.slug)
    const post = await fetch(
      `${variables.apiUrl}/items/posts?filter[status][_eq]=published&filter[slug][_eq]=${page.params.slug}`
    )
      .then((res) => res.json())
      .then((post) => post.data[0])

    // console.log(post)
    return {
      props: {
        post
      }
    }
  }
</script>

<script lang="ts">
  export let post
</script>

<div class="text-xl">{post?.title}</div>

<div class="text-xl">{@html post?.body}</div>
