import React from 'react'
import { getInitName } from '../utils'

const Member = ({ member }) => {

    return (
        <div class="memInline"><div class="avatar">{getInitName(member.name)}</div></div>
    )
}

export default Member
