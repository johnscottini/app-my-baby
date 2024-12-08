import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { Card, Fab, Grid, Typography } from '..';
import { useAppContext } from '../../Context';

const CardNewItemComponent = ({ Icon, color, title, actionType }) => {
    const navigate = useNavigate();
    const { translate } = useAppContext();

    return (
        <Card
            sx={{
                overflow: 'visible',
                borderRadius: '16px', 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)', 
                backgroundColor: '#f9f9f9', 
            }}
        >
            <Grid
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1em',
                }}
            >
                <Icon
                    sx={{
                        marginTop: '.2em',
                        fontSize: '3em',
                        color: color || '#1976D2',
                    }}
                />
                <Typography
                    sx={{
                        fontSize: '.95em',
                        marginTop: '0.5em',
                        fontWeight: '700',
                        textAlign: 'center',
                        wordWrap: "break-word",
                        width: "90%",
                        color: '#333',
                    }}
                >
                    {title}
                </Typography>
            </Grid>
            <Grid
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography
                    sx={{
                        marginTop: '0.5em',
                        fontSize: '0.85em',
                        fontWeight: '400',
                        color: "#6c757d",
                    }}
                >
                    {translate('add-new-action')}
                </Typography>
            </Grid>
            <Grid
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Fab
                    size="small"
                    sx={{
                        color: '#fff',
                        backgroundColor: color || '#1976D2',
                        position: 'relative',
                        bottom: '-20px',
                        boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.2)', 
                        '&:hover': {
                            backgroundColor: color
                                ? `${color}cc`
                                : '#1565C0',
                        },
                    }}
                    onClick={() => navigate(`/new/${actionType}`)}
                >
                    <AddIcon />
                </Fab>
            </Grid>
        </Card>
    );
};

export default CardNewItemComponent;
