import React from 'react'

const Label = ({label}) => {
    return (
        <div class="labelInline">
            <div class="lab" style={{backgroundColor:label.color}}>
            {label.name}
            </div>
        </div>
    )
}

export default Label
