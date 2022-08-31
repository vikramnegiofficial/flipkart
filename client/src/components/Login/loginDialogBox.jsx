import { Button, Dialog, TextField } from "@mui/material";
import { Box, styled, Typography } from "@mui/material";
import { useState, useContext } from "react";
import Authentication from "../../service/api";
// import DataProvider from '../../context/dataProvider';
import { DataContext } from "../../context/dataProvider";

const DialogCont = styled(Box)`
  min-width: 400px;
  // max-width: 90%;
  width: 680px;
  min-height: 200px;
  max-height: 90vh;
  background: #fff;
  border-radius: 4px;
  margin: 0 auto;
  overflow: auto;
`;

const ErrorMsgBox = styled(Typography)`
  & > p {
    color: red;
    font-size: 13px;
    font-weight: 600;
  }
`;

const Container = styled(Box)`
  display: flex;
  padding: 0;
  margin: 0 auto;
  border-radius: 2px;
  height: 528px;
  max-width: 750px;
  min-width: 650px;
`;

const ImgCont = styled(Box)`
height : 100%;
    color: #fff;
    max-width : 40%;
    background : #2874f0 URL("https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png") center 85% no-repeat;
    & > div > p{
        color : #dbdbdb;
        line-height :1.5; 
        margin-top : 15px;
        font-size : 17px;
    }
    & > div > h5{
        color : #fff
        line-height :1.5; 
        margin-top : 15px;
        font-weigth : 700;
    }
`;

const Wrapper = styled(Box)`
  display: flex;
  position: relative;
  flex-direction: column;
  text-align: center;
  padding: 40px 35px 16px;
  & > div {
    margin-bottom: 23px;
  }

  & > p {
    color: #878787;
    font-size: 16px;
    font-weight: 400;
    margin-top: 16px;
  }
`;

const LoginBtn = styled(Button)`
  background-color: #fb641b;
  color: #fff;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
  margin-top: 10px;
  height: 48px;
  cursor: pointer;
  border-radius: 2px;
  :hover {
    background-color: #fb641b;
  }
`;
const ReqBtn = styled(Button)`
  color: #2874f0;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  margin-top: 16px;
  height: 48px;
  cursor: pointer;
  border-radius: 2px;
`;

const DontAccBox = styled(Typography)`
  position: absolute;
  left: 70px;
  bottom: 32px;
  text-align: center;
  & > p {
    cursor: pointer;
    color: #2874f0;
    font-size: 14px;
    font-weight: 600;
  }
`;
const FlexBox = styled(Box)`
  display: Flex;
  margin: 0;
  justify-content: space-between;
`;

const whichPage = {
  login: {
    view: "login",
    heading: "Login",
    subHeading: "Get access to your Orders, Wishlist and Recommendations",
  },
  signup: {
    view: "signup",
    heading: "Look's like you're new here!",
    subHeading: "Sign up with your mobile number to get started",
  },
};

var initialUserData = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phone: "",
  tc: false,
};
var initialUserSigninData = {
  email: "",
  password: "",
  tc: true,
};

