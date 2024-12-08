import { useAppContext } from "../Context";
import { Grid, Button, TextField, AppBar } from "../components";
import { MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import DateTimePicker from '../components/dateTimePicker'
import { adjustDateTimeForTimezone } from "../utils/core";
import { getBabyInfo } from "../services/database";
import dayjs from "dayjs";

const Settings: React.FC = () => {
    const { translate, changeLanguage, showAlertMessage, supabase } = useAppContext();

    const [babyName, setBabyName] = useState("");
    const [babyWeight, setBabyWeight] = useState("");
    const [babyLength, setBabyLength] = useState("");
    const [babyBornDate, setBabyBornDate] = useState();
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("language") || navigator.language.split("-")[0]);

    useEffect(() => {
        const savedBabyInfo = getBabyInfo() || "{}";
        if (savedBabyInfo) {
            setBabyName(savedBabyInfo.name || "");
            setBabyWeight(savedBabyInfo.weight || "");
            setBabyLength(savedBabyInfo.length || "");
            setBabyBornDate(savedBabyInfo.bornDate || "");
        }
    }, []);

    const saveBabyInfo = () => {

        const daysCount = dayjs().diff(babyBornDate, 'day');

        const babyInfo = {
            name: babyName,
            weight: babyWeight,
            length: babyLength,
            bornDate: babyBornDate,
            daysCount: daysCount
        };

        localStorage.setItem("babyInfo", JSON.stringify(babyInfo));
        showAlertMessage(translate("form-saved"), "success");
    };

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            localStorage.removeItem("session");
            showAlertMessage(translate("logged-out.success"), "success");
            redirect("/signin");
        } catch (error) {
            showAlertMessage(translate("logged-out.error"), "error");
        }
    };

    return (
        <>
            <AppBar title={translate("settings")} />
            <Grid container={true} spacing={2} sx={{ padding: 2 }}>
                <Grid item={true} size={{ xs: 12 }}>
                    <TextField
                        select
                        fullWidth
                        label={translate("choose-language")}
                        value={selectedLanguage}
                        onChange={(e) => {
                            const lang = e.target.value;
                            setSelectedLanguage(lang);
                            changeLanguage(lang);
                            showAlertMessage(translate("language-changed-success"), "success");
                        }}
                    >
                        <MenuItem value="en">{translate("english")}</MenuItem>
                        <MenuItem value="pt">{translate("portuguese")}</MenuItem>
                        <MenuItem value="es">{translate("spanish")}</MenuItem>
                    </TextField>
                </Grid>

                <Grid item={true} size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label={translate("name")}
                        value={babyName}
                        onChange={(e) => setBabyName(e.target.value)}
                        placeholder={translate("enter-name")}
                    />
                </Grid>

                <Grid item={true} size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        type="number"
                        label={`${translate("weight")} (Kg)`}
                        value={babyWeight}
                        onChange={(e) => setBabyWeight(e.target.value)}
                        placeholder={translate("enter-weight")}
                    />
                </Grid>

                <Grid item={true} size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        type="number"
                        label={translate("length")}
                        value={babyLength}
                        onChange={(e) => setBabyLength(e.target.value)}
                        placeholder={translate("enter-length")}
                    />
                </Grid>

                <Grid item={true} size={{ xs: 12 }}>
                    <DateTimePicker
                        value={babyBornDate ? adjustDateTimeForTimezone(babyBornDate) : null}
                        label={translate("bornDate")}
                        name="babyBorn"
                        fullWidth={true}
                        ampm={false}
                        format="DD/MM/YYYY HH:mm"
                        onChange={(value) => { setBabyBornDate(new Date(value.toString())) }}
                    />
                </Grid>

                <Grid container item xs={12} spacing={2}>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={saveBabyInfo}
                        >
                            {translate("save")}
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="error"
                            onClick={handleLogout}
                        >
                            {translate("logout")}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Settings;