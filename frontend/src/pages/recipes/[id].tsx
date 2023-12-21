



export async function getStaticPaths(){

    const response = await fetch("http://localhost:5000/api/recipes")

    const posts = await response.json();

    console.log(posts)

    const paths = posts.map((post : any) => ({
        params: { id: post.id.toString() },
      }))

    return {
        paths,
        fallback:'blocking'
    }

}

export async function getStaticProps({ params } : any) {
    
    const res = await fetch(`http://localhost:5000/api/recipes/${params.id}`)

    const recipe = await res.json()
   
    return { props: { recipe } , revalidate:10 }
  }


export default function Recipe({recipe} : any){



    return (
        <div>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
        </div>
    )

}