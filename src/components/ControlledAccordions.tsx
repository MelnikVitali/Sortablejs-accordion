import * as React from 'react';
import { ReactSortable } from 'react-sortablejs';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import { FC } from 'react';


interface ICard {
    id: string;
    heading: string;
    secondaryHeading: string;
    details: string;
    children?: React.ReactNode;
    delayOnTouchStart?: boolean;
}

const data = [
    {
        id: '1',
        heading: 'Panel 1',
        secondaryHeading: 'this is panel 1',
        details: 're er re re re re re re re'
    },
    {
        id: '2',
        heading: 'Panel 2',
        secondaryHeading: 'this is panel 2',
        details: ' et et et et et '
    },
    {
        id: '3',
        heading: 'Panel 3',
        secondaryHeading: 'this is panel 3',
        details: ' at at at at at at '
    },
    {
        id: '4',
        heading: 'Panel 4',
        secondaryHeading: 'this is panel 4',
        details: ' text text text text text '
    }
];

const ControlledAccordions: FC = () => {
    const [card, setCards] = React.useState<ICard[]>(data);
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            console.log(panel);
            console.log(isExpanded);
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <Box component="div" sx={{width: '100%'}}>
            <ReactSortable
                list={card}
                setList={setCards}
                // easing="cubic-bezier(0.2, 0, 0, 1)"
                animation={150}
                className="container"
                chosenClass="chosen-list"
                // ghostClass="dragging"
                // style={{overflow: "auto"}}
                swap
                // multiDrag
            >
                {card.map(accordion => {
                    const {id, heading, secondaryHeading, details} = accordion;
                    return (
                        <Accordion
                            expanded={expanded === id}
                            key={id}
                            onChange={handleChange(id)}
                            sx={{margin: 1}}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                        flexBasis: '33.33%',
                                        flexShrink: 0
                                    }}>
                                    {heading}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 15,
                                    }}
                                    color="secondary">
                                    {secondaryHeading}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{details}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}

                {/*<div style={{maxWidth:920}}>{JSON.stringify(card)}</div>*/}
            </ReactSortable>
            <textarea
                readOnly={true}
                rows={80}
                cols={80}
                style={{margin: '0 auto'}}
                value={JSON.stringify(card, null, 4)}
            />
        </Box>
    );
};

export default ControlledAccordions;
