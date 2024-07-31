import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { createEvent, fetchEventById, updateEvent } from '../services/EventService';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie'

const EventComponent = () => {

  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventType, setEventType] = useState(null);
  const [cookies, removeCookies] = useCookies(['grsId']);
  const grsId = cookies.grsId;
  const hostId = grsId;
  const navigator = useNavigate();
  const { eventId } = useParams();

  useEffect(() => {

    if (eventId) {
      fetchEventById(eventId).then((response) => {

        setEventName(response.data.eventName);
        setEventDescription(response.data.eventDescription);
        const selectedEventType = options.find(opt => opt.value === response.data.eventType);
        setEventType(selectedEventType);
      }).catch((error) => {
        console.error('Error fetching event:', error);
      });
    }
  }, [eventId])

  const options = [
    { value: 'BIRTHDAY', label: 'Birthday' },
    { value: 'BRIDAL_SHOWER', label: 'Bridal Shower' },
    { value: 'BABY_SHOWER', label: 'Baby Shower' },
    { value: 'WEDDING', label: 'Wedding' },
    { value: 'OTHER', label: 'Other' }
  ]

  function saveEvent(e) {
    e.preventDefault();

    const event = { eventName, eventDescription, eventType: eventType.value, hostId };
    console.log(event);

    if (eventId) {
      updateEvent(eventId, event).then((response) => {
        console.log('Update success');
        navigator('/event');
      }).catch((error) => {
        console.error('Error updating event:', error);
      });
      return;
    } else {
      createEvent(event).then((response) => {
        console.log(response.data);
        console.log('Create success');

        navigator('/event');
      }).catch((error) => {
        console.error('Error creating event:', error);
      });
    }

  }

  function redirect() {
    navigator('/event');
  }

  function pageTitle() {
    if (eventId) {
      return <b><h2>Update Event</h2></b>;
    }
    return <h2>Add Event</h2>;
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
                  placeholder='Name of the event'
                  name='eventName'
                  value={eventName}
                  className='form-control'
                  onChange={(e) => setEventName(e.target.value)}
                ></input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Description: </label>
                <input
                  type='text'
                  placeholder='Description of the event'
                  name='eventDescription'
                  value={eventDescription}
                  className='form-control'
                  onChange={(e) => setEventDescription(e.target.value)}
                ></input>
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Event Type: </label>
                <Select
                  options={options}
                  value={eventType}
                  onChange={(selectedOption) => setEventType(selectedOption)}
                  placeholder='Select event type...'
                />
              </div>

              <button type="button" onClick={saveEvent}>Submit</button>

            </form>

          </div>

        </div>
      </div>
      <button type="button" className="btn-3" onClick={redirect}>Cancel</button>
    </div>
  )
}

export default EventComponent