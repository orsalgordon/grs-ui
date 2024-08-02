import React, { useEffect, useState } from 'react'
import { eventList, deleteEvent } from '../services/EventService'
import { useNavigate } from 'react-router-dom'
import { GoGift } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { CiLink } from "react-icons/ci";
import './ListEventComponent.css'


const ListEventComponent = () => {

    const [events, setEvents] = useState([])
    const navigator = useNavigate();
    const grsId = window.localStorage.getItem("grsId");

    useEffect(() => {
        fetchEvents();
    }, [])

    function fetchEvents() {
        eventList(grsId).then((response) => {
            setEvents(response.data)
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addEvent() {
        navigator('/add-event');
    }

    function redirect() {
        navigator('/');
    }

    function viewGifts(id) {
        navigator(`/event/${id}/gifts`);
    }

    function updateEvent(id) {
        navigator(`/edit-event/${id}`);
    }

    function removeEvent(id) {
        deleteEvent(id).then((response) => {
            fetchEvents();
        }).catch(error => {
            console.error(error);
        })
    }

    function shareLink(id) {
        const link = "https://localhost:3000/event/" + id + "/gifts?key=" + grsId;
        alert(link);
    }

    return (
        <div>
            <button type="button" className="btn-2" onClick={addEvent}><IoIosAdd /> Add new event</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        events.map(event =>
                            <tr key={event.eventId}>
                                <td>{event.eventName}</td>
                                <td>{event.eventDescription}</td>
                                <td>{event.eventType}</td>
                                <td>
                                    <button className="btn-1" onClick={() => viewGifts(event.eventId)}><GoGift /> View Gifts</button>
                                    <button className="btn-1" onClick={() => shareLink(event.eventId)}><CiLink /> Share Link</button>
                                    <button className="btn-1" onClick={() => updateEvent(event.eventId)}><CiEdit /> Update</button>
                                    <button className="btn-1" onClick={() => removeEvent(event.eventId)}><MdDeleteOutline /> Delete</button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>

            <button type="button" className="btn-2" onClick={redirect}><IoArrowBack /> Back to Home page</button>
        </div>
    )
}

export default ListEventComponent