import {
  Dumbbell,
  Warehouse,
  Building,
  AlertTriangle,
  HeartPulse,
  Theater,
  Church,
  Rainbow,
  Newspaper,
} from "lucide-react-native";
import { LocationType } from "types/location";
import { ActualityType } from "types/actuality";

export const IconForType: React.FC<{ type: LocationType | ActualityType; color?: string; size?: number }> = ({
  type,
  color = "black",
  size = 24,
}) => {
  switch (type) {
    case "Sportif":
      return <Dumbbell color={color} size={size} />;
    case "Salle":
      return <Warehouse color={color} size={size} />;
    case "Administration":
      return <Building color={color} size={size} />;
    case "Incident":
      return <AlertTriangle color={color} size={size} />;
    case "Santé":
      return <HeartPulse color={color} size={size} />;
    case "Culture":
      return <Theater color={color} size={size} />;
    case "Religion":
      return <Church color={color} size={size} />;
    case "Actualités":
      return <Newspaper color={color} size={size} />;
    case "Divers":
      return <Rainbow color={color} size={size} />;
    default:
      return <Newspaper color={color} size={size} />;
  }
};
