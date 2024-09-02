import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { formatAmount } from '../../utilities/utils'
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
import { Typography, Skeleton } from '@mui/material';
import type { Loading } from '../../types/loading';

const RecentWithdrawals = ({ isLoading }: Loading) => {
  const withdraws = useQuery(api.withdraws.listRecentWithdraws);

  const LoadingSkeleton = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent>
            <Skeleton variant="text" width={80} />
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="error" variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Skeleton variant="text" width={150} />
            <Skeleton variant="text" width={100} />
          </TimelineContent>
        </TimelineItem>
      ))}
    </>
  );

  return (
    <DashboardCard title="Recent Withdrawals">
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
        {isLoading || !withdraws ? (
          <LoadingSkeleton />
        ) : (
          withdraws.map((withdraw: any) => (
            <TimelineItem key={withdraw._id}>
              <TimelineOppositeContent>{withdraw.withdrawDate}</TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="error" variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography fontWeight="600">{withdraw.withdrawNote} - {formatAmount(withdraw.withdrawAmount)}</Typography>
                <Typography>
                  {withdraw.name}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))
        )}
      </Timeline>
    </DashboardCard>
  );
};

export default RecentWithdrawals;
