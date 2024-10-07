import { FishSampling } from '@/types/fish_sampling';

export const renderSamplingData = (fishSampling: FishSampling) => {
    return [{
        fish_weight: fishSampling.fish_weight,
        fish_length: fishSampling.fish_length,
        // reporter: fishSampling.reporter,
        sample_date: fishSampling.sample_date
    }];
};
