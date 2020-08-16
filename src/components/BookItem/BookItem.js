import React, {useContext, useState} from 'react';
import UserContext from '../../UserContext'

import './BookItem.css'

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme} from '@material-ui/core/styles';


import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import AddToLibraryIcon from '@material-ui/icons/LibraryAdd';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import defaultBookIcon from '../../assets/img/book.png';

export default function BookItem(props) {

    let [toggled, setToggled] = useState(false);
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const xsScreen = useMediaQuery(theme.breakpoints.down(550));

    const donationContext = useContext(UserContext)
    const conditions = ["Select", "New", "Very good", "Slightly Used", "Very Used"]
    let conditionArea;
    let controls;

    if (!props.readOnly) {
        const selectList = 
        conditions.map((c, i) => {
        return <MenuItem value={c} key={i}>{c}</MenuItem > }
        )
        conditionArea = 
                <>
                <Box display="flex" 
                    flexDirection="column" 
                    my={1}
                    minWidth={(smScreen || props.itemSmall )? "100%": "initial"}    
                >
                    <InputLabel htmlFor="condition">Condition</InputLabel>
                    <Select 
                        id="condition" 
                        onChange=
                            {(props.bookScan)? (e) => props.handleSelectConditionScanner(e.target.value)
                            : (e) => donationContext.handleSelectCondition(props.listId, e.target.value)}
                            defaultValue={props.condition}>
                            {selectList}
                    </Select> 
                </Box>
                </>
        }

        let finalDetails = (props.ready)? 
        <>
            <Typography variant="h2">Id: {props.book.id}</Typography>   
            <Typography variant="h2">Condition: {props.condition}</Typography>   
        </> : null

   
        controls =          
            <ButtonGroup>
            {
                (props.activeListItem)? 
                <Button 
                    variant = "contained" 
                    size = "small"
                    startIcon={<HighlightOffIcon/>} 
                    onClick={() => 
                        {
                            (!props.preQueueHandler)? donationContext.handleRemoveBook(props.id)
                            : props.preQueueHandler(props.id)
                        }
                    }
                    disableElevation
                >
                        Remove
                </Button>
                : (props.bookScan)? 
                <Button 
                    variant = "contained" 
                    color={toggled? "secondary" : "primary"}
                    size = "small"
                    startIcon={<AddToLibraryIcon/>} 
                    onClick = {() => {
                        donationContext.handleAddBook(props.book)
                        setToggled(toggled = true)
                    }}>
                        {toggled? "Added To Box!" : "Add to Box"}
                </Button>
                : null
                }
        </ButtonGroup> 
        let authorString = ""
        if (!props.book.authors || !props.book.authors.length) {
            authorString = null
        } 
        else {
            props.book.authors.forEach((author) => {
                authorString += `${author}, `
            })
            authorString = authorString.replace(/,\s*$/, "");
        }
      
    return (

        <Box width={1} m={1}>
            <Box 
                display="flex" 
                flexDirection="row"
                flexWrap="nowrap"
                justifyContent="flex-start"
                alignItems="center"
                border="1px solid #0f0f0f"
                borderRadius="1.5px"
            >
                <CardContent display="flex" flexDirection="column" className="book-img-wrapper">
                    <Box
                        maxWidth={xsScreen || props.itemSmall ? "80px" : "150px"}
                        minWidth={xsScreen|| props.itemSmall ? "80px" : "150px"}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border={smScreen? "none" : "1px solid rgba(209,209,209,0.36)"}
                        borderRadius = "5px"
                        p= {smScreen? 0.3 : 1}
                    >
                        <img src={(!props.book.image)? defaultBookIcon: props.book.image} className="book-img"/>
                    </Box>
                </CardContent>
                <CardContent display="flex" flexDirection="column" className="book-img-wrapper">
                    <Typography variant="h1">{props.book.title}</Typography>
                    <Box   
                        display="flex"
                        flexDirection="column"
                        my={1.33}
                    >
                        <Typography variant="h2">{xsScreen || props.itemSmall ? null : "ISBN:"} {props.book.isbn}</Typography>
                        <Typography variant="h2">{xsScreen || props.itemSmall ? "" : "Author/s: "}{!authorString? null : authorString}</Typography>
                        {props.ready? finalDetails : null}
                    </Box>
                        {props.noSelect ? null : conditionArea}
                        {props.noControls? null: controls}
                </CardContent>
            </Box>
        </Box>
    )
}