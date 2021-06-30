export async function get ({ query }) {
  const response = await fetch(`http://localhost:8055/items/posts`, {})
  const status = response.status
  const body = await response.json()
  return { status, body }
}

// const response = await fetch(
// 	`http://localhost:8055/items/posts`,
// 	{
// 	  body: `{"message":"Image uploaded on ${timeConverter(
// 	    Date.now()
// 	  )}","content":"${base64Image}"`,
// 	  headers: {
// 	    Authorization: `Bearer ${token}`,
// 	    'Content-Type': 'application/vnd.github.v3+json'
// 	  },
// 	  method: 'PUT'
// 	}
//       )
//       const status = response.status
//       const body = await response.json()
// return { status, body }
