import React from "react";


export const Musica = (props) => {
    return (
        <>
            <li className="list-group-item bg-dark" >
                {`${props.id} - ${props.name}`}
                <audio  src="" />
            </li>
        </>
    )
}