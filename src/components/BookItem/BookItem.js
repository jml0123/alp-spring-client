import React, {useContext} from 'react';
import UserContext from '../../UserContext'
import './BookItem.css'


export default function BookItem(props) {
    const donationContext = useContext(UserContext)
    console.log(donationContext)
    const conditions = ["Select", "New", "Very good", "Slightly Used", "Very Used"]
    let conditionArea;
    
    if (!props.readOnly) {
        const selectList = 
        conditions.map((c, i) => {
        return <option value={c} key={i}>{c}</option> }
        )
        conditionArea = <>
                <div className="condition-box">
                    <label htmlFor="condition">Condition</label>
                    <select id="condition" onChange={(e) => donationContext.handleSelectCondition(props.listId, e.target.value)} defaultValue={props.condition}>
                        {selectList}
                    </select> 
                </div>
                <div className="list-ctrl">
                    {
                    (props.listItem)? <button onClick={() => donationContext.handleRemoveBook(props.id)}>Remove</button>
                    : (props.bookScan)? <button onClick = {() => donationContext.handleAddBook(props.book)}>Add To Box</button>
                    : null
                    }
                </div> 
            </>
        }
    else {
        conditionArea =  
        <h2>Condition: {props.condition}</h2>   
    }
  
    return (
        <div className="book-item">
            <div className="book-container">
                <div className="book-wrapper">
                    <div className="book-img-wrapper">
                        <img src={props.book.thumbnail}/>
                    </div>
                    <div className="book-description-wrapper book-description-wrapper--dashboard">
                        <h1>{props.book.title}</h1>
                        <div className="book-description-wrapper--details">
                            <p>ISBN: {props.book.isbn}</p>
                            <p>Original Date Published: {props.book.originalDate}</p>
                        </div>
                        {conditionArea}
                    </div>
                </div>
            </div>
            </div>
    )
}