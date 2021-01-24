import React, {useState, useEffect} from 'react';
import Design from '../Find-My-Mentor/CardDesign'
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Loader from '../../hoc/Loader';
const UxDesign = (props) => {
    const [mentorData, selectMentorData] = useState();
    const [loading, setLoading] = useState(true);
    let ProfileData = <Loader />;
    let EmptyData;
    useEffect(() => {
        getMentorData();
    }, []);
    const getMentorData = () => {
        const id = localStorage.getItem('Mentorid');
        const token= localStorage.getItem('Mentortoken')
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        };
        axios.get('/all/mentor')
            .then(function (response) {
                selectMentorData(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    if(mentorData!==undefined)
    {
        const result = mentorData.filter(data => data.category === 'Ux-Design');
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
       if(ProfileData.length==0)
       {
        EmptyData= <div style={{display:"flex", justifyContent:"center"}}> <Typography color="primary" variant="h4">Sorry! No Records Found</Typography></div>
        
       }
    }
    return (
        <div style={{ minHeight: "105px" }}>{ProfileData.length==0? EmptyData:ProfileData}</div>
    )
}
export default UxDesign;