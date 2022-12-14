import React, { useState, useEffect, ChangeEvent } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { login } from "../../services/Service";
import UserLogin from "../../models/UserLogin";
import "./Login.css";
import { useDispatch } from "react-redux";
import { addId, addToken } from "../../store/tokens/actions";
import { toast } from "react-toastify";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [userLogin, setUserLogin] = useState<UserLogin>(
    {
      id: 0,
      usuario: "",
      senha: "",
      token: ""
    }
  )
  const [respUserLogin, setRespUserLogin] = useState<UserLogin>(
    {
      id: 0,
      usuario: "",
      senha: "",
      token: ""
    }
  )

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    })
  }

  

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login ("/usuarios/logar", userLogin, setRespUserLogin)
      toast.success("Usuario logado com sucesso", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
    });
    } catch (error) {
      toast.error("Dados do usuário inconsistentes. Erro ao logar!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
    });
    }
  }

  useEffect(() => {
    if (token != '') {
      dispatch(addToken(token));
      navigate('/feed')
    }
  }, [token])

  useEffect(()=> {
    if(respUserLogin.token !== ''){
      dispatch(addToken(respUserLogin.token))
      dispatch(addId(respUserLogin.id.toString()))
      navigate('/feed')
    }
  }, [respUserLogin.token])

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" className='caixa imagem'>
      <Grid alignItems="center" xs={6}>
        <Box paddingX={20} className="containerForm" >
          <form onSubmit={onSubmit}>
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              component="h3"
              align="center"
              className="textos1"
            >
              Entrar
            </Typography>
            <TextField
              value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="usuario"
              label="Usuário(email)"
              variant="outlined"
              name="usuario"
              margin="normal"
              className="cor-interna"
              fullWidth
            />
            <TextField
              value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="senha"
              label="Senha"
              variant="outlined"
              name="senha"
              margin="normal"
              type="password"
              className="cor-interna"
              fullWidth
            />
            <Box marginTop={2} textAlign="center">
              <Button type="submit" variant="contained" className="butlogar">
                Logar
              </Button>
            </Box>
          </form>
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Box marginRight={1}>
              <Typography variant="subtitle1" gutterBottom align="center">
                Não tem uma conta?
              </Typography>
            </Box>
            <Link to="/cadastrousuario" className="text-decorator-none">
              <Typography
                variant="subtitle1"
                gutterBottom
                align="center"
                className="textos1 text-decorator-none"
              >
                Cadastre-se
              </Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;

