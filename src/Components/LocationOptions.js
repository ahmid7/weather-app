
const LocationOptions = (props) =>{
    return(
        <div className="clickLocation">
            <p onClick={(e) =>props.onChange(e.target.innerText)}>Birmingham</p>
            <p onClick={(e) =>props.onChange(e.target.innerText)}>Manchester</p>
            <p onClick={(e) =>props.onChange(e.target.innerText)}>New York</p>
            <p onClick={(e) =>props.onChange(e.target.innerText)}>California</p>
        </div>
    );
}

export default LocationOptions;