import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAppContext } from "../Context";
import { Grid, Avatar, Box, Typography, CardNewItem, CustomList } from "../components";
import babyImage from '../assets/img/baby.png';

import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SettingsIcon from '@mui/icons-material/Settings';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACTIONS } from "../constants/actions";
import { list, getBabyInfo } from "../services/database";

const Home: React.FC = () => {
    const { translate } = useAppContext();
    const navigate = useNavigate();
    const theme = useTheme();
    const [data, setData] = useState([]);
    const [babyInfo, setBabyInfo] = useState({});

    const loadData = () => {
        const d = list();
        if(d) {
            setData(d);
        }
        const babyInfo = getBabyInfo();
        if(babyInfo) {
            setBabyInfo(babyInfo);
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    return  <Grid container={true}>
                <Grid size={{ xs: 12 }}
                    sx={{
                        height: '25vh'
                    }}
                >
                    <Grid container={true}
                        sx={{
                            alignItems: 'flex-end',
                            marginTop: '1em'
                        }}
                    >
                        <Grid size={{ xs: 4 }}>
                            <Box
                                sx={{
                                    ...styles.centerBox,
                                    ...styles.centerBox
                                }}
                            >
                                <IconButton
                                    sx={{
                                        ...styles.iconButton,
                                        border: `2px solid ${theme.palette.primary.main}`
                                    }}
                                    onClick={() => navigate("/dashboard")}
                                >
                                    <SignalCellularAltIcon
                                        sx={{
                                        ...styles.icon,
                                        color: `${theme.palette.primary.main}`,
                                    }} />
                                </IconButton>
                                <Box sx={{
                                    ...styles.centerBox,
                                    ...styles.boxText
                                }}>
                                    <Typography component="p" sx={{...styles.text2}}>{babyInfo.length ? babyInfo.length + " cm": 'Não informado'}</Typography>
                                    <Typography component="p" sx={{...styles.text3}}>{translate('length')}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                            <Box
                                sx={{
                                    ...styles.centerBox
                                }}
                            >
                                <Avatar
                                    sx={{ width: 90, height: 90 }}
                                    src={babyImage}
                                />
                                <Box sx={{
                                    ...styles.centerBox,
                                    ...styles.boxText
                                }}>
                                    <Typography component="p" sx={{...styles.text1}}>{babyInfo.name ? babyInfo.name : 'Não informado'}</Typography>
                                    <Typography component="p" sx={{...styles.text3}}>{babyInfo.daysCount ? `${babyInfo.daysCount} Dias` : 'Não informado'}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                            <Box
                                sx={{
                                    ...styles.centerBox
                                }}
                            >
                                <IconButton
                                    sx={{
                                        ...styles.iconButton,
                                        border: `2px solid ${theme.palette.primary.main}`
                                    }}
                                    onClick={() => navigate("/settings")}
                                >
                                    <SettingsIcon
                                        sx={{
                                        ...styles.icon,
                                        color: `${theme.palette.primary.main}`,
                                    }}
                                    />
                                </IconButton>
                                <Box sx={{
                                    ...styles.centerBox,
                                    ...styles.boxText
                                }}>
                                    <Typography component="p" sx={{...styles.text2}}>{babyInfo.weight ? `${babyInfo.weight} Kg` : 'Não informado'} </Typography>
                                    <Typography component="p" sx={{...styles.text3}}>{translate("weight")}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid 
                    item={true}
                    size={{ xs: 12 }}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                       
                        marginTop: '10px',
                    }}
                >
                    <Grid container={true}
                        sx={{
                            marginTop: '50px',
                            padding: 2
                        }}
                    >
                        <Grid size={{ xs: 12 }} item={true}>
                            <Grid container={true} spacing={2}>
                                {
                                    ACTIONS.map(action => <Grid size={{ xs: 4 }}>
                                        <CardNewItem
                                            title={translate(action.title)}
                                            Icon={action.Icon}
                                            color={action.color}
                                            actionType={action.actionType}
                                        />
                                    </Grid>)
                                }
                            </Grid>
                            <Grid container={true} sx={{
                                marginTop: '1em'
                            }}>
                                <Grid size={{ xs: 12 }}>
                                    { data ? <CustomList
                                        sx={{
                                            overflow: 'auto',
                                            maxHeight: '56.5vh'
                                        }}
                                        items={data}
                                    /> : null}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
};

const styles = {
    centerBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconButton: {
        height: '2.5em',
        width: '2.5em',
    },
    icon: {
        fontSize: '1.25em'
    },
    boxText: {
        marginTop: '.75em'
    },
    text1: {
        wordBreak: 'break-all',
        fontSize: '1.3em',
        fontWeight: '600',
        fontFamily: '"Lato", sans-serif',
    },
    text2: {
        wordBreak: 'break-all',
        fontSize: '.9em',
        fontWeight: '625',
        fontFamily: '"Lato", sans-serif',
    }, 
    text3: {
        wordBreak: 'break-all',
        fontSize: '.9em',
        fontWeight: '450',
    }
}

export default Home;