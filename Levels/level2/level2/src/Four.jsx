import React from 'react'

const Four = ({name}) => {
    return (
        <div>
            <h1>hello,{name} </h1>
        </div>
    )
}

Four.defaultProps = {
    name: "gowtham",
};

export default Four;