import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { Typography } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import DashboardCard from '../shared/DashboardCard';

const RecentDeposits = ({ isLoading }: { isLoading: boolean }) => {
  const deposits = useQuery(api.deposits.listRecentDeposits);

  if (isLoading || !deposits) {
    return <Typography>Loading...</Typography>;
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  return (
    <DashboardCard title="Recent Deposits">
      <>
      <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: '-40px',
            '& .MuiTimelineConnector-root': {
              width: '1px',
              backgroundColor: '#efefef',
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
        {deposits.map((deposit: any) => (
          <TimelineItem key={deposit._id}>
            <TimelineOppositeContent>{deposit.depositDate}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">{deposit.depositNote} - {formatAmount(deposit.depositAmount)}</Typography>
              <Typography>
                {deposit.name}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      </>
    </DashboardCard>
  );
};

export default RecentDeposits;
