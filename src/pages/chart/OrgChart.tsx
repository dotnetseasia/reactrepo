import React from 'react';

import Paper from '@mui/material/Paper';
import Chart from 'react-google-charts'
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from '@mui/material/Typography';
import { Link, useNavigate, } from "react-router-dom";

const OrgData = [
    ['Name', 'Manager', 'ToolTip'],
    [
        {
            v: 'Lisa',
            f: 'Lisa<div style="color:red; font-style:italic">President</div>',
        },
        '',
        'The President',
    ],
    [
        {
            v: 'Eva',
            f: 'Eva<div style="color:red; font-style:italic">Vice President</div>',
        },
        'Lisa',
        'VP',
    ],
    ['Alice', 'Lisa', ''],
    ['Bob', 'Eva', 'Bob Sponge'],
    ['Carol', 'Bob', ''],
]
const OrgOptions = {
    allowHtml: true,
}
export default function OrgChart() {

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
                <Link color="inherit" to="/">
                    Dashboard
                </Link>

                <Typography color="text.primary"> Attendance Report</Typography>
            </Breadcrumbs>
            <Paper elevation={0} sx={{ p: 3 }}>
                <Chart
                    width={'100%'}
                    height={400}
                    chartType="OrgChart"
                    loader={<div>Loading Chart</div>}
                    data={OrgData}
                    options={OrgOptions}
                    rootProps={{ 'data-testid': '1' }}
                />
            </Paper>
        </>
    );
}