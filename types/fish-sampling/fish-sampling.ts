import User from "@/types/auth/user";

export type FishSampling = {
    sampling_id: string;
    pond_id: string;
    fish_weight: number;
    fish_length: number;
    recorded_at: string;
    reporter: User
}
