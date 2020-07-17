import React from 'react'
import { getInitName } from '../utils'

const Member = ({ member }) => {

    return (
        <div className="memInline"><div className="avatar">{getInitName(member.name)}</div></div>
    )
}

export default Member
