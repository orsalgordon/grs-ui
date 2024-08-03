import React, { useEffect, useState }  from 'react'
import { deleteGift } from '../services/GiftService';
import { fetchEventById } from '../services/EventService';
import { useNavigate, useParams } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

const ListGiftComponent = () => {

    const [gifts, setGifts] = useState([])
    const navigator = useNavigate();
    const { eventId } = useParams();

    useEffect(() => {
        fetchGift();
    }, [])

    function fetchGift() {
        fetchEventById(eventId).then((response) => {
            setGifts(response.data.gifts)
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addGift() {
        navigator(`/event/${eventId}/add-gift`);
    }

    function redirectToEventPage() {
        navigator('/event');
    }

    function updateGift(eventId, giftId) {
        navigator(`/event/${eventId}/edit-gift/${giftId}`);
    }

    function removeGift(eventId) {
        deleteGift(eventId).then((response) => {
            fetchGift();
        }).catch(error => {
            console.error(error);
        })
    }

  return (
    <div className="card-body">
            <button type="button" className="btn-3" onClick={addGift}><IoIosAdd /> Add new gift</button>
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
                                    <button className='btn-1' onClick={() => updateGift(eventId, gift.giftId)}><CiEdit /> Edit</button>
                                    <button className='btn-1' onClick={() => removeGift(gift.giftId)}><MdDeleteOutline /> Delete</button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
            <button type="button" class="btn-3" onClick={redirectToEventPage}><IoArrowBack /> Back to Event details</button>
        </div>
  )
}

export default ListGiftComponent