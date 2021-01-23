import React, { useState, useEffect } from 'react';
import Design from '../Find-My-Mentor/CardDesign'
import axios from "axios";
const Sdev = (props) => {
    const [mentorData, selectMentorData] = useState();
    let ProfileData;
    useEffect(() => {
        getMentorData();
    }, []);
    const getMentorData = () => {
        const id = localStorage.getItem('Mentorid');
        const token = localStorage.getItem('Mentortoken')
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        };
        axios.get('/all/mentor')
            .then(function (response) {
                selectMentorData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    if (mentorData !== undefined) {
        const result = mentorData.filter(data => data.category === 'Software-Development');
        ProfileData = result.map((index) => {
            return (
                <Design
                    keyId={index.id}
                    name={index.name}
                    image={index.profile_picture}
                    bio={index.bio}
                    price={index.price}
                    skills={index.tags}
                    position={index.job_title}
                />
            );
        });
    }
    return (
        <div>{ProfileData}</div>
    )
}
export default Sdev;