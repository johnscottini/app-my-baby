import { Avatar, Box, Button, Grid, TextField, Typography } from "../components";
import { useAppContext } from "../Context";
import logo from '../assets/img/logo.png';
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../services/authentication";
import { useState } from "react";
import { handleChange } from "../utils/core";

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const { showSnackMessage, supabase, translate } = useAppContext();
    const [data, setData] = useState({
        email: {
            value: "",
            error: null,
            helperText: null
        },
        password: {
            value: "",
            error: null,
            helperText: null
        },
    });

    const verifyLogin = async () => {
        let { data: response, error } = await signIn(data.email.value, data.password.value, supabase);

        if (error && error.message === "Invalid login credentials") {
            showSnackMessage("Dados de usuário inválidos");
        } else {
            localStorage.setItem("session", JSON.stringify(response.session));
            localStorage.setItem("user", JSON.stringify(response.user));
            navigate("/");
        }
    };

    return (
        <Box sx={{ height: '100vh', width: '100vw', display: 'flex' }}>
            {/* Esquerda */}
            <Box
                sx={{
                    flex: 1,
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Avatar sx={{ width: 160, height: 160 }} src={logo} />
                <Typography variant="h3" sx={{ marginTop: 2 }}>Login</Typography>
                <Typography variant="h5" sx={{ marginTop: 1 }}>{translate('welcome')}</Typography>
            </Box>

            {/* Direita */}
            <Box
                sx={{
                    flex: 1,
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 3,
                }}
            >
                <TextField
                    label="E-mail"
                    fullWidth
                    onChange={(event) => handleChange(data, setData, event.target.value, "email")}
                    value={data.email.value}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Senha"
                    fullWidth
                    onChange={(event) => handleChange(data, setData, event.target.value, "password")}
                    type="password"
                    value={data.password.value}
                    sx={{ marginBottom: 2 }}
                />
                <Link to="/signup" style={{ marginBottom: 2, textAlign: 'center' }}>Cadastrar</Link>
                <Button fullWidth onClick={verifyLogin}  style={{ marginTop: 15 }} variant="contained" color="primary">
                    Entrar
                </Button>
            </Box>
        </Box>
    );
};

export default SignIn;
