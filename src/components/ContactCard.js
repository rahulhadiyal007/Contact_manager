import React from 'react';
import './ContactCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import user from '../Images/user.png';
import { Link } from 'react-router-dom';

const getRandomSoftColor = () => {
    const r = Math.floor(Math.random() * 128 + 127); // Range: 127-255
    const g = Math.floor(Math.random() * 128 + 127); // Range: 127-255
    const b = Math.floor(Math.random() * 128 + 127); // Range: 127-255

    // To ensure the color is very soft, we can also add a factor to reduce saturation
    const factor = 0.5; // Adjust this factor to make colors softer or more vibrant
    const softR = Math.floor(r * factor + 255 * (1 - factor));
    const softG = Math.floor(g * factor + 255 * (1 - factor));
    const softB = Math.floor(b * factor + 255 * (1 - factor));

    return `rgb(${softR}, ${softG}, ${softB})`;
};



function ContactCard({ contact, onDelete }) {
    const { id, name } = contact;

    // Ensure the onDelete prop is a function before calling it
    const handleDelete = () => {
        if (typeof onDelete === 'function') {
            onDelete(id);
        }
    };

    return (
        <section className='contact-card' style={{ backgroundColor: getRandomSoftColor() }} >
            <div className='contact-card__content'>
                {/* Alt text updated for better accessibility */}
                <img 
                    className='contact-card__userimg' 
                    alt={`Profile picture of ${name}`} 
                    src={user} 
                />
                <div className='contact-card__header'>{name}</div>
                <div className="contact-card__actions">
                    {/* View button with aria-label for better accessibility */}
                    <Link 
                        className='contact-card__view-link' 
                        to={`/contact/${id}`} 
                        aria-label={`View details for ${name}`}
                    >
                        <button className='contact-card__btn contact-card__btn--view'>
                            <FontAwesomeIcon icon={faEye} aria-hidden="true" /> View
                        </button>
                    </Link>
                    {/* Delete button with aria-label for better accessibility */}
                    <button 
                        className='contact-card__btn contact-card__btn--delete' 
                        onClick={handleDelete} 
                        aria-label={`Delete contact for ${name}`}
                    >
                        <FontAwesomeIcon icon={faTrashCan} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ContactCard;
