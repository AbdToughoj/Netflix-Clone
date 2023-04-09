import Movie from "../movie/Movie"
export default  function MovieList (props){
    return (
        <>
        {
            props.trending.map(trending => {
                return <Movie trending={trending} />;
            })

        }
        </>
    )

}
