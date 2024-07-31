import React, { useEffect, useState } from 'react'
import { hostDetails } from '../services/HostService'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import './HostDetailsComponent.css'
import { CiBoxList } from "react-icons/ci";

const HostDetailsComponent = () => {

    const [host, setHost] = useState([])
    const [cookies] = useCookies(['grsId']);
    const grsId = cookies.grsId;

    useEffect(() => {
        hostDetails(grsId).then((response) => {
            setHost(response.data)
        }).catch(error => {
            console.error(error);
        })
    }, [])


    const navigator = useNavigate();

    function redirect() {
        navigator('/event');
    }

    return (
        <div>

            {
                <p className='profile'>
                    <h2>Profile</h2>
                    <b>Name: </b> {host.firstName} {host.lastName} <br />
                    <b>Email: </b> {host.email} <br />
                    <b>Date of birth: </b> {host.dateOfBirth} <br /><br />

               <button type="button" className="btn-1" onClick={redirect}><CiBoxList /> See event list</button>

                </p>

            }

        </div>
    )
}

export default HostDetailsComponent