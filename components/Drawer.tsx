import React, { useState } from "react";
import { Drawer, Button, Typography, IconButton, DrawerStylesType } from "@material-tailwind/react";


const DrawerMenu: React.FC<DrawerStylesType> = () => {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Drawer open={open} onClose={(): any => setOpen(false)} className="p-4">

            </Drawer>
        </>
    );
};

export default DrawerMenu;
