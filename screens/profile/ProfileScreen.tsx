import Screen from "@/components/screen";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import ProfileDetails from "@/features/profile/components/ProfileDetails";
import { Href, Link } from "expo-router";
import {
  BookOpenIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  IdentificationIcon,
} from "react-native-heroicons/outline";

type ProfileNav = {
  label: string;
  icon: any;
  color: keyof typeof colorClasses;
  href: Href;
};

const colorClasses = {
  blue: { bg: "bg-blue-100", text: "text-blue-500" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-500" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-500" },
  green: { bg: "bg-green-100", text: "text-green-500" },
  teal: { bg: "bg-teal-100", text: "text-teal-500" },
  orange: { bg: "bg-orange-100", text: "text-orange-500" },
  purple: { bg: "bg-purple-100", text: "text-purple-500" },
};
const ProfileScreen = () => {
  const profileNavButtonsData: Array<ProfileNav> = [
    {
      label: "Profile Information",
      icon: IdentificationIcon,
      color: "blue",
      href: "/profile/profile-info",
    },
    {
      label: "Academic Records",
      icon: BookOpenIcon,
      color: "indigo",
      href: "/profile/academic-records",
    },
    {
      label: "Class Schedule",
      icon: CalendarDaysIcon,
      color: "emerald",
      href: "/profile/class-schedule",
    },
  ];
  return (
    <Screen>
      <ProfileDetails />
      <Box className="px-5 md:px-0 w-full gap-1 max-w-screen-md mx-auto">
        {profileNavButtonsData.map((data, index) => (
          <ProfileNavButton {...data} key={index} />
        ))}
      </Box>
    </Screen>
  );
};

const ProfileNavButton = ({ label, icon, color, href }: ProfileNav) => {
  const colors = colorClasses[color];

  return (
    <Link href={href}>
      <Box className="bg-white rounded-lg p-2.5 gap-2 flex flex-row items-center">
        <Box className={`p-2.5 rounded-md ${colors.bg}`}>
          <Icon className={`w-6 h-6 ${colors.text}`} as={icon} />
        </Box>
        <Heading size="sm" className="flex-1">
          {label}
        </Heading>
        <Icon className="w-4 h-4 text-typography-500" as={ChevronRightIcon} />
      </Box>
    </Link>
  );
};

export default ProfileScreen;
