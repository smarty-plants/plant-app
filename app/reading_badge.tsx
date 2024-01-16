import { Badge } from '@tremor/react';
import {
  ArrowDownIcon,
  ArrowDownRightIcon,
  ArrowLongRightIcon,
  ArrowUpRightIcon,
  ArrowUpIcon
} from '@heroicons/react/24/solid';

type StatusType =
  | 'increase'
  | 'moderateIncrease'
  | 'normal'
  | 'moderateDecrease'
  | 'decrease';

export default function ReadingBadge({ status }: { status: StatusType }) {
  const statusToColor: Record<StatusType, string> = {
    increase: 'red',
    moderateIncrease: 'orange',
    normal: 'emerald',
    moderateDecrease: 'orange',
    decrease: 'red'
  };

  const statusToIcon: Record<StatusType, React.ComponentType> = {
    increase: ArrowUpIcon,
    moderateIncrease: ArrowUpRightIcon,
    normal: ArrowLongRightIcon,
    moderateDecrease: ArrowDownRightIcon,
    decrease: ArrowDownIcon
  };

  const badgeText: Record<StatusType, string> = {
    increase: 'Too high',
    moderateIncrease: 'Little high',
    normal: 'Good',
    moderateDecrease: 'Little low',
    decrease: 'Too low'
  };

  return (
    <Badge color={statusToColor[status]} icon={statusToIcon[status]}>
      {badgeText[status]}
    </Badge>
  );
}
