import React,{useState,useEffect} from 'react'
import './AddList.css'
import Axios from 'axios';

const AddList = ({addList}) => {

    const [listTitle, setlistTitle] = useState("");
    const [list,setList] = useState({title:"",position:1});

    const addListDisplay = (event) => {
        event.target.style.display="none";
        event.target.nextSibling.style.display="block";
    }
    const closeAddList = (event) => {
        event.preventDefault();
        console.log(event.target.parentNode.parentNode.previousSibling);
        event.target.parentNode.parentNode.previousSibling.style.display="block";
        event.target.parentNode.parentNode.style.display="none";
    }
    const submitListTitle = async (event) => {
        event.preventDefault();        
        addList(event.target.firstChild.value);
        event.target.previousSibling.style.display="block";
        event.target.style.display="none";
    }
    const changeTitle = (event) => {
        console.log("change Title");
        setlistTitle(event.target.value);
        console.log(listTitle);
    }

    return (
        <div className="add-list rounded">
            <p onClick={addListDisplay}><i className="fa fa-plus"></i>&nbsp;&nbsp; Add another list</p>
            <form className="list-fill" onSubmit={submitListTitle}>
                <input type="text" className="rounded" value={listTitle} onChange={changeTitle} placeholder="Enter list title..."></input>
                <button type="submit" className="btn add text-light">Add List</button>
                <button className="btn close" onClick={closeAddList}><i className="fas fa-times"></i></button>
            </form>
        </div>
    )
}

export default AddList
