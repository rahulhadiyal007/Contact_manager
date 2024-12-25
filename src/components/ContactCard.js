import React from 'react';
import './ContactCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import user from '../Images/user.png';
import { Link } from 'react-router-dom';

function ContactCard(props) {
    const { id, name , backgroundColor } = props.contact; // Only destructure the name

    


    return (
        <article className='item'   style={{ backgroundColor }} > {/* Use <article> for better semantics */}
            <div className='content'>
                <img className='userimg' alt='User  profile' src={user} />
                <div className='header'>{name}</div>
                <div className="action-buttons">
                    <Link   className='viewlink'  to={`/contact/${id}`} aria-label={`View details for ${name}`}>
                        <button className='btn btn-view' style={{border:"2px solid",color:'black'}} >
                            <FontAwesomeIcon icon={faEye} aria-hidden="true" /> View
                        </button>
                    </Link>
                    <button 
                        className='icon' 
                        onClick={() => { props.clickHandler(id); }} 
                        aria-label={`Delete ${name}`}
                    >
                        <FontAwesomeIcon icon={faTrashCan} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ContactCard;