const LoginDialogBox = (props) => {
  const closeDialogBx = () => {
    props.setOpen(false);
    toggelAccount(whichPage.login);
    setisSignUpFirst(true);
    setsignupError(false);
    setsigninError(false);
  };

  const [account, toggelAccount] = useState(whichPage.login);
  const [signupError, setsignupError] = useState(false);
  const [signinError, setsigninError] = useState(false);
  const [signupErrorMsg, setsignupErrorMsg] = useState("");
  const [signinErrorMsg, setsigninErrorMsg] = useState("");

  const { setUserAcc } = useContext(DataContext);

  const changePage = () => {
    account.view === "login"
      ? toggelAccount(whichPage.signup)
      : toggelAccount(whichPage.login);
    setsignupError(false);
    setsigninError(false);
  };
  const [isSignUpFirst, setisSignUpFirst] = useState(true);
  const swapSignUp = () => {
    isSignUpFirst ? setisSignUpFirst(false) : setisSignUpFirst(true);
  };

  const [signupData, setSignupData] = useState(initialUserData);
  const [signinData, setSigninData] = useState(initialUserSigninData);
  const onValueChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    // console.log(signupData);
    // console.log(e.target.value);
  };
  const onValueChangeSignin = (e) => {
    setSigninData({ ...signinData, [e.target.name]: e.target.value });
  };
  let signupResponse;
  const userSignUp = async () => {
    signupResponse = await Authentication.authenticationSignup(signupData);
    // console.log(signupResponse.data.message);
    if (signupResponse.status === 200 || signupResponse === 201) {
      setUserAcc(signupData.firstname);
      closeDialogBx();
    } else {
      setsignupErrorMsg(signupResponse.data.message);
      setsignupError(true);
    }
    // changePage();
    // console.log("hii");
    // console.log(signupResponse.status);
    // console.log(signupResponse);

    // console.log(setUserAcc);
  };
  let signinResponse;

  const userSignin = async () => {
    signinResponse = await Authentication.signin(signinData);
    console.log(signinResponse);
    console.log(signinResponse.data.message);
    if (signinResponse.status === 200 || signinResponse === 201) {
      // setUserAcc("aman");
      setUserAcc(signinResponse.data);
      closeDialogBx();
    } else {
      setsigninErrorMsg(signinResponse.data.message);

      setsigninError(true);
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={() => closeDialogBx()}
      PaperProps={{ sx: { maxWidth: "unset" } }}
    >
      <DialogCont>
        <Container>
          <ImgCont>
            <Box style={{ padding: "40px 33px" }}>
              <Typography variant="h5">{account.heading}</Typography>
              <Typography>{account.subHeading}</Typography>
            </Box>
          </ImgCont>
          {account.view === "login" ? (
            <Wrapper>
              {signinError && (
                <ErrorMsgBox>
                  <Typography>{signinErrorMsg}</Typography>
                </ErrorMsgBox>
              )}
              <TextField
                variant="standard"
                name="email"
                onChange={(e) => onValueChangeSignin(e)}
                label="Enter Email/Mobile Number"
              ></TextField>
              <TextField
                variant="standard"
                name="password"
                onChange={(e) => onValueChangeSignin(e)}
                label="Enter Password"
              ></TextField>
              <Typography style={{ textAlign: "left", fontSize: 12 }}>
                By continuing, you agree to Flipkart's Terms of Use and Privacy
                Policy.
              </Typography>
              <LoginBtn onClick={() => userSignin()}>Login</LoginBtn>
              <Typography>OR</Typography>
              <ReqBtn>Request OTP</ReqBtn>
              <DontAccBox>
                <Typography onClick={() => changePage()}>
                  New to Flipkart? Create an account
                </Typography>
              </DontAccBox>
            </Wrapper>
          ) : isSignUpFirst ? (
            <div>
              <Box style={{ textAlign: "center" }}>
                <ReqBtn onClick={() => swapSignUp()}>Swap SignUp</ReqBtn>
              </Box>
              <Wrapper
                style={
                  !(account.view === "login")
                    ? { paddingTop: 25 }
                    : { paddingTop: 56 }
                }
              >
                <TextField
                  variant="standard"
                  label="Enter Email/Mobile Number"
                ></TextField>

                <Typography style={{ textAlign: "left", fontSize: 12 }}>
                  By continuing, you agree to Flipkart's Terms of Use and
                  Privacy Policy.
                </Typography>
                <LoginBtn>Continue</LoginBtn>
                <Typography>OR</Typography>
                <ReqBtn onClick={() => changePage()}>
                  Existing User? Log in
                </ReqBtn>
              </Wrapper>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Box style={{ textAlign: "center" }}>
                <ReqBtn
                  style={{ marginRight: 15 }}
                  onClick={() => swapSignUp()}
                >
                  Swap SignUp
                </ReqBtn>
              </Box>
              <Wrapper
                style={
                  !(account.view === "login")
                    ? { paddingTop: 15, paddingBottom: 5 }
                    : { paddingTop: 56, paddingBottom: 56 }
                }
              >
                {signupError && (
                  <ErrorMsgBox>
                    <Typography>{signupErrorMsg}</Typography>
                  </ErrorMsgBox>
                )}
                <Box style={{ display: "flex" }}>
                  <TextField
                    style={{ marginRight: 15 }}
                    name="firstname"
                    onChange={(e) => onValueChange(e)}
                    variant="standard"
                    label="First Name"
                  ></TextField>
                  <TextField
                    variant="standard"
                    name="lastname"
                    onChange={(e) => onValueChange(e)}
                    label="Last Name"
                  ></TextField>
                </Box>
                <TextField
                  variant="standard"
                  name="username"
                  onChange={(e) => onValueChange(e)}
                  label="Username"
                ></TextField>
                <TextField
                  variant="standard"
                  name="email"
                  onChange={(e) => onValueChange(e)}
                  label="Email"
                ></TextField>
                <TextField
                  variant="standard"
                  name="phone"
                  onChange={(e) => onValueChange(e)}
                  label="Phone Number"
                ></TextField>
                <TextField
                  variant="standard"
                  name="password"
                  onChange={(e) => onValueChange(e)}
                  label="Password"
                ></TextField>

                <FlexBox style={{ marginBottom: 0 }}>
                  <LoginBtn onClick={() => userSignUp()}>Continue</LoginBtn>
                  <ReqBtn onClick={() => changePage()}>
                    Existing User? Log in
                  </ReqBtn>
                </FlexBox>
              </Wrapper>
            </div>
          )}
        </Container>
      </DialogCont>
    </Dialog>
  );
};
export default LoginDialogBox;
