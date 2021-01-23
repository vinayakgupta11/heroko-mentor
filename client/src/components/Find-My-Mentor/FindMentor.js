import React from 'react';
import {  Typography, Grid, Container, Tab, Tabs, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import All from './All';
import DataScience from './DataScience';
import ProductManagement from './ProductManagement';
import UxDesign from './UxDesign';
import SoftwareDevelopment from './SoftwareDevelopment';

const useStyles = makeStyles((theme)=>({
    root: {
        flexGrow: 1,
    },
    paperRounded: {
        borderRadius: 30
    },
    paddLg:{
        [theme.breakpoints.down('md')]: {
            paddingLeft:0,
            marginBottom:'40px'
        },
        paddingLeft:"7%",
        marginBottom:'60px'
    }
}));
const FindMentor = (props) => {
    const classes = useStyles();
    const { match, history } = props;
    const { params } = match;
    const { page } = params;
    const TabToIndex = {
        0: 'all',
        1: 'ProductManagement',
        2: 'DataScience',
        3: 'UxDesign',
        4: 'SoftwareDevelopment'
    }
    const IndexToTab = {
        all: 0,
        ProductManagement: 1,
        DataScience: 2,
        UxDesign: 3,
        SoftwareDevelopment: 4
    }
    const [selectedTab, setselectedTab] = React.useState(IndexToTab[page]);

    const handleChange = (event, newValue) => {
        history.push(`/find-mentor/${TabToIndex[newValue]}`)
        setselectedTab(newValue);
    };
    return (

        <Container>
            <Grid container spacing={4} direction="column" style={{ marginTop: 30 }}>
                <Grid item xs={12}>
                    <Typography color="primary" variant="h4">Select your Mentor</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography color="primary" variant="h6">Choose your mentor from many experts</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper classes={{ rounded: classes.paperRounded, root:classes.paddLg }} >
                        <Tabs
                            value={selectedTab}
                            onChange={handleChange}
                            indicatorColor="primary"
                            variant="scrollable"
                            scrollButtons="on"
                            textColor="primary"
                          >
                            <Tab label="All" />
                            <Tab label="Product Management" />
                            <Tab label="Data Science" />
                            <Tab label="UX Design" />
                            <Tab label="Software Development" />
                        </Tabs>
                    </Paper>
                    {selectedTab === 0 && <All />}
                    {selectedTab === 1 && <ProductManagement />}
                    {selectedTab === 2 && <DataScience />}
                    {selectedTab === 3 && <UxDesign />}
                    {selectedTab === 4 && <SoftwareDevelopment />}
                </Grid>
            </Grid>

        </Container>


    )
}
export default FindMentor;