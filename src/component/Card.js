import React from 'react'
import './Card.css'

const Card = ({ card }) => {
    const editCard = (event) => {
        event.stopPropagation();
        const cardLocation = event.target.parentNode.getBoundingClientRect();
        let top = cardLocation.top;
        const left = cardLocation.left;
        let right = cardLocation.right;
        let bottom = cardLocation.bottom;
        const cardMenuModal = document.getElementById("cardMenu");
        const cardEditBox = cardMenuModal.firstChild.firstChild;
        const cardActionBox = cardMenuModal.firstChild.lastChild;
        cardEditBox.style.width = "237.5px";
        cardEditBox.style.top = top + "px";
        cardEditBox.style.left = left + "px";
        cardEditBox.firstChild.value = event.target.parentNode.querySelector("h4").innerText;
        if(window.innerWidth-right < 143){
            right=left-155;
            cardActionBox.childNodes.forEach(node=>node.className+=" float-right");
        }
        else{
            cardActionBox.childNodes.forEach(node => node.classList.remove('float-right'));
        }
        console.log(window.innerHeight - top);
        if(window.innerHeight - top < 210){
            top =window.innerHeight - 310;
            console.log(top);
            cardActionBox.style.top = top + "px";
        }
        else{            
            cardActionBox.style.top = top - 116 + 25+"px";
        }
        cardActionBox.style.left = right + 3 + "px";
        cardMenuModal.style.display = "block";
    }
    return (
        <div className="ownCard" >
            {
                card.labels && card.labels.map(label => (
                    <hr style={{ backgroundColor: label.color }} key={label.id}></hr>
                ))
            }
            <span className="edit-card" onClick={editCard}></span>
            <h4>{card.title}</h4>
            <div className="info">
                {
                    card.description && (
                        <i className="fas fa-align-justify"></i>
                    )
                }
                {
                    (card.checklists.length !== 0) && (
                        <a><i className="far fa-check-square"></i>{card.checklists.length}</a>
                    )
                }
                {
                    card.accounts && (
                        <div className="avatar"></div>
                    )
                }
            </div>
        </div>

    )
}

export default Card
