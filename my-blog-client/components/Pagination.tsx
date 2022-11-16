import Image from "next/image"
import Previos from "../images/previous.png"
import Next from "../images/next.png"
import { TDirection } from "../types"
import { useRef } from "react"
import qs from "qs"
import { useRouter } from "next/router"

interface IPropTypes {
    page: number,
    pageCount: number,
    redirectUrl?: string
}

export default function Pagination({ page, pageCount, redirectUrl = '/' }: IPropTypes) {
    const router = useRouter()

    const isNextDisabled = (): boolean => {
        return page >= pageCount;
    };

    const isPrevDisabled = (): boolean => {
        return page <= 1;
    };

    const handlePaginate = async (direction: TDirection) => {
        if (direction === 1 && isNextDisabled()) {
            return;
        }

        if (direction === -1 && isPrevDisabled()) {
            return;
        }
           
        const queryString = qs.stringify({
            page: page + direction
        })

        router.push(`${redirectUrl}?${queryString}`)
    }

    return (
        <div className="my-11 flex items-center justify-center">
            <div className="flex gap-5">
                <button 
                    className={`${"p-2 pl-[7px] pr-[9px] border border-gray-500 rounded-[30px]"} ${
                        isPrevDisabled() ? 'disabled' : ''
                    }`}
                    onClick={() => handlePaginate(-1)} 
                >
                    <Image
                        src={Previos}
                        alt="Previos"
                        height={22}
                        width={22}
                    />
                </button>
                <button 
                    className={`${"p-2 pl-[9px] pr-[7px] border border-gray-500 rounded-[30px]"} ${
                        isNextDisabled() ? 'disabled' : ''
                    }`}
                    onClick={() => handlePaginate(1)} 
                >
                    <Image
                        src={Next}
                        alt="Next"
                        height={22}
                        width={22}
                    />
                </button>
            </div>
        </div>
    )
}