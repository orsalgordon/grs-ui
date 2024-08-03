import React, { useEffect, useState } from 'react'
import { fetchEventById } from '../services/EventService';
import { updateGiftAvailability } from '../services/GiftService';
import { hostDetails } from '../services/HostService'
import { useLocation, useParams } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const GuestGiftListComponent = () => {

    const [gifts, setGifts] = useState([])
    const [host, setHost] = useState([])
    const [event, setEvent] = useState([])
    const { eventId } = useParams();
    const [available, setAvailable] = useState(true);
    let query = useQuery();
    let keyParam = query.get('key');

    useEffect(() => {
        fetchEvent();
        fetchHost();
    }, [])

    function fetchHost() {
        hostDetails(keyParam).then((response) => {
            setHost(response.data)
            console.log(response.data.gifts);
        }).catch(error => {
            console.error(error);
        })
    }

    function fetchEvent() {
        fetchEventById(eventId).then((response) => {
            setEvent(response.data)
            setGifts(response.data.gifts)
            console.log(response.data.gifts);
        }).catch(error => {
            console.error(error);
        })
    }

    function purchaseGift(giftId) {
        const updateRequest = { available: available == "Yes" ? true : false, eventId };

        updateGiftAvailability(giftId, updateRequest).then((response) => {
            console.log('Update success');
            window.location.reload();
        }).catch((error) => {
            console.error('Error updating gift:', error);
        });
    }

    return (
        <div className="card-body">
             {
                <p className='profile'>
                    <h2>{event.eventName}</h2>
                    <br />
                    <h3>{event.eventDescription}</h3> <br />
                    <h4>(Event by : {host.firstName} {host.lastName})</h4>
                </p>
            }
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Link</th>
                        <th>Already Bought?</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        gifts.map(gift =>
                            <tr key={gift.giftId}>
                                <td>{gift.name}</td>
                                <td>{gift.description}</td>
                                <td>{gift.link}</td>
                                <td>{gift.available ? "No" : "Yes"}</td>
                                <td>
                                    {
                                        gift.available ?
                                            <button className='btn-1' onClick={() => purchaseGift(gift.giftId)}><FaCartPlus /> Buy this gift</button> : ''
                                    }
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )

}

export default GuestGiftListComponent