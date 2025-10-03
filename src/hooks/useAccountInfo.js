import { useEffect, useState } from "react";
import { getAccountInfo } from "../services/accountSercice";

export function useAccountInfo(token, UserID){
    const [account, setAccount] = useState(null)

    useEffect(() => {
        if (!token || !UserID) return;
        const fetchAccount = async () => {
            try {
            const data = await getAccountInfo(token, UserID);
            setAccount(data);
            } catch (err) {
                console.error("Fetch account failed", err);
            }
        };
        fetchAccount();
    }, [token, UserID])

    return account;
}