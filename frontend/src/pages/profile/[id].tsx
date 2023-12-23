

import { useRouter } from "next/router"


export default function Profile(){

    const {pathname} = useRouter()

    return (
        <>
                <h1>{pathname}</h1>

        </>
    )
}