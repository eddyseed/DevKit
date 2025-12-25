'use client';
import { useState, CSSProperties } from "react";
import { PropagateLoader } from "react-spinners";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "black",
};
export default function Spinner() {
    const [loading] = useState(true);
    const [color] = useState("#000");

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <PropagateLoader
                color={color}
                size={12}
                loading={loading}
                cssOverride={override}
            />
        </div>

    );
}