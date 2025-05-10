const deletePoll = (pollId: string) => {
  // TODO perform delete call to the backend endpoint
  // eslint-disable-next-line no-console
  console.log(pollId);
  return new Promise(() => {});
};

const POLL_MUTATIONS = {
  deletePoll,
};

export default POLL_MUTATIONS;
