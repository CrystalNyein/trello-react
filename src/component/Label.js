import React from 'react'

const Label = ({label}) => {
    return (
        <div className="labelInline">
            <div className="lab" style={{backgroundColor:label.color}}>
            {label.name}
            </div>
        </div>
    )
}

export default Label
