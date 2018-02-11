import { BLUE, DARK_BLUE } from "../styles/ThingerColors";
import React from "react";
import { LinearGradient } from "expo";

export default ({ children }) => (
  <LinearGradient colors={[BLUE, DARK_BLUE]} style={{ flex: 1, blurRadius: 1 }}>
    {children}
  </LinearGradient>
);
