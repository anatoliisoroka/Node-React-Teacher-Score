import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Home() {
    const [students, setStudents] = useState([]);
    const [avgscore, setAvgscore] = useState();

    useEffect(() => {
        const getStudents = async () => {
            const { data } = await axios.get(`http://localhost:3001/students?page=1`);
            
            if(data.students) {
                setStudents(data.students);

                const score = data.students.reduce((a, b) => a + parseFloat(b.score), 0) / data.students.length;
                setAvgscore(score.toFixed(3));
            }
        }

        getStudents();
    }, []);

    const handleChange = index => e => {
        let newStudents = [...students];
        newStudents[index]['score'] = e.target.value;
        newStudents[index]['updated'] = true;

        setStudents(newStudents)

        const score = newStudents.reduce((a, b) => a + parseFloat(b.score), 0) / newStudents.length;
        setAvgscore(score.toFixed(3));
    }

    const updateScore = async (index) => {
        const student = students[index];

        const { data } = await axios.put(`http://localhost:3001/students/${student.id}`, student);
        
        if (data.message) {
            let newStudents = [...students];
            newStudents[index]['updated'] = false;
    
            setStudents(newStudents)
        }
    }

    return (
        <Container fixed>
            <Box paddingTop={6} sx={{ bgcolor: '#efefef', height: '100vh' }}>
                {students.length ? 
                    (<Box>
                        {students.map((student, index) => (
                            <Grid container spacing={2} paddingX={2} marginBottom={3} key={index}>
                                <Grid item sm={4}>
                                    <Box style={{textAlign: 'center'}}>{student.first_name} {student.last_name}</Box>
                                </Grid>
                                <Grid item sm={4} style={{textAlign: 'center'}}>
                                    <TextField
                                        label="Score"
                                        type="number"
                                        value={student.score} 
                                        inputProps={{
                                            step: '0.01',
                                            min: '0'
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handleChange(index)}
                                    />
                                </Grid>
                                <Grid item sm={4} style={{textAlign: 'center'}}>
                                    <Button 
                                        variant="contained" 
                                        onClick={() => updateScore(index)} 
                                        disabled={!student.updated}
                                    >
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                        <Box textAlign='center'>Average Score : {avgscore}</Box>
                    </Box>)
                : (
                    <Box textAlign='center'>Loading...</Box>
                )}
            </Box>
        </Container>
    )
}

export default Home;
