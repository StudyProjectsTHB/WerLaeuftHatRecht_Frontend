export interface TileContentProps {
    date: Date;
    view: 'month' | 'year' | 'decade' | 'century';
}
export interface Markers {
    [key: string]: string;
}

export interface NavigationLabelProps {
    date: Date;
    view: 'month' | 'year' | 'decade' | 'century';
    label: string;
}

export interface AddStepsModalProps {
    isOpen: boolean;
    onClose: () => void;
}
