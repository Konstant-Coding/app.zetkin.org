import JourneyActionButton from '../components/JourneyActionButton';
import { useMessages } from 'core/i18n';
import TabbedLayout from '../../../utils/layout/TabbedLayout';
import messageIds from '../l10n/messageIds';
/*
import useServerSide from 'core/useServerSide';
import ViewFolderSubtitle from '../components/ViewFolderSubtitle';
import ZUIFuture from 'zui/ZUIFuture';
import useItemSummary from '../hooks/useItemSummary';
import useJoinSubmissions from 'features/joinForms/hooks/useJoinSubmissions';
*/
import { useNumericRouteParams } from 'core/hooks';

interface JourneysLayoutProps {
  children: React.ReactNode;
}

const JourneysLayout: React.FunctionComponent<JourneysLayoutProps> = ({
  children,
}) => {
  const messages = useMessages(messageIds);
  const { orgId } = useNumericRouteParams();

  return (
    <TabbedLayout
      actionButtons={<JourneyActionButton orgId={orgId} />}
      baseHref={`/organize/${orgId}/journeys`}
      defaultTab="/overview"
      ellipsisMenuItems={[
        {
          label: messages.journeys.menu.downloadCsv(),
          onSelect: () => {
            location.href = `/api/journeyInstances/download?orgId=${orgId}`;
          },
        },
        {
          label: messages.journeys.menu.downloadXlsx(),
          onSelect: () => {
            location.href = `/api/journeyInstances/download?orgId=${orgId}&format=xlsx`;
          },
        },
      ]}
      tabs={[
        {
          href: `/overview`,
          label: messages.journeys.tabs.overview(),
        },
      ]}
      title={messages.journeys.title()}
    >
      {children}
    </TabbedLayout>
  );
};

export default JourneysLayout;
