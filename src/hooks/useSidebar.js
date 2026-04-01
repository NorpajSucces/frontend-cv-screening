import { useState } from "react";

export default function useSidebar() {
    const [open, setOpen] = useState(true);

    const toggle = () => setOpen(!open);

    return { open, toggle };
}