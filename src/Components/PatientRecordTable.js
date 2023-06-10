import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Axios from 'axios';
import './Filter.css'


const PatientRecordTable = () => {
  const [patients, setPatients] = useState([]);
  const [toggleMenu,setToggleMenu] = React.useState(false);
  const [initialAuth, setInitialAuth] = useState(false);
  const [finalAuth, setFinalAuth] = useState(false);
  const [PendingAuth, setPendingAuth] = useState(false);

  const handleInitialAuthChange = () => {
    setInitialAuth(!initialAuth);
  };
  const handlePendingAuthChange = () => {
    setPendingAuth(!PendingAuth);
  };

  const handleFinalAuthChange = () => {
    setFinalAuth(!finalAuth);
  };
  const handleQueryParams = () => {
  const queryParams = [];
      

    if (initialAuth) {
      queryParams.push('Initial Authorization');
    }

    if (finalAuth) {
      queryParams.push('Final Authorization');
    }
   
    if (queryParams.length === 0 && !PendingAuth) {
      getData();
    } 
    
    const queryString = queryParams.join('');
    console.log(queryString);
    if(!PendingAuth ){
       const url = `http://localhost:8080/api/patients?stage=${queryString}`;
    Axios.get(url)
      .then(response => {
        
        setPatients(response.data);
      })
      .catch(error => {
        
        console.error(error);
      });
    }
      if(PendingAuth){
        const statString=('pending');
        const url = `http://localhost:8080/api/test?stage=${queryString}&status=${statString}`;
        Axios.get(url)
      .then(response => {
        
        setPatients(response.data);
        
      })
      .catch(error => {
        
        console.error(error);
      });
    }
      if (PendingAuth && queryParams.length === 0)
      { console.log(queryParams);
        const statString=('pending');
        const url = `http://localhost:8080/api/test1?status=${statString}`;
        Axios.get(url)
      .then(response => {
        
        setPatients(response.data);
        
      })
      .catch(error => {
        
        console.error(error);
      });

       }
  }

    useEffect(() => {
      getData();
    }, []);

    const getData = () => {
      Axios.get("http://localhost:8080/api/patients")
        .then((response) => {
          setPatients(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };



  return (<>
    <div className='table-cont'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className='sticky-header'>
            <TableRow>
              <TableCell>Claim ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Ailment</TableCell>
              <TableCell>SLA</TableCell>
              <TableCell>Stage</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Approved Amount</TableCell>
              <TableCell>Hospital</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.ailment}</TableCell>
                <TableCell>{patient.sla}</TableCell>                
                <TableCell>{patient.stage}</TableCell>
                <TableCell>{patient.status}</TableCell>
                <TableCell>{patient.approvedAmt}</TableCell>
                <TableCell>{patient.hospital}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    <div>
    <div className="header-menu">
    { toggleMenu 
          ? <p color="#000" size={20} onClick={()=>setToggleMenu(false)}>Filter</p>  
          : <p color="#000" size={20} onClick={()=>setToggleMenu(true)}>Filter</p> 
    }     
    { toggleMenu && (
      <div>
      <label>
        <h4>Stage</h4>
        <input type="checkbox" checked={initialAuth} onChange={handleInitialAuthChange} />
        Initial Authorization
      </label>
      <br />
      <label>
        <input type="checkbox" checked={finalAuth} onChange={handleFinalAuthChange} />
        Final Authorization
      </label>
      <br />
      <label>
      <h4>Status</h4>
        <input type="checkbox" checked={PendingAuth} onChange={handlePendingAuthChange} />
        Pending
      </label>
      <br />
      <button onClick={handleQueryParams}>Submit</button>
    </div>

    )}
    
 </div>

</div>
</>
  );
};

export default PatientRecordTable;
