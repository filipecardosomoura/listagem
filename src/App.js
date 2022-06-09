import React, { useEffect, useState } from "react";
import './App.css';
import { format, parseISO } from 'date-fns';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import {AppBar, Toolbar, styled, Typography} from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyleToolBar = styled(Toolbar)({
    display:"flex",
    justifyContent: "space-between"
});

const Navbar = () => {
    return (
        <AppBar position="sticky">
            <StyleToolBar>
                <Typography variant="h6" pl={7} sx={{ display:{ xs:"none", sm:"block"} }}>
                    IPQ
                </Typography>
            </StyleToolBar>
        </AppBar>
    )
}

function Registros({ list = []}){

    const [filter, setFilter] = useState('')
    const [filterPriority, setFilterPriority] = useState('')

    if(filter){
        const exp = eval(`/${filter.replace(/[^\d\w]+/,'.*')}/i`)
        list = list.filter( item => exp.test(item.number) || exp.test(item.type)) 
    }

    if(filterPriority){
        const exp2 = eval(`/${filterPriority.replace(/[^\d\w]+/,'.*')}/i`)
        list = list.filter( item => exp2.test(item.priority)) 
    }

    const handleFilter = e => {
        setFilter ( e.target.value )
    }

    const handleFilterPriority = e => {
        setFilterPriority ( e.target.value )
    }
    
    return  <Stack flex={1} p={10}>

        <Box directions="row" >
            <TextField sx={{ mr: 3, minWidth: 150 }} id="" label="Buscar Número" onChange={handleFilter} /> 
            <FormControl sx={{ mr: 3, minWidth: 150 }}>
                <InputLabel>Tipo </InputLabel>
                <Select label="Tipo" onChange={handleFilter}> 
                    <MenuItem value="">Todos</MenuItem>
                    {
                        list.map( ({type}) =>  {
                            return <MenuItem value={type}>{type}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
                
            <FormControl sx={{ mr: 3, minWidth: 150 }}>
                <InputLabel>Prioridade </InputLabel>
                <Select label="Prioridade" onChange={handleFilterPriority}> 
                    <MenuItem value="">Todas</MenuItem>
                    {
                        list.map( ({priority}) =>  {
                            return <MenuItem value={priority.toString()}>{priority}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box>
            <Box sx={{ }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                  <TableHead>
                    <TableRow>
                      <TableCell width={10}>Número</TableCell>
                      <TableCell width={10}>Tipo</TableCell>
                      <TableCell width={10}>Subtipo</TableCell>
                      <TableCell width={50}>Data</TableCell>
                      <TableCell width={10}>Prioridade</TableCell>
                      <TableCell width={10}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      {list.map(( {number, type, subtype, date, priority, status_id, color }) => (
                        <TableRow  key={number}>
                          <TableCell component="th" scope="row"style={{ backgroundImage: `linear-gradient(to right, ${color}, transparent`}}>{number}</TableCell>
                          <TableCell>{type}</TableCell>
                          <TableCell>{subtype}</TableCell>
                          <TableCell>{format(parseISO(date), 'dd/MM/yyyy')} às {format(parseISO(date), 'hh:mm')}</TableCell>
                          <TableCell>{priority}</TableCell>
                          <TableCell>{status_id}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
            </TableContainer>
            
            </Box>
            
    </Stack> 
}

function AppTeste() {

  var [ list, setList ] = useState( [] )
      
        useEffect( () => {
          fetch('http://137.184.244.33:3000/items')
          .then( async result => {
            setList( await result.json() )
            
        })
      
        }, [] )
  
  return (
        <Box>
            <Navbar></Navbar>
            
            <Stack direction="row" spacing={1} justifyContent="center">
                <Registros list={list} />
            </Stack>
        </Box>
    )

};


export default AppTeste;
