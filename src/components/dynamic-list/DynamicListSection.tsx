import { useEffect, useRef, useState, useCallback } from "react";

interface Props {
    items?: string[];
}

const useSingleLineCalculator = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const measureListRef = useRef<HTMLUListElement>(null);
    const [singleLineCount, setSingleLineCount] = useState(1);

    const calculateSingleLineItems = useCallback(() => {
        const container = containerRef.current;
        const measureList = measureListRef.current;

        if (!container || !measureList) return;
        const measureItems = Array.from(measureList.children) as HTMLLIElement[];
        if (measureItems.length === 0) return;

        let itemCount = 0;
        const baselinePosition = measureItems[0].getBoundingClientRect().top;

        for (const item of measureItems) {
            const itemPosition = item.getBoundingClientRect().top;

            // Break if item wraps to next line (with 1px tolerance)
            if (Math.abs(itemPosition - baselinePosition) > 1) {
                break;
            }
            itemCount++;
        }

        setSingleLineCount(Math.max(1, itemCount));
    }, []);

    useEffect(() => {
        calculateSingleLineItems();

        const resizeObserver = new ResizeObserver(() => {
            calculateSingleLineItems();
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        if (measureListRef.current) {
            resizeObserver.observe(measureListRef.current);
        }

        return () => resizeObserver.disconnect();
    }, [calculateSingleLineItems]);

    return {
        // [measure list, visible list]
        lists: [true, false],
        containerRef,
        singleLineCount,
        measureListRef
    }
}

const SingleLineList = ({
                            items = ["Home", "About Us", "Contact Us", "Settings", "Welcome", "Hello", "World", "Bye", "Details", "Hek", "ieahhs"]
                        }: Props) => {
    const { lists, measureListRef, containerRef, singleLineCount } = useSingleLineCalculator()

    return (
        <div className="space-y-4">
            <div className="flex px-5" ref={containerRef}>
                <div className="w-[100px] flex-shrink-0">
                    Fits: {singleLineCount}
                </div>
                <div className="relative w-full">
                    {lists.map((isMeasureList, i) => (
                        <ul
                            className={`flex gap-5 flex-wrap ${isMeasureList ? "absolute overflow-hidden" : ""}`}
                            key={i}
                            ref={isMeasureList ? measureListRef : undefined}
                        >
                            {items.map((item, index) => (
                                <li
                                    key={item}
                                    className={`
                                        ${isMeasureList ? "opacity-0" : ""} 
                                        max-w-full bg-red-800 flex-shrink-0 px-3 py-2 whitespace-nowrap rounded
                                        ${index > singleLineCount - 1 && !isMeasureList ? 'hidden' : ''}
                                    `}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
            <p className="text-xl font-bold">
                Last Item: {items[singleLineCount - 1]}
            </p>
        </div>
    );
};

export default SingleLineList;