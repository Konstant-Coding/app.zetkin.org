import { Box } from '@mui/material';
//import { usePathname, useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { ControlPoint } from '@mui/icons-material';

import messageIds from '../l10n/messageIds';
import { useMessages } from 'core/i18n';
import ZUIButtonMenu from 'zui/ZUIButtonMenu';
import ZUICreateJourney from 'zui/ZUICreateJourney';
import zuiMessageIds from 'zui/l10n/messageIds';

interface JourneyActionButtonProps {
  orgId: number;
}

const JourneyActionButton: FC<JourneyActionButtonProps> = () => {
  const messages = useMessages(messageIds);
  const zuiMessages = useMessages(zuiMessageIds);

  const [createJourneyOpen, setCreateJourneyOpen] = useState(false);

  return (
    <Box>
      <ZUIButtonMenu
        items={[
          {
            icon: <ControlPoint />,
            label: messages.createJourney(),
            onClick: () => {
                setCreateJourneyOpen(true);
            },
        },
        ]}
        label={'Create'} //TODO: add proper message
        />
      <ZUICreateJourney
        onClose={() => setCreateJourneyOpen(false)}
        open={createJourneyOpen}
        submitLabel={zuiMessages.createJourney.submitLabel.default()}
        title={zuiMessages.createJourney.title.default()}
      />
    </Box>
  );
};

export default JourneyActionButton;
