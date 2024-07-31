import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchGift, createGift, updateGift } from '../services/GiftService';

const GiftComponent = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const navigator = useNavigate();
    const { giftId, eventId } = useParams();
  
    useEffect(() => {
  
      if (giftId) {
        fetchGift(giftId).then((response) => {
          setName(response.data.name);
          setDescription(response.data.description);
          setLink(response.data.link);
        }).catch((error) => {
          console.error('Error fetching gift:', error);
        });
      }
    }, [giftId])
  
    function saveGift(e) {
      e.preventDefault();
  
      const gift = { name, description, link, eventId };
      console.log('GIFT - ' + gift);
  
      if (giftId) {
        updateGift(giftId, gift).then((response) => {
          console.log('Update success');
          navigator(`/event/${eventId}/gifts`);
        }).catch((error) => {
          console.error('Error updating gift:', error);
        });
        return;
      } else {
        createGift(gift).then((response) => {
          console.log(response.data);
          console.log('Create success');
          navigator(`/event/${eventId}/gifts`);
        }).catch((error) => {
          console.error('Error creating gift:', error);
        });
      }
  
    }
  
    function redirect() {
        navigator(`/event/${eventId}/gifts`);
    }
  
    function pageTitle() {
      if (giftId) {
        return <h2>Edit Gift</h2>;
      }
      return <h2>Add Gift</h2>;
    }

  return (
    <div className='form-container-1'>
    <div className='row-1'>
      <div className='card-body'>
        <div className='card-body'>
          {pageTitle()}
          <form>
            <div className='form-group mb-2'>
              <label className='form-label'>Name: </label>
              <input
                type='text'
                placeholder='Name of the gift'
                name='name'
                value={name}
                className='form-control'
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <div className='form-group mb-2'>
              <label className='form-label'>Description: </label>
              <input
                type='text'
                placeholder='Description of the gift'
                name='description'
                value={description}
                className='form-control'
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>

            <div className='form-group mb-2'>
              <label className='form-label'>Link: </label>
              <input
                type='text'
                placeholder='Link to the gift'
                name='link'
                value={link}
                className='form-control'
                onChange={(e) => setLink(e.target.value)}
              ></input>
            </div>

            <button type="button" onClick={saveGift}>Submit</button>

          </form>
        </div>
      </div>
    </div>
    <button type="button" className='btn-2' onClick={redirect}>Cancel</button>

  </div>
  )
}

export default GiftComponent