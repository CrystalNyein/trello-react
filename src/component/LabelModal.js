import React from 'react'
import './LabelModal.css'

const LabelModal = () => {
    const closeLabelModal = (e) => {
        e.target.parentNode.parentNode.style.display = "none";
    }
    return (
        <div id="labelModal" className="modal">
            <div className="label-content content">
            <span className="close" onClick={closeLabelModal}>&times;</span>
            <h3>Labels</h3>
            <hr/>
            <input type="text" placeHolder="Search labels..."/>
            <p>Labels</p>
            <div className="labelsInModal"></div>
            <div className="long-btn">Create a new label</div>
            <hr/>
            <div className="long-btn">Enable color blind friendly mood</div>
            </div>
        </div>
    )
}

export default LabelModal
