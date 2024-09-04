import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { Typography, Skeleton } from '@mui/material';
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
import { formatAmount } from '../../utilities/utils'
import type { Loading } from '../../types/loading';
import Link from 'next/link';

const RecentDeposits = ({ isLoading }: Loading) => {
  const deposits = useQuery(api.deposits.listRecentDeposits);

  const LoadingSkeleton = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent>
            <Skeleton variant="text" width={80} />
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="success" variant="outlined" />
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
    <>
    <Link href='deposit/history' style={{ textDecoration: 'none' }}>
    <DashboardCard title="Recent Deposits" >
      <Timeline
        className="theme-timeline"
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        sx={{
          p: 0,
          mb: '-40px',
          marginLeft: '-12%',
          '& .MuiTimelineConnector-root': {
            width: '1px',
            backgroundColor: '#efefef',
          },
          [`& .${timelineOppositeContentClasses.root}`]: {
            paddingLeft: 0,

          },
        }}
      >
        {isLoading || !deposits ? (
          <LoadingSkeleton />
        ) : (
          deposits.map((deposit: any) => (
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
          ))
        )}
      </Timeline>
    </DashboardCard>
    </Link>
    </>
  );
};

export default RecentDeposits;
