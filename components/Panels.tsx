import React from "react";
import { Panel } from "reactflow";
import DuctShape from "./DuctShape";

const Panels = () => {
    return (
        <>
            <Panel position="top-left">
                <DuctShape type="rect" />
            </Panel>
            <Panel position="top-left">
                <DuctShape type="two-duct" />
            </Panel>
            <Panel position="top-left">
                <DuctShape type="tri-duct" />
            </Panel>
            <Panel position="top-left">
                <DuctShape type="duct-end" />
            </Panel>
        </>
    );
};

export default Panels;
