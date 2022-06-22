import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "@/components/HeaderMaterial/Header";
import SearchTickets from "@/components/Home/SearchTickets/SearchTickets";
import WhyAreWe from "@/components/Home/WhyAreWe";
import AboutDrivers from "@/components/Home/AboutDrivers";
import Footer from "@/components/Footer/Footer";
import ConfirmModal from '@/components/Dialog/Confirm/ConfirmModal'


function App(props) {
  const alert = props?.alert
  const [isAlertVibible, setIsAlertVibible] = useState(Boolean(alert))

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />

      <main>
        <SearchTickets />
        <WhyAreWe /> 
        <AboutDrivers />
      </main>

      {isAlertVibible && <ConfirmModal
        isVisible={isAlertVibible}
        changeVisibility={() => setIsAlertVibible(!isAlertVibible)}
        titleText={alert?.alertTitle}
        contentText={alert?.alertText}
        cancelButtonText={'ОК'}
      />}

      <Footer />
    </React.Fragment>
  );
}

App.getInitialProps = ({ query }) => {
  if (query?.alert) {
    const alert = JSON.parse(query.alert);
    return {alert};
  }
  return {};
};

export default App;
