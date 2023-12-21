

const Container = ({ children } : { children:React.ReactNode }) => {
    

    return (
        <div className="w-3/4 mx-auto">
            {
                children
            }
        </div>
    )

}

export default Container