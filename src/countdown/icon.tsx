import * as icons from 'react-bootstrap-icons'

export type IconName = keyof typeof icons;

export interface IconProps extends icons.IconProps {
    // Cannot use "name" as it is a valid SVG attribute
    // "iconName", "filename", "icon" will do it instead
    iconName: IconName
}

export const Icon: React.FC<IconProps> = (props) => {
    const BoostrapIcon = icons[props.iconName]
    return <BoostrapIcon {...props} />
}
