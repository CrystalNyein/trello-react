import React from 'react'
import './Card.css'

const Card = ({ card , listid , onCardClick}) => {
    
    const editCard = (event) => {
        event.stopPropagation();
        const cardMenuModal = document.getElementById("cardMenu");
        const cardEditBox = cardMenuModal.firstChild.nextSibling.firstChild;
        const cardActionBox = cardMenuModal.firstChild.nextSibling.lastChild;
        const cardLocation = event.target.parentNode.getBoundingClientRect();
        //get card location
        let top = cardLocation.top;
        const left = cardLocation.left;
        let right = cardLocation.right;        
        //set location of card edit box
        cardEditBox.style.width = cardLocation.width+"px";
        cardEditBox.style.top = top + "px";
        cardEditBox.style.left = left + "px";
        cardEditBox.firstChild.value = card.title;
        //focus and select input 
        setTimeout(()=>{
            cardEditBox.firstChild.focus();
            cardEditBox.firstChild.select();
        },10)
        //checking space left available
        if(window.innerWidth-right < 175){
            right=left-175;
            cardActionBox.childNodes.forEach(node=>{
                node.classList.remove('float-left');
                node.className+=" float-right";
            });
        }
        else{
            cardActionBox.childNodes.forEach(node =>{ 
                node.classList.remove('float-right');                
                node.className+=" float-left";
            });
        }
        //set location for Action box
        if(window.innerHeight - top < 210){
            top =window.innerHeight - 310;
            cardActionBox.style.top = top + "px";
        }
        else{            
            cardActionBox.style.top = top - 116 + 25+"px";
        }
        cardActionBox.style.left = right + 3 + "px";
        cardMenuModal.style.display = "block";
    }
    const openModal = () => {
        document.getElementById("cardModal").style.display="block";
        onCardClick(card.id,listid);
    }
    return (
        <div className="ownCard" onClick={openModal}>
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
                    (card.checklists && card.checklists.length !== 0) && (
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
