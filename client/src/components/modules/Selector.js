import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Selector = (props) => {
  const vehicles = [
    "M1A2 Abrams",
    "T-80U",
    "Leopard 2A5",
    "Challenger 2",
    "Type 90",
    "Ariete (P)",
    "M1A1 Abrams",
    "T-80B",
    "Leopard 2K",
    "Challenger 1",
    "Type 74",
    "OF-40 (MTCA)",
    "M1 Abrams",
    "T-64B",
    "Leopard A1A1 (L/44)",
    "Chieftain Mk 10",
    "STB-1",
    "OF-40",
    "M60A3 TTS",
    "T-62",
    "Leopard A1A1",
    "Chieftain Mk 3",
    "Type 74G",
    "M60A1 (AOS)",
    "T-55A",
    "Leopard A1A1 (A1)",
    "Chieftain Mk 5",
    "Type 61",
    "M60A1 RISE (P)",
    "T-54 (1951)",
    "Leopard A1",
    "Sho't Kal Dalet",
    "Type 60 SPRG",
    "M48A1",
    "T-54 (1947)",
    "M47",
    "Centurion Mk 10",
    "Type 61",
    "M46",
    "T-44-100",
    "Centurion Mk 3",
    "Type 60 ATM",
    "M46 Tiger",
    "T-44",
    "Centurion Mk 1",
    "Type 60",
    "M26",
    "IS-3",
    "T-34-85",
    "Panther II",
    "Tiger II (H)",
    "IS-2",
    "T-34-85 (D-5T)",
    "Panther A",
    "Tiger II (P)",
    "IS-1",
    "T-34-85",
    "Panther D",
    "Tiger H1",
    "KV-85",
    "T-34-85E",
    "Panther A",
    "Tiger E",
    "KV-1S",
    "T-34-85",
    "Panther D",
    "Tiger",
    "KV-1 ZiS-5",
    "T-34-85",
    "Panther A",
    "Tiger",
    "KV-1E",
    "T-34-85",
    "Panther D",
    "Tiger",
    "KV-1",
  ];
  const toButton = (vehicle) => {
    return (
      <Button variant="primary" onClick={() => props.setV(vehicle)}>
        {vehicle}
      </Button>
    );
  };
  return (
    <div>
      <ButtonGroup vertical>{vehicles.map(toButton)}</ButtonGroup>
    </div>
  );
};

export default Selector;
