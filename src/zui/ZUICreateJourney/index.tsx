import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC, MouseEvent, useState } from 'react';

import checkInvalidFields from './checkInvalidFields';
import messageIds from 'zui/l10n/messageIds';
import { Msg } from 'core/i18n';
import PersonalInfoForm from './PersonalInfoForm';
import useCreatePerson from 'features/profile/hooks/useCreatePerson';
import useCustomFields from 'features/profile/hooks/useCustomFields';
import { useNumericRouteParams } from 'core/hooks';
import { ZetkinCreateJourney, ZetkinJourney } from 'utils/types/zetkin';
import useOrganization from '../../features/organizations/hooks/useOrganization';
import zuiMessages from 'zui/l10n/messageIds';
import { useMessages } from 'core/i18n';

interface ZUICreateJourneyProps {
  initialValues?: ZetkinCreateJourney;
  onClose: () => void;
  onSubmit?: (e: MouseEvent<HTMLButtonElement>, journey: ZetkinJourney) => void;
  open: boolean;
  title?: string;
  submitLabel?: string;
}

const ZUICreateJourney: FC<ZUICreateJourneyProps> = ({
  initialValues,
  open,
  onClose,
  onSubmit,
  title,
  submitLabel,
}) => {
  const theme = useTheme();
  const { orgId } = useNumericRouteParams();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const customFields = useCustomFields(orgId).data;
  const createJourney = useCreateJourney(orgId);
  const organization = useOrganization(orgId).data;
  const [tags, setTags] = useState<number[]>([]);

  const [personalInfo, setPersonalInfo] = useState<ZetkinCreateJourney>({
    ...initialValues,
  });
  const messages = useMessages(zuiMessages);

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      onClose={() => {
        onClose();
        setPersonalInfo({});
        setTags([]);
      }}
      open={open}
    >
      <Box sx={{ padding: '40px 0 40px 40px' }}>
        <Box display="flex">
          <Typography sx={{ ml: 0.5 }} variant="h5">
            {title ?? messages.createJourney.title.default()}
          </Typography>
        </Box>

        {!customFields ? (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', m: 8, pr: '40px' }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <PersonalInfoForm
            onChange={(field, value) => {
              if (value === '') {
                const copied = { ...personalInfo };
                delete copied[field];
                setPersonalInfo(copied);
              } else {
                if (field === 'tags' && value) {
                  setTags((prev) =>
                    tags.includes(value as number)
                      ? tags.filter((item) => item !== value)
                      : [...prev, value as number]
                  );
                } else {
                  setPersonalInfo((prev) => {
                    return { ...prev, [field]: value as string };
                  });
                }
              }
            }}
            personalInfo={personalInfo}
            tags={tags}
          />
        )}
        <Box sx={{ pr: 5 }}>
          <Divider />
          <Box
            alignItems="center"
            display="flex"
            justifyContent="flex-end"
            mt={2}
          >
            <Box>
              <Button
                onClick={() => {
                  onClose();
                  setPersonalInfo({});
                  setTags([]);
                }}
                sx={{ mr: 2 }}
                variant="text"
              >
                <Msg id={messageIds.createJourney.cancel} />
              </Button>
              <Button
                disabled={
                  personalInfo.first_name === undefined ||
                  personalInfo.last_name === undefined ||
                  checkInvalidFields(
                    customFields || [],
                    personalInfo
                  ).length !== 0
                }
                onClick={async (e) => {
                  const journey = await createJourney(personalInfo, tags);
                  if (onSubmit) {
                    onSubmit(e, journey);
                  }
                  onClose();
                  setPersonalInfo({});
                  setTags([]);
                }}
                variant="contained"
              >
                {submitLabel ?? (
                  <Msg id={messageIds.createJourney.submitLabel.default} />
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ZUICreateJourney;
