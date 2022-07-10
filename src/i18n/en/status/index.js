const status = {
  error: {
    title: 'Error',
    message: 'An unknown error has occurred',
  },
  loading: {
    title: 'Loading',
    messages: {
      files: 'Loading files...',
    },
  },
  disconnection: {
    title: 'Disconnection',
    message: 'You have been successfully disconnected!',
  },
  sent: {
    title: 'Sent',
    message: 'Request sent successfully!',
  },
  delete: {
    title: 'Delete',
    completed: 'Deletion completed',
    messages: {
      contact: 'This contact has been successfully removed from your relationships!',
    },
  },
  confirm: {
    title: 'Confirm',
    messages: {
      contact: 'Are you sure you want to remove <b>{name}</b> from your contacts?',
    },
  },
  save: 'Save',
  saved: {
    title: 'Saved',
    message: 'Changes saved successfully!',
  },
  update: {
    title: 'Update',
    message: {
      pub_key: 'Update of your public key, some files will not be available anymore...',
    },
  },
  copied: {
    title: 'Copied',
    message: {
      clipboard: {
        success: 'Friend code copied to your clipboard!',
        fail: 'Unable to copy in your clipboard...',
      },
    },
  },
  no: 'No',
  yes: 'Yes',
  confirmation: 'Confirmation',
  exchange: {
    title: 'Exchange',
    empty: 'No exchange...',
    last: 'Last exchanges',
  },
  no_result: 'No result...',
};

export default status;
