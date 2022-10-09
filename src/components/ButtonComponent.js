import React from "react";
import { Button } from "@react-native-material/core";

const ButtonComponent = ({title, event}) => (
    <Button
        title={title}
        style={{ alignSelf: 'center', marginTop: 10, marginBottom: 10 }}
        onPress={event}
    />
)

export default ButtonComponent;