const ICON_SIZE = 28;

const TabIcon = ({
  focused,
  color,
  OutlineIcon,
  SolidIcon,
}: {
  focused: boolean;
  color: string;
  OutlineIcon: React.ComponentType<{ color: string; size: number }>;
  SolidIcon: React.ComponentType<{ color: string; size: number }>;
}) => {
  const IconComponent = focused ? SolidIcon : OutlineIcon;
  return <IconComponent color={color} size={ICON_SIZE} />;
};

export default TabIcon;
