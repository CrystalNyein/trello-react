import React from 'react'
import './Activity.css'

const Activity = () => {
    const writeComment = (e) => {    
        const comment = e.target;  
        comment.parentNode.style.height="80px";
        setTimeout(()=>comment.nextSibling.style.display="flex",190);
    }
    const closeComment = (e) => {
        const func = e.target.parentNode.parentNode.parentNode;
        setTimeout(()=>func.parentNode.style.height="30px",10);
        func.style.display = "none";
    }
    const saveComment = (e) => {
        const func = e.target.parentNode.parentNode;
        setTimeout(()=>func.parentNode.style.height="30px",10);
        func.style.display = "none";
    }
    return (
        <div className="activity">
          <div className="title">
            <h4 className="icon">
              <i className="fas fa-comment-dots"></i>
              Activity
            </h4>
            <div className="detail">Show Details</div>
          </div>
          <div className="comment-line">
          <button className="avatar profile"></button>
            <div className="comment">
              <input
                type="text"
                placeholder="Write a comment..."
                onFocus={writeComment}
              />
              <div className="func">
                <div className="func-save">
                  <p onClick={saveComment}>Save</p>
                  <div className="comment-cross" onClick={closeComment}>
                    <i className="fas fa-times"></i>
                  </div>
                </div>
                <div className="add-on">
                  <i className="fas fa-paperclip"></i>
                  <i className="fas fa-at"></i>
                  <i className="far fa-smile-beam"></i>
                  <i className="far fa-credit-card"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Activity
