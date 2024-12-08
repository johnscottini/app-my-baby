import { useState, useEffect } from "react";
import { useAppContext } from "../Context";
import { Grid, Typography, Paper, AppBar } from "../components";
import dayjs from "dayjs";
import { getBabyInfo, list } from "../services/database";

const Dashboard: React.FC = () => {
    const { translate } = useAppContext();

    const loadData = () => {
        const d = list();
        if (d) {
            setAction(d);
        }
        const babyInfo = getBabyInfo();
        if (babyInfo) {
            setBabyInfos(babyInfo);
        }
    }

    useEffect(() => {
        loadData();
    }, [])
 
    const [actions, setAction] = useState([]);
    const [babyInfo, setBabyInfos] = useState([]);

    const actionTypeLabels: { [key: number]: string } = {
        1: translate("sleep"),
        2: translate("feeding"),
        3: translate("diaperChange"),
    };

    return (
        <>
            <AppBar title={translate("dashboard")} />
            <Grid container={true} spacing={2} sx={{ padding: 2 }}>
                {/* Informações do bebê */}
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            {translate("babyInformation")}
                        </Typography>
                        <Typography variant="body1"><b>{translate("name")}:</b> {babyInfo.name}</Typography>
                        <Typography variant="body1"><b>{translate("weight")}:</b> {babyInfo.weight} kg</Typography>
                        <Typography variant="body1"><b>{translate("length")}:</b> {babyInfo.length} cm</Typography>
                        <Typography variant="body1">
                            <b>{translate("bornDate")}:</b> {dayjs(babyInfo.bornDate).format("DD/MM/YYYY")}
                        </Typography>
                        <Typography variant="body1"><b>{translate("daysCount")}:</b> {babyInfo.daysCount}</Typography>
                    </Paper>
                </Grid>

                {/* Ações Recentes */}
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            {translate("recentActions")}
                        </Typography>
                        {actions.length > 0 ? (
                            actions
                            .slice()
                            .reverse()
                            .map((action) => (
                                <Grid container spacing={1} key={action.id} sx={{ marginBottom: 2 }}>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">
                                            <b>{translate("actionType")}:</b> {actionTypeLabels[action.action_type] || translate("unspecified")}
                                        </Typography>
                                    </Grid>
                                    {action.start_date && (
                                        <Grid item xs={12}>
                                            <Typography variant="body1">
                                                <b>{translate("start_date")}:</b> {dayjs(action.start_date).format("DD/MM/YYYY HH:mm")}
                                            </Typography>
                                        </Grid>
                                    )}
                                    {action.end_date && (
                                        <Grid item xs={12}>
                                            <Typography variant="body1">
                                                <b>{translate("end_date")}:</b> {dayjs(action.end_date).format("DD/MM/YYYY HH:mm")}
                                            </Typography>
                                        </Grid>
                                    )}
                                    {action.quantity && (
                                        <Grid item xs={12}>
                                            <Typography variant="body1">
                                                <b>{translate("quantity")}:</b> {action.quantity}
                                            </Typography>
                                        </Grid>
                                    )}
                                    {action.observation && (
                                        <Grid item xs={12}>
                                            <Typography variant="body1">
                                                <b>{translate("observation")}:</b> {action.observation}
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="body1">{translate("noActionsRecorded")}</Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;
