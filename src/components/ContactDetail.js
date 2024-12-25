import React from 'react';
import './ContactDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import userdetail from '../Images/pexels-pixabay-415829 (1).jpg';
import { faArrowLeft, faEdit, faPrint, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ContactDetail({ contacts }) {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const contact = contacts.find(contact => contact.id === id);

    if (!contact) {
        return <div>No contact details available.</div>;
    }

    const { name, mobile, email } = contact;

    const handleBack = () => {
        navigate("/");
    };

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    };

    const handleShare = () => {
        const shareData = {
            title: `Contact: ${name}`,
            text: `Name: ${name}\nMobile: ${mobile}\nEmail: ${email}`,
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Contact shared successfully!'))
                .catch((error) => console.error('Error sharing contact:', error));
        } else {
            navigator.clipboard.writeText(shareData.text)
                .then(() => alert('Contact details copied to clipboard!'))
                .catch((error) => console.error('Error copying contact details:', error));
        }
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Contact</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        h2 { text-align: center; color: #2c3e50; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { padding: 10px; text-align: left; border: 1px solid #ddd; }
                        th { background-color: #f2f2f2; }
                        .imgdetail { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid #007bff; }
                    
                        @media print {
                            button { display: none; } /* Hide buttons when printing */
                        }
                    </style>
                </head>
                <body>
                    <h2>Contact Detail</h2>
                    <table>
                        <tr>
                            <th>Photo</th>
                            <td><img class="imgdetail" src="${userdetail}" alt="user" /></td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>${name}</td>
                        </tr>
                        <tr>
                            <th>Mobile</th>
                            <td>${mobile}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>${email}</td>
                        </tr>
                    </table>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="contact-detail">
            <h2>Contact Detail</h2>
            <img className='imgdetail' src={userdetail} alt='user' />
            <div className="info">
                <div><strong>Name:</strong> {name}</div>
                <div><strong>Mobile:</strong> {mobile}</div>
                <div><strong>Email:</strong> {email}</div>
            </div>
            <div className="button-group">
                <button onClick={handleBack} className='btn btn-warning'>
                    <FontAwesomeIcon icon={faArrowLeft} /> <strong>Back</strong>
                </button>
                <button onClick={handleEdit} className='btn btn-primary'>
                    <FontAwesomeIcon icon={faEdit} /> <strong>Edit</strong>
                </button>
                <button onClick={handleShare} className='btn btn-info'>
                    <FontAwesomeIcon icon={faShareAlt} /> <strong>Share</strong>
                </button>
                <button onClick={handlePrint} className='btn btn-success'>
                    <FontAwesomeIcon icon={faPrint} /> <strong>Print</strong>
                </button>
            </div>
        </div>
    );
}

export default ContactDetail;