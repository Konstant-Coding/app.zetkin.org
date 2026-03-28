import { Box } from '@mui/material';
//import { usePathname, useRouter } from 'next/navigation';
import { FC /*useState*/ } from 'react';
import { InsertDriveFileOutlined } from '@mui/icons-material';

//import ImportDialog from 'features/import/components/ImportDialog';
//import joinFormMessageIds from 'features/joinForms/l10n/messageIds';
//import messageIds from '../l10n/messageIds';
//import useCreateJoinForm from 'features/joinForms/hooks/useCreateJoinForm';

//import { useMessages } from 'core/i18n';
import ZUIButtonMenu from 'zui/ZUIButtonMenu';
//import ZUICreatePerson from 'zui/ZUICreatePerson';
//import zuiMessageIds from 'zui/l10n/messageIds';

interface JourneyActionButtonProps {
  orgId: number;
}

const JourneyActionButton: FC<JourneyActionButtonProps> = ({ orgId }) => {
  //const messages = useMessages(messageIds);
  //const zuiMessages = useMessages(zuiMessageIds);

  //const [createPersonOpen, setCreatePersonOpen] = useState(false);

  //const { createForm } = useCreateJoinForm(orgId);

  return (
    <Box>
      <ZUIButtonMenu
        items={[
          {
            icon: <InsertDriveFileOutlined />,
            label: 'Create Journey for Org ' + orgId, //TODO: add proper message
            onClick: () => {
              //do something
            },
          },
        ]}
        label={'Create'} //TODO: add proper message
        /*
        />
      <ZUICreatePerson
        onClose={() => setCreatePersonOpen(false)}
        open={createPersonOpen}
        submitLabel={zuiMessages.createPerson.submitLabel.default()}
        title={zuiMessages.createPerson.title.default()}
      />
      */
      />
    </Box>
  );
};

export default JourneyActionButton;
