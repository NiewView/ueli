import { SearchResultItem } from "@common/SearchResultItem";
import { Text } from "@fluentui/react-components";
import { RefObject, useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../ThemeContext";
import { elementIsVisible } from "./helpers";

type SearchResultListItemProps = {
    containerRef: RefObject<HTMLDivElement>;
    isSelected: boolean;
    searchResultItem: SearchResultItem;
};

export const SearchResultListItem = ({ containerRef, isSelected, searchResultItem }: SearchResultListItemProps) => {
    const { theme } = useContext(ThemeContext);
    const ref = useRef<HTMLDivElement>(null);

    const scrollIntoViewIfSelectedAndNotVisible = () => {
        if (containerRef.current && ref.current && isSelected && !elementIsVisible(ref.current, containerRef.current)) {
            setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth" }), 50);
        }
    };

    useEffect(scrollIntoViewIfSelectedAndNotVisible, [isSelected]);

    return (
        <div
            ref={ref}
            key={searchResultItem.id}
            style={{
                display: "flex",
                flexDirection: "column",
                padding: 10,
                boxSizing: "border-box",
                opacity: isSelected ? 1 : 0.75,
                backgroundColor: isSelected ? theme.colorBrandBackgroundStatic : undefined,
                color: isSelected ? theme.colorNeutralForegroundOnBrand : undefined,
            }}
        >
            <Text weight={isSelected ? "semibold" : "regular"} size={400}>
                {searchResultItem.name}
            </Text>
            <Text weight="regular">{searchResultItem.description}</Text>
        </div>
    );
};