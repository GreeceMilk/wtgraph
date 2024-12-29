import React, { useEffect } from 'react'
import api from '../api/axiosConfig.js'
import { areAllObjectsValid } from '../Util'
import { Box, Card, CardActions, CardContent, CardMedia, CircularProgress, Collapse, Divider, Paper, Stack, Typography, alpha, useColorScheme, useMediaQuery, styled, Link, Button } from '@mui/material';
import InfoItem from './InfoItem.js';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';

import { currentColorMode } from '../Util';

// from MUI Card
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
//   marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

const WikiInfoCard = ({vehicleName}) => {
    const {mode, setMode} = useColorScheme();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const [wikiInfo, setWikiInfo] = React.useState(null);
    const [loading , setLoading] = React.useState(true);
    const [expanded, setExpanded] = React.useState(false);

    // wikiInfo schema:
    // private String wkName;
    // private String media;
    // private String cls;
    // private String nation;
    // private String rank;
    // private String abBr;
    // private String rbBr;
    // private String sbBr;   
    // private String role;
    // private String researchCost;
    // private String purchaseCost;
    // private String generalInfo;
    // private String vehicleByUpdate;
    // private String source;
    // private Map<String, Map<String, String>> otherInfo;
    async function getWikiData() {
        if (areAllObjectsValid([vehicleName])) {
            try {
                const response = await api.get("/api/wikiData", {params: {name: vehicleName}});
                setWikiInfo(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
    }

    function chooseDisplayContent() {
        if (vehicleName === null || vehicleName === undefined) {
            return (
                <Typography>
                    Please select a vehicle
                </Typography>
            )

        }
        if (loading){
            return (
                <CircularProgress  sx={{mt: 4, mb: 4}}/>
            )
        }
        if (wikiInfo === null || wikiInfo === undefined) {
            return (
                <Typography>An error occurred while fetching data</Typography>
            )
        }
        return contentDisplay();
    }

    function singleInfoEntryDisplay(obj) {
        const keys = Object.keys(obj);
        // console.log("Obj", obj);
        return (
            <Stack direction={"row"} divider={<Divider orientation='vertical' flexItem/>} spacing={1} sx={{justifyContent: 'center', height: "auto"}}>
                {
                    keys.map((key) => (
                            <InfoItem key={key} name={key} content={obj[key]}/>
                    ))
                }
            </Stack>
        )
    };

    function otherInfoDisplay(otherInfo) {
        const values = Object.values(otherInfo);
        // console.log("Values: ", values);
        return values.map((info) => (
            <Paper sx={{p: 1}} elevation={2}>
                {singleInfoEntryDisplay(info)}
            </Paper>
        ));
    }

    const descriptionDisplay = (
        <>
            <Typography variant='h5' sx={{textAlign: "left", color: "primary.light", mb: 1}}>
                Description
            </Typography>
            <Typography sx={{textAlign: "left"}} dangerouslySetInnerHTML={{__html: wikiInfo?.generalInfo}}>
            </Typography>
        </>);

    const armorDisplay = (
            <Stack direction={"row"} divider={<Divider orientation='vertical' flexItem/>} spacing={1} sx={{justifyContent: 'center'}}>
                <InfoItem name={"Hull Armor"} content={wikiInfo?.hullArmor}/>
                <InfoItem name={"Turret Armor"} content={wikiInfo?.turretArmor}/>
            </Stack>);

    const mobilityDisplay = (
            <Stack direction={"row"} divider={<Divider orientation='vertical' flexItem/>} spacing={1} sx={{justifyContent: 'center', alignItems: "end"}}>
                <InfoItem name={"Power to Weight"} content={wikiInfo?.powerToWeight + " hp/t"}/>
                <InfoItem name={"Max Forward Speed"} content={wikiInfo?.maxForwardSpeed + " km/h"}/>
                <InfoItem name={"Max Reverse Speed"} content={wikiInfo?.maxReverseSpeed + " km/h"}/>
                <InfoItem name={"Weight"} content={wikiInfo?.weight + " t"}/>
                <InfoItem name={"Engine Power"} content={wikiInfo?.enginePower + " hp"}/>
            </Stack>);

    const byUpdateDisplay = (
        <Typography variant='caption' sx={{p: 1}}>
            {"Introduced in "+wikiInfo?.vehicleByUpdate}
        </Typography>
    )

    function backgroundGradient(theme) {
        const colorMode = currentColorMode(mode, prefersDarkMode);
        if (colorMode === 'light') {
            return `linear-gradient(to right, ${alpha(theme.palette.background.paper, 0.35)}, ${alpha(theme.palette.background.paper, 1)})`;
        } else {
            return `linear-gradient(to right, ${alpha("#1f1f1f", 0.2)}, ${alpha("#1f1f1f", 1)})`;
        }
    }

    function contentDisplay() {
        return (
        <>
            <Box sx={{position: "relative", mt: 4}}>
                <CardMedia 
                    component={"img"}
                    image={wikiInfo?.media}
                    sx={{width: "100%", height: "auto"}}
                />
                <Box sx={(theme) => ({ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundImage: `${backgroundGradient(theme)}`})}/>
                <Box sx={(theme) => ({position: "absolute", left: "40%", right: theme.spacing(2), top: "10%", bottom: "10%", opacity: 0.9, alignContent: "center"})}>
                    <Stack direction={"column"} spacing={2}>
                        <Typography variant='h4' sx={{textAlign: "end", fontWeight: "bold"}}>
                            {wikiInfo?.wkName}
                        </Typography>
                        <Paper>
                            <Stack direction={"row"} divider={<Divider orientation='vertical' flexItem/>} spacing={1} sx={{justifyContent: 'center'}}>
                                <InfoItem name={"Class"} content={wikiInfo?.cls}/>
                                <InfoItem name={"Nation"} content={wikiInfo?.nation}/>
                                <InfoItem name={"Rank"} content={wikiInfo?.rank}/>
                                <InfoItem name={"Role"} content={wikiInfo?.role}/>
                            </Stack>
                        </Paper>

                        <Paper>

                            <Stack direction={"row"} divider={<Divider orientation='vertical' flexItem/>} spacing={1} sx={{justifyContent: 'center'}}>
                                <InfoItem name={"AB BR"} content={wikiInfo?.abBr}/>
                                <InfoItem name={"RB BR"} content={wikiInfo?.rbBr}/>
                                <InfoItem name={"SB BR"} content={wikiInfo?.sbBr}/>
                                <InfoItem name={"Research Cost"} content={wikiInfo?.researchCost}/>
                                <InfoItem name={"Purchase Cost"} content={wikiInfo?.purchaseCost}/>
                            </Stack>

                        </Paper>


                    </Stack>
                </Box>

            </Box>
            <CardActions disableSpacing sx={{pl: 2, pr: 2}}>
                <Button href={wikiInfo?.source} target='_blank' color='secondary' sx={{textTransform: 'none'}}>More on WTWiki</Button>
                <Button sx={{ml: "auto", textTransform: 'none'}}>
                    {/* {byUpdateDisplay} */}
            {"Introduced in "+wikiInfo?.vehicleByUpdate}
                </Button>
                <ExpandMore 
                    expand={expanded}
                    onClick={() => setExpanded(!expanded)}
                >
                    <ExpandMoreIcon/>
                </ExpandMore>
            </CardActions>
            <Collapse
                in={expanded}
                timeout={"auto"}
                unmountOnExit
            >
                <CardContent sx={{pl: 2, pr: 2, pb: 4}}>
                    {/* <Box sx={{height: 100, backgroundImage: `url(${wikiInfo?.media})`}}>
                        <Box sx={{width: "30%", height: "100%", right: 0}}>
                            <p>fjsklghaso</p>
                        </Box>
                    </Box> */}
                    
                    <Stack spacing={2}>
                        <Paper sx={{p: 1}} elevation={2}>
                            {descriptionDisplay}
                        </Paper>

                        {wikiInfo?.otherInfo ? otherInfoDisplay(wikiInfo.otherInfo): (<Paper>No more info available</Paper>)}
                    </Stack>

                </CardContent>
            </Collapse>
        </>
        )
    }

    useEffect(() => {
        setLoading(true);
        getWikiData();
    }, [vehicleName])

  return (
    <Card sx={{borderRadius: 4}}>
        {chooseDisplayContent()}
    </Card>
  )
}

export default WikiInfoCard
