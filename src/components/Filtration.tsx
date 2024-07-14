import type React from 'react';
import type {CSSProperties} from 'react';
import {useState} from 'react';
import type {ControlProps, MenuProps} from 'react-select';
import Select from 'react-select';
import {parseISO, compareAsc} from 'date-fns';
import type {FiltrationProps} from '../types/types';
import {ThemeStyles} from '../types/types';
import {useAppSelector} from "../hooks";


export const Filtration: React.FC<FiltrationProps> = ({items, onFilter, filterKeys}) => {
    const [selectedKey, setSelectedKey] = useState<string>(filterKeys[0]);
    const theme = useAppSelector((state) => state.global.theme);
    const handleFilter = (selectedOption: any) => {
        setSelectedKey(selectedOption.value);
        let filteredItems = [...items];


        filteredItems.sort((a: any, b: any) => {
            switch (selectedOption.value) {
                case 'count':
                    return b.count - a.count;
                case 'priority':
                    return b.priority.value - a.priority.value;
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'createdAt':
                    return compareAsc(parseISO(b.createdAt), parseISO(a.createdAt));
                default:
                    return 0;
            }
        });
        console.log(filteredItems)
        onFilter(filteredItems);
    };

    const options = filterKeys.map(key => ({value: key, label: `Filter by ${key}`}));

    const customStyles = {
        menu: (provided: CSSProperties, state: MenuProps<any, any, any>) => ({
            ...provided,
            backgroundColor: theme === ThemeStyles.light ? '#F7F7F7' : '#252525',
            color: theme === ThemeStyles.light ? "#252525" : "#F7F7F7",
            borderRadius: '0.375rem',
            boxShadow: theme === ThemeStyles.light ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.9)',
            border: 'none',
        }),
        control: (provided: CSSProperties, state: ControlProps<any, any, any>) => ({
            ...provided,
            paddingLeft: '0.5rem',
            width: '100%',
            cursor: 'pointer',
            height: '2.25rem',
            borderRadius: '0.375rem',
            backgroundColor: theme === ThemeStyles.light ? '#F7F7F7' : '#252525',
            borderColor: theme === ThemeStyles.light ? '#6C63FF' : '#F7F7F7',
            boxShadow: state.isFocused ? (theme === ThemeStyles.light ? '0 0 0 2px rgba(83, 76, 194, 0.4)' : '0 0 0 2px rgba(247, 247, 247, 0.4)') : 'none',
            '&:hover': {
                borderColor: theme === ThemeStyles.light ? '#6C63FF' : '#F7F7F7',
            },
            color: theme === ThemeStyles.light ? "#252525" : "#F7F7F7", // Изменение цвета текста здесь
            outline: 'none',
        }),
        singleValue: (provided: any, state: any) => ({
            ...provided,
            color: theme === ThemeStyles.light ? "#252525" : "#F7F7F7",
        }),
    };

    const dropdownStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#6C63FF' : state.isFocused ? '#534CC2' : theme === ThemeStyles.light ? '#F7F7F7' : '#252525',
            color: state.isSelected || state.isFocused ? '#F7F7F7' : theme === ThemeStyles.light ? '#252525' : "#F7F7F7",
            padding: 20,
            cursor: 'pointer',
        }),
    };

    return (
        <div>
            <Select
                value={options.find(option => option.value === selectedKey)}
                onChange={handleFilter}
                options={options}
                // @ts-ignore
                styles={{...customStyles, ...dropdownStyles}}
            />
        </div>
    );
};