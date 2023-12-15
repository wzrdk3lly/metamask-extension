import { ethErrors } from 'eth-rpc-errors';
import {
  Severity,
  TypographyVariant,
} from '../../../helpers/constants/design-system';

function getAlerts(_pendingApproval) {
  return [
    {
      id: 'ALLOWLIST_ALERT',
      severity: Severity.Danger,
      content: {
        element: 'span',
        children: 'Invalid CallData ',
      },
    },
  ];
}

function getValues(pendingApproval, t, actions, _history) {
  return {
    content: [
      {
        element: 'Typography',
        key: 'title',
        children: 'AllowList Warning',
        props: {
          variant: TypographyVariant.H3,
          align: 'center',
          fontWeight: 'bold',
        },
      },
      {
        element: 'Typography',
        key: 'description',
        children: 'WARNING: Malicous transaction data',
        props: {
          variant: TypographyVariant.H7,
          align: 'center',
        },
      },
      {
        element: 'Typography',
        key: 'requestData',
        children: `Site Origin(static): ${pendingApproval.requestData.value}`,
        props: {
          variant: TypographyVariant.H7,
          align: 'center',
        },
      },
    ],
    cancelText: t('cancel'),
    submitText: t('approveButtonText'),
    loadingText: t('approving'),
    onSubmit: () =>
      actions.resolvePendingApproval(
        pendingApproval.id,
        pendingApproval.requestData,
      ),
    onCancel: () =>
      actions.rejectPendingApproval(
        pendingApproval.id,
        ethErrors.provider.userRejectedRequest().serialize(),
      ),
    networkDisplay: false,
  };
}

const allowList = {
  getAlerts,
  getValues,
};

export default allowList;
