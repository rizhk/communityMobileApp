import { PaginationMeta } from "./global";
import { SportItem, SportsData } from "./sport";

//****** TOURNAMENT ******\\
export interface TournamentItem {
  maxParticipants?: number;
  latitude: number;
  longitude: number;
  date: Date;
  startHour?: string;
  endHour?: string;
  location?: string;
  description?: string;
  author?: {
    data?: {
      id: number;
    };
    id?: number;
  };
  participants?: {
    id?: number;
    data?: {
      id: number;
    }[];
  };
  sport?: SportItem | SportsData;
  maxTeam?: number;
  teams?: any;
  maxTeamParticipant?: number;
}

export interface TournamentData {
  data: TournamentItem[];
  meta: PaginationMeta;
}
