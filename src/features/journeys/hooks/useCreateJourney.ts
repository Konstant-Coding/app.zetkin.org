import { journeyCreate, journeyCreated } from '../store';
import { useApiClient, useAppDispatch } from 'core/hooks';
import { ZetkinJourney } from 'utils/types/zetkin';

interface ZetkinJourneyPostBody {
    title: string;
    description?: string;
    singular_label: string;
    plural_label: string;
    opening_note_template?: string;
    stats: {
        closed: number;
        open: number;
    };
}

export default function useCreateJourney(
    orgId: number
): (
    journeyBody: ZetkinJourneyPostBody
) => Promise<ZetkinJourney> {
    const apiClient = useApiClient();
    const dispatch = useAppDispatch();

    return async function (
        journeyBody: ZetkinJourneyPostBody
    ): Promise<ZetkinJourney> {
        dispatch(journeyCreate());

        const journey = await apiClient.post<
            ZetkinJourney,
            ZetkinJourneyPostBody
        >(
            `/api/journey/createNew?orgId=${orgId}/journeys`,
            journeyBody
        );

        dispatch(journeyCreated(journey));

        return journey;
    };
}
