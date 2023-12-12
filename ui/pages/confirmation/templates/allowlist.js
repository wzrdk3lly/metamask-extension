import { ethErrors } from 'eth-rpc-errors';
import {
  Severity, // SEVERITIES is deprecated used Severity instead
  TypographyVariant,
} from '../../../helpers/constants/design-system';
// How can I change this to a banner alert?
function getAlerts(_pendingApproval) {
  return [
    {
      id: 'ALLOWLIST_ALERT',
      severity: Severity.Danger,
      content: {
        element: 'span',
        children: 'AllowList Alert',
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
        children: 'Allowlist Warning',
        props: {
          variant: TypographyVariant.H3,
          align: 'center',
          fontWeight: 'bold',
        },
      },
      {
        element: 'Typography',
        key: 'description',
        children: 'Invalid Calldata',
        props: {
          variant: TypographyVariant.H7,
          align: 'center',
        },
      },
      {
        element: 'Typography',
        key: 'requestData',
        children: `AllowList Calldata Not Appproved for: ${pendingApproval.requestData.value}`,
        props: {
          variant: TypographyVariant.H7,
          align: 'center',
        },
      },
    ],
    cancelText: t('cancel'),
    submitText: t('continue'),
    loadingText: t('addingCustomNetwork'),
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

const allowlist = {
  getAlerts,
  getValues,
};

export default allowlist;