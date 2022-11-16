import Image from "next/image"
import Previos from "../images/previous.png"
import Next from "../images/next.png"
import { TDirection } from "../types"
import { useRef } from "react"

interface IPropTypes {
    page: number,
    pageCount: number
}

export default function Pagination({ page, pageCount}: IPropTypes) {
    const prev = useRef()
    const next = useRef()

    const isNextDisabled = (): boolean => {
        return page >= pageCount
    }

    const isPrevDisabled = (): boolean => {
        return page <= 1
    }

    const handlePaginate = async (direction: TDirection) => {
        if(direction === 1 && isNextDisabled()) {
            prev.current.classList.add("disabled")
        }
 
        if(direction === -1 && isPrevDisabled()) {
            next.current.classList.add("disabled")
        }
    }

    return (
        <div className="my-11 flex items-center justify-center">
            <div className="flex gap-5">
                <button ref={prev} onClick={() => handlePaginate(-1)} className="p-2 pl-[7px] pr-[9px] border border-gray-500 rounded-[30px]">
                    <Image
                        src={Previos}
                        alt="Previos"
                        height={22}
                        width={22}
                    />
                </button>
                <button ref={next} onClick={() => handlePaginate(1)} className="p-2 pl-[9px] pr-[7px] border border-gray-500 rounded-[30px]">
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