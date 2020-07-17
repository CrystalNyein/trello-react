import React,{useState,useEffect} from 'react'
import './AddList.css'
import Axios from 'axios';

const AddList = ({addList,position}) => {

    const [listTitle, setlistTitle] = useState("");

    const addListDisplay = (event) => {
        event.target.style.display="none";
        event.target.nextSibling.style.display="block";
    }
    const closeAddList = (event) => {
        event.preventDefault();
        event.target.parentNode.parentNode.previousSibling.style.display="block";
        event.target.parentNode.parentNode.style.display="none";
    }
    const submitListTitle = async (event) => {
        event.preventDefault();     
        Axios.post(process.env.REACT_APP_END_POINT + "/list", { title: listTitle, position: position+1 })
        .then(res => {
            addList(res.data);
        })   
        event.target.previousSibling.style.display="block";
        event.target.style.display="none";
    }

    return (
        <div className="add-list rounded">
            <p onClick={addListDisplay} className="rounded"><i className="fa fa-plus"></i>&nbsp;&nbsp; Add another list</p>
            <form className="list-fill" onSubmit={submitListTitle}>
                <input type="text" className="rounded" value={listTitle} onChange={e=>setlistTitle(e.target.value)} placeholder="Enter list title..."></input>
                <button type="submit" className="btn add text-light">Add List</button>
                <button className="btn close" onClick={closeAddList}><i className="fas fa-times"></i></button>
            </form>
        </div>
    )
}

export default AddList
