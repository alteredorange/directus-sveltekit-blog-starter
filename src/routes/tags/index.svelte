<script context="module" lang="ts">
  import { variables } from "$lib/variables"

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

      let posts2 = posts

      let tagCount = {}

      const values = posts.map((item) => item.tags.replace(/ /g, "").split(","))
      const test = new Array([].concat(...values)).flat()

      test.forEach((tag) => {
        if (tag in tagCount) {
          tagCount[tag] += 1
        } else {
          tagCount[tag] = 1
        }
      })
      // const sets = new Set([].concat(...values))
      // const array = Array.from(sets)

      return tagCount
    }

    const tags = await getPosts(
      `${variables.apiUrl}/items/posts?fields=tags&filter%5Bstatus%5D%5B_eq%5D=published`
    )

    return {
      props: {
        tags
      }
    }
  }
</script>

<script>
  export let tags
  let sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
</script>

<div
  md="justify-center items-center flex-row divide-y-0 space-x-6 mt-24  min-h-[400px]"
  class="flex flex-col divide-y-3 divide-fuchsia-500 min-h-[400px] items-start justify-start dark:divide-gray-700">
  <div class="space-x-2 pt-10 pb-2" md="space-y-5 pb-8 pt-6">
    <div
      class="flex font-bold space-x-2 text-center py-6 text-5xl title items-center"
      md="border-r-2 border-r-fuchsia-500 px-6 leading-14 py-2">
      Tags

      <div
        class="font-extrabold tracking-tight text-3xl text-gray-900 leading-9 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 md:px-6" />
    </div>
  </div>

  <div class="flex flex-wrap pt-2 md:pt-0">
    {#each sortedTags as tag}
      <div class="mt-2 mr-5 mb-2">
        <a href="/tags/{tag}" class="text-lg"
          ><span class="font-bold text-blue-400 underline">
            {tag}
          </span>
          <span class="text-base text-blue-gray-600 uppercase">
            ({tags[tag]})
          </span>
        </a>
      </div>
    {/each}
  </div>
</div>
