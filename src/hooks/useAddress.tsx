import axios from "axios";
// @ts-ignore
import { GOOGLE_API_KEY } from "@env";
import { useEffect, useState } from "react";

type addrObj = {
    st : string;
    stNbr : string;
    city : string;
    dist : string;
    ctL : string;
    ctS : string;
    landL : string;
    landS : string;
    pstc : string;
    [key: string]: string;
}

const getAddrData = async (lt : number, lg : number) : Promise<addrObj> => {
    const addrObj : addrObj = {
        st : "",
        stNbr : "",
        city : "",
        dist : "",
        ctL : "",
        ctS : "",
        landL : "",
        landS : "",
        pstc : "",
    }
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lt},${lg}&key=${GOOGLE_API_KEY}`
            );
            if (response !== undefined) {
                addrObj.st = response?.data.results[0].address_components[1]?.short_name;
                addrObj.stNbr =  response.data.results[0].address_components[0].short_name;
                addrObj.city = response?.data.results[0].address_components[2]?.short_name;
                addrObj.dist = response?.data.results[0].address_components[3]?.short_name;
                addrObj.ctL = response?.data.results[0].address_components[4]?.long_name;
                addrObj.ctS = response?.data.results[0].address_components[4]?.short_name;
                addrObj.landL = response?.data.results[0].address_components[5]?.long_name;
                addrObj.landS = response?.data.results[0].address_components[5]?.short_name;
                addrObj.pstc = response?.data.results[0].address_components[6]?.short_name;
                return (addrObj);
            }
        }
    catch {
        throw("error : invers geocode in useAddress");
    }
    return addrObj;

}

const createAddr = (addrData : addrObj, format : string[], brk : string) : string => {

    return ( format
        .map((v) => {
            if (addrData[v])
                    return (addrData[v]);
            else {
                console.error("Bad address format")
            }
        })
        .join(brk)
    )
}

export function useAddress(lg: number, lt: number, format: string[], brk : string = " "): string {
    const [address, setAddress] = useState('');

    useEffect(() => {
        const getGeoInv = async () => {
            if (lt === 0 && lg === 0) {
                setAddress('');
                return;
            }
            try {
                const addrData: addrObj = await getAddrData(lt, lg);
                setAddress(createAddr(addrData, format, brk));
            } catch (error : any) {
                console.error('Error in useAddress:', error.message);
            }
        };

        getGeoInv();
    }, [lt, lg, format]);

    return address;
